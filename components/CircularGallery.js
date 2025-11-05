"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useMotionValue, useSpring } from "framer-motion";

/* ----------------- Data Array ----------------- */
const defaultFeatures = [
  {
    icon: "/CubeFocus.svg", 
    title: "AI Visual Detection",
    desc: "Our advanced AI-powered algorithm identifies products visually in content videos, even when not explicitly mentioned."
  },
  {
    icon: "/Barcode.svg", 
    title: "AI Voice Recognition",
    desc: "Our advanced AI-powered algorithm detects precise product mentions and brand names in creator content with 99% accuracy."
  },
  {
    icon: "/Microscope.svg", 
    title: "Micro-Niche Targeting",
    desc: "Filter by ultra-specific categories like 'vegan keto fitness coaches' or 'sustainable luxury travel'."
  },
  {
    icon: "/MathOperations.svg", 
    title: "Engagement Quality Score",
    desc: "Our proprietary algorithm measures genuine engagement vs fake followers and comments."
  },
  {
    icon: "/userFocus.svg", 
    title: "Audience Overlap Finder",
    desc: "Identify creators whose audiences match your ideal customer profile."
  },
  {
    icon: "/MagnifyingGlass.svg",
    title: "Competitor Analysis",
    desc: "Our advanced AI-powered algorithm finds creators who promote competing products in your specific niche, by detecting specific product mentions, brand names, and visual appearances."
  }
];

const slideTexts = [
  {
    heading: "Find Creators Who Promote Products Like Yours",
    paragraph: "Our AI-powered platform analyzes hundreds of millions of online videos in order to match your brand with influencers and content creators who already promote products similar to yours."
  },
  {
    heading: "Find the Perfect Influencers with Hyper-Specific Targeting",
    paragraph: "Discover exactly the right creators using our proprietary filtering system with 120K+ micro-categories that go far beyond standard influencer platforms."
  },
];

/* ----------------- Card Component ----------------- */
function Card({ icon, title, desc, index }) {
  const offsetY = (index % 2 === 0) ? -30 : 30;
  
  return (
    <div
      style={{ transform: `translateY(${offsetY}px)` }}
      className="flex-shrink-0 w-[16vw] h-[42vh] custom-cardison rounded-3xl border-2 border-[#D1CDC4] p-5 flex flex-col justify-between transition-all duration-300"
    >
      {/* Icon at top */}
      <div className="flex items-start">
        <div className="w-7 h-7 flex items-center justify-center">
          {icon && (
            <img 
              src={icon} 
              alt={title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          )}
        </div>
      </div>
      
      {/* Text content at bottom */}
      <div className="space-y-3">
        <h3 className="text-base font-bold font-['Archivo',Arial] leading-tight">
          {title}
        </h3>
        <p className="text-[11px] leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}

/* ----------------- Main Component ----------------- */
export default function CircularGallery2D({
  items = null,
  headingRef,
  paraRef
}) {
  const containerRef = useRef(null);
  const cardsContainerRef = useRef(null);
  const scrollRef = useRef({ current: 0, target: 0, extra: 0 });
  const [currentSlide, setCurrentSlide] = useState(0);
  const dragCircleControls = useAnimation();
  const rafRef = useRef(null);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollPositionRef = useRef(0);
  const wheelTimeoutRef = useRef(null);

  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 120, damping: 15, mass: 0.2 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 15, mass: 0.2 });

  const feed = items && items.length ? items : defaultFeatures;
  const allCards = [...feed, ...feed, ...feed]; // Triple for better infinite scroll
  
  // Calculate card width dynamically based on actual rendered size
  const [cardWidth, setCardWidth] = useState(290); // w-68 = 272px + gap
  const totalWidth = cardWidth * feed.length;

  // Measure actual card width on mount
  useEffect(() => {
    const measureCardWidth = () => {
      if (cardsContainerRef.current) {
        const firstCard = cardsContainerRef.current.querySelector('div');
        if (firstCard) {
          const rect = firstCard.getBoundingClientRect();
          const gap = 20; // gap-5 = 20px
          setCardWidth(rect.width + gap);
        }
      }
    };

    measureCardWidth();
    window.addEventListener('resize', measureCardWidth);
    return () => window.removeEventListener('resize', measureCardWidth);
  }, []);

  // Smooth scroll animation with infinite wrapping
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    
    const animate = () => {
      scrollRef.current.current = lerp(
        scrollRef.current.current,
        scrollRef.current.target,
        0.05
      );
      
      // Infinite scroll logic
      const scroll = scrollRef.current.current + scrollRef.current.extra;
      
      // Wrap around when scrolling too far in either direction
      if (scroll > totalWidth) {
        scrollRef.current.extra -= totalWidth;
      } else if (scroll < 0) {
        scrollRef.current.extra += totalWidth;
      }
      
      if (cardsContainerRef.current) {
        cardsContainerRef.current.style.transform = `translateX(${-(scrollRef.current.current + scrollRef.current.extra)}px)`;
      }
      
      rafRef.current = requestAnimationFrame(animate);
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [totalWidth]);

  // Update heading/paragraph based on scroll position
  useEffect(() => {
    if (headingRef?.current && paraRef?.current) {
      const groupSize = 3;
      const snapWidth = cardWidth * groupSize;
      const groupIndex = Math.round(Math.abs(scrollRef.current.target) / snapWidth);
      const slideIndex = groupIndex % slideTexts.length;
      
      headingRef.current.textContent = slideTexts[slideIndex].heading;
      paraRef.current.textContent = slideTexts[slideIndex].paragraph;
    }
  }, [currentSlide, headingRef, paraRef, cardWidth]);

  const onCheck = () => {
    const groupSize = 3;
    const snapWidth = cardWidth * groupSize;
    const groupIndex = Math.round(scrollRef.current.target / snapWidth);
    scrollRef.current.target = snapWidth * groupIndex;
    setCurrentSlide(Math.abs(groupIndex));
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    isDownRef.current = true;
    startXRef.current = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    scrollPositionRef.current = scrollRef.current.current;
  
  };

  const handleMouseMove = (e) => {
    if (!isDownRef.current) return;
    e.preventDefault();
    
    const x = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const distance = (startXRef.current - x) * 1.5; // scroll speed multiplier
    scrollRef.current.target = scrollPositionRef.current + distance;
  };

  const handleMouseUp = () => {
    if (!isDownRef.current) return;
    isDownRef.current = false;
    onCheck();
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY || e.wheelDelta || e.detail;
    scrollRef.current.target += (delta > 0 ? 2 : -2) * 0.3;
    
    // Debounced snap
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
    <div className="relative w-full h-full overflow-hidden">
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
        className="w-full h-full flex items-center cursor-pointer justify-center select-none"
        style={{ touchAction: 'none' }}
      >
        <div
          ref={cardsContainerRef}
          style={{ 
            willChange: 'transform'
          }}
          className="flex gap-5 pr-[18vw]"
        >
          {allCards.map((card, index) => (
            <Card
              key={`${card.title}-${index}`}
              icon={card.icon}
              title={card.title}
              desc={card.desc}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Animated Drag Circle */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={dragCircleControls}
        initial={{ opacity: 0, scale: 0 }}
        className="h-20 w-20 rounded-full absolute top-0 left-0 pointer-events-none bg-white flex items-center justify-center shadow-lg z-10"
      >
        <h1 className="text-sm font-semibold select-none">Drag</h1>
      </motion.div>
    </div>
  );
}