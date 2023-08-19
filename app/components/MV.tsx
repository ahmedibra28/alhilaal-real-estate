'use client'

import React from 'react'
import { FaBook, FaEye, FaPen, FaSearchengin } from 'react-icons/fa6'

const MV = () => {
  return (
    <div className='my-12 p-4 lg:flex md:mx-28 text-gray-700'>
      <div className='m-4 p-8 bg-sky-200 rounded-3xl'>
        <h1 className='text-3xl'>
          Simple & easy way to find your dream apartment
        </h1>
        <p className='mt-4 text-lg'>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
        <button className='px-8 py-4 bg-gray-600 text-white shadow-md my-4 cursor-pointer hover:bg-gray-200 transition-all hover:text-black duration-500 rounded-lg'>
          Get Started
        </button>
      </div>

      <div className='grid grid-cols-2 m-4 gap-4'>
        <div className='bg-sky-200 text-xl border border-cyan-200 px-8 py-12 rounded-3xl'>
          <FaSearchengin />
          <h2 className='mt-4'>Vision</h2>
        </div>
        <div className='bg-sky-200 text-xl border border-cyan-200 px-8 py-12 rounded-3xl'>
          <FaEye />
          <h2 className='mt-4'>Mission</h2>
        </div>
        <div className='bg-sky-200 text-xl border border-cyan-200 px-8 py-12 rounded-3xl'>
          <FaBook />
          <h2 className='mt-4'>Motto </h2>
        </div>
        <div className='bg-sky-200 text-xl border border-cyan-200 px-8 py-12 rounded-3xl'>
          <FaPen />
          <h2 className='mt-4'>Read More About us</h2>
        </div>
      </div>
    </div>
  )
}

export default MV
