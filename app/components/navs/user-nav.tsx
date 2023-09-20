'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { FaGoogle } from 'react-icons/fa6'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export function UserNav() {
    const { data: session } = useSession()
    const [loading, setLoading] = useState(true)
    const router = useRouter()

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

    return session && session.user ? (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full"
                >
                    <Avatar className="h-10 w-10">
                        <AvatarImage
                            src={session.user.image!}
                            alt="User Image"
                        />
                        <AvatarFallback>AL</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {session.user.name}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session.user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <Link href={'/dashboard'}>
                        <DropdownMenuItem>Dashboard</DropdownMenuItem>
                    </Link>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => {
                        signOut()
                        router.push('/')
                    }}
                >
                    Log out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    ) : loading ? (
        <Button variant={'ghost'}>
            Loading...
            <span className="loading loading-spinner loading-xs"></span>
        </Button>
    ) : (
        <Button
            variant={'destructive'}
            disabled={loading}
            onClick={handleSignInWithGoogle}
            className={`${loading ? 'opacity-50' : ''}`}
        >
            Sign in with <FaGoogle className="ml-2" width={10} />
        </Button>
    )
}
