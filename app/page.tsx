// 'use client'
import Hero from './components/Hero'
import MV from './components/MV'
import Properties from './components/Properties'
import Teams from './components/Teams'
import Footer from './components/Footer'

export default function Home() {
    return (
        <main className="flex h-[90vh] flex-col items-center justify-center p-24">
            <h1 className="text-gray-500">HOME PAGE</h1>
            <main className="bg-white">
                <Hero />
                <MV />
                <Properties />
                <Teams />
                <Footer />

                <div className="mt-12">
                    <hr className=" md:hidden border border-cyan-200" />
                    <p className="uppercase my-4 mx-12 md:mx-36 text-center">
                        alhilaal Real estate &copy;2023
                    </p>
                </div>
            </main>
        </main>
    )
}
