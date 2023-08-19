'use client'

import Image from 'next/image'
import React from 'react'
import { FaArrowRight } from 'react-icons/fa6'

const Properties = () => {
  return (
    <div className='m-12 md:mx-36'>
      <div className='md:flex justify-between items-center'>
        <h2 className='text-3xl font-bold'>Featured Properites</h2>
        <div className='hidden md:flex items-center space-x-1'>
          <p>Explore All</p>
          <FaArrowRight className='hover:translate-x-1 duration-100 cursor-pointer' />
        </div>
      </div>

      <div className='mt-8 grid gap-6 md:grid md:grid-cols-2  lg:grid-cols-3'>
        {['imgone', 'imgtwo', 'imgthree', 'imgfour', 'imgfive', 'imgsix'].map(
          (item, index) => (
            <div
              key={index}
              className='card w-96 bg-sky-100 text-gray-600 shadow-xl'
            >
              <figure>
                <Image
                  className='rounded-md'
                  //   src='/images/imgone.png'
                  src={`/images/${item}.png`}
                  alt=''
                  width={400}
                  height={400}
                />
              </figure>
              <div className='card-body'>
                <h2 className='card-title'>Property One</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>View Details</button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default Properties
