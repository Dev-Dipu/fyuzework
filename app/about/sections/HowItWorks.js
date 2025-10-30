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
      <div className="relative h-80 aspect-[4/5] border border-black rounded-4xl px-4 py-6 flex flex-col justify-between 
        hover:bg-white transition duration-300 group-hover:shadow-xl">
        <Image src={icon} alt={title} width={32} height={32} className="object-contain"/>  
        <div>
          <h3 className="font-[Archivo] text-lg font-semibold">{title}</h3>
          <p className="leading-tight mt-2 text-xs w-[90%]">{desc}</p>
        </div>
      </div>
    </div>
  )
}





const HowItWorks = () => {
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
    <div className="min-h-screen pb-48 w-full relative pt-44">
      <div className="flex flex-col gap-8">
        <h1 ref={headingRef} className="text-center font-archivo font-semibold tracking-tight text-4xl text-black">
          How it works
        </h1>
        <p ref={paragraphRef} className="tracking-tight text-center text-lg text-black leading-none">
          From discovery to ROI fully <br />automated, fully optimized.
        </p>
      </div>
      <div className="w-full h-4/5 flex justify-center gap-20 pt-20 scale-90">
        <div className="flex flex-col gap-20 translate-y-12">
          {features.slice(0, 2).map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
        <div className="flex flex-col gap-20 -translate-y-6">
          {features.slice(2, 4).map((f, i) => <FeatureCard key={i} {...f} />)}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;