FROM node:20-alpine AS base

RUN corepack enable && corepack prepare pnpm@latest --activate

# --- Dependencies ---
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma
COPY prisma.config.ts ./
RUN pnpm install --frozen-lockfile

# --- Build ---
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm prisma generate
RUN pnpm build

# --- Production ---
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone Next.js output (includes its own node_modules)
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Prisma generated client (needed for runtime queries)
COPY --from=builder /app/src/generated ./src/generated

# Prisma CLI in separate dir so it doesn't overwrite standalone node_modules
COPY --from=deps /app/node_modules /app/_prisma_deps/node_modules
COPY --from=builder /app/prisma /app/_prisma_deps/prisma
COPY --from=builder /app/prisma.config.ts /app/_prisma_deps/prisma.config.ts

RUN mkdir -p /app/uploads && chown nextjs:nodejs /app/uploads

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["sh", "-c", "cd /app/_prisma_deps && npx prisma db push --skip-generate --accept-data-loss 2>&1; cd /app && node server.js"]
