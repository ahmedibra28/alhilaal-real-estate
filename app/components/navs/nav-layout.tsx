'use client'
import React from 'react'
import { IMainNav, MainNav } from './main-nav'
import { Search } from '../search'
import { UserNav } from './user-nav'
import { useSession } from 'next-auth/react'

export default function NavbarLayout() {
    const navs: IMainNav['navConfig'] = [
        { label: 'About', href: '/about', protected: false },
        { label: 'Contact', href: '/contact', protected: false },
        { label: 'Overview', href: '/dashboard', protected: true },
        { label: 'Invoices', href: '/dashboard/invoices', protected: true },
        { label: 'Billings', href: '/dashboard/billings', protected: true },
    ]
    const { data: session } = useSession()

    const isAuth = () => session && session?.user

    const filteredNavs = navs.filter((item) => {
        if (isAuth()) {
            return item.protected
        } else {
            return !item.protected
        }
    })
    return (
        <header className="border-b">
            <div className="max-w-screen-xl mx-auto">
                <div className="flex h-16 items-center px-4">
                    <MainNav className="mx-6" navConfig={filteredNavs} />
                    <div className="ml-auto flex items-center space-x-4">
                        {isAuth() && <Search />}
                        <UserNav />
                    </div>
                </div>
            </div>
        </header>
    )
}
