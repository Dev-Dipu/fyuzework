import React from 'react'
import Content from './Content';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <div 
        className='relative h-[35vh]'
        style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
        <div className='relative h-[calc(100vh+35vh)] -top-[100vh]'>
            <div className='h-[35vh] p-20 sticky top-[calc(100vh-35vh)]'>
              <div className='flex justify-between h-full'>
                <div className='space-y-4'>
                    <Image height={130} width={130} src="/assets/fyuze-dark.svg" alt="fyuze-logo"/>
                    <p>Welcome to the future of influence</p>
                    <div className='flex gap-4'>
                        <Image height={30} width={30} src="/ig.svg" alt="twitter-logo" className='inline-block'/>
                        <Image height={30} width={30} src="/fb.svg" alt="twitter-logo" className='inline-block'/>
                        <Image height={30} width={30} src="/tk.svg" alt="twitter-logo" className='inline-block'/>
                        <Image height={30} width={30} src="/ln.svg" alt="twitter-logo" className='inline-block'/>
                    </div>
                </div>
                <div className='flex gap-40'>
                    <div>
                        <h1 className='font-archivo uppercase font-medium text-3xl pb-2'>The company</h1>
                        <div className='flex gap-8'>
                            <Link href="#" className='block mt-2'>How it works</Link>
                            <Link href="#" className='block mt-2'>Features</Link>
                            <Link href="#" className='block mt-2'>Pricing</Link>
                            <Link href="#" className='block mt-2'>Contact sales</Link>
                        </div>
                    </div>
                    <div>
                        <h1 className='font-archivo uppercase font-medium text-3xl pb-2'>contact</h1>
                        <div className='flex gap-8'>
                            <Link href="#" className='block mt-2'>Support@fyuze.ai</Link>
                            <Link href="#" className='block mt-2'>+91 56765 12343</Link>
                        </div>
                    </div>
                </div>
              </div>
              
              <div className='flex gap-8'>
                <p>Copyright © 2023. All rights reserved FYUZE</p>
                <div className='h-5 w-[2px] bg-zinc-600 rounded-2xl'></div>
                <div className='flex gap-6'>
                    <Link href="#" className='mr-4'>Terms & conditions</Link>
                    <Link href="#" className='mr-4'>Privacy policy</Link>
                </div>
              </div>
            </div>
        </div>
    </div>
  )
}