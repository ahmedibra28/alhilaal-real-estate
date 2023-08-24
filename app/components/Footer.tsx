import Image from 'next/image'
import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa6'

const Footer = () => {
  return (
    <div className='mx-12 mt-36 mb-8 md:mx-36 text-gray-600'>
      <div className='grid gap-y-4 md:flex  justify-between items-center'>
        <div className='flex flex-col gap-4'>
          <div className='flex items-center justify-start'>
            <Image
              className='w-10 h-10 text-white p-1  rounded-full border-2 border-gray-300 bg-gray-100'
              src='/images/logo.jpg'
              alt=''
              width={100}
              height={100}
            />
            <h2 className='ml-2 text-2xl  font-bold capitalize'>
              Alhillal Real Estate
            </h2>
          </div>
          <h3 className='mx-2'>
            <strong>Address</strong> Hodan-Mogadisu
          </h3>
          <h3 className='mx-2'>
            <strong>Phone</strong> +(252) 61-5902098
          </h3>
          <h3 className='mx-2'>
            <strong>Gmail</strong> alhilalEsate@gamil.com
          </h3>
          <div className='flex mx-2 gap-x-8 text-2xl'>
            <FaInstagram className='cursor-pointer hover:translate-y-2 duration-1000' />
            <FaFacebook className='cursor-pointer hover:translate-y-2 duration-1000' />
            <FaWhatsapp className='cursor-pointer hover:translate-y-2 duration-1000' />
            <FaTwitter className='cursor-pointer hover:translate-y-2 duration-1000' />
          </div>
        </div>
        <div className='mx-2'>
          <h2 className='text-lg mb-4 uppercase font-bold'>Our page</h2>
          <ul className='grid gap-y-2'>
            <li>
              <a className='hover:underline' href='#'>
                Home
              </a>
            </li>
            <li>
              <a className='hover:underline' href='#'>
                About us
              </a>
            </li>
            <li>
              <a className='hover:underline' href='#'>
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className='mx-2'>
          <h2 className='text-lg mb-4 uppercase font-bold'>Other Pages</h2>
          <ul className='grid gap-y-2'>
            <li>
              <a className='hover:underline' href='#'>
                Login
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Footer
