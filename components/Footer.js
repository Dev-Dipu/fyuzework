"use client"
import React, { useEffect, useRef } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/lib/contexts/ThemeContext';
import { motion, useScroll, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Footer() {
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();
  const ChatPage = pathname.startsWith('/chat');
  const AuthPage = pathname.startsWith('/auth');

  const isChatPage = ChatPage || AuthPage;

  const container = useRef(null);

  // Scroll-based animation hook
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 60%", "start 0%"]
  });

  // Transform scroll progress to animation values
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['50vh', '0vh']);
  const bgTextGradOpacity = useTransform(scrollYProgress, [0.3, 1], [0, 1]);

  return (
    <div ref={container} className={`relative h-screen overflow-hidden w-full bg-[#E2E1DC] ${isChatPage ? 'hidden' : ''}`}>
      <div className='min-h-[55vh] p-10 sm:p-10 md:px-12 lg:px-20 relative w-full'>
        <div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 h-full'>
                {/* Logo and Social Section */}
                <div className='space-y-3 sm:space-y-4 flex-shrink-0'>
                    <Image 
                      height={100} 
                      width={100} 
                      src="/assets/brand.svg" 
                      alt="fyuze-logo"
                      className={`w-[10px] sm:w-[20px] md:w-[30px] h-auto ${!isDark ? 'invert' : ''}`}
                    />
                    <p className='sm:text-base'>Welcome to the future of influence</p>
                    <div className='flex gap-3 sm:gap-4'>
                        <Image 
                          height={15} 
                          width={15} 
                          src="/ig.svg" 
                          alt="instagram-logo" 
                          className='inline-block w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] cursor-pointer hover:opacity-80 transition'
                        />
                        <Image 
                          height={15} 
                          width={15} 
                          src="/fb.svg" 
                          alt="facebook-logo" 
                          className='inline-block w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] cursor-pointer hover:opacity-80 transition'
                        />
                        <Image 
                          height={15} 
                          width={15} 
                          src="/tk.svg" 
                          alt="tiktok-logo" 
                          className='inline-block w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] cursor-pointer hover:opacity-80 transition'
                        />
                        <Image 
                          height={15} 
                          width={15} 
                          src="/ln.svg" 
                          alt="linkedin-logo" 
                          className='inline-block w-[20px] sm:w-[20px] h-[20px] sm:h-[20px] cursor-pointer hover:opacity-80 transition'
                        />
                    </div>
                </div>

                <div className='h-[18vh] w-[.5px] bg-[#4f4f4f]'></div>

                {/* Links Section */}
                <div className='flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-20 lg:gap-40'>
                    {/* Company Links */}
                    <div className='min-w-[20vw]'>
                        <h1 className='font-archivo uppercase font-medium text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-3'>
                          product
                        </h1>
                        <div className='flex flex-col gap-2'>
                            {["Sign in", "About", "How it works", "Features", "Pricing", "FAQs"].map((item, index) => (
                              <Link 
                                key={index} 
                                href="#" 
                                className='block text-xs hover:underline transition'
                              >
                                {item}
                              </Link>
                            ))}
                        </div>
                    </div>

                    {/* Contact Links */}
                    <div className='min-w-[10vw]'>
                        <h1 className='font-archivo uppercase font-medium text-lg sm:text-xl lg:text-2xl pb-2 sm:pb-3'>
                          company
                        </h1>
                        <div className='flex flex-col gap-2'>
                            {["Contact us", "Terms of use", "Privacy policy", "Cookies settings"].map((item, index) => (
                              <Link 
                                key={index} 
                                href="#" 
                                className='block text-xs hover:underline transition'
                              >
                                {item}
                              </Link>
                            ))}
                        </div>
                    </div>
                </div>
        </div>     
        <div className='flex absolute z-50 justify-between bottom-0 w-[92%] flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 pb-6 sm:pb-8 border-b border-[#4f4f4f]'>
                <p className='text-xs sm:text-sm text-zinc-600'>
                  © 2025 fyuze.ai. A UK registered company. All rights reserved
                </p>
                <div className='flex flex-col sm:flex-row gap-3 sm:gap-6'>
                    <Link 
                      href="#" 
                      className='text-xs sm:text-sm hover:underline transition'
                    >
                      Terms & conditions
                    </Link>
                    <Link 
                      href="#" 
                      className='text-xs sm:text-sm hover:underline transition'
                    >
                      Privacy policy
                    </Link>
                </div>
        </div>  
      </div>
      <div className='pointer-events-none relative h-[45vh] overflow-visible'>
        <motion.div
          style={{ opacity: bgTextGradOpacity }}
          className='w-[100vw] h-auto bottom-0 absolute'
        >
          <Image 
            src="/footerGradient.svg" 
            alt="footer-logo" 
            width={150} 
            height={50} 
            className='w-full h-auto'
          />
        </motion.div>
        <motion.div
          style={{ y: bgTextY }}
          className='w-[96vw] h-auto top-4 absolute left-1/2 -translate-x-1/2'
        >
          <Image 
            src="/footerLogo.svg" 
            alt="footer-logo" 
            width={150} 
            height={50} 
            className='w-full h-auto'
          />
        </motion.div>
      </div>
    </div>
  )
}