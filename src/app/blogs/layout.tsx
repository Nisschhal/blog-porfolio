import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | Nischal",
  description: "Nischal's Blog",
}

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className="container   ">{children}</div>
}
