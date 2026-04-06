import { PostForm } from "@/components/admin/post-form";

export default function NewPostPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">New Post</h2>
      <PostForm />
    </div>
  );
}
