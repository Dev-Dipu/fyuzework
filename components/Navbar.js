"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useTheme } from "@/lib/contexts/ThemeContext";
import { authService } from "@/lib/authService";
import { useRouter, usePathname } from "next/navigation";

export default function Navbar() {

  const isAuth = () => {
    authService.initialize()
    return authService.isAuthenticated()
  }
  const { theme, isDark } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const isAboutPage = pathname === '/about';
  
  const [textColor, setTextColor] = useState("white");
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/assets/fyuze-logo.svg");
  const [isProfileCardVisible, setIsProfileCardVisible] = useState(false);
  const [isAboutDropdownVisible, setIsAboutDropdownVisible] = useState(false);
  const [shouldHideNav, setShouldHideNav] = useState(false);
  const [bgOpacity, setBgOpacity] = useState(0); // Track background opacity
  const navRef = useRef();
  const profileCardRef = useRef();
  const aboutDropdownRef = useRef();
  const aboutContainerRef = useRef();
  const nameParam = "Jenny Wilson"

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

  useGSAP(() => {
    if (isAboutDropdownVisible) {
        gsap.fromTo(aboutDropdownRef.current, 
          {
            opacity: 0,
            display: "none"
          },
          {
            opacity: 1,

            display: "block",
            duration: 0.4,
            ease: "power2.out"
          }
        );
      } else {
        gsap.to(aboutDropdownRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.4,
          ease: "power2.out",
          onComplete: () => {
            if (aboutDropdownRef.current) {
              aboutDropdownRef.current.style.display = "none";
            }
          }
        });
      }
  }, [isAboutDropdownVisible]);

  // Navbar hide/show animation with GSAP
  useGSAP(() => {
    if (shouldHideNav) {
      gsap.to(navRef.current, {
        y: -120,
        duration: 0.5,
        ease: "power2.inOut"
      });
    } else {
      gsap.to(navRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.inOut"
      });
    }
  }, [shouldHideNav]);

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

  const handleAboutMouseEnter = () => {
    setIsAboutDropdownVisible(true);
  };

  const handleAboutMouseLeave = () => {
    setIsAboutDropdownVisible(false);
  };

  // Separate useEffect for navbar hide/show on ALL pages (except pricing)
  useEffect(() => {

    const handleNavbarHideScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const distanceFromBottom = documentHeight - (scrollTop + windowHeight);
      
      // Hide navbar when last 100vh remains
      if (distanceFromBottom <= windowHeight / 2) {
        setShouldHideNav(true);
      } else {
        setShouldHideNav(false);
      }
    };

    let ticking = false;
    const throttledNavbarHideScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleNavbarHideScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledNavbarHideScroll);
    handleNavbarHideScroll(); // Initial check

    return () => window.removeEventListener('scroll', throttledNavbarHideScroll);
  }, [pathname]); // Add pathname dependency

  // Separate useEffect for color changes on home page
  useEffect(() => {
    if(isAboutPage) {
      setTextColor("#000000");
      setLogoSrc("/assets/fyuze-dark.svg");
      setBgOpacity(0);
      return;
    }
    // If not on home page, force black text and white background
    if (!isHomePage) {
      setTextColor("#000000");
      setIsDarkSection(false);
      setLogoSrc("/assets/fyuze-dark.svg");
      setBgOpacity(1); // Always show background on other pages
      return;
    }

    // Home page logic - follow isDark theme
    const handleScroll = () => {
      const sections = document.querySelectorAll('.section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      // Handle background opacity for first section
      const firstSectionHeight = window.innerHeight;
      const scrollY = window.scrollY;
      if (scrollY < firstSectionHeight * 0.3) {
        setBgOpacity(0);
      } else if (scrollY < firstSectionHeight) {
        // Fade in from 30% to 100% of first section
        const progress = (scrollY - firstSectionHeight * 0.3) / (firstSectionHeight * 0.7);
        setBgOpacity(Math.min(progress, 1));
      } else {
        setBgOpacity(1);
      }

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
          setTextColor(isDark ? "#c5c5c5" : "#4f4f4f");
          setIsDarkSection(true);
          isDark ? setLogoSrc("/assets/fyuze-logo.svg") : setLogoSrc("/assets/fyuze-dark.svg");
        } else {
          setTextColor(isDark ? "#fafafa" : "white");
          setIsDarkSection(false);
          setLogoSrc("/assets/fyuze-logo.svg");
        }
      } else {
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
  }, [isDark, isHomePage, isAboutPage]);

  useGSAP(() => {
    const navelms = navRef.current.querySelectorAll('.navelm')

    if(isHomePage){
      gsap.from(navelms, {
      opacity: 0,
      duration: 2,
      delay: 0,
      ease: "power2.inOut"
    })
    }

  }, [])

  useEffect(() => {
  if (!isAboutPage) return;

  const targetSection = document.querySelector('[data-nav-transparent="true"]');
  if (!targetSection) return;

  const handleScroll = () => {
    const rect = targetSection.getBoundingClientRect();
    const inView = rect.top <= 100 && rect.bottom >= 100;

    if (inView) {
      setBgOpacity(0);  // transparent navbar
    } else {
      setBgOpacity(1);  // normal navbar
    }
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();

  return () => window.removeEventListener("scroll", handleScroll);
}, [isAboutPage]);


// Determine navbar background based on route
  const getNavbarBg = () => {
    if (!isHomePage) {
      return 'transparent'; // White background for non-home pages
    }
    return isDark ? 'transparent' : 'transparent';
  };

  // Determine gradient overlay - use state-based opacity
  const getGradientOverlay = () => {
  if (isAboutPage) {
    return {
      background: 'linear-gradient(180deg, #E2E1DC 73.25%, rgba(226,225,220,0) 100%)',
      opacity: bgOpacity  // controlled by scroll now
    };
  }

  if (!isHomePage) {
    return {
      background: 'linear-gradient(180deg, #E2E1DC 73.25%, rgba(226,225,220,0) 100%)',
      opacity: 1
    };
  }

  return {
    background: isDark 
      ? 'linear-gradient(180deg, #262626 73.25%, rgba(38,38,38,0) 100%)'
      : 'linear-gradient(180deg, #E2E1DC 73.25%, rgba(226,225,220,0) 100%)',
    opacity: bgOpacity
  };
};



  const gradientStyle = getGradientOverlay();

  return (
    <nav
      ref={navRef}
      className="w-full left-0 top-0 fixed p-9 flex-between inter z-100 transition-colors duration-300"
      style={{ 
        color: textColor,
        backgroundColor: getNavbarBg()
      }}
    >
      {/* Gradient overlay with opacity transition - explicitly set z-0 */}
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ 
          background: gradientStyle.background,
          opacity: gradientStyle.opacity,
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
          className="w-[1px] h-[26px] relative navelm transition-colors duration-300"
          style={{ backgroundColor: textColor }}
        ></div>
        <div className="flex-between gap-10 relativ">
          <Link
            href="/"
            className="group relative inline-block text-sm font-[300] leading-[100%] uppercase transition-colors duration-300 navelm"
            style={{ color: textColor }}
          >
            home
            <span
              className="absolute left-0 -bottom-2 h-[0.5px] w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: textColor }}
            ></span>
          </Link>
          <div 
            className="relative w-[2px] h-[2px] navelm rounded-full transition-colors duration-300"
            style={{ backgroundColor: textColor }}
          ></div>
          <div
            ref={aboutContainerRef}
            className="relative p-1"
            onMouseEnter={handleAboutMouseEnter}
            onMouseLeave={handleAboutMouseLeave}
          >
            <div
              onClick={() => {router.push('/about')}} 
              className="group relative inline-flex items-center gap-1 text-sm font-[300] leading-[100%] uppercase transition-colors duration-300 navelm cursor-pointer"
              style={{ color: textColor }}
            >
              about
              <span
                className="absolute left-0 -bottom-2 h-[0.5px] w-0 transition-all duration-300 group-hover:w-full"
                style={{ backgroundColor: textColor }}
              ></span>
            </div>
          </div>
                    <div 
            className="relative w-[2px] h-[2px] navelm rounded-full transition-colors duration-300"
            style={{ backgroundColor: textColor }}
          ></div>
          <Link
            href="/pricing"
            className="group relative inline-block text-sm font-[300] leading-[100%] uppercase transition-colors duration-300 navelm"
            style={{ color: textColor }}
          >
            pricing
            <span
              className="absolute left-0 -bottom-2 h-[0.5px] w-0 transition-all duration-300 group-hover:w-full"
              style={{ backgroundColor: textColor }}
            ></span>
          </Link>
          <div 
            className="relative w-[2px] h-[2px] navelm rounded-full transition-colors duration-300"
            style={{ backgroundColor: textColor }}
          ></div>
          
          <Link
            href="/contact"
            className="group relative inline-block text-sm font-[300] leading-[100%] uppercase transition-colors duration-300 navelm"
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
      {isAuth() ? (<div className="relative flex-center gap-10 z-10 navelm">
        <div className="relative">
          <div 
            className="flex profileClick items-center gap-2 cursor-pointer"
            onClick={toggleProfileCard}
          >
            <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] relative overflow-hidden rounded-full">
              <Image
                src={`https://ui-avatars.com/api/?name=${nameParam}&bold=true`}
                alt="logo"
                fill
                className="object-cover"
              />
            </div>
            <p 
              className="font-[500] text-xs sm:text-sm leading-[100%] transition-colors duration-300"
              style={{ color: textColor }}
            >
              {nameParam}
            </p>
          </div>
          <div 
            ref={profileCardRef}
            className="h-fit profileCard w-[90vw] sm:w-[320px] md:w-[280px] lg:w-[14vw] min-w-[260px] p-4 sm:p-6 rounded-3xl absolute right-0 sm:-right-5 top-12 sm:top-12 z-50"
            style={{ 
              opacity: 0, 
              display: 'none',
              backgroundColor: isHomePage && isDark ? '#000000' : '#ffffff',
              color: isHomePage && isDark ? '#ffffff' : '#000000',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
            }}
          >
            <div onClick={() => router.push('/chat')} className="flex pb-3 justify-between items-center cursor-pointer" style={{ borderBottomColor: isHomePage && isDark ? '#404040' : '#e5e5e5', borderBottomWidth: '1px' }}>
              <div className="flex gap-2 items-center">
                <div className="w-[30px] h-[30px] sm:w-[35px] sm:h-[35px] relative overflow-hidden rounded-full">
                  <Image
                    src="/assets/profile.png"
                    alt="logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <h1 className="tracking-tight text-sm sm:text-xs font-semibold truncate max-w-[150px]" style={{ color: isHomePage && isDark ? '#ffffff' : '#000000' }}>
                  Jenny Wilson FYUZE
                </h1>
              </div>
              <Image 
                src="/next-arrow.svg" 
                height={15} 
                width={15} 
                alt="arrow right icon" 
                className="flex-shrink-0"
                style={{ filter: isHomePage && isDark ? 'invert(1)' : 'invert(0)' }}
              />
            </div>
            
            <div onClick={() => router.push('/chat?openDashboard=1')} className="flex py-3 items-center justify-between cursor-pointer" style={{ borderBottomColor: isHomePage && isDark ? '#404040' : '#e5e5e5', borderBottomWidth: '1px' }}>
              <div className="flex gap-2 items-center">
                <Image 
                  src="/ChartPieSlice.svg" 
                  height={30} 
                  width={30} 
                  alt="dashboard icon"
                  style={{ filter: isHomePage && isDark ? 'invert(1)' : 'invert(0)' }}
                />
                <h1 className="tracking-tight text-[10px] sm:text-xs font-semibold" style={{ color: isHomePage && isDark ? '#ffffff' : '#000000' }}>Dashboard</h1>
              </div>
              <Image 
                src="/next-arrow.svg" 
                height={15} 
                width={15} 
                alt="arrow right icon" 
                className="flex-shrink-0"
                style={{ filter: isHomePage && isDark ? 'invert(1)' : 'invert(0)' }}
              />
            </div>
            
            <div className="h-auto sm:h-[14vh] min-h-[130px] mb-4 w-full px-3 rounded-2xl mt-4" style={{ backgroundColor: isDark ? '#1a1a1a' : '#E2E1DC' }}>
              <div className="flex justify-between items-center py-3 sm:py-4" style={{ borderBottomColor: isDark ? '#404040' : '#C5C5C5', borderBottomWidth: '1px' }}>
                <div className="flex items-center gap-2">
                  <Image 
                    src="/Crown.svg" 
                    height={20} 
                    width={20} 
                    alt="crown icon"
                    style={{ filter: isHomePage && isDark ? 'invert(1)' : 'invert(0)' }}
                  />
                  <h1 className="text-[10px] sm:text-xs tracking-tight font-medium" style={{ color: isHomePage && isDark ? '#ffffff' : '#000000' }}>Turn pro</h1>
                </div>
                <button onClick={() => router.push('/pricing')} className="uppercase cursor-pointer bg-[#FF6B3A] inline-block rounded-full tracking-tight text-[9px] sm:text-[10px] text-white font-medium px-2 sm:px-3 py-1">
                  Upgrade
                </button>
              </div>
              <div className="flex justify-between items-center py-3 sm:py-4">
                <h4 className="text-[10px] sm:text-xs font-medium tracking-tight" style={{ color: isHomePage && isDark ? '#ffffff' : '#000000' }}>Credits</h4>
                <h4 className="text-[10px] sm:text-xs font-medium tracking-tight" style={{ color: isHomePage && isDark ? '#ffffff' : '#000000' }}>
                  <span className="font-bold text-orange-500">05</span> left
                </h4>
              </div>
              <div className="h-2 w-full rounded mb-3 sm:mb-0 overflow-hidden" style={{ backgroundColor: isHomePage && isDark ? '#404040' : '#ffffff' }}>
                <div className="h-full w-1/2 bg-orange-400"></div>
              </div>
            </div>
            
            <div className="pt-4 flex items-center justify-center" style={{ borderTopColor: isHomePage && isDark ? '#404040' : '#e5e5e5', borderTopWidth: '1px' }}>
              <button onClick={() => {
                authService.initialize()
                authService.logout()
                router.push('/auth')
              }} className="text-[10px] cursor-pointer sm:text-xs tracking-tighter w-full gap-2 justify-center py-2 rounded-full flex items-center hover:bg-white/10 transition" style={{ borderColor: isHomePage && isDark ? '#404040' : '#e5e5e5', borderWidth: '0.5px', color: isHomePage && isDark ? '#ffffff' : '#000000' }}>
                <Image
                  src="./assets/logOut.svg"
                  height={20}
                  width={20}
                  alt="chatIcon"
                  style={{ filter: !isHomePage || !isDark ? 'invert(1)' : 'invert(0)' }}
                />
                Log out
              </button>
            </div>
          </div>
        </div>
      </div>): (<button onClick={() => {
        router.push('/auth')
      }} className="cursor-pointer px-20 navelm rounded-full py-2 duration-300 all ease-in-out relative z-10" style={{
        border: `1px solid ${textColor}`,
        color: textColor,
        backgroundColor: 'transparent'
      }} onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = textColor;
        e.currentTarget.style.color = isHomePage && !isDark ? '#000000' : '#ffffff';
      }} onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
        e.currentTarget.style.color = textColor;
      }}>Get Started</button>)}
    </nav>
  );
}