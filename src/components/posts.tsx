import { PostMetadata } from "@/lib/posts"
import Link from "next/link"
import React from "react"

const Posts = ({ posts }: { posts: PostMetadata[] }) => {
  return (
    <ul className="flex flex-col md:flex-row gap-8">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/posts/${post.slug}`}>
            {post.title}
            <div className="max-w-lg">
              <p className="text-lg font-semibold">{post.title}</p>
              <p className="mt-1 line-clamp-2 text-sm font-light text-muted-foreground">
                {post.description}
              </p>
            </div>

            {post.publishedAt && (
              <p className="mt-1 text-sm font-light ">{post.publishedAt}</p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
