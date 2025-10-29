"use client";
import Image from "next/image"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
                    toggleActions: "play none none none"
                }
            });
        });

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 40%",
            end: "bottom 90%",
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
      <div className="flex flex-col items-center gap-4">
        <Image src="/assets/fyuze-dark.svg" alt="Fyuze Logo" width={150} height={10} className="w-24 h-24 sm:w-32 sm:h-32 md:w-[150px] md:h-[50px]" />
        <p className="text-black tracking-tighter text-lg">Welcome to the future of influence</p>
      </div>
      <div className="font-archivo flex items-center flex-col pt-20 sm:pt-32 md:pt-40 px-4">
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">Fyuze	is	the	world&apos;s</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">Fyuze	is	the	world&apos;s</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">first	truly	AI-powered</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">first	truly	AI-powered</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">influencer	marketing</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">influencer	marketing</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">platform,	that	 scans</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">platform,	that	 scans</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">the	entire	social</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">the	entire	social</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">universe	in	real	time</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">universe	in	real	time</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">and	finds you the</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">and	finds you the</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">perfect	influencers	</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">perfect	influencers	</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">and content creators</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">and content creators</span>
                    </h1>
                    <h1 ref={addToRefs} className="relative text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-archivo w-full max-w-[620px] text-[#aaa] h-[25px] sm:h-[35px] md:h-[40px] lg:h-[45px] mb-2 sm:mb-3 md:mb-4">
                        <span className="absolute whitespace-nowrap top-0 w-full overflow-hidden left-0">to work with.</span>
                        <span className="absolute whitespace-nowrap top-0 text-black w-[37%] overflow-hidden left-0">to work with.</span>
                    </h1>
      </div>
    </div>
  )
}

export default Landing