"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import SparkleSvg from "./SparkleSvg";
import LiquidEther from "./LiquidEther";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function HeroComponent() {
  const homeContainer = useRef();
  const scrollBtn = useRef();
  const homeContRef = useRef();

  useGSAP(() => {
    // Scroll indicator animation
    const tl1 = gsap.timeline({
      repeat: -1,
      yoyo: true,
      repeatDelay: 0.5,
    });

    tl1
      .fromTo(
        ".line1",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power2.out" }
      )
      .fromTo(
        ".line2",
        { clipPath: "inset(0 0 100% 0)" },
        { clipPath: "inset(0 0 0% 0)", duration: 0.5, ease: "power2.out" }
      )
      .from(".text", { opacity: 0, duration: 1 }, "-=1");

    // Smooth zoom-out on scroll
    gsap.to(homeContRef.current, {
      scaleX: 0.95,
      scaleY: 0.75,
      borderRadius: 56,
      transformOrigin: "50% 50%",
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: homeContainer.current,
        start: "bottom bottom",
        end: "bottom top",
        scrub: 2,
      },
    });

    // ✅ Bottom text (Terms & Privacy) slide-up animation
    gsap.from(".bottom-links", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      delay: 0.8,
      stagger: 0.15,
    });

    // Slight fade-in for hero text & input
    gsap.from(".hero-fade", {
      opacity: 0,
      y: 20,
      duration: 1.5,
      ease: "power3.out",
      stagger: 0.15,
      delay: 0.6,
    });
  }, []);

  return (
    <div
      className="font-sans h-screen w-full relative text-white flex-center"
      ref={homeContainer}
      style={{ willChange: "opacity" }}
    >
      <div
        className="w-full h-full home-cont overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black z-100"
        ref={homeContRef}
        style={{ willChange: "transform, border-radius" }}
      >
        {/* Background liquid animation */}
        <div className="absolute top-0 left-0 w-full h-full z-10">
          <div className="absolute top-0 left-0 w-full h-full opacity-60 pointer-events-none"></div>
          <LiquidEther />
        </div>

        <div className="absolute w-full h-full flex-center z-100 left-0 top-0 pointer-events-none">
          <div className="relative flex-center flex-col w-1/2">
            <div className="relative w-full flex-center flex-col gap-12">
              {/* Heading & Paragraph */}
              <div className="flex-center flex-col gap-6 relative">
                <h1 className="font-archivo text-[1.8vw] leading-[1.5vw] font-bold hero-fade">
                  Ask Fyuze to find your next Influencer
                </h1>
                <p className="text-sm font-[300] leading-[110%] w-[58%] mx-auto text-center hero-fade">
                  AI-powered influencer discovery that filters by niche,
                  authenticity & ROI so you spend less time searching and more
                  time growing.
                </p>
              </div>

              {/* Input */}
              <div className="relative w-full h-full pointer-events-auto hero-fade">
                <input
                  type="text"
                  className="w-full h-full absolute z-90 outline-none text-white placeholder:text-white pl-20 pr-36"
                />
                <div className="relative w-full flex-between p-5 h-full input-gradient rounded-[28px] backdrop-blur-[120px] z-80">
                  <SparkleSvg />
                  <div className="flex-center relative gap-3">
                    <div className="relative flex-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/assets/clip.svg"
                          alt="logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                    <div className="relative flex-center p-3 rounded-2xl icon-gradient cursor-pointer hover:scale-105 transition">
                      <div className="relative w-5 h-5">
                        <Image
                          src="/assets/arrow.svg"
                          alt="logo"
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full absolute top-0 left-0 overflow-hidden custom-border h-full z-90 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* ✅ Bottom Section (animated up) */}
          <div className="absolute bottom-8 flex justify-start items-start w-full pl-10 pointer-events-auto">
            <div className="flex-between gap-10 relative">
              <Link
                href="/"
                className="text-sm font-[300] leading-[100%] uppercase hover:underline bottom-links"
              >
                terms
              </Link>
              <div className="relative w-[2px] h-[2px] rounded-full bg-white bottom-links"></div>
              <Link
                href="/"
                className="text-sm font-[300] leading-[100%] uppercase hover:underline bottom-links"
              >
                privacy policy
              </Link>
            </div>
          </div>

          {/* Scroll to explore animation */}
          <div
            className="absolute bottom-8 flex-center flex-col gap-1 pointer-events-none"
            ref={scrollBtn}
          >
            <div className="w-[0.6px] h-[20px] relative bg-white line1"></div>
            <p className="text-xs text-center font-medium font-archivo leading-[100%] uppercase text">
              Scroll to explore
            </p>
            <div className="w-[0.6px] h-[5px] relative bg-white line2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
