import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import Image from "next/image";

const features = [
  { icon: "/MagnifyingGlass.svg", title: "Real-Time Discovery", desc: "Scan tens of millions of influencers and content creators across Instagram, TikTok, YouTube, and X." },
  { icon: "/ChartBar.svg", title: "Predictive ROI Analytics", desc: "Forecast campaign performance and potential even before you launch." },
  { icon: "/GlobeHemisphereEast.svg", title: "Micro-Niche Targeting", desc: "Filter searches by ultra-specific sub-categories like" },
  { icon: "/MagicWand.svg", title: "Trend Prediction Engine", desc: "Stay ahead of social media viral movements and emerging creators." },
  { icon: "/MONOGRAM.svg", title: "Fyuze Score™", desc: "Our proprietary ranking system combining ROI potential, sentiment and fit, fraud detection, and audience trust." },
  { icon: "/ChartPieSlice.svg", title: "Enterprise-Grade Dashboards", desc: "Transparent data, brand-safe reporting, and white-label options." }
]

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="relative group hover:cursor-pointer h-full">
      {/* Glow Layer */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition duration-300 
        before:content-[''] before:absolute before:inset-0 before:rounded-3xl 
        before:bg-[linear-gradient(302.64deg,rgba(221,51,5,0.4)_-0.83%,rgba(255,107,58,0.4)_49.95%,rgba(255,179,71,0.4)_100.74%)] 
        before:blur-[120px] before:opacity-100">
      </div>

      {/* Actual Card */}
      <div className="relative h-full bg-gradient-to-r from-[#DD3305] via-[#FF8B3A] to-[#FFB347] rounded-3xl px-6 py-6 flex flex-col justify-between transition duration-300 group-hover:shadow-xl border border-transparent group-hover:bg-white group-hover:border-black">
        <Image src={icon} alt={title} width={32} height={32} className="object-contain"/>  
        <div>
          <h3 className="font-[Archivo] text-md font-semibold">{title}</h3>
          <p className="leading-tight mt-2 text-sm w-[90%]">{desc}</p>
        </div>
      </div>
    </div>
  )
}

export default function SwiperCarousel() {
  // Duplicate features array to have enough slides for loop
  const allFeatures = [...features, ...features, ...features];
  
  return (
    <>
      <Swiper 
        className="mySwiper h-[50vh] w-full py-8"
        slidesPerView={5}
        slidesPerGroup={3}
        spaceBetween={20}
        speed={600}
        loop={true}
        loopedSlides={6}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            spaceBetween: 10
          },
          640: {
            slidesPerView: 3,
            slidesPerGroup: 3,
            spaceBetween: 15
          },
          1024: {
            slidesPerView: 5,
            slidesPerGroup: 3,
            spaceBetween: 20
          }
        }}
      >
        {allFeatures.map((feature, index) => (
          <SwiperSlide 
            key={index} 
            className="h-[30vh] py-20"
            style={{
              transform: index % 2 === 1 ? 'translateY(-2rem)' : 'translateY(0)'
            }}
          >
            <FeatureCard 
              icon={feature.icon} 
              title={feature.title} 
              desc={feature.desc} 
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}