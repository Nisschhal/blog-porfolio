// app/blogs/[slug]/page.tsx
import { getPostBySlug, getAllPosts } from "@/lib/posts"
import { notFound } from "next/navigation"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import { ArrowLeftIcon, Calendar, Clock, FileText, User } from "lucide-react"
import Link from "next/link"
import MDXContent from "@/components/mdx-content"
import TableOfContents from "@/components/table-of-contents"

type ParamsProps = {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

const BlogPost = async ({ params }: ParamsProps) => {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const { metadata, content } = post
  const {
    title,
    description,
    publishedAt,
    author,
    image,
    wordCount,
    readingTime,
    tags,
  } = metadata

  return (
    <section className="py-16 lg:py-24 xl:max-w-5xl xl:mx-auto">
      <div className="grid grid-cols-12 xl:gap-20 gap-4">
        <div className="col-span-12">
          <Link href="/blogs" className="flex items-center space-x-2 mb-6">
            <ArrowLeftIcon className="size-5" />
            <span>Back to blogs</span>
          </Link>

          {image && (
            <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title || ""}
                className="object-cover"
                fill
                sizes="100vw"
                priority
              />
            </div>
          )}

          <header>
            <h1 className="text-3xl font-bold">{title}</h1>
            {tags && tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            {/* Metadata */}
            <p className="mt-3 text-sm text-muted-foreground flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="flex items-center">
                <User className="size-4 mr-1" aria-label="Author" />
                {author}
              </span>
              <span className="mx-1">•</span>
              <span className="flex items-center">
                <Calendar className="size-4 mr-1" aria-label="Published date" />
                {formatDate(publishedAt)}
              </span>
              <span className="mx-1">•</span>
              <span className="flex items-center">
                <FileText className="size-4 mr-1" aria-label="Word count" />
                {wordCount} words
              </span>
              <span className="mx-1">•</span>
              <span className="flex items-center">
                <Clock className="size-4 mr-1" aria-label="Reading time" />
                {readingTime}
              </span>
            </p>
          </header>
        </div>
        <div className="col-span-12 md:col-span-8">
          <main className="prose dark:prose-invert mt-16">
            <MDXContent source={content} />
          </main>
        </div>
        <div className="hidden md:block md:col-span-4">
          <TableOfContents />
        </div>
      </div>
    </section>
  )
}

export default BlogPost
