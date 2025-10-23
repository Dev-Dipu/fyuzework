"use client";
import Magnet from "@/components/Magnet";
import Navbar from "@/components/Navbar";
import useLenis from "@/lib/hooks/useLenis";
import gsap from "gsap";
import { useRef } from "react";

const Page = () => {
  const hoverElements = useRef([]);
  const modeDivH1s = useRef([]);
  const btnRef = useRef(null);
  const btnSpanRef = useRef(null);

  useLenis();

  const data = [
    { name: "Site from scratch" },
    { name: "Ai Automation" },
    { name: "Influencer Marketing" },
    { name: "Influencer research" },
    { name: "Social Media Management" },
  ];

  if (modeDivH1s.current.length !== data.length) {
    modeDivH1s.current = Array(data.length)
      .fill()
      .map(() => []);
  }

  const handleMouseEnter = (idx) => {
    if (modeDivH1s.current[idx]) {
      gsap.to(modeDivH1s.current[idx], {
        yPercent: -100,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  const handleMouseLeave = (idx) => {
    if (modeDivH1s.current[idx]) {
      gsap.to(modeDivH1s.current[idx], {
        yPercent: 0,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  };

  // 🟢 Button hover animation
  const handleBtnEnter = (e) => {
    const btn = btnRef.current;
    const span = btnSpanRef.current;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    gsap.set(span, {
      x: x - rect.width / 2,
      y: y - rect.height / 2,
      scale: 0,
      opacity: 1,
    });

    gsap.to(span, {
      scale: 12,
      duration: 1.2, // slightly faster entry
      ease: "power3.out",
    });
  };

  const handleBtnLeave = () => {
    const span = btnSpanRef.current;
    gsap.to(span, {
      scale: 0,
      duration: 0.9, // smoother, slower exit
      ease: "power3.inOut",
    });
  };

  return (
    <div className="min-h-screen w-full inter px-20 space-y-10 tracking-tighter pb-32 text-white relative">
      <Navbar />
      <h1 className="text-8xl font-medium text-center font-archivo text-white pt-[20vh]">
        Hey! Tell us all <br />
        the things
      </h1>
      <p className="text-3xl pt-20 text-white">I&apos;m interested in.</p>

      <div className="selectionDivs flex flex-wrap gap-4 w-[65%]">
        {data.map((item, index) => (
          <Magnet magnetStrength={5} padding={5} key={index}>
            <div
              ref={(el) => (hoverElements.current[index] = el)}
              className="px-6 py-2 border-[1px] rounded-full text-2xl inline-block cursor-pointer text-white"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="h-8 overflow-hidden">
                <h1
                  ref={(el) => (modeDivH1s.current[index][0] = el)}
                  style={{ transform: "translateY(0%)" }}
                  className="text-white"
                >
                  {item.name}
                </h1>
                <h1
                  ref={(el) => (modeDivH1s.current[index][1] = el)}
                  style={{ transform: "translateY(0%)" }}
                  className="text-white"
                >
                  {item.name}
                </h1>
              </div>
            </div>
          </Magnet>
        ))}
      </div>

      <form className="inputs">
        <div className="space-y-10">
          <input
            autoComplete="off"
            className="block border-b-[1px] border-white/70 text-3xl py-6 w-[70%] outline-0 text-white placeholder-white"
            type="text"
            placeholder="Name"
            name="name"
          />
          <input
            autoComplete="off"
            className="block border-b-[1px] border-white/70 text-3xl py-6 w-[70%] outline-0 text-white placeholder-white"
            type="text"
            placeholder="Email"
            name="email"
          />
          <input
            autoComplete="off"
            className="block border-b-[1px] border-white/70 text-3xl py-6 w-[70%] outline-0 text-white placeholder-white"
            type="text"
            placeholder="Tell us about your requirements"
            name="project"
          />
        </div>

        {/* 🟢 Smooth, difference-text button */}
        <button
          ref={btnRef}
          type="submit"
          onMouseEnter={handleBtnEnter}
          onMouseLeave={handleBtnLeave}
          className="border-[1px] border-white/70 text-2xl py-6 px-32 rounded-full mt-20 uppercase relative overflow-hidden text-white cursor-pointer"
        >
          <span
            ref={btnSpanRef}
            className="absolute left-1/2 top-1/2 w-[120%] h-[140%] -z-10 bg-white rounded-full -translate-x-1/2 -translate-y-1/2 scale-0 pointer-events-none"
          />
          <span className="mix-blend-difference">Send request</span>
        </button>
      </form>
    </div>
  );
};

export default Page;
