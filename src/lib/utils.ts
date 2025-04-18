import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
// lib/utils.ts
export function countWords(content: string): number {
  const plainText = content
    .replace(/#{1,6}\s/g, "")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/(\*|_)(.*?)\1/g, "$2")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, "")
    .replace(/`{1,3}[^`]+`{1,3}/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\n+/g, " ")
    .trim()
  const words = plainText.split(/\s+/).filter((word) => word.length > 0)
  return words.length
}

export function calculateReadingTime(wordCount: number): string {
  if (wordCount === 0) return "Less than 1 min read"
  const minutes = Math.ceil(wordCount / 200)
  return `${minutes} min read`
}

export function formatDate(date: string | Date): string {
  const dateObj = new Date(date)
  if (isNaN(dateObj.getTime())) return "Unknown date"
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
}
