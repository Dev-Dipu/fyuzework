"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

/* ----------------- Testimonial Data ----------------- */
const testimonials = [
  {
    quote: "What used to take us weeks, now takes an hour with fyuze",
    avatar: "/Avatar.png",
    name: "Candice Wu",
    title: "Product manager, Sisyphus"
  },
  {
    quote: "Fyuze has completely transformed how we discover and connect with creators",
    avatar: "/Avatar.png",
    name: "John Smith",
    title: "Marketing Director, TechCorp"
  },
  {
    quote: "The AI-powered matching is incredibly accurate. We've seen 3x better ROI",
    avatar: "/Avatar.png",
    name: "Sarah Johnson",
    title: "Brand Manager, StyleHub"
  },
  {
    quote: "Finding the right influencers has never been this easy and efficient",
    avatar: "/Avatar.png",
    name: "Michael Chen",
    title: "CEO, GrowthLabs"
  },
  {
    quote: "Game-changing platform for influencer marketing. Highly recommend!",
    avatar: "/Avatar.png",
    name: "Emily Davis",
    title: "Head of Marketing, FashionForward"
  },
  {
    quote: "The best investment we've made in our marketing stack this year",
    avatar: "/Avatar.png",
    name: "David Wilson",
    title: "CMO, InnovateCo"
  }
];

/* ----------------- Testimonial Card Component ----------------- */
function TestimonialCard({ quote, avatar, name, title, isCentered }) {
  return (
    <div
      className={`flex-shrink-0 h-[45vh] w-80 bg-[#fff] border-[1px] border-gray-300 rounded-4xl flex flex-col relative items-center py-8 transition-all duration-200`}>
      <img src="/Quote.svg" alt="quote" width="40" height="40" />
      <h1 className="inter text-xl pt-4 font-medium text-center px-6">{quote}</h1>
      <img src="/StarGroup.svg" alt="stars" width="150" height="150" className="mx-auto relative left-4 py-10" />
      <img src={avatar} alt="avatar" width="50" height="50" className="mx-auto relative" />
      <h1 className="text-xl font-medium pt-6">{name}</h1>
      <h1 className="text-sm font-medium opacity-60">{title}</h1>
    </div>
  );
}

