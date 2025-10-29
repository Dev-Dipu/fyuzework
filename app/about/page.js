"use client"
import useLenis from "@/lib/hooks/useLenis"
import Landing from "./sections/landing"
import StackCards from "./sections/StackCards"
import HowItWorks from "./sections/HowItWorks"
import WhoIsFor from "./sections/WhoIsFor"
import Dominate from "./sections/Dominate"
import PricingScreen from "../pricing/page"
import Footer from "@/components/Footer"

const page = () => {
  useLenis()
  return (
    <div className="w-full relative bg-[#E2E1DC]">
      <Landing />
      <StackCards />
      <HowItWorks />
      <WhoIsFor />
      <Dominate />
      <PricingScreen />
    </div>
  )
}

export default page