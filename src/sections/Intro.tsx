import Image from "next/image"
import React from "react"
import Nischal from "@/assets/images/nischal.png"
const Intro = () => {
  return (
    <section className=" group flex flex-col-reverse md:flex-row items-center gap-x-10 gap-y-4 pb-4">
      {/* Intro */}

      <div className="mt-2 flex-1 md:mt-0 ">
        <h1 className="title no-underline">Hey, I&apos;m Nischal</h1>
        <p className="mt-3 font-light text-muted-foreground">
          I&apos;m a full-stack developer with a passion for creating
          user-friendly web applications.
        </p>
      </div>
      <div className="relative">
        <Image
          className="flex-1 rounded-lg grayscale group-hover:grayscale-0 transition-all duration-400"
          src={Nischal.src}
          alt="hero"
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}

export default Intro
