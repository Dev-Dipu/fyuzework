"use client";
import AboutComponent from "@/components/AboutComponent";
import HeroComponent from "@/components/HeroComponent";
import useLenis from "@/lib/hooks/useLenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useContext } from "react";
import { ThemeContext } from "@/lib/hooks/ThemeContext";
import SocialPlatformsComponent from "@/components/SocialPlatformsComponent";
import FAQsection from "@/components/FAQsection";
import SplashCursor from "@/components/SplashCursor";
import CanvasSimulation from "@/components/CanvasSimulation";
import LiquidEther2 from "@/components/LiquidEther";
import Image from "next/image";
import GlassSurface from "@/components/GlassSurface";
import FeaturesComponent from "@/components/FeaturesComponent";
import FeatureCards from "@/components/FeatureCards";
import LogoLoop from "@/components/LogoLoop";
import ChatFold11 from "@/screens/ChatFold11";
import ChatFold12 from "@/screens/ChatFold12";

export default function Home() {
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

    const { setDarkText } = useContext(ThemeContext);
    useLenis();

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            
            
            const documentHeight = document.documentElement.scrollHeight;
            const lastSectionStart = documentHeight - (windowHeight * 2);
            
            if (scrollY < windowHeight) {
                setDarkText(false);
            } else if (scrollY >= windowHeight && scrollY < lastSectionStart) {
                setDarkText(true);
            } else {
                setDarkText(false);
            }
        };
        
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [setDarkText]);

    return (
        <>
            <div className="section bg-beige-800" data-text="light">
                <HeroComponent />
            </div>
            
            <div className="section relative w-full z-50 bg-[#E2E1DC]" data-text="dark">
                <div className="flex-between w-full px-10 sticky top-[92vh] z-100">
                    <div className="rounded-full px-8 py-[10px] text-xs leading-[100%] left-10 border-gray-500 border font-medium text-gray-500">
                        FIND YOUR NEXT INFLUENCER
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
            
            <div className="section" data-text="light">
                <FAQsection />
            </div>
        </>
    );
}
