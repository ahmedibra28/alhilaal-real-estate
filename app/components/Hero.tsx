'use client'

import Image from 'next/image'
import React from 'react'

const Hero = () => {
  return (
    <div className='hero min-h-screen bg-sky-200 text-gray-600 mx-auto justify-start'>
      <div className='hero-content flex-col lg:flex-row-reverse'>
        <div className='lg:w-[60%]'>
          <h1 className='text-6xl font-bold'>
            {' '}
            Find a perfect property{' '}
            <span className='bg-indigo-300 text-white'>Where </span>
            you&apos;ll love to live{' '}
          </h1>

          <p className='py-6'>
            {' '}
            Welcome to Al-hillal Real estate where you can find more comfortable
            life than else.
          </p>
          <button className='btn btn-primary'>Get Started</button>
        </div>

        <Image
          className='max-w-5xl w-full hidden lg:block lg:h-[75%] absolute right-0 -bottom-16 -z-20'
          src='https://realstatic.staticmania.com/images/hero/hero-bg.png'
          alt=''
          width={900}
          height={400}
        />
      </div>
    </div>
  )
}

export default Hero
