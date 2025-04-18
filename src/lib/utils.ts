import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// data format  fucntion
export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

// Strip Markdown and HTML tags, count words
export function countWords(content: string): number {
  // Remove Markdown syntax (e.g., #, *, [], etc.) and HTML tags
  const plainText = content
    .replace(/#{1,6}\s/g, "") // Remove headers (#, ##, etc.)
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold (** or __)
    .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic (* or _)
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1") // Remove links ([text](url))
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "") // Remove images (![alt](url))
    .replace(/`{1,3}[^`]+`{1,3}/g, "") // Remove code blocks and inline code
    .replace(/<[^>]+>/g, "") // Remove HTML tags
    .replace(/\n+/g, " ") // Replace newlines with spaces
    .trim()

  // Split on whitespace, filter out empty strings
  const words = plainText.split(/\s+/).filter((word) => word.length > 0)
  return words.length
}

// Calculate reading time based on word count (200 words per minute)
export function calculateReadingTime(wordCount: number): string {
  if (wordCount === 0) return "Less than 1 min read"
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}

// Converts text to a URL-friendly ID (e.g., "My Heading" → "my-heading") for on this page links
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/[^\w-]+/g, "") // Remove non-word characters
    .replace(/--+/g, "-") // Replace multiple hyphens with single
}
