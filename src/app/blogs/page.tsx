import { getAllPosts } from "@/lib/posts"
import BlogFilter from "@/components/blog-filter"

export const dynamic = "force-static"

export default async function BlogsPage() {
  const posts = await getAllPosts()

  // Debug: Log posts
  console.log("BlogsPage posts:", posts)

  return (
    <section className="py-16 lg:py-24 xl:max-w-5xl xl:mx-auto">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-3xl font-bold">All Blogs</h1>
          {posts.length === 0 ? (
            <p className="mt-8 text-muted-foreground">No blogs found.</p>
          ) : (
            <BlogFilter posts={posts} />
          )}
        </div>
      </div>
    </section>
  )
}
