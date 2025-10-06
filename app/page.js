"use client";
import AboutComponent from "@/components/AboutComponent";
import HeroComponent from "@/components/HeroComponent";
import useLenis from "@/lib/hooks/useLenis";
import SocialPlatformsComponent from "@/components/SocialPlatformsComponent";
import FAQsection from "@/components/FAQsection";
import FeaturesComponent from "@/components/FeaturesComponent";
import FeatureCards from "@/components/FeatureCards";
import LogoLoop from "@/components/LogoLoop";
import ChatFold11 from "@/screens/ChatFold11";
import ChatFold12 from "@/screens/ChatFold12";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const imageLogos = [
    { src: "/layers.svg", alt: "Company 1", href: "https://company1.com" },
    { src: "/sysphus.svg", alt: "Company 2", href: "https://company2.com" },
    {
      src: "/circooles.svg",
      alt: "Company 3",
      href: "https://company3.com",
    },
    { src: "/catelog.svg", alt: "Company 1", href: "https://company1.com" },
    {
      src: "/kosent.svg",
      alt: "Company 5",
      href: "https://company5.com",
    },
    { src: "/layers.svg", alt: "Company 1", href: "https://company1.com" },
  ];

  return (
    <>
      <div className="section bg-beige-800" data-text="light">
        <HeroComponent />
      </div>

      <div
        className="section relative w-full z-50 bg-[#E2E1DC]"
        data-text="dark"
      >
        <div className="flex-between w-full p-10 sticky top-[86vh] z-100">
          <div className="relative group">
            <button
              className="fill-button relative overflow-hidden"
              type="button"
            >
              <span className="block transition-transform duration-300 ease-in-out group-hover:-translate-y-20">
                Find Your Next Influencer
              </span>
              <span className="block absolute top-2 left-0 w-full translate-y-16 transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                Find Your Next Influencer
              </span>
            </button>
            <Image
              width={120}
              height={110}
              alt="bgoverlay"
              src={"/assets/bgoverlaygrad.svg"}
              className="object-contain absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-0 opacity-0 group-hover:scale-200 group-hover:opacity-100 transition-all ease-in duration-200 pointer-events-none"
            />
          </div>
          <div className="flex-center flex-col gap-1">
            <div className="w-[0.5px] h-[20px] relative bg-gray-500 line1"></div>
            <p className="text-xs text-center font-medium font-archivo leading-[100%] uppercase text text-gray-500">
              Scroll to explore
            </p>
            <div className="w-[0.5px] h-[5px] relative bg-gray-500 line2"></div>
          </div>
        </div>
        <div className="h-[800vh] bg-beige-800">
          <AboutComponent />
        </div>
        <div className="bg-[#E2E1DC] h-[220vh]">
          <FeaturesComponent />
          <FeatureCards />
          <div className="h-[40vh] flex-center">
            <LogoLoop
              logos={imageLogos}
              speed={120}
              direction="left"
              logoHeight={28}
              gap={40}
              pauseOnHover
              scaleOnHover
              fadeOut
              fadeOutColor="#ffffff"
              ariaLabel="Technology partners"
            />
          </div>
        </div>
        <div>
          <SocialPlatformsComponent />
        </div>
        <div>
          <ChatFold11 />
        </div>
        <div>
          <ChatFold12 />
        </div>
      </div>

      <div className="section bg-beige-800" data-text="light">
        <FAQsection />
      </div>
    </>
  );
}
