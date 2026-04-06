import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Seeding database...");

  // Blog posts (migrated from old MDX content)
  const posts = [
    {
      title: "Shortcut Machine",
      slug: "midi",
      excerpt:
        "How to run Figma shortcuts using a MIDI keyboard",
      content: `# Shortcut machine

Have you ever wanted to do something quickly in Figma but can't remember the shortcut? Or have you ever wanted to speed things up by having dedicated physical key for everyday actions?
Well, now you can have dedicated physical keys for common shortcut keys. All you need is a midi keyboard or any sort of USB midi device with buttons on it, two opensource Software and a bit of Setup and you are good to go.

## Here is what you need

**The hardware -- USB Midi keyboard/Controller**
This will act as your interface / Control surface. you can use [this](https://www.akaipro.com/mpk-mini-mkii)

**MIDI Loupe**
Allows you to monitor and log MIDI messages from one or multiple MIDI devices. Download it [here](https://apps.apple.com/us/app/midi-loupe/id507075182)

**MidiStroke**
Converts a midi signal to Keyboard events. Download it [here](https://charlie-roberts.com/midiStroke/)

## Before we start
So before we start with the Setup, we need to understand how this works.

The Midi devices send out a midi signal to the computer each time you press a key.

![midi](/blog/midione.webp)

Midi signal from Controller to Computer. That signal reaches the computer, but Figma does not understand Midi (yet...) and thus can't do anything with it.

So we need a translator that can take the midi signal and convert it into Keyboard signals.

![midi](/blog/miditwo.webp)

As shown above, Midi Stroke (our translator) listens to the incoming midi signal and converts it to keyboard shortcuts that Figma understands.

So basically every time you press a key an appropriate keyboard shortcut (configured by you) will be initiated.

## Let's get started

**Step 0**
Open Figma and open the shortcut panel and make a list of all the shortcuts you would like to have a dedicated key for.

Protip: you can find the panel in the help menu or by using the shortcut key

**Step 1**
Connect your midi controller to the computer and make sure you have both midi loupe and ministroke installed.

Now Open MidiLoupe, select your midi device. Press a few keys to see if you are getting a signal.

![midi](/blog/midithree.gif)

![midi](/blog/midifour.gif)

**Step 2**
Now that we know everything is working its time to think of what key to map for what shortcut.

I did it by marking out my keyboard with a marker. (you can skip this)

![midi](/blog/midifive.webp)

**Step 3**
This is the most important step. This is where I will show you how to set up midi stroke to send keyboard shortcuts to Figma (Pro tip: or any app)

Open midi loupe and press the key on the midi you want to assign. you will get a message like the one you see below.

![midi](/blog/midisix.webp)

The number immediately after "Note on" / "Note off" is the number that represents the key. Note it down, in this case, its "48"

Now open midi stroke and enter the value in the first column followed by the shortcut key in the second column.

![midi](/blog/midiseven.webp)

Once you have done this open Figma and see the magic! Rinse and repeat step 3 until all your keys are mapped and you are done.

Make sure to always keep midi stroke running when you want to use midi shortcuts.

That's all Folks`,
      tags: ["figma", "midi", "productivity", "hardware", "shortcuts"],
      published: true,
    },
    {
      title: "Design system migration",
      slug: "one",
      excerpt:
        "How I created a Figma plugin to automate our design system migration",
      content: `## Context
We started migrating to a brand new design system and as you all can imagine the process of migrating an existing product to a new design system is a long and involved process.

There are a few ways you can do it.

You could either build your product from scratch using the new design system or you could choose to evolve your existing product by incrementally migrating to the new design system.

We chose to do the latter, since building a product like ours from scratch would just not be feasible.

## Problem

The problem was that doing so would mean translating the existing product as is into the new design system as a first step.

Now, this first step of 1:1 conversion may seem like an easy task (and it is in terms of execution), but the thing is, it comes with some major cons.

It is a slow and tedious task.
It takes away time which you can otherwise be used for things more important than just changing the design language.
It is repetitive & prone to human errors.
The solution was simple we could automate it.

## Solution

I created a Figma plugin which would take any existing design and replace the styles with the closest matching styles in the new design system.

Like in the video below the colours are matched with the colours defined in the Design system and the closest match is applied as a style.

[Watch the color matching demo](https://www.youtube.com/watch?v=HMKIff0hYr4)

Similarly for the type styles, the closest font style and weight is applied along with any font family changes if required.

[Watch the type style demo](https://www.youtube.com/watch?v=zls5DaBDSSw)

For Example, A text layer of size 22 regular of font-family X is converted to size 24 regular of font Family Y. The standard we use for our Design system.

[See it in action](https://www.youtube.com/watch?v=FxN7I9meCTY)

## Impact

The Impact was massive.

I did approx 3 weeks worth of work in a day.

Additionally, Designers from other teams have started picking it up and they are using it as a design auto corrector / Linter which fixes all their designs by applying the right text and colour styles.

It's a big win for 2 nights of late-night coding.

So what's next?

I will be open-sourcing the plugin and making a tutorial for those who want to try to do this for their own projects.`,
      tags: ["figma", "plugin", "design-system", "automation"],
      published: true,
    },
    {
      title: "Pyramid principle",
      slug: "pyramid",
      excerpt:
        "A Guide to Structuring Information in Design Thinking",
      content: `## The Pyramid Principle

Design thinking is all about finding innovative solutions to complex problems. However, presenting your ideas effectively is just as important as coming up with them in the first place. That's where the pyramid principle comes in.

### What is the Pyramid Principle?

The pyramid principle is a method used to structure information and arguments in a clear and persuasive way. It's a visual representation of the hierarchy of ideas, ensuring that the most important information is presented first and that each subsequent level supports the level above it.

### Why is the Pyramid Principle Important in Design Thinking?

In design thinking, it's crucial to communicate your ideas effectively, and the pyramid principle can help you do just that. By using this principle, you can ensure that your ideas are presented in a logical and coherent way and that they are easy to understand. This can help you win over stakeholders and get buy-in for your ideas.

## How to Use the Pyramid Principle in Design Thinking

Here's how you can use the pyramid principle in design thinking:

### Identify the Main Message

Start by figuring out what message you want to convey. This will be the foundation of the pyramid and should be the most important information that you want to communicate.

### Develop Supporting Arguments

Once you have identified the main message, you can start developing the supporting arguments. These arguments should be structured in a logical and coherent way and should support the main message.

### Arrange the Arguments in a Pyramid Structure

The main message should be at the top of the pyramid and the supporting arguments should be arranged below it in descending order of importance.

### Use Visual Aids to Reinforce the Structure

The pyramid principle can be reinforced by using visual aids such as diagrams, flowcharts, or mind maps. This can help to clearly communicate the hierarchy of ideas and to ensure that the information is presented in a clear and visually appealing way.

### Test and Refine the Structure

After you have structured the information using the pyramid principle, it's important to test it and refine it if necessary. This might involve adding or removing arguments, reordering the arguments, or adjusting the visual aids.

## Final Thoughts

By following these steps, you can use the pyramid principle to structure your information in a clear and persuasive way and to communicate your ideas effectively in design thinking. So, the next time you're presenting your ideas, try using the pyramid principle to help you get your message across in the most effective way possible.`,
      tags: ["design-thinking", "communication", "frameworks"],
      published: true,
    },
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post,
    });
    console.log(`  Post: ${post.title}`);
  }

  // Portfolio projects (migrated from old site)
  const projects = [
    {
      title: "Building for India",
      slug: "expansion-india",
      description: "Case Study for the Revolut India App",
      content: `# Revolut India App

## Introduction
Revolut is a global fintech giant. As a part of the expansion strategy they wanted to launch in India. As a Senior Product Designer in the Expansion department, my primary responsibility was to lead the creation of the Revolut India App.

## Problem Statement
1. **Divergence in Regulatory Frameworks:** Adapting to the Indian regulatory landscape, which significantly differed from global standards, required meticulous planning and execution.

2. **Feature Limitations:** Due to regulatory constraints, certain features that were integral to the global version of the app couldn't be immediately implemented. This prompted the need to prioritize and create a focused, regulatory-compliant version for the Indian market.

## Solution

The redesign process was approached comprehensively, with a keen focus on compliance and user experience. The following key solutions were implemented:

1. **Onboarding Flow Redesign:** The onboarding flow was completely redesigned to align with Indian regulatory requirements for KYC details collection. This not only ensured compliance but also provided a seamless experience for users navigating through the initial setup of their accounts.

2. **Core Flow Redesign:** All core flows such as Adding money, Currency exchange, domestic and international transfers had to be redesigned to work with the Indian banking systems and ensure compliance with the regulatory frameworks.

## Outcome
The redesigned Revolut India App is under review by the regulators for External testing and Validation which is a major milestone towards launching Revolut in India.`,
      tags: ["revolut", "fintech", "expansion", "india", "mobile-app"],
      company: "Revolut",
      year: "2023",
      published: true,
      sortOrder: 0,
    },
    {
      title: "Snap App",
      slug: "building-snap",
      description:
        "An internal tool built to ensure consistent UX across regions at Revolut",
      content: `# Introduction

Snap is an Internal tool I designed & developed to address the challenges faced by the expansion team in ensuring a consistent and seamless user experience across different countries, languages, devices, and color modes.

This tool serves as a centralized platform, providing designers and product managers with a single source of truth for the live status and visual representation of the app's various flows.

## Context
As a member of the expansion team, the primary responsibility is to create and implement flows that seamlessly function across diverse countries. The challenge lies in accommodating country-specific variations, language localizations, and ensuring a cohesive design that resonates with the cultural nuances of different regions.

## Problem
The manual testing of flows for each region and language group is time-consuming and prone to oversight. Given the diverse requirements of each country and the need for language localization, it becomes challenging to validate the design comprehensively before launching it into the production environment.

## Solution
The key idea was to generate screenshots of the flows under various conditions, including different countries, languages, devices, and both dark and light modes. We do this by using automation tools.

These screenshots serve as a visual representation of what is live on the app in the production environment. The screenshots are viewable using the Snap web app. In the Snap web app you can change parameters such as Device, color mode, language, region etc to see how it would look like in production.

## Conclusion
Snap has proven to be an invaluable asset for the expansion team, streamlining the testing and validation of design elements across different countries, languages, devices, and color modes. The automated approach not only enhances efficiency but also ensures a more comprehensive and accurate assessment of the app.

## My role
I was responsible for the Conceptualization of the product and the design + development of the Frontend for the web app. I had a lot of help from the engineers to help create the automations which take the screenshot and makes them available for the web app to consume.`,
      tags: ["revolut", "internal-tools", "automation", "testing", "design-ops"],
      company: "Revolut",
      year: "2023",
      published: true,
      sortOrder: 1,
    },
    {
      title: "Wealth Protection",
      slug: "wealth-pro",
      description:
        "A new Revolut security feature using facial verification for financial protection",
      content: `# Wealth Protection

## Context

As a Senior product designer at Revolut I was tasked with creating a new feature to provide an additional layer of protection for users' assets, particularly in scenarios where the user's phone or credentials may be compromised. The aim is to provide the users with the right tools to protect themselves from Financial crimes.

## Problem
As the digital landscape evolves, so do the threats to financial security. Account takeovers, where unauthorized individuals gain access to a user's financial accounts, pose a significant risk. In the event of a stolen phone or compromised login credentials, users are vulnerable to unauthorized transactions that can jeopardize their savings and investments.

Traditional security measures, such as passwords and PINs, may not provide sufficient protection in scenarios where the user's device or login information is compromised. Revolut recognizes the need for an advanced security solution that adds another layer of security to safeguard users' financial assets.

## Solution

Revolut's innovative solution involves the implementation of proprietary facial verification with liveness checks for specific types of transactions. Users have the flexibility to choose which transactions they want to protect with this additional layer of security.

When a user initiates a protected transaction, the system prompts them to undergo facial verification. This facial verification process adds a dynamic element to the authentication process, significantly reducing the risk of unauthorized transactions even if the user's phone or credentials are stolen. By tying the verification to the user's unique facial features and liveness, Revolut ensures that only authorized individuals can complete protected transactions, providing a robust defense against account takeovers.`,
      tags: ["revolut", "security", "fintech", "biometrics", "mobile-app"],
      company: "Revolut",
      year: "2023",
      published: true,
      sortOrder: 2,
    },
    {
      title: "Zomato Order Tracker",
      slug: "zomato",
      description:
        "Redesign of the Zomato order tracking experience that reduced support tickets by 27%",
      content: `# Zomato Order Tracker

## Introduction

Zomato is India's largest food delivery platform, with millions of users ordering food every day. As a Senior Product Designer, I was tasked with Redesigning the order tracker from scratch.

## Problem

Based on analysis of support chats and internal tracking matrices we identified 2 user problems we wanted to solve with this redesign:
- Reducing user anxiety about the status of their order.
- Help users build trust in the system.

Additionally we wanted to make the order tracker scalable to support new product offerings such as Grocery delivery, and Medicine Delivery.

## Solutions

### Approach 1
This approach focused on simplicity and communicating the order status with elegant conversational copy and color association.

### Approach 2
This approach focused on complete transparency and showed a detailed tracker accessible through progressive disclosure.

## Outcome
We did an A/B test for both approaches vs the old tracker over a period of months across our standard segments. The metrics we were comparing them against were Orders requiring support (ORS) and order cancellation.

Approach 1 was a clear winner for us — with an improvement of **27% less Orders requiring support** and **16% less cancellations**.

On the other hand Approach 2 was performing worse than the old tracker with an uptake of 4% on the ORS.

As of now Approach 1 is currently Live and is now the new order tracker for Zomato.

## Scalability
We designed both the approaches to be scalable. The entire system is built using components, autolayout and variants with 1:1 mapping to code.`,
      tags: [
        "zomato",
        "food-delivery",
        "order-tracking",
        "mobile-app",
        "ab-testing",
      ],
      company: "Zomato",
      year: "2021",
      published: true,
      sortOrder: 3,
    },
    {
      title: "Car rental experience",
      slug: "expedia",
      description:
        "Redesign of Expedia's car rental experience to improve user trust and informed decisions",
      content: `# Enhancing Car Rental Experience

## Introduction

Expedia, one of the world's leading online travel agencies. In this case study, we will explore how Expedia improved their rental car booking flow.

## Problem Statement
Expedia users struggled to differentiate between car rental options from the same vendor with similar names and features but differing prices.

This confusion often led users to assume that Expedia was showing different prices for identical cars, damaging their trust in the platform.

The challenge was to present the information in a way that helped users understand why these cars had different prices and make well-informed choices while improving their confidence in Expedia.

## Objectives

1. **Enhance User Trust**: Rebuild user trust by providing transparent and consistent information about car rental options.
2. **Improve User Understanding**: Help users understand the reasons behind the price variations for seemingly identical car options.
3. **Encourage Informed Decisions**: Assist users in making informed choices by highlighting the differences and advantages of each car.
4. **Optimize User Experience**: Redesign car selection cards for a more intuitive and user-friendly interface.

## Solution

### Approach 1 — Upfront Approach
This approach shows all the options directly on the search result card. All the options are stacked one below the other with the cheapest option on top.

### Approach 2 — Modal Approach
This approach shows the cheapest option upfront (with a dedicated reserve button) on the search result card while all the options can be viewed inside a modal by tapping on the "see all rates" button. All the options are stacked one below the other, the cheapest option on top.

### Approach 3 — Dithered Approach
This approach shows the option on the Details page as opposed to the search result card. The cheapest option is shown on the bottom bar and can directly be reserved from there itself. Additional options can either be seen by scrolling down the page to the options card or by tapping on the "see all rates" button on the bottom bar.`,
      tags: ["expedia", "travel", "car-rental", "ux-research", "prototyping"],
      company: "Expedia",
      year: "2019",
      published: true,
      sortOrder: 4,
    },
    {
      title: "Partner App",
      slug: "partner-app",
      description: "Zomato's partner application for restaurant owners",
      content: `# Coming soon

This case study is currently being written. Check back later for the full story.`,
      tags: ["zomato"],
      company: "Zomato",
      year: "2020",
      published: false,
      sortOrder: 5,
    },
  ];

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: project,
      create: project,
    });
    console.log(`  Project: ${project.title}`);
  }

  // Timeline entries
  const timeline = [
    {
      title: "Senior Product Designer at Revolut",
      body: "Leading design for the Expansion department, bringing Revolut to new markets. Also part of the design operations team building internal tools to optimize workflows.",
      date: new Date("2022-01-01"),
      category: "work",
      sortOrder: 0,
    },
    {
      title: "Speaker at Config (Figma)",
      body: "Spoke at Figma's Config design conference sharing knowledge and experience about design tooling and workflows.",
      date: new Date("2023-06-01"),
      category: "work",
      sortOrder: 1,
    },
    {
      title: "Senior Product Designer at Zomato",
      body: "Helped develop multiple products including Grocery delivery (now Blinkit), the order tracking system, and partner applications.",
      date: new Date("2020-01-01"),
      category: "work",
      sortOrder: 2,
    },
    {
      title: "Product Designer at Expedia",
      body: "Built the Car rental product and contributed to the Expedia design systems team building internal tools and frameworks.",
      date: new Date("2018-01-01"),
      category: "work",
      sortOrder: 3,
    },
    {
      title: "Product Designer at MakeMyTrip",
      body: "Part of the app redesign team at India's leading online travel company. Got my first real taste of product design here.",
      date: new Date("2016-01-01"),
      category: "work",
      sortOrder: 4,
    },
    {
      title: "Product Designer at Hike Messenger",
      body: "Worked on building India's first social chat app.",
      date: new Date("2015-01-01"),
      category: "work",
      sortOrder: 5,
    },
  ];

  for (const entry of timeline) {
    // Use upsert based on title to avoid duplicates
    const existing = await prisma.timelineEntry.findFirst({
      where: { title: entry.title },
    });
    if (existing) {
      await prisma.timelineEntry.update({
        where: { id: existing.id },
        data: entry,
      });
    } else {
      await prisma.timelineEntry.create({ data: entry });
    }
    console.log(`  Timeline: ${entry.title}`);
  }

  console.log("Seeding complete!");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
