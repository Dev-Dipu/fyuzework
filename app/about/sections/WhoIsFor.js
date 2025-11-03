import Image from "next/image"
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const FeatureCard = ({ icon, title, desc }) => {
  return (
    <div className="relative group hover:cursor-pointer feature-card">
      <div className="absolute inset-0 rounded-4xl opacity-0 group-hover:opacity-100 transition duration-300 
        before:content-[''] before:absolute before:inset-0 before:rounded-4xl 
        before:bg-[linear-gradient(302.64deg,rgba(221,51,5,0.4)_-0.83%,rgba(255,107,58,0.4)_49.95%,rgba(255,179,71,0.4)_100.74%)] 
        before:blur-[120px] before:opacity-100">
      </div>
      <div className="relative h-64 sm:h-72 md:h-80 aspect-[4/5] border border-black rounded-4xl px-3 py-4 sm:px-4 sm:py-5 md:px-4 md:py-6 flex flex-col justify-between 
        hover:bg-white transition duration-300 group-hover:shadow-xl">
        <Image src={icon} alt={title} width={32} height={32} className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 object-contain"/>  
        <div>
          <h3 className="font-[Archivo] text-xs sm:text-sm md:text-md font-semibold">{title}</h3>
          <p className="leading-tight mt-1.5 sm:mt-2 text-[10px] sm:text-xs md:text-sm w-[90%]">{desc}</p>
        </div>
      </div>
    </div>
  )
}





const WhoIsFor = () => {
  gsap.registerPlugin(ScrollTrigger);

  const headingRef = useRef(null);
  const paragraphRef = useRef(null);

  useEffect(() => {
    // Set initial states
    gsap.set(headingRef.current, { y: 100, opacity: 0 });
    gsap.set(paragraphRef.current, { y: 100, opacity: 0 });

    // Heading animation
    ScrollTrigger.create({
      trigger: headingRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(headingRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          force3D: true,
          willChange: "transform, opacity"
        });
      }
    });

    // Paragraph animation
    ScrollTrigger.create({
      trigger: paragraphRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(paragraphRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power2.out",
          force3D: true,
          willChange: "transform, opacity"
        });
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const features = [
    { icon: "/MagnifyingGlass.svg", title: "Real-Time Discovery", desc: "Scan tens of millions of influencers and content creators across Instagram, TikTok, YouTube, and X." },
    { icon: "/ChartBar.svg", title: "Predictive ROI Analytics", desc: "Forecast campaign performance and potential even before you launch." },
    { icon: "/GlobeHemisphereEast.svg", title: "Micro-Niche Targeting", desc: "Filter searches by ultra-specific sub-categories like." },
    { icon: "/MagicWand.svg", title: "Trend Prediction Engine", desc: "Stay ahead of social media viral movements and emerging creators." },
    { icon: "/MONOGRAM.svg", title: "Fyuze Score™", desc: "Our proprietary ranking system combining ROI potential, sentiment and fit, fraud detection, and audience trust." },
    { icon: "/ChartPieSlice.svg", title: "Enterprise-Grade Dashboards", desc: "Transparent data, brand-safe reporting, and white-label options." }
  ];

  return (
    <div className="min-h-fit pb-20 w-full relative pt-28">
      <div className="flex flex-col gap-5 sm:gap-6 md:gap-7 lg:gap-8">
        <h1 ref={headingRef} className="text-center font-archivo font-semibold tracking-tight text-2xl sm:text-3xl md:text-3xl lg:text-4xl text-black">
          Who Is It For
        </h1>
        <p ref={paragraphRef} className="tracking-tight text-center text-sm sm:text-base md:text-lg lg:text-xl text-black leading-none">
          From discovery to ROI fully <br />automated, fully optimized.
        </p>
      </div>
      <div className="w-full h-4/5 flex justify-center gap-12 sm:gap-14 md:gap-16 lg:gap-20 pt-12 sm:pt-14 md:pt-16 lg:pt-20 scale-75 sm:scale-80 md:scale-85 lg:scale-90">
        <div className="flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-20 translate-y-8 sm:translate-y-10 md:translate-y-11 lg:translate-y-12">
          {features.slice(0, 2).map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
        <div className="flex flex-col gap-12 sm:gap-14 md:gap-16 lg:gap-20 -translate-y-4 sm:-translate-y-5 md:-translate-y-5 lg:-translate-y-6">
          {features.slice(2, 4).map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </div>
  );
};

export default WhoIsFor;