"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/lib/contexts/ThemeContext";

export default function Navbar() {
  const { theme, isDark } = useTheme();
  const [textColor, setTextColor] = useState("white");
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/assets/fyuze-logo.svg");
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const navRef = useRef();
  const profileCardRef = useRef();

  useGSAP(() => {
    if (isProfileCardVisible) {
        gsap.fromTo(profileCardRef.current, 
          {
            opacity: 0,
            y: 50,
            display: "none"
          },
          {
            opacity: 1,
            y: 0,
            display: "block",
            duration: 0.7,
            ease: "power2.inOut"
          }
        );
      } else {
        gsap.to(profileCardRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.7,
          ease: "power2.inOut",
          onComplete: () => {
            if (profileCardRef.current) {
              profileCardRef.current.style.display = "none";
            }
          }
        });
      }
  }, [isProfileCardVisible]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target) &&
        !event.target.closest('.profileClick')
      ) {
        setIsProfileCardVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleProfileCard = () => {
    setIsProfileCardVisible(!isProfileCardVisible);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentSection = null;
      let minDistance = Infinity;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        const sectionCenter = sectionTop + rect.height / 2;
        const distance = Math.abs(scrollPosition - sectionCenter);
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          if (distance < minDistance) {
            minDistance = distance;
            currentSection = section;
          }
        }
      });

      if (currentSection) {
        const textAttribute = currentSection.getAttribute('data-text');
        if (textAttribute === 'dark') {
          // For dark sections, keep original colors in light mode
          setTextColor(isDark ? "#c5c5c5" : "#4f4f4f");
          setIsDarkSection(true);
          isDark ? setLogoSrc("/assets/fyuze-logo.svg") : setLogoSrc("/assets/fyuze-dark.svg");
        } else {
          // For light sections, keep original white color in light mode
          setTextColor(isDark ? "#fafafa" : "white");
          setIsDarkSection(false);
          setLogoSrc("/assets/fyuze-logo.svg");
        }
      } else {
        // Default colors - keep original white in light mode
        setTextColor(isDark ? "#fafafa" : "white");
        setIsDarkSection(false);
        setLogoSrc("/assets/fyuze-logo.svg");
      }
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', throttledHandleScroll);
  }, [isDark]);

  useGSAP(() => {
    const navelms = navRef.current.querySelectorAll('.navelm')

    gsap.from(navelms, {
      y: -40,
      opacity: 0,
      duration: 2,
      delay: 0,
      ease: "power2.inOut"
    })

  }, [])

  return (
    <nav
      ref={navRef}
      className="w-full left-0 top-0 fixed p-9 flex-between z-100 transition-colors duration-300"
      style={{ 
        color: textColor,
        backgroundColor: isDark ? 'var(--theme-bg-primary)' : 'transparent'
      }}
    >
      {/* Gradient overlay with opacity transition */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{ 
          background: isDark 
            ? 'linear-gradient(180deg, #262626 73.25%, rgba(38,38,38,0) 100%)'
            : 'linear-gradient(180deg, #E2E1DC 73.25%, rgba(226,225,220,0) 100%)',
          opacity: isDarkSection ? 1 : 0,
          transition: 'opacity 700ms ease-in-out'
        }}
      ></div>

      {/* Content */}
      <div className="relative flex-center gap-12 z-10">
        <Link href="/" className="relative w-24 h-[30px] navelm">
          <Image
            src={logoSrc}
            alt="logo"
            fill
            className={`object-contain`}
          />
        </Link>
        <div 
          className="w-[1px] h-[26px] relative transition-colors duration-300"
          style={{ backgroundColor: textColor }}
        ></div>
        <div className="flex-between gap-10 relativ">
          <Link
            href="/pricing"
            className="group relative inline-block text-xs font-[300] leading-[100%] uppercase transition-colors duration-300 navelm"
            style={{ color: textColor }}
          >
            pricing
            <span
              className="absolute left-0 -bottom-2 h-[0.5px] w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: textColor }}
            ></span>
          </Link>
          <div 
            className="relative w-[2px] h-[2px] rounded-full transition-colors duration-300"
            style={{ backgroundColor: textColor }}
          ></div>
          <Link
            href="/about"
            className="group relative inline-block text-xs font-[300] leading-[100%] uppercase transition-colors duration-300 navelm"
            style={{ color: textColor }}
          >
            about
            <span
              className="absolute left-0 -bottom-2 h-[0.5px] w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: textColor }}
            ></span>
          </Link>
          <div 
            className="relative w-[2px] h-[2px] rounded-full transition-colors duration-300"
            style={{ backgroundColor: textColor }}
          ></div>
          
          <Link
            href="/contact"
            className="group relative inline-block text-xs font-[300] leading-[100%] uppercase transition-colors duration-300 navelm"
            style={{ color: textColor }}
          >
            contact
            <span
              className="absolute left-0 -bottom-2 h-[0.5px] w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: textColor }}
            ></span>
          </Link>
        </div>
      </div>
      <div className="relative flex-center gap-10 z-10 navelm">
        <div className="relative">
          <div 
            className="flex profileClick items-center gap-2 cursor-pointer"
            onClick={toggleProfileCard}
          >
            <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] relative overflow-hidden rounded-full">
              <Image
                src="/assets/profile.png"
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
            <p 
              className="font-[500] text-sm sm:text-base leading-[100%] transition-colors duration-300"
              style={{ color: textColor }}
            >
              Jenny Wilson
            </p>
          </div>
          <div 
            ref={profileCardRef}
            className="h-fit profileCard w-[90vw] sm:w-[320px] md:w-[280px] lg:w-[14vw] min-w-[260px] p-4 sm:p-6 rounded-3xl absolute right-0 sm:-right-5 top-12 sm:top-12 z-50"
            style={{ 
              opacity: 0, 
              display: 'none',
              backgroundColor: isDark ? '#000000' : '#ffffff',
              color: isDark ? '#ffffff' : '#000000',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div className="flex pb-3 justify-between items-center" style={{ borderBottomColor: isDark ? '#404040' : '#e5e5e5', borderBottomWidth: '1px' }}>
              <div className="flex gap-2 items-center">
                <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] relative overflow-hidden rounded-full">
                  <Image
                    src="/assets/profile.png"
                    alt="logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="tracking-tight text-xs sm:text-sm font-semibold truncate max-w-[150px]" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                  Jenny Wilson FYUZE
                </h1>
              </div>
              <Image 
                src="/next-arrow.svg" 
                height={15} 
                width={15} 
                alt="arrow right icon" 
                className="flex-shrink-0"
                style={{ filter: isDark ? 'invert(1)' : 'invert(0)' }}
              />
            </div>
            
            <div className="flex py-3 items-center justify-between" style={{ borderBottomColor: isDark ? '#404040' : '#e5e5e5', borderBottomWidth: '1px' }}>
              <div className="flex gap-2 items-center">
                <Image 
                  src="/ChartPieSlice.svg" 
                  height={30} 
                  width={30} 
                  alt="dashboard icon"
                  style={{ filter: isDark ? 'invert(1)' : 'invert(0)' }}
                />
                <h1 className="tracking-tight text-xs sm:text-sm font-semibold" style={{ color: isDark ? '#ffffff' : '#000000' }}>Dashboard</h1>
              </div>
              <Image 
                src="/next-arrow.svg" 
                height={15} 
                width={15} 
                alt="arrow right icon" 
                className="flex-shrink-0"
                style={{ filter: isDark ? 'invert(1)' : 'invert(0)' }}
              />
            </div>
            
            <div className="h-auto sm:h-[14vh] min-h-[120px] mb-4 w-full px-3 rounded-2xl mt-4" style={{ backgroundColor: isDark ? '#1a1a1a' : '#E2E1DC' }}>
              <div className="flex justify-between items-center py-3 sm:py-4" style={{ borderBottomColor: isDark ? '#404040' : '#C5C5C5', borderBottomWidth: '1px' }}>
                <div className="flex items-center gap-2">
                  <Image 
                    src="/Crown.svg" 
                    height={20} 
                    width={20} 
                    alt="logout icon"
                    style={{ filter: isDark ? 'invert(1)' : 'invert(0)' }}
                  />
                  <h1 className="text-xs sm:text-sm tracking-tight font-medium" style={{ color: isDark ? '#ffffff' : '#000000' }}>Turn pro</h1>
                </div>
                <h3 className="uppercase bg-[#FF6B3A] inline-block rounded-full tracking-tight text-[10px] sm:text-xs text-white font-medium px-2 sm:px-3 py-1">
                  Upgrade
                </h3>
              </div>
              <div className="flex justify-between items-center py-3 sm:py-4">
                <h4 className="text-xs sm:text-sm font-medium tracking-tight" style={{ color: isDark ? '#ffffff' : '#000000' }}>Credits</h4>
                <h4 className="text-xs sm:text-sm font-medium tracking-tight" style={{ color: isDark ? '#ffffff' : '#000000' }}>
                  <span className="font-bold text-red-600">05</span> left
                </h4>
              </div>
              <div className="h-2 w-full rounded mb-3 sm:mb-0" style={{ backgroundColor: isDark ? '#404040' : '#ffffff' }}></div>
            </div>
            
            <div className="pt-4 flex items-center justify-center" style={{ borderTopColor: isDark ? '#404040' : '#e5e5e5', borderTopWidth: '1px' }}>
              <button className="text-xs sm:text-sm tracking-tighter w-full gap-2 justify-center py-2 rounded-full flex items-center hover:bg-white/10 transition" style={{ borderColor: isDark ? '#404040' : '#e5e5e5', borderWidth: '0.5px', color: isDark ? '#ffffff' : '#000000' }}>
                <Image
                  src="./assets/logOut.svg"
                  height={20}
                  width={20}
                  alt="chatIcon"
                  style={{ filter: !isDark ? 'invert(1)' : 'invert(0)' }}
                />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}