'use client'
import { IProperties, useStore } from '@/contexts/store-provider'
import React from 'react'
import Image from 'next/image'
import { HiOutlineLocationMarker } from 'react-icons/hi'
import { LiaBedSolid } from 'react-icons/lia'
import { MdOutlineBathroom } from 'react-icons/md'
import { CiMoneyCheck1 } from 'react-icons/ci'

export function FeaturedListings() {
    const { properties } = useStore()

    return (
        <div className="max-w-screen-xl px-4 py-8 mx-auto">
            <h1 className="text-2xl font-bold">Featured Listings</h1>
            <div className="grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 lg:grid-cols-3">
                {properties.map((item: IProperties, index) => (
                    <>
                        <div
                            className="mt-4 hover:scale-95 hover:transition hover:ease-linear hover:duration-500 rounded-lg bg-white    dark:bg-gray-800 dark:shadow-gray-900"
                            key={index}
                        >
                            <div className="">
                                <div id="project-picture">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        className="h-72 w-full rounded-xl object-cover"
                                        width={192}
                                        height={192}
                                        quality={100}
                                    />
                                </div>
                                <div id="content" className="pt-4">
                                    <h3 className=" text-xl font-bold text-gray-900 dark:text-green-500">
                                        {item.name}
                                    </h3>

                                    <p className="text-blue-600 inline-flex gap-2 items-center py-3 font-medium dark:text-gray-400">
                                        <CiMoneyCheck1 className="text-2xl" />${' '}
                                        {item.pricePerMonth} / Month
                                    </p>

                                    <div className="flex items-center gap-5">
                                        <p className="text-gray-600 inline-flex items-center gap-2 dark:text-gray-400">
                                            <HiOutlineLocationMarker className="text-lg" />
                                            {item.location}
                                        </p>

                                        <p className="text-gray-600 inline-flex items-center gap-2 dark:text-gray-400">
                                            <LiaBedSolid className="text-lg" />
                                            {item.beds} Beds
                                        </p>
                                        <p className="text-gray-600 inline-flex items-center gap-2 dark:text-gray-400">
                                            <MdOutlineBathroom className="text-lg" />
                                            {item.bathrooms} Bathrooms
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}
