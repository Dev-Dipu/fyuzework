"use client";
import { useEffect, useRef } from 'react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

const Dominate = () => {
  
  gsap.registerPlugin(ScrollTrigger, SplitText);
  const headingRef = useRef(null);
  useEffect(() => {
    const heading = headingRef.current;

    // Split text into words
    const split = new SplitText(heading, { 
      type: "words",
      wordsClass: "word-wrapper",
      mask: "chars"
    });

    const words = split.words;

    // Set initial state for all words
    gsap.set(words, { 
      y: 100, 
      opacity: 0,
      display: "inline-block"
    });

    // Animate words on scroll
    ScrollTrigger.create({
      trigger: heading,
      start: "top 80%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.05,
          ease: "power2.out",
          force3D: true,
          willChange: "transform, opacity"
        });
      }
    });

    return () => {
      split.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className='h-fit pb-28 w-full relative font-archivo'>
      <h1 
        ref={headingRef}
        className='text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-bold leading-tight text-center pt-24 sm:pt-28 md:pt-32 lg:pt-40 px-4 sm:px-6 md:px-10 lg:px-16'>
        No matter your size, Fyuze.ai gives you <br /> the tools to dominate influencer <br /> marketing.
      </h1>
    </div>
  )
}

export default Dominate