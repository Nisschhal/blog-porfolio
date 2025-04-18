// components/table-of-contents.tsx
"use client" // Mark as client component for DOM access

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

// Define heading structure for TOC
interface Heading {
  id: string
  text: string
  level: number
}

export default function TableOfContents() {
  // State for headings and active heading ID
  const [headings, setHeadings] = useState<Heading[]>([])
  const [activeId, setActiveId] = useState<string>("")

  // Extract headings and set up IntersectionObserver
  useEffect(() => {
    // Query h2 and h3 elements in the main content
    const elements = document.querySelectorAll("main.prose h2, main.prose h3")
    const headingList: Heading[] = Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H2" ? 2 : 3,
    }))
    setHeadings(headingList)

    // Set up IntersectionObserver to detect visible headings
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Set active ID when heading is in view
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: "-100px 0px -66%", // Trigger when heading is near top
        threshold: 0.1, // Trigger when 10% of heading is visible
      }
    )

    // Observe all h2 and h3 elements
    elements.forEach((el) => observer.observe(el))

    // Cleanup observer on unmount
    return () => observer.disconnect()
  }, []) // Run once on mount

  // Handle smooth scrolling on link click
  const handleClick = (id: string, e: React.MouseEvent) => {
    e.preventDefault() // Prevent default anchor jump
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" }) // Smooth scroll to heading
    }
  }

  // Don't render TOC if no headings
  if (headings.length === 0) return null

  return (
    <aside className="sticky z-60 top-24 max-h-screen overflow-y-auto ">
      {/* TOC title */}
      <h3 className="font-extrabold mb-4 text-shadow-muted-foreground">
        On this page
      </h3>
      <ul className="space-y-1 text-muted-foreground pl-4 border-l">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={cn(
              heading.level === 3 ? "ml-2 cursor-pointer" : "cursor-pointer"
            )} // Indent h3
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => handleClick(heading.id, e)}
              // Highlight active link with bold and color
              className={`text-sm    hover:underline  cursor-pointer${
                activeId === heading.id
                  ? " text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
