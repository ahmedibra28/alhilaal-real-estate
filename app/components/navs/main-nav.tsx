import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface NavConfig {
    label: string
    href: string
    protected?: boolean
}

export interface IMainNav extends React.HTMLAttributes<HTMLElement> {
    navConfig: NavConfig[]
}

export function MainNav({
    className,
    navConfig,

    ...props
}: IMainNav) {
    return (
        <nav
            className={cn(
                'flex divide-x-2 items-center mx-auto space-x-4 lg:space-x-6 justify-between',
                className,
            )}
            {...props}
        >
            <Link
                href={'/'}
                className="flex title-font font-medium items-center mb-4 md:mb-0"
            >
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                    alt="logo"
                    className="w-10 h-10 text-white p-1 rounded-full border-2 border-gray-300 bg-gray-100"
                    width={40}
                    height={40}
                />

                <span className="ml-3 text-xl font-bold ">
                    Alhilaal Real State
                </span>
            </Link>
            <div className="pl-4 space-x-4 hidden md:block lg:space-x-6">
                {navConfig.map(({ label, href }, index) => (
                    <Link
                        key={index}
                        href={href}
                        className={`text-sm font-medium transition-colors hover:text-primary`}
                    >
                        {label}
                    </Link>
                ))}
            </div>
        </nav>
    )
}
