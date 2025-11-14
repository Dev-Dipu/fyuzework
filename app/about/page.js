"use client"
import { useEffect } from "react"
import useLenis from "@/lib/hooks/useLenis"
import Landing from "./sections/landing"
import StackCards from "./sections/StackCards"
import HowItWorks from "./sections/HowItWorks"
import WhoIsFor from "./sections/WhoIsFor"
import Dominate from "./sections/Dominate"
import Footer from "@/components/Footer"
import Pricing from "@/components/Pricing"
import Navbar from "@/components/Navbar"

const Page = () => {
  useLenis()

  return (
    <div className="bg-[#E2E1DC]">
      <Navbar />
      <Landing />
      <section id="aboutHero" data-nav-transparent="true" className="section theme-bg-secondary" data-text="light">
        <StackCards />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="who-is-it-for">
        <WhoIsFor />
      </section>
      <Dominate />
      <Pricing />
      <Footer />
    </div>
  )
}

export default Page