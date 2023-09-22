import React from 'react'
import Image from 'next/image'
import { Button } from '@/app/components/ui'

export function Hero() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-20 lg:py-16 lg:grid-cols-12">
                <div className="mr-auto place-self-center lg:col-span-7">
                    <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
                        Find Your Dream House
                    </h1>
                    <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                        The best way to find your dream house, come on and get
                        your house from online, {"it's"} simple now. Alhilaal
                        east or west is the best option.
                    </p>
                    <div className="space-x-4">
                        <Button size={'lg'} className="h-12">
                            Get Started
                            <svg
                                className="w-5 h-5 ml-2 -mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Button>
                        <Button
                            variant={'outline'}
                            size={'lg'}
                            className="h-12"
                        >
                            Contact Us
                        </Button>
                    </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <div className="w-[27rem] h-[32rem] relative">
                        <Image
                            src="/images/background.jpg"
                            alt="mockup"
                            fill
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
