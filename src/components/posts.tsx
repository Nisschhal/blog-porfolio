import { PostMetadata } from "@/lib/types"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Calendar, Clock, User, FileText } from "lucide-react"

const Posts = ({ posts }: { posts: PostMetadata[] }) => {
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blogs/${post.slug}`} className="block">
            <article className="group rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105">
              {/* Image */}
              {post.image ? (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={false}
                  />
                </div>
              ) : (
                <div className="w-full h-48 rounded-t-xl bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-gray-400 dark:text-gray-500">
                    No Image
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="p-5">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full transition-colors duration-300 group-hover:bg-blue-200 dark:group-hover:bg-blue-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Title */}
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white relative overflow-hidden">
                  {post.title}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-3">
                  {post.description}
                </p>

                {/* Metadata */}
                <p className="mt-3 text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
                  <span className="flex items-center">
                    <User className="size-4 mr-1" aria-label="Author" />
                    {post.author}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    <Calendar
                      className="size-4 mr-1"
                      aria-label="Published date"
                    />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    <FileText className="size-4 mr-1" aria-label="Word count" />
                    {post.wordCount} words
                  </span>
                  <span className="mx-1">•</span>
                  <span className="flex items-center">
                    <Clock className="size-4 mr-1" aria-label="Reading time" />
                    {post.readingTime}
                  </span>
                </p>
              </div>
            </article>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts
