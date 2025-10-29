"use client"
import React, { useState } from 'react';
import { useEffect } from 'react';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import emailjs from '@emailjs/browser';
gsap.registerPlugin(ScrollTrigger)

import { useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Contact({ navigationOverlayRef }) {
  const contactRef = useRef(null);
  const mainHeadingRef = useRef(null);
  const mainHeadingStaggerRef = useRef(null);
  const foundersHeadingRef = useRef(null);
  const foundersHeadingStaggerRef = useRef(null);
  const foundersParaRef = useRef(null);
  const foundersParaStaggerRef = useRef(null);
  const partnersHeadingRef = useRef(null);
  const partnersHeadingStaggerRef = useRef(null);
  const partnersParaRef = useRef(null);
  const partnersParaStaggerRef = useRef(null);
  const footerTextRef = useRef(null);
  const footerTextStaggerRef = useRef(null);
  const formRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  // Initialize EmailJS with your public key
  useEffect(() => {
    emailjs.init("T4qWu19B5Yg6alfHl"); // Replace with your actual public key
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");


    // await emailjs.sendForm(
    //   "service_ip70kvb", // Service ID
    //   "template_4t4qc8o", // Template ID
    //   formRef.current,
    //   "T4qWu19B5Yg6alfHl" // Public Key
    // );

    try {
      await emailjs.sendForm(
        "service_jf1ca2e", // Service ID
        "template_2l8qzrc", // Template ID
        formRef.current,
        "Vkcxci6tbgYH4M58I" // Public Key
      );

      setSubmitStatus("Message sent successfully!");
      formRef.current.reset();
    } catch (error) {
      console.error("Error sending email:", error.text || error);
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(""), 5000);
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = "black";
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const bgStartPoint = isMobile ? "top 60%" : (isTablet ? "top 55%" : "top 70%");
    const bgEndPoint = isMobile ? "bottom 40%" : (isTablet ? "bottom 45%" : "bottom 30%");

    const bgTrigger = ScrollTrigger.create({
      trigger: contactRef.current,
      start: bgStartPoint,
      end: bgEndPoint,
      onEnter: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "#fff",
          ease: "power2.inOut",
        });
      },
      onLeave: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "black",
          ease: "power2.inOut",
        });
      },
      onEnterBack: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "#fff",
          ease: "power2.inOut",
        });
      },
      onLeaveBack: () => {
        gsap.to(document.body, {
          duration: 1,
          backgroundColor: "black",
          ease: "power2.inOut",
        });
      },
    });

    return () => {
      bgTrigger && bgTrigger.kill();
      document.body.style.backgroundColor = "";
    };
  }, []);

  useGSAP(() => {
    // Set initial state for all text elements
    gsap.set([
      mainHeadingStaggerRef.current,
      foundersHeadingStaggerRef.current,
      foundersParaStaggerRef.current,
      partnersHeadingStaggerRef.current,
      partnersParaStaggerRef.current,
      footerTextStaggerRef.current
    ], {
      opacity: 0,
      y: 50,
      transformOrigin: "center center",
      willChange: "transform, opacity"
    });

    // Create timeline for staggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: contactRef.current,
        start: "top 90%",
        end: "bottom 80%",
      }
    });

    // Animate elements in sequence with stagger
    tl.to([
      mainHeadingStaggerRef.current,
      foundersHeadingStaggerRef.current,
      foundersParaStaggerRef.current,
      partnersHeadingStaggerRef.current,
      partnersParaStaggerRef.current,
      footerTextStaggerRef.current
    ], {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.15
    });
  }, []);

  return (
    <div className='bg-[#E2E1DC] h-screen overflow-hidden'>
    <Navbar />
    <div ref={contactRef} className=" flex relative flex-col pt-4">
      {/* Main Content - Takes up remaining space */}
      <div className="flex-1 flex px-4 sm:px-6 lg:px-10 pt-12 sm:pt-16 lg:pt-24 pb-8">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-12 w-full h-full">
          {/* Left Column */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex-1">
              <div className="flex sm:flex-row sm:items-center gap-2 sm:gap-2 mb-6 sm:mb-8">
                <h1 ref={mainHeadingRef} className="text-[6vw] sm:text-4xl lg:text-5xl lg:pt-3 pt-1 font-bold text-black telegraf leading-none">
                  <span ref={mainHeadingStaggerRef} className="will-change-transform block uppercase">
                    LEt’s get in touch 
                  </span>
                </h1>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                  </div>
                  <p ref={partnersParaRef} className="text-gray-600 text-sm sm:text-sm w-full sm:w-[90%] lg:w-[80%] leading-relaxed">
                    <span ref={partnersParaStaggerRef} className="will-change-transform text-xs block">
                      Whether you're a Brand, Startup, agency or enterprise we're interested in ambitious ideas.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
<div className="flex-1 flex flex-col justify-center max-w-none lg:max-w-2xl">
  <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
    {/* Name */}
    <div>
      <label className="block text-xs sm:text-sm font-medium text-black mb-2 tracking-wide">
        NAME
      </label>
      <input
        type="text"
        name="name"
        required
        className="w-full px-4 py-3 border border-[#828282] rounded-full text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 bg-[#E2E1DC]"
        placeholder="Your name"
      />
    </div>

    {/* Contact */}
    <div>
      <label className="block text-xs sm:text-sm font-medium text-black mb-2 tracking-wide">
        CONTACT
      </label>
      <input
        type="text"
        name="contact"
        required
        className="w-full px-4 py-3 border border-[#828282] rounded-full text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 bg-[#E2E1DC]"
        placeholder="Email or phone number"
      />
    </div>

    {/* Brief Description */}
    <div>
      <label className="block text-xs sm:text-sm font-medium text-black mb-2 tracking-wide">
        BRIEF DESCRIPTION
      </label>
      <textarea
        name="message"
        required
        rows={4}
        className="w-full px-4 py-3 border border-[#828282] rounded-2xl text-black placeholder-gray-400 text-sm focus:outline-none focus:border-gray-400 bg-[#E2E1DC] resize-none"
        placeholder="Tell us briefly about your project..."
      />
    </div>

    {/* Status Message */}
    {submitStatus && (
      <div
        className={`text-sm p-2 rounded ${
          submitStatus.includes('successfully')
            ? 'bg-green-100 text-green-800'
            : submitStatus.includes('Failed')
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {submitStatus}
      </div>
    )}

    {/* Submit Button */}
    <button
      type="submit"
      disabled={isSubmitting}
      className={`w-full sm:w-auto font-medium py-3 px-16 text-sm rounded-full transition-all duration-200 ${
        isSubmitting
          ? 'bg-gray-400 cursor-not-allowed text-gray-600'
          : 'bg-[#FF6333] hover:bg-[#ff4d1a] text-white'
      }`}
    >
      {isSubmitting ? 'SENDING...' : 'SEND'}
    </button>
  </form>
</div>

        </div>
      </div>

    </div>
    <Footer />
    </div>
  );
}