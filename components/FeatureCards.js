"use client";
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FeatureCards = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const cardElements = cardRefs.current;

    // Set initial states for fade-up animation
    gsap.set(cardElements, { y: 50, opacity: 0 });

    // Fade-up animations for cards
    cardElements.forEach((card, index) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: index * 0.2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !cardRefs.current.includes(el)) {
      cardRefs.current.push(el);
    }
  };

  return (
<<<<<<< HEAD
    <div className="h-[40vh] w-[80%] mx-auto flex justify-between">
      {cardData.map((card, idx) => (
        <div
          key={card.title}
          ref={addToRefs}
          className="relative group"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="h-72 w-80 bg-gradient-to-r from-[#DD3305] via-[#FF8B3A] to-[#FFB347] absolute top-0 left-0 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"></div>
          <div className="h-[18.5vw] w-[25vw] rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10">
            <div className="relative z-10 flex flex-col items-start">
              <span
                className="relative inline-block w-[35px] h-[35px]"
                ref={el => addToIconRefs(el, idx)}
              >
                <span
                  className="absolute left-0 top-0 w-[35px] h-[35px] inline-block pointer-events-none z-[1]"
                  style={{ transition: "none" }}
                >
                  <Image
                    src={card.icon}
                    alt={`feature-card-${idx + 1}-default`}
                    width={35}
                    height={35}
                    priority
                    draggable={false}
                    className="w-[35px] h-[35px] block pointer-events-none select-none"
                  />
                </span>
                <span
                  className="absolute left-0 top-0 w-[35px] h-[35px] inline-block pointer-events-none z-[2]"
                  style={{ transition: "none" }}
                >
                  <Image
                    src={card.iconHover}
                    alt={`feature-card-${idx + 1}-hover`}
                    width={35}
                    height={35}
                    priority
                    draggable={false}
                    className="w-[35px] h-[35px] block pointer-events-none select-none"
                  />
                </span>
              </span>
              <h1 className={`text-white text-3xl font-bold pt-6 ${idx === 2 ? " w-[80%]" : "w-[80%]"}`}>
                {card.title}
              </h1>
            </div>
            <p className="text-white text-sm relative z-10">
              {card.desc}
            </p>
          </div>
=======
    <div className='h-[44vh] w-[80%] mx-auto flex justify-between'>
      <div ref={addToRefs} className='relative group'>
        <div className='h-80 w-96 bg-[#FF6B3A] absolute -top-8 -left-8 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
>>>>>>> baa2b3345fb5c479dc1f39d2d52457861aecbc67
        </div>
        <div className='h-[20vw] w-[25vw] rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10'>
          <div className='relative z-10'>
            <Image src="/sealCheck.svg" alt="feature-card-1" width={35} height={35} />
            <h1 className='text-white pt-6 text-3xl font-bold'>
              100M + Verified Creators
            </h1>
          </div>
          <p className='text-white text-sm relative z-10'>
            Ai-powered	discovery	systems	that	continuously	identify	new	creators.
          </p>
        </div>
      </div>
      <div ref={addToRefs} className='relative group'>
        <div className='h-80 w-96 bg-[#FF6B3A] absolute -top-8 -left-8 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        </div>
        <div className='h-[20vw] w-[25vw] rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10'>
          <div className='relative z-10'>
            <Image src="/userFocus.svg" alt="feature-card-1" width={35} height={35} />
            <h1 className='text-white text-3xl font-bold pt-6'>
              30+	Metrics	for	Creator	Vetting
            </h1>
          </div>
          <p className='text-white text-sm relative z-10'>
            Ai-powered	subcategorization	for	hyper-specific	targeting.
          </p>
        </div>
      </div>
      <div ref={addToRefs} className='relative group'>
        <div className='h-80 w-96 bg-[#FF6B3A] absolute -top-8 -left-8 blur-[7vw] z-0 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100'>
        </div>
        <div className='h-[20vw] w-[25vw] rounded-4xl cards-gradient p-5 flex flex-col gap-8 relative z-10'>
          <div className='relative z-10'>
            <Image src="/crossHair.svg" alt="feature-card-1" width={35} height={35} />
            <h1 className='text-white text-3xl font-bold pt-6 w-[80%]'>
              99% Match Accuracy
            </h1>
          </div>
          <p className='text-white text-sm relative z-10'>
            Ai-powered	creator	matching and	cutting-edge	fraud detection.
          </p>
        </div>
      </div>
    </div>
  )
}

export default FeatureCards