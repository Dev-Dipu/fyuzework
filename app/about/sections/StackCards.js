import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "The problem",
    description: "Influencer marketing is broken. Fake followers, shady metrics, endless negotiations, and zero transparency have made campaigns expensive and unpredictable.",
    url: "/QuestionMark.svg",
    color: "#E2E1DC"
  },
  {
    title: "The solution",
    description: "Fyuze.ai fixes it. Our AI platform cuts through the noise, scanning millions of creators across TikTok, Instagram, YouTube, and X in real time — delivering authentic, high-fit influencers with verified audiences. Every recommendation is powered by machine learning, advanced fraud detection, and predictive ROI analysis.",
    url: "/sealCheck.svg",
    color: "#EE4F20"
  }
];

function Card({ i, title, description, url, color, progress, range, targetScale }) {
  const container = useRef(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 40}px)`
        }}
        className="relative flex flex-col w-[40vw] h-[50vh] rounded-3xl p-12 origin-top"
      >
        <div className="absolute top-10 left-10 w-20">
          <Image src={url} alt={title} width={40} height={40} />
        </div>
        <div className="absolute left-10 bottom-20 flex flex-col gap-4">
          <h2 className="text-xl tracking-tight bottom-10 text-black font-bold">{title}</h2>
          <p className="text-lg tracking-tight bottom-10 text-black/70 w-[60%]">{description}</p>
        </div>
      </motion.div>
    </div>
  );
}

export default function StackCards() {
  const container = useRef(null);
  const imageRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end end']
  });

  useGSAP(() => {
    gsap.to(imageRef.current, {
      y: "-40vh",
      ease: "none",
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom 60%",
        scrub: true
      }
    });
  }, []);

  return (
    <main ref={container} className="relative h-fit">
      <div className="sticky h-screen w-full top-0 left-0 overflow-hidden bg-zinc-100">
        <div ref={imageRef} className="relative h-[140vh] w-full">
          <Image
            src="/pexels.png" 
            alt="Background Image" 
            fill
            className="object-cover scale-110 object-center"
            priority
          />
        </div>
      </div>
      
      {projects.map((project, i) => {
        const targetScale = 1 - ((projects.length - i) * 0.01);
        return (
          <Card
            key={`p_${i}`}
            i={i}
            {...project}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
      <div className="h-screen" />
    </main>
  );
}