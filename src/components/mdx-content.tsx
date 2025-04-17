// // define mdx content wrapper wich has custom code and jsx compnoents

// import { JSX } from "react"
// import { highlight } from "suger-high"
// import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"

// // Dummy JSX Component

// function Code({ children, ...props }: JSX.IntrinsicElements["code"]) {
//   let codeHtml = highlight(children)

//   return (
//     <code
//       {...props}
//       dangerouslySetInnerHTML={{
//         __html: codeHtml,
//       }}
//     />
//   )
// }

// const components = {
//   code: Code,
//   // Comonents
// }

// export default function MDXContent(
//   props: JSX.IntrinsicAttributes & MDXRemoteProps
// ) {
//   return (
//     <MDXRemote
//       {...props}
//       components={{ ...components, ...(props.components || {}) }}
//     />
//   )
// }
import { JSX } from "react"
import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import rehypePrettyCode from "rehype-pretty-code"
import { cn } from "@/lib/utils"

// Custom Code component for styling
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

const components = {
  code: Code,
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypePrettyCode,
              {
                theme: "nord",
                keepBackground: true,
                onVisitLine(node: {
                  tagName: string
                  properties: { [x: string]: string }
                }) {
                  // Add line numbers
                  if (node.tagName === "div") {
                    node.properties["data-line"] = ""
                  }
                },
                onVisitHighlightedLine(node: {
                  properties: { [x: string]: string }
                }) {
                  // Highlight specific lines (e.g., ```js {1,3})
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
