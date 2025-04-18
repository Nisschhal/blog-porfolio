"use client"

import { useState, useRef, useEffect } from "react"
import Posts from "@/components/posts"
import { Post, PostMetadata } from "@/lib/types"

interface BlogFilterProps {
  posts: Post[]
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [search, setSearch] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const carouselRef = useRef<HTMLDivElement>(null)

  // Debug: Log posts to verify data
  console.log("BlogFilter posts:", posts)

  // Extract unique categories from tags with defensive checks
  const categories = [
    "All",
    ...Array.from(
      new Set(
        (posts || [])
          .filter((post) => post?.metadata) // Ensure metadata exists
          .flatMap((post) => post.metadata.tags || []) // Fallback to empty array
          .filter((tag) => typeof tag === "string") // Ensure tags are strings
      )
    ),
  ]

  // Debug: Log categories
  console.log("Categories:", categories)

  // Filter posts by search and category
  const filteredPosts = (posts || []).filter((post) => {
    if (!post?.metadata) return false // Skip if metadata is missing
    const matchesCategory =
      selectedCategory === "All" ||
      post.metadata.tags?.includes(selectedCategory)
    const matchesSearch =
      post.metadata.title.toLowerCase().includes(search.toLowerCase()) ||
      post.metadata.description.toLowerCase().includes(search.toLowerCase()) ||
      post.content.toLowerCase().includes(search.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const postMetadata = filteredPosts.map((post) => post.metadata)

  // Handle mouse wheel scrolling for horizontal carousel
  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scrollAmount = event.deltaY * 100 // Adjust scroll speed
      carousel.scrollLeft += scrollAmount
    }

    carousel.addEventListener("wheel", handleWheel)
    return () => carousel.removeEventListener("wheel", handleWheel)
  }, [])

  return (
    <div className="mt-6">
      {/* Filters */}
      <div className="flex justify-between gap-4">
        {/* Search Input */}
        <input
          type="text"
          placeholder="Search blogs by title or content..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-xs md:w-1/2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Categories Carousel */}
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x scroll-smooth -mx-4 px-4 mask-fade-x scrollbar-none"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`min-w-fit px-4 py-1 text-sm font-medium rounded-full transition-colors duration-200 whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Posts */}
      <div className="mt-8">
        {postMetadata.length === 0 ? (
          <p className="text-muted-foreground">No blogs found.</p>
        ) : (
          <Posts posts={postMetadata} />
        )}
      </div>
    </div>
  )
}
