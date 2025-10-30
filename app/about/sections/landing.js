"use client";
import Image from "next/image"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const Landing = () => {
    gsap.registerPlugin(ScrollTrigger);

    const containerRef = useRef(null);
    const h1Refs = useRef([]);
    const paragraphRef = useRef(null);

    useEffect(() => {
        const h1Elements = h1Refs.current;
        const totalElements = h1Elements.length;

        // Set initial states
        h1Elements.forEach((h1) => {
            gsap.set(h1, { y: 100, opacity: 0 });
            const blackSpan = h1.querySelector('.text-black');
            if (blackSpan) {
                gsap.set(blackSpan, { width: '0%' });
            }
        });

        // Slide up animation for each line
        h1Elements.forEach((h1, index) => {
            gsap.to(h1, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                delay: index * 0.15,
                ease: "power2.out",
                force3D: true,
                willChange: "transform, opacity",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 40%",
                    end: "top -40%",
                    scrub: true,
                }
            });
        });

        gsap.to(".scrollElem", {
            opacity: 0,
            ease: "power2.out",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 40%",
                end: "top 35%",
                scrub: true
            }
        })

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 40%",
            end: "top -40%",
            duration: 10,
            scrub: true,
            ease: "expo.inOut",
            onUpdate: (self) => {
                const totalProgress = self.progress;
                const progressPerElement = 1 / totalElements;

                h1Elements.forEach((h1, index) => {
                    const blackSpan = h1.querySelector(".text-black");
                    if (blackSpan) {
                        const elementStartProgress = index * progressPerElement;
                        const elementEndProgress = (index + 1) * progressPerElement;
                        let elementProgress = 0;
                        if (totalProgress >= elementStartProgress) {
                            if (totalProgress <= elementEndProgress) {
                                elementProgress =
                                    (totalProgress - elementStartProgress) / progressPerElement;
                            } else {
                                elementProgress = 1;
                            }
                        }
                        gsap.to(blackSpan, {
                            width: `${elementProgress * 100}%`,
                            duration: 0.1,
                            ease: "none",
                            force3D: true,
                            willChange: "width"
                        });
                    }
                });
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, []);

    const addToRefs = (el) => {
        if (el && !h1Refs.current.includes(el)) {
            h1Refs.current.push(el);
        }
    };

  return (
    <div className="min-h-[180vh] w-full relative top-[45vh]" ref={containerRef}>
        <div className="absolute scrollElem top-[45vh] left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
            <div className="w-[0.5px] h-[20px] relative bg-gray-500 line1"></div>
            <p className="text-[10px] sm:text-[11px] md:text-xs text-center font-medium font-archivo leading-[100%] uppercase text-gray-500">
                Scroll
            </p>
        </div>
      <div className="flex flex-col items-center gap-3 sm:gap-3 md:gap-4">
        <Image src="/assets/fyuze-dark.svg" alt="Fyuze Logo" width={150} height={10} className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-[150px] lg:h-[50px]" />
        <p className="text-black tracking-tighter text-sm sm:text-base md:text-base lg:text-lg">Welcome to the future of influence</p>
      </div>
      <div className="font-archivo flex items-center flex-col pt-16 sm:pt-20 md:pt-24 lg:pt-32 px-4">
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">Fyuze	is	the	world&apos;s</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">Fyuze	is	the	world&apos;s</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">first	truly	AI-powered</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">first	truly	AI-powered</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">influencer	marketing</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">influencer	marketing</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">platform,	that	 scans</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">platform,	that	 scans</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">the	entire	social</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">the	entire	social</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">universe	in	real	time</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">universe	in	real	time</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">and	finds you the</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">and	finds you the</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">perfect	influencers	</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">perfect	influencers	</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">and content creators</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">and content creators</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-archivo w-full max-w-[360px] text-[#aaa] h-[22px] sm:h-[26px] md:h-[32px] lg:h-[38px] mb-1.5 sm:mb-2 md:mb-2.5 lg:mb-3">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">to work with.</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">to work with.</span>
                    </h1>
      </div>
    </div>
  )
}

export default Landing