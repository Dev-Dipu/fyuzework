"use client";
import { useEffect, useRef, useState } from "react";
import Swiper from 'swiper';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
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
function TestimonialCard({ quote, avatar, name, title, isActive }) {
  return (
    <div 
      className="testimonial-card flex-shrink-0 bg-[#fff] border-[1px] border-gray-300 rounded-[2rem] flex flex-col relative items-center justify-center py-8 transition-all duration-500"
      style={{
        height: isActive ? '52vh' : '45vh',
        width: isActive ? '360px' : '320px',
      }}
    >
       <Image src="/Quote.svg" alt="avatar" width={30} height={30} className="" />
      <h1 className="text-xl pt-4 font-medium text-center px-6" style={{fontFamily: 'Inter, sans-serif'}}>{quote}</h1>
      <div className="mx-auto relative left-4 py-10 flex gap-1">
          <Image src="/StarGroup.svg" alt="avatar" width={120} height={120} className="-ml-2 border-[2px] border-white rounded-full" />
      </div>
      <Image src="/Avatar.png" alt="avatar" width={60} height={60} />
      <h1 className="text-xl font-medium pt-6">{name}</h1>
      <h1 className="text-sm font-medium opacity-60">{title}</h1>
    </div>
  );
}

/* ----------------- Main Component ----------------- */
export default function TestimonialCardsSlider() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(testimonials.length);
  
  // Triple the testimonials for smooth infinite loop
  const allCards = [...testimonials, ...testimonials, ...testimonials];

  useEffect(() => {
    const swiper = new Swiper('.swiper', {
      modules: [Mousewheel],
      slidesPerView: 'auto',
      spaceBetween: 10,
      centeredSlides: true,
      initialSlide: testimonials.length, // Start at middle set
      speed: 800,
      grabCursor: true,
      mousewheel: {
        forceToAxis: true,
        sensitivity: 0.2,
      },
      slideToClickedSlide: true,
      resistanceRatio: 0,
      
      // Manual loop implementation
      on: {
        init: function() {
          setActiveIndex(this.activeIndex);
          updateScale(this);
        },
        slideChange: function() {
          const swiper = this;
          setActiveIndex(swiper.activeIndex);
          updateScale(swiper);
        },
        slideChangeTransitionEnd: function() {
          const swiper = this;
          const totalSlides = allCards.length;
          const oneSetLength = testimonials.length;
          
          // If we're at the end of the last set, jump to middle set
          if (swiper.activeIndex >= totalSlides - 3) {
            const targetIndex = oneSetLength + (swiper.activeIndex % oneSetLength);
            swiper.slideTo(targetIndex, 0, false);
            setActiveIndex(targetIndex);
          }
          // If we're at the start of the first set, jump to middle set
          else if (swiper.activeIndex <= 2) {
            const targetIndex = oneSetLength + (swiper.activeIndex % oneSetLength);
            swiper.slideTo(targetIndex, 0, false);
            setActiveIndex(targetIndex);
          }
        },
        progress: function() {
          updateScale(this);
        }
      }
    });

    swiperRef.current = swiper;

    return () => {
      if (swiper) swiper.destroy();
    };
  }, []);

  const updateScale = (swiper) => {
    swiper.slides.forEach((slide, index) => {
      const card = slide.querySelector('.testimonial-card');
      if (!card) return;
      
      const slideProgress = swiper.slides[index].progress;
      const absProgress = Math.abs(slideProgress);
      
      // Center card = scale 1.1, side cards = scale 0.85
      let scale = 1.1 - (absProgress * 0.25);
      scale = Math.max(0.85, Math.min(1.1, scale));
      
      // Add opacity effect
      let opacity = 1 - (absProgress * 0.4);
      opacity = Math.max(0.6, Math.min(1, opacity));
      
      card.style.transform = `scale(${scale})`;
      card.style.opacity = opacity;
    });
  };

  return (
    <>
      <style>{`
        .swiper {
          width: 100%;
          height: 100%;
          padding-left: 0 !important;
        }
        .swiper-slide {
          width: 380px !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-wrapper {
          align-items: center;
        }
      `}</style>
      
      <div className="h-fit w-full bg-[#E2E1DC] relative">
        <h1 className="text-6xl font-bold absolute left-1/2 -translate-1/2 text-center" style={{fontFamily: 'Archivo, sans-serif'}}>
          What our clients say
        </h1>
        <div className="relative w-full h-[80vh] overflow-hidden">
          <div className="absolute z-0 top-1/2 left-[50%] -translate-1/2 bg-gradient-to-r from-[#DD3305] via-[#FF8B3A] to-[#FFB347] blur-3xl h-[40vh] w-[25vh]"></div>
          <div className="swiper w-full h-full flex z-10 relative items-center justify-center select-none">
            <div className="swiper-wrapper">
              {allCards.map((testimonial, index) => (
                <div key={`${testimonial.name}-${index}`} className="swiper-slide">
                  <TestimonialCard
                    quote={testimonial.quote}
                    avatar={testimonial.avatar}
                    name={testimonial.name}
                    title={testimonial.title}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute z-20 left-0 top-0 h-full w-[40vw] bg-[linear-gradient(to_right,_#E2E1DC_30%,_rgba(226,225,220,0)_100%)]"></div>
          <div className="pointer-events-none absolute z-20 right-0 top-0 h-full w-[40vw] bg-[linear-gradient(to_left,_#E2E1DC_30%,_rgba(226,225,220,0)_100%)]"></div>
        </div>
      </div>
    </>
  );
}