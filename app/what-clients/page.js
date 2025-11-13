"use client";
import { useEffect, useRef, useState } from "react";
import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { GoArrowLeft } from "react-icons/go";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* ----------------- Testimonial Data ----------------- */
const testimonials = [
    {
        quote: "What used to take us weeks, now takes an hour with fyuze",
        avatar: "/Avatar.png",
        name: "Candice Wu",
        title: "Product manager, Sisyphus",
    },
    {
        quote: "Fyuze has completely transformed how we discover and connect with creators",
        avatar: "/Avatar.png",
        name: "John Smith",
        title: "Marketing Director, TechCorp",
    },
    {
        quote: "The AI-powered matching is incredibly accurate. We've seen 3x better ROI",
        avatar: "/Avatar.png",
        name: "Sarah Johnson",
        title: "Brand Manager, StyleHub",
    },
    {
        quote: "Finding the right influencers has never been this easy and efficient",
        avatar: "/Avatar.png",
        name: "Michael Chen",
        title: "CEO, GrowthLabs",
    },
    {
        quote: "Game-changing platform for influencer marketing. Highly recommend!",
        avatar: "/Avatar.png",
        name: "Emily Davis",
        title: "Head of Marketing, FashionForward",
    },
    {
        quote: "The best investment we've made in our marketing stack this year",
        avatar: "/Avatar.png",
        name: "David Wilson",
        title: "CMO, InnovateCo",
    },
];

/* ----------------- Testimonial Card Component ----------------- */
function TestimonialCard({ quote, avatar, name, title, isActive }) {
    return (
        <div
            className={`testimonial-card flex-shrink-0 bg-white border border-gray-200 rounded-[2rem] flex flex-col relative items-center justify-center transition-all duration-500 shadow-sm`}
            style={{
                height: isActive ? "56vh" : "48vh",
                width: isActive ? "340px" : "300px",
            }}
        >
            <Image src="/Quote.svg" alt="quote" className="transition-all duration-500" width={30} height={30} style={{ 
                        fontFamily: "Inter, sans-serif",
                        transform: isActive ? "scale(1)" : "scale(0.8)",
                        opacity: isActive ? 1 : 0.8,
                        transformOrigin: "center"
                    }} />
            <div style={{ width: "280px" }} className="flex items-center justify-center">
                <h1
                    className={`text-center font-medium text-gray-800 leading-tight transition-all duration-500 text-lg sm:text-xl ${isActive ? "pt-4" : "pt-0"}`}
                    style={{ 
                        fontFamily: "Inter, sans-serif",
                        transform: isActive ? "scale(1)" : "scale(0.8)",
                        opacity: isActive ? 1 : 0.8,
                        transformOrigin: "center"
                    }}
                >
                    {quote}
                </h1>
            </div>

            <div className={`mx-auto ${isActive ? "py-8" : "py-4"} transition-all duration-500 flex justify-center`}>
                <Image
                    src="/StarGroup.svg"
                    alt="stars"
                    width={120}
                    height={20}
                    className="rounded-full"
                />
            </div>
            <Image
                src={avatar}
                alt={name}
                width={60}
                height={60}
                className="rounded-full transition-all duration-500"
                style={{ 
                        fontFamily: "Inter, sans-serif",
                        transform: isActive ? "scale(1)" : "scale(0.8)",
                        opacity: isActive ? 1 : 0.8,
                        transformOrigin: "center"
                    }}
            />
            <h1 className="text-base sm:text-lg font-semibold pt-4 transition-all duration-500" style={{ 
                        fontFamily: "Inter, sans-serif",
                        transform: isActive ? "scale(1)" : "scale(0.8)",
                        opacity: isActive ? 1 : 0.8,
                        transformOrigin: "center"
                    }}>{name}</h1>
            <h1 className="text-sm sm:text-base font-medium opacity-60 transition-all duration-500" style={{ 
                        fontFamily: "Inter, sans-serif",
                        transform: isActive ? "scale(1)" : "scale(0.8)",
                        opacity: isActive ? 1 : 0.8,
                        transformOrigin: "center"
                    }}>
                {title}
            </h1>
        </div>
    );
}

