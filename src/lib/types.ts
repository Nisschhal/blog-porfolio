// lib/types.ts
export interface PostMetadata {
  slug: string
  title: string
  description: string
  publishedAt: string
  author: string
  image?: string
  wordCount: number
  readingTime: string
  category: string
  tags?: string[]
}

export interface Post {
  slug: string
  metadata: PostMetadata
  content: string
}
