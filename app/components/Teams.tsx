'use client'

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaQuoteRight } from 'react-icons/fa6'

const Teams = () => {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    )

    console.log(currentSlide)
  }

  const prevSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    )
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const slides = [
    {
      url: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80',
      name: 'Mr Himadwise',
      title: 'CEO of AlhilaalEstate',
      description:
        'Lorem ipsum dolor  architecto minus saepe magnam optio nostrum.',
    },
    {
      url: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80',
      name: 'Ali Abdi nuur',
      title: 'CTO of AlhilaalEstate',
      description:
        'lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    },
    {
      url: 'https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80',
      name: 'Abdullahi Abdi nuur',
      title: 'COO of AlhilaalEstate',
      description:
        ' Ut modi repellat dignissimos, consequatur obcaecati voluptates officiis iste odit ipsa ea. Eligendi quo quaerat quisquam architecto minus saepe magnam optio nostrum..',
    },
  ]

  return (
    <section className='m-12 w-[400px] md:mx-36  md:w-[1024px] mx-auto text-gray-600'>
      <div className='md:grid grid-cols-2 items-center justify-center shadow-xl'>
        <div className='w-full'>
          <Image
            src={slides[currentSlide].url}
            alt='slide'
            className='w-full h-full object-cover rounded-md'
            width={600}
            height={400}
          />
        </div>
        <div className='mt-8  md:flex flex-col w-full ml-4'>
          <div className='flex flex-col w-full h-full'>
            <div className='flex justify-around'>
              <div className=''>
                <h1 className='text-4xl font-bold t'>
                  {slides[currentSlide].name}
                </h1>
                <h2 className='text-2xl font-bold mt-2'>
                  {slides[currentSlide].title}
                </h2>
              </div>
              <FaQuoteRight className='text-6xl text-gray-300' />
            </div>
            <p className='w-96 mt-4 md:mt-12 flex-wrap'>
              {slides[currentSlide].description}
            </p>
          </div>
          <div className='flex flex-col items-center justify-between w-full h-full'>
            <div className='flex items-center justify-around my-8 w-full h-full'>
              <div className='flex items-center gap-x-1'>
                <FaArrowLeft
                  className='text-sm cursor-pointer'
                  onClick={prevSlide}
                />
                <small>Pevious</small>
              </div>
              <div className='flex gap-x-1 items-center'>
                <small>Next</small>
                <FaArrowRight
                  className='text-sm cursor-pointer'
                  onClick={nextSlide}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Teams
