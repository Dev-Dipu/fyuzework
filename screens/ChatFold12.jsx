"use client" // ⭐ Added the "use client" directive

import { useEffect, useRef } from 'react'
import CircularGalleryWithCards from '@/components/CircularGallery'
import React from 'react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText) // ⭐ Registered GSAP plugins

const ChatFold12 = () => {
  // ⭐ Added Refs for the elements and the container
  const headingRef = useRef(null)
  const paraRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    // ⭐ Animation logic from ChatFold11
    if (!headingRef.current || !paraRef.current || !containerRef.current) return;

    // Split heading into words
    const splitHeading = new SplitText(headingRef.current, { type: "words" })
    // Split paragraph into lines
    const splitPara = new SplitText(paraRef.current, { type: "lines" })

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%", // Adjusted start for better visibility
        end: "bottom center", // Added an end point
        scrub: true,
        // Uncomment below for debugging
        // markers: true 
      }
    })

    // Animate heading words
    tl.from(splitHeading.words, {
      y: 25,
      opacity: 0,
      stagger: 0.05,
      duration: 0.6,
      ease: "power3.out"
    }, "a")

    // Animate paragraph lines
    tl.from(splitPara.lines, {
      y: 15,
      opacity: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out"
    }, "a-=0.4") // Start animation slightly after the heading

    // Cleanup function
    return () => {
        if (splitHeading) splitHeading.revert();
        if (splitPara) splitPara.revert();
        if (tl) tl.scrollTrigger().kill();
    }
    
  }, [])


  return (
    <div ref={containerRef} className='h-screen flex flex-col justify-center items-center'>
      <div className='flex justify-center gap-20'>
        <h1 ref={headingRef} className='text-5xl w-[28%] font-archivo font-semibold'>
          Find Creators Who Promote Products Like Yours
        </h1>
        <p ref={paraRef} className='text-sm w-[25%] font-inter font-normal'>
          Our Ai-powered platform analyzes hundreds of millions of online videos in order to match your brand with influencers and content creators who already promote products similar to yours.
        </p>
      </div>
      <div className='h-1/2 w-3/5 overflow-hidden'>
        {/* Note: CircularGalleryWithCards is assumed to be a Client Component */}
        <CircularGalleryWithCards bend={0} textColor="#ffffff" borderRadius={0.05} scrollEase={0.02}/>
      </div>
    </div>
  )
}

export default ChatFold12