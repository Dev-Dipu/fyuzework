import React from 'react'
import Content from './Content';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div 
        className='relative h-auto min-h-[35vh] md:h-[35vh]'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative h-auto md:h-[calc(100vh+35vh)] md:-top-[100vh]'>
            <div className='h-auto md:h-[35vh] p-4 sm:p-6 md:p-12 lg:p-20 md:sticky md:top-[calc(100vh-35vh)]'>
              {/* Main Content Section */}
              <div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 h-full'>
                {/* Logo and Social Section */}
                <div className='space-y-3 sm:space-y-4 flex-shrink-0'>
                    <Image 
                      height={100} 
                      width={100} 
                      src="/assets/fyuze-dark.svg" 
                      alt="fyuze-logo"
                      className='w-[100px] sm:w-[120px] md:w-[130px] h-auto'
                    />
                    <p className='text-sm sm:text-base'>Welcome to the future of influence</p>
                    <div className='flex gap-3 sm:gap-4'>
                        <Image 
                          height={25} 
                          width={25} 
                          src="/ig.svg" 
                          alt="instagram-logo" 
                          className='inline-block w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] cursor-pointer hover:opacity-80 transition'
                        />
                        <Image 
                          height={25} 
                          width={25} 
                          src="/fb.svg" 
                          alt="facebook-logo" 
                          className='inline-block w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] cursor-pointer hover:opacity-80 transition'
                        />
                        <Image 
                          height={25} 
                          width={25} 
                          src="/tk.svg" 
                          alt="tiktok-logo" 
                          className='inline-block w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] cursor-pointer hover:opacity-80 transition'
                        />
                        <Image 
                          height={25} 
                          width={25} 
                          src="/ln.svg" 
                          alt="linkedin-logo" 
                          className='inline-block w-[25px] sm:w-[30px] h-[25px] sm:h-[30px] cursor-pointer hover:opacity-80 transition'
                        />
                    </div>
                </div>

                {/* Links Section */}
                <div className='flex flex-col sm:flex-row gap-8 sm:gap-12 md:gap-20 lg:gap-40'>
                    {/* Company Links */}
                    <div className='min-w-0'>
                        <h1 className='font-archivo uppercase font-medium text-xl sm:text-2xl lg:text-3xl pb-2 sm:pb-3'>
                          The company
                        </h1>
                        <div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6 lg:gap-8'>
                            <Link 
                              href="#" 
                              className='block text-sm sm:text-base hover:underline transition'
                            >
                              How it works
                            </Link>
                            <Link 
                              href="#" 
                              className='block text-sm sm:text-base hover:underline transition'
                            >
                              Features
                            </Link>
                            <Link 
                              href="#" 
                              className='block text-sm sm:text-base hover:underline transition'
                            >
                              Pricing
                            </Link>
                            <Link 
                              href="#" 
                              className='block text-sm sm:text-base hover:underline transition'
                            >
                              Contact sales
                            </Link>
                        </div>
                    </div>

                    {/* Contact Links */}
                    <div className='min-w-0'>
                        <h1 className='font-archivo uppercase font-medium text-xl sm:text-2xl lg:text-3xl pb-2 sm:pb-3'>
                          contact
                        </h1>
                        <div className='flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-6 lg:gap-8'>
                            <Link 
                              href="mailto:Support@fyuze.ai" 
                              className='block text-sm sm:text-base hover:underline transition break-all sm:break-normal'
                            >
                              Support@fyuze.ai
                            </Link>
                            <Link 
                              href="tel:+915676512343" 
                              className='block text-sm sm:text-base hover:underline transition whitespace-nowrap'
                            >
                              +91 56765 12343
                            </Link>
                        </div>
                    </div>
                </div>
              </div>
              
              {/* Footer Bottom Section */}
              <div className='flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 lg:gap-8 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-zinc-300'>
                <p className='text-xs sm:text-sm text-zinc-600'>
                  Copyright © 2023. All rights reserved FYUZE
                </p>
                <div className='hidden sm:block h-5 w-[2px] bg-zinc-600 rounded-2xl'></div>
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
        </div>
    </div>
  )
}