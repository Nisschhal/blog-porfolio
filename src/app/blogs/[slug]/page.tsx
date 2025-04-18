// app/posts/[slug]/page.tsx
import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import { formatDate, countWords, calculateReadingTime } from "@/lib/utils"
import Image from "next/image"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import MDXContent from "@/components/mdx-content"
import TableOfContents from "@/components/table-of-contents"

type ParamsProps = {
  params: Promise<{ slug: string }>
}

const BlogPost = async ({ params }: ParamsProps) => {
  // Get slug from params
  const { slug } = await params
  // Fetch post data
  const post = await getPostBySlug(slug)

  // Return 404 if post not found
  if (!post) {
    notFound()
  }

  // Destructure post data
  const { metadata, content } = post
  const { title, description, publishedAt, author, image } = metadata

  // Calculate word count and reading time
  const wordCount = countWords(content)
  const readingTime = calculateReadingTime(wordCount)

  return (
    <section className="py-16 lg:py-24 xl:max-w-5xl xl:mx-auto">
      {/* Container with grid layout */}
      <div className="grid grid-cols-12 xl:gap-20 gap-4">
        <div className="col-span-12">
          {/* Back to posts link */}
          <Link href="/posts" className="flex items-center space-x-2 mb-6">
            <ArrowLeftIcon className="size-5" />
            <span>Back to posts</span>
          </Link>

          {/* Post image if available */}
          {image && (
            <div className="relative mb-6 h-96 w-full overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={title || ""}
                className="object-cover"
                fill
              />
            </div>
          )}

          {/* Post header */}
          <header>
            <h1 className="title">{title}</h1>
            <p className="text-muted-foreground mt-3 text-sm">
              {author} / {formatDate(publishedAt ?? "")} / {wordCount} words /{" "}
              {readingTime}
            </p>
          </header>
        </div>
        {/* Post content */}
        <div className="col-span-12 md:col-span-8">
          <main className="prose dark:prose-invert mt-16">
            <MDXContent source={content} />
          </main>
        </div>
        {/* TOC Sidebar: spans 4 columns on md */}
        <div className="hidden md:block md:col-span-4">
          <TableOfContents />
        </div>
      </div>
    </section>
  )
}

export default BlogPost
