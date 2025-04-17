import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface PostMetadata {
  title?: string
  publishedAt?: string
  slug: string
  author?: string
  description?: string
  image?: string
  category?: string
  tags?: string[]
}

export interface Post {
  metadata: PostMetadata
  content: string
}

// root directory to content/posts
const rootDirectory = path.join(process.cwd(), "contents", "posts")

// docstring for this function
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    // get the post file with slug name
    const filePath = path.join(rootDirectory, `${slug}.mdx`)

    // read the file of slug from the content/posts folder using post and fs module
    const post = fs.readFileSync(filePath, "utf-8")

    // extract metadata(frontmatter) and content(post) from the post file
    const { data, content } = matter(post)

    return {
      metadata: {
        ...data,
        slug,
      },
      content,
    }
  } catch (error) {
    console.error("Error fetching post:", error)
    return null
  }
}
