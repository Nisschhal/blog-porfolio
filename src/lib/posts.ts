// lib/posts.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { countWords, calculateReadingTime } from "@/lib/utils"
import { Post, PostMetadata } from "@/lib/types"

const postsDirectory = path.join(process.cwd(), "contents", "posts")

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`)
  try {
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    const wordCount = countWords(content)
    const readingTime = calculateReadingTime(wordCount)

    const metadata: PostMetadata = {
      slug,
      title: data.title || "",
      description: data.description || "",
      publishedAt: data.publishedAt || "",
      author: data.author || "",
      image: data.image || undefined,
      category: data.category || "",
      wordCount,
      readingTime,
      tags: data.tags || undefined,
    }

    return { slug, metadata, content }
  } catch (e) {
    console.error(`Error reading post ${slug}:`, e)
    return null
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const files = fs.readdirSync(postsDirectory)
    const posts = files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => {
        const slug = file.replace(/\.mdx$/, "")
        const fullPath = path.join(postsDirectory, file)
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        const wordCount = countWords(content)
        const readingTime = calculateReadingTime(wordCount)

        const metadata: PostMetadata = {
          slug,
          title: data.title || "",
          description: data.description || "",
          publishedAt: data.publishedAt || "",
          author: data.author || "",
          image: data.image || undefined,
          category: data.category || "",
          wordCount,
          readingTime,
          tags: data.tags || undefined,
        }

        return { slug, metadata, content }
      })

    return posts.sort(
      (a, b) =>
        new Date(b.metadata.publishedAt).getTime() -
        new Date(a.metadata.publishedAt).getTime()
    )
  } catch (e) {
    console.error("Error reading posts:", e)
    return []
  }
}
