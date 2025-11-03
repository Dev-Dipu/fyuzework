"use client"
import { useEffect } from "react"
import useLenis from "@/lib/hooks/useLenis"
import Landing from "./sections/landing"
import StackCards from "./sections/StackCards"
import HowItWorks from "./sections/HowItWorks"
import WhoIsFor from "./sections/WhoIsFor"
import Dominate from "./sections/Dominate"
import PricingScreen from "../pricing/page"
import Footer from "@/components/Footer"

const Page = () => {
  useLenis()

  useEffect(() => {
    // Disable browser's instant jump
    if (window.location.hash) {
      window.scrollTo(0, 0)
    }

    // Wait a bit and then smoothly scroll
    setTimeout(() => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      }
    }, 300)
  }, [])

  return (
    <div className="w-full relative bg-[#E2E1DC] inter scroll-smooth">
      <Landing />
      <StackCards />
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="who-is-it-for">
        <WhoIsFor />
      </section>
      <Dominate />
      <PricingScreen />
      <Footer />
    </div>
  )
}

export default Page