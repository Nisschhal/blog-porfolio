// components/mdx-content.tsx
import { JSX } from "react"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import { cn, slugify } from "@/lib/utils"

// Custom code component for styling code blocks
function Code({
  children,
  className,
  ...props
}: JSX.IntrinsicElements["code"]) {
  return (
    <code className={cn("pretty-code", className)} {...props}>
      {children}
    </code>
  )
}

// Custom h1 component to add ID and styling
function H1({ children }: { children: React.ReactNode }) {
  // Generate ID from heading text
  const id = slugify(children as string)
  return (
    <h1 id={id} className="text-black/80">
      {children}
    </h1>
  )
}
// Custom h2 component to add ID and styling
function H2({ children }: { children: React.ReactNode }) {
  // Generate ID from heading text
  const id = slugify(children as string)
  return (
    <h2 id={id} className="text-black/80">
      {children}
    </h2>
  )
}

// Custom h3 component to add ID and styling
function H3({ children }: { children: React.ReactNode }) {
  // Generate ID from heading text
  const id = slugify(children as string)
  return (
    <h3 id={id} className="text-black/80">
      {children}
    </h3>
  )
}

// set the text p to text-zinc-500
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground">{children}</p>
}

// Define components to override default MDX rendering
const components = {
  code: Code,
  h1: H1,
  h2: H2,
  h3: H3,
  p: P,
  // can also add jsx react components here
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      // Merge custom components with any passed-in components
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          // Enable GitHub Flavored Markdown (e.g., tables, strikethrough)
          remarkPlugins: [remarkGfm],
          // Syntax highlighting for code blocks
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "github-dark", // Dark theme for code blocks
                keepBackground: true, // Preserve background color
                // Add line number data to code lines
                onVisitLine(node: {
                  tagName: string
                  properties: { [x: string]: string }
                }) {
                  if (node.tagName === "div") {
                    node.properties["data-line"] = ""
                  }
                },
                // Highlight specific lines if specified (e.g., ```js {1,3})
                onVisitHighlightedLine(node: {
                  properties: { [x: string]: string }
                }) {
                  node.properties["data-line-highlighted"] = ""
                },
              },
            ],
          ],
        },
      }}
    />
  )
}
