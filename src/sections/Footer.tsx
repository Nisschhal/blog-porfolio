import ArrowUpRightIcon from "@/assets/icons/arrow-up-right.svg"
const footerLinks = [
  { title: "YouTube", href: "#" },
  { title: "Twitter", href: "#" },
  { title: "Instagram", href: "#" },
  { title: "LinkedIn", href: "#" },
]
export const Footer = () => {
  return (
    <footer className="relative -z-10 overflow-hidden">
      {/* Gradient Effect */}
      <div className="-z-10 absolute h-[400px] w-[1600px] bottom-0 left-1/2 -translate-x-1/2 bg-emerald-300/35 dark:bg-gray-100/35 [mask-image:radial-gradient(50%_50%_at_bottom_center,black,transparent)]"></div>

      {/* Content */}
      <div className="container z-0">
        <div className="border-t border-border text-sm flex flex-col items-center gap-8 py-6 mb-30">
          <div className="text-white/40">&copy; 2025. All rights reserved.</div>
          <nav className="flex flex-col items-center gap-8">
            {footerLinks.map((link) => (
              <a
                href={link.href}
                key={link.title}
                className="inline-flex items-center gap-1.5"
              >
                <span className="font-semibold"> {link.title}</span>
                <ArrowUpRightIcon className="size-4" />
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
