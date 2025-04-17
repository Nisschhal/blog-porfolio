import { getPostBySlug } from "@/lib/posts"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { formatDate } from "@/lib/utils"
import Image from "next/image"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { s } from "motion/react-client"
import MDXContent from "@/components/mdx-content"

// define the ParamsProps
type ParamsProps = {
  params: Promise<{ slug: string }>
}

// define the BlogPost component
const components = {
  // define the h2 as function with children to render such as textnode
  h1: ({ children }: any) => <h1 className="font-serif">{children}</h1>,
  h2: ({ children }: any) => <h2 className="font-serif">{children}</h2>,
}

const BlogPost = async ({ params }: ParamsProps) => {
  // get the slug from the params
  const { slug } = await params

  // fetch the post by slug
  const post = await getPostBySlug(slug)

  // if no post, return 404
  if (!post) {
    notFound()
  }

  // destructure the post
  const { metadata, content } = post

  // destructure the metadata
  const { title, description, publishedAt, author, image } = metadata

  return (
    <section className="py-16 lg:py-24">
      <div className="  ">
        <Link href="/posts" className="flex items-center space-x-2">
          <ArrowLeftIcon className="size-5" />
          <span>Back to posts</span>
        </Link>

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

        <header>
          <h1 className="title">{title}</h1>
          <p className="text-muted-foreground mt-3 text-sm">
            {author} / {formatDate(publishedAt ?? "")}
          </p>
        </header>

        <main className="prose dark:prose-invert mt-16">
          {/* <MDXRemote source={content} components={components} /> */}
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}

export default BlogPost
