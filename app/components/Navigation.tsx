'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FaGoogle, FaBars } from 'react-icons/fa6'

const Navigation = () => {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(true)

  // menu items
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Home', link: '/' },
    { id: 2, name: 'About', link: '/about' },
    { id: 3, name: 'Contect', link: '/contact' },
  ])
  const [open, setOpen] = useState(false)
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  const handleSignInWithGoogle = async () => {
    setLoading(true)
    await signIn('google', { callbackUrl: window.location.href })
    setLoading(false)
  }

  const btn = () => {
    if (session && session.user) {
      return (
        <>
          <div className='dropdown dropdown-end'>
            <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
              <div className='w-10 rounded-full'>
                <Image
                  height={40}
                  width={40}
                  src={session.user.image!}
                  alt={session.user.name!}
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className='mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52'
            >
              <li>
                <a className='justify-between'>{session.user.name}</a>
              </li>
              <li>
                <button onClick={() => signOut()} type='button'>
                  <a>Logout</a>
                </button>
              </li>
            </ul>
          </div>
        </>
      )
    } else if (loading) {
      return (
        <button className='btn'>
          Loading...
          <span className='loading loading-spinner loading-xs'></span>
        </button>
      )
    } else {
      return (
        <button
          disabled={loading}
          onClick={handleSignInWithGoogle}
          className={`btn ${loading ? 'btn-disabled opacity-50' : 'd'}`}
        >
          Sign in with <FaGoogle />
        </button>
      )
    }
  }

  return (
    <>
      <header className='navbar bg-light bg-white text-gray-700'>
        <div className='container mx-auto  flex-wrap p-0 flex-col md:flex-row items-center hidden md:flex'>
          <a className='flex title-font font-medium items-center mb-4 md:mb-0'>
            <Image
              src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
              alt='logo'
              className='w-10 h-10 text-white p-1  rounded-full border-2 border-gray-300 bg-gray-100'
              width={40}
              height={40}
            />

            <span className='ml-3 text-xl font-bold '>AlhilaalEstate</span>
          </a>
          <nav className='md:ml-auto flex flex-wrap items-center text-base justify-center'>
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className='mr-5 hover:text-gray-900'
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className='flex md:ml-auto items-center md:space-x-6'>
            {btn()}
          </div>
        </div>
        {/* mobile menu */}
        {/* <div className="flex items-end justify-between md:hidden"> */}
        <div className='flex items-center w-full justify-between md:hidden'>
          <div className=''>
            <a className='flex title-font font-medium items-center mb-4 md:mb-0'>
              <Image
                src='https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80'
                alt='logo'
                className='w-10 h-10 text-white p-1  rounded-full border-2 border-gray-300 bg-gray-100'
                height={40}
                width={40}
              />

              <span className='ml-3 text-xl font-bold capitalize'>
                alhilaal real estate
              </span>
            </a>
          </div>
          <div className='flex md:ml-auto items-center md:space-x-6'>
            <button
              className='inline-flex place-items-end justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500 mt-0 mr-0'
              aria-label='toggle menu'
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <svg
                  className='block h-6 w-6'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <path
                    className='inline-flex'
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <FaBars />
              )}
            </button>
          </div>
        </div>
      </header>
      {/* mobile menu */}
      <div className={`${open ? 'block' : 'hidden'} md:hidden`}>
        <div className='w-full bg-white shadow-lg flex justify-center items-center opacity-100'>
          <div className='flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3'>
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={item.link}
                className='block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              >
                {item.name}
              </a>
            ))}
            <div className='px-2 pt-2 pb-3 space-y-1'>{btn()}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Navigation