/* ----------------- Main Component ----------------- */
export default function TestimonialCardsSlider() {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const scrollRef = useRef({ current: 0, target: 0, extra: 0 });
  const rafRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollPositionRef = useRef(0);
  const wheelTimeoutRef = useRef(null);
  const dragCircleControls = useAnimation();

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 15, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 15, mass: 0.2 });

  const allCards = [...testimonials, ...testimonials, ...testimonials];
  
  const [cardWidth, setCardWidth] = useState(340);
  const [centerCardIndex, setCenterCardIndex] = useState(12);
  const totalWidth = cardWidth * testimonials.length;

  // Measure actual card width on mount
  useEffect(() => {
    const measureCardWidth = () => {
      if (cardsContainerRef.current) {
        const firstCard = cardsContainerRef.current.querySelector('div');
        if (firstCard) {
          const rect = firstCard.getBoundingClientRect();
          const gap = 20;
          setCardWidth(rect.width + gap);
        }
      }
    };

    measureCardWidth();
    window.addEventListener('resize', measureCardWidth);
    return () => window.removeEventListener('resize', measureCardWidth);
  }, []);

  // Smooth scroll animation
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    
    const animate = () => {
      scrollRef.current.current = lerp(
        scrollRef.current.current,
        scrollRef.current.target,
        0.05
      );
      
      const scroll = scrollRef.current.current + scrollRef.current.extra;
      
      if (scroll > totalWidth) {
        scrollRef.current.extra -= totalWidth;
      } else if (scroll < 0) {
        scrollRef.current.extra += totalWidth;
      }
      
      // Calculate center card index - viewport ka center find karo
      if (containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerCenter = containerRect.width / 2;
        
        // Current scroll position
        const currentScroll = scrollRef.current.current + scrollRef.current.extra;
        
        // Calculate which card is at center
        const cardAtCenter = Math.round((currentScroll + containerCenter - (containerRect.width / 2)) / cardWidth);
        setCenterCardIndex(cardAtCenter);
      }
      
      if (cardsContainerRef.current) {
        cardsContainerRef.current.style.transform = `translateX(${-(scrollRef.current.current + scrollRef.current.extra)}px)`;
        cardsContainerRef.current.style.transition = 'none';
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [totalWidth, cardWidth]);

  const onCheck = () => {
    const snapWidth = cardWidth;
    const cardIndex = Math.round(scrollRef.current.target / snapWidth);
    scrollRef.current.target = snapWidth * cardIndex;
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDownRef.current = true;
    startXRef.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    scrollPositionRef.current = scrollRef.current.current;
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const distance = (startXRef.current - x) * 1.5;
    scrollRef.current.target = scrollPositionRef.current + distance;
  };

  const handleMouseUp = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    onCheck();
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY || e.wheelDelta || e.detail;
    scrollRef.current.target += (delta > 0 ? 2 : -2) * 0.3;
    
    if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    wheelTimeoutRef.current = setTimeout(onCheck, 200);
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
      if (wheelTimeoutRef.current) clearTimeout(wheelTimeoutRef.current);
    };
  }, [cardWidth]);

  const handleMouseEnter = () => {
    dragCircleControls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    });
  };

  const handleMouseLeave = () => {
    dragCircleControls.start({
      opacity: 0,
      scale: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    });
    
    if (isDownRef.current) {
      handleMouseUp();
    }
  };

  const handleMouseMoveForCircle = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-[#E2E1DC] relative">
      <h1 className="text-6xl font-bold font-archivo pt-32 text-center">
        What our clients say
      </h1>
      <div className="relative w-full h-[80vh] overflow-hidden">
        <div
          ref={containerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onMouseMove={handleMouseMoveForCircle}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMoveCapture={handleMouseMove}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
          className="w-full h-full flex z-20 relative items-center justify-center cursor-grab select-none"
          style={{ touchAction: 'none' }}
        >
          <div
            ref={cardsContainerRef}
            style={{ 
              willChange: 'transform'
            }}
            className="flex gap-5 pl-72"
          >
            {allCards.map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.name}-${index}`}
                quote={testimonial.quote}
                avatar={testimonial.avatar}
                name={testimonial.name}
                title={testimonial.title}
                isCentered={index === centerCardIndex}
              />
            ))}
          </div>
        </div>
        <div className="pointer-events-none absolute z-30 left-0 top-0 h-full w-[40vw] bg-[linear-gradient(to_right,_#E2E1DC_30%,_rgba(226,225,220,0)_100%)]"></div>
        <div className="pointer-events-none absolute z-30 right-0 top-0 h-full w-[40vw] bg-[linear-gradient(to_left,_#E2E1DC_30%,_rgba(226,225,220,0)_100%)]"></div>
        <div className="absolute z-10 top-1/2 left-[48%] -translate-1/2 bg-gradient-to-r from-[#DD3305] via-[#FF8B3A] to-[#FFB347] blur-3xl h-[40vh] w-[25vh]"></div>
      </div>
      <div className="flex-between absolute w-full p-10 top-[86vh] z-100">
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
                    priority
                  />
                </div>
      
                <div className="flex-center flex-col gap-1">
                  <div className="w-[0.5px] h-[20px] relative bg-gray-500 line1"></div>
                  <p className="text-xs text-center font-medium font-archivo leading-[100%] uppercase text-gray-500">
                    Scroll to explore
                  </p>
                  <div className="w-[0.5px] h-[5px] relative bg-gray-500 line2"></div>
                </div>
      </div>
      </div>
    </>
  );
}