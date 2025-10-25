import Image from 'next/image'
import React from 'react'

const Filter = () => {
  return (
    <div className='h-[80vh] w-[56%] bg-black text-white fixed rounded-3xl top-6 left-[28%] z-[400] p-8'>
      <div className='h-[10] w-full flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <Image src="/faders.svg" alt="faders" width={20} height={20}/>
            <h1>Search with advanced filters</h1>
          </div>
          <Image src="/X.svg" alt="close" width={20} height={20} className='ml-auto cursor-pointer'/>
      </div>
      <div className='pt-5'>
        <h1 className='text-xl font-semibold tracking-tight'>Location</h1>
        <div>
          <p>Brief Description of what you are looking for</p>
          <input
              type="text"
              name="name"
              className={`w-full text-xs md:text-sm lg:text-base px-4 py-[10px] lg:py-3 bg-white/10 backdrop-blur-md border-[1px] rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-[#EE4F20] transition-all duration-300 hover:bg-white/15 outline-none"
              }`}
              placeholder="Enter your full name"
          />
        </div>
      </div>
    </div>
  )
}

export default Filter