/* ----------------- Main Component ----------------- */
export default function TestimonialCardsSlider() {
    const swiperRef = useRef(null);
    const cardsRef = useRef(null);
    const headingRef = useRef(null);
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(testimonials.length);
    const [progress, setProgress] = useState(0);

    // Triple cards for infinite effect
    const allCards = [...testimonials, ...testimonials, ...testimonials];

    useEffect(() => {
        const swiper = new Swiper(".swiper", {
            modules: [Mousewheel],
            slidesPerView: "auto",
            spaceBetween: 20,
            centeredSlides: true,
            initialSlide: testimonials.length,
            speed: 800,
            grabCursor: true,
            mousewheel: {
                forceToAxis: true,
                sensitivity: 0.4,
            },
            slideToClickedSlide: true,
            resistanceRatio: 0,

            on: {
                init: function () {
                    setActiveIndex(this.activeIndex);
                    updateScale(this);
                    updateProgress(this.activeIndex);
                },
                slideChange: function () {
                    setActiveIndex(this.activeIndex);
                    updateScale(this);
                    updateProgress(this.activeIndex);
                },
                slideChangeTransitionEnd: function () {
                    const total = allCards.length;
                    const setLength = testimonials.length;
                    if (this.activeIndex >= total - 3) {
                        const target =
                            setLength + (this.activeIndex % setLength);
                        this.slideTo(target, 0, false);
                        setActiveIndex(target);
                        updateProgress(target);
                    } else if (this.activeIndex <= 2) {
                        const target =
                            setLength + (this.activeIndex % setLength);
                        this.slideTo(target, 0, false);
                        setActiveIndex(target);
                        updateProgress(target);
                    }
                },
            },
        });

        swiperRef.current = swiper;

        // GSAP ScrollTrigger animations
        gsap.fromTo(
            headingRef.current,
            {
                y: 100,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 1.5,
                ease: "power3.inOut",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 90%",
                    toggleActions: "play none none none",
                }
            }
        );

        gsap.fromTo(
            ".testimonial-card",
            {
                y: 200,
                opacity: 0,
            },
            {
                y: 0,
                opacity: 1,
                duration: 2,
                ease: "power3.inOut",
                stagger: 0.1,
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 180%",
                    toggleActions: "play none none none",
                }
            }
        );

        return () => {
            swiper.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const updateScale = (swiper) => {
        swiper.slides.forEach((slide) => {
            const card = slide.querySelector(".testimonial-card");
            if (!card) return;

            const progress = Math.abs(slide.progress);
            const scale = Math.max(0.85, 1.1 - progress * 0.25);
            const opacity = Math.max(0.5, 1 - progress * 0.5);

            card.style.transform = `scale(${scale})`;
            card.style.opacity = opacity;
        });
    };

    const updateProgress = (index) => {
        const total = testimonials.length;
        const current = (index % total) + 1;
        const progressPercent = (current / total) * 100;
        setProgress(progressPercent);
    };

    return (
        <>
            <style>{`
        .swiper {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          width: 340px !important;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-wrapper {
          align-items: center;
        }

        @media (max-width: 768px) {
          .swiper-slide {
            width: 270px !important;
          }
        }

        @media (max-width: 480px) {
          .swiper-slide {
            width: 220px !important;
          }
        }
      `}</style>

            <div ref={containerRef} className="h-full w-full bg-[#E2E1DC] relative overflow-hidden">
                {/* Heading */}
                <div className="w-full flex justify-center pt-16 pb-4">
                    <h1
                        ref={headingRef}
                        className="text-2xl sm:text-5xl md:text-6xl font-bold text-center"
                        style={{ fontFamily: "Archivo, sans-serif" }}
                    >
                        What our clients say
                    </h1>
                </div>

                {/* Gradient Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#DD3305] via-[#FF8B3A] to-[#FFB347] blur-[140px] h-[45vh] w-[35vh] opacity-50"></div>

                {/* Swiper Slider */}
                <div className="relative w-full h-[75vh] sm:h-[70vh] md:h-[80vh] z-10 flex items-center justify-center">
                    <div className="swiper w-full h-full flex items-center justify-center select-none" ref={cardsRef}>
                        <div className="swiper-wrapper">
                            {allCards.map((testimonial, index) => (
                                <div
                                    key={`${testimonial.name}-${index}`}
                                    className="swiper-slide"
                                >
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

                    {/* Soft Vertical Fades (Cutout feel) */}
                    <div className="pointer-events-none absolute left-0 top-0 h-full w-[30vw] bg-[linear-gradient(90deg,_#E2E1DC_30.55%,_rgba(226,225,220,0)_100%)] z-20"></div>
                    <div className="pointer-events-none absolute right-0 top-0 h-full w-[30vw] bg-[linear-gradient(270deg,_#E2E1DC_30.55%,_rgba(226,225,220,0)_100%)] z-20"></div>

                    {/* Scroll Bar + Arrows */}
                    <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 flex items-center gap-10 z-30">
                        {/* Left Arrow */}
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="flex items-center justify-center text-4xl text-[#EE4F20] cursor-pointer transition-all duration-300"
                        >
                            <GoArrowLeft />
                        </button>

                        {/* Scroll Track */}
                        <div className="relative w-[200px] sm:w-[260px] h-[8px]  border border-gray-400 rounded-full overflow-hidden shadow-inner scale-90">
                            <div
                                className="absolute top-0 h-full bg-[#828282] rounded-full transition-all duration-500 ease-in-out"
                                style={{
                                    width: "25%",
                                    left: `${progress - 25}%`,
                                }}
                            ></div>
                        </div>

                        {/* Right Arrow */}
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="flex items-center justify-center text-4xl text-[#EE4F20] cursor-pointer transition-all duration-300"
                        >
                            <GoArrowLeft className="rotate-180" />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}