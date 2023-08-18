"use client";
import {
  FaArrowRight,
  FaBook,
  FaEye,
  FaFacebook,
  FaInstagram,
  FaPen,
  FaSearchengin,
  FaTwitter,
  FaWhatsapp,
  FaQuoteRight,
  FaArrowLeft,
} from "react-icons/fa6";
import { useState, useEffect } from "react";
import Image from "next/image";
import imgone from "./imgs/imgone.png";
import imgtwo from "./imgs/imgtwo.png";
import imgthree from "./imgs/imgthree.png";
import imgfour from "./imgs/imgfour.png";
import imgfive from "./imgs/imgfive.png";
import imgsix from "./imgs/imgsix.png";
import logo from "./imgs/logo.jpg";
const slides = [
  {
    url: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2620&q=80",
    name: "Mr Himadwise",
    title: "CEO of AlhilaalEstate",
    description:
      "Lorem ipsum dolor  architecto minus saepe magnam optio nostrum.",
  },
  {
    url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
    name: "Ali Abdi nuur",
    title: "CTO of AlhilaalEstate",
    description:
      "lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
  },
  {
    url: "https://images.unsplash.com/photo-1661961112951-f2bfd1f253ce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2672&q=80",
    name: "Abdullahi Abdi nuur",
    title: "COO of AlhilaalEstate",
    description:
      " Ut modi repellat dignissimos, consequatur obcaecati voluptates officiis iste odit ipsa ea. Eligendi quo quaerat quisquam architecto minus saepe magnam optio nostrum..",
  },
];
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === slides.length - 1 ? 0 : currentSlide + 1
    );

    console.log(currentSlide);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide) =>
      currentSlide === 0 ? slides.length - 1 : currentSlide - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="bg-white">
      {/* hero section */}
      <div className="p-4 bg-hero flex md:h-[90vh]">
        <div className="my-8 w-full h-full flex flex-col items-center justify-center space-y-4 text-center md:ml-24 md:text-left ml-4">
          <h1 className="capitalize mt-4 text-6xl font-bold md:text-3xl lg:text-6xl">
            Find a perfect property{" "}
            <span className="bg-indigo-300 text-white">Where </span>
            you'll love to live
          </h1>
          <p className="text-xl md:text-lg lg:text-2xl">
            Welcome to Al-hillal Real estate where you can find more comfortable
            life than else.
          </p>
        </div>
        <img
          className="hidden md:block w-[400px] lg:w-[600px] h-[100%] pt-4 "
          src="https://realstatic.staticmania.com/images/hero/hero-bg.png"
          alt=""
        />
      </div>

      {/* Vision mision section */}

      <div className="my-12 p-4 lg:flex md:mx-28 ">
        <div className="m-4 p-8 bg-hero rounded-3xl">
          <h1 className="text-3xl">
            Simple & easy way to find your dream apartment
          </h1>
          <p className="mt-4 text-lg">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
          <button className="px-8 py-4 bg-gray-600 text-white shadow-md my-4 cursor-pointer hover:bg-gray-200 transition-all hover:text-black duration-500 rounded-lg">
            Get Started
          </button>
        </div>

        <div className="grid grid-cols-2 m-4 gap-4">
          <div className="card-bg text-xl border border-cyan-200 px-8 py-12 rounded-3xl">
            <FaSearchengin />
            <h2 className="mt-4">Vision</h2>
          </div>
          <div className="card-bg text-xl border border-cyan-200 px-8 py-12 rounded-3xl">
            <FaEye />
            <h2 className="mt-4">Mission</h2>
          </div>
          <div className="card-bg text-xl border border-cyan-200 px-8 py-12 rounded-3xl">
            <FaBook />
            <h2 className="mt-4">Motto </h2>
          </div>
          <div className="card-bg text-xl border border-cyan-200 px-8 py-12 rounded-3xl">
            <FaPen />
            <h2 className="mt-4">Read More About us</h2>
          </div>
        </div>
      </div>

      {/* Featured property */}

      <div className="m-12 md:mx-36">
        <div className="md:flex justify-between items-center">
          <h2 className="text-3xl font-bold">Featured Properites</h2>
          <div className="hidden md:flex items-center space-x-1">
            <p>Explore All</p>
            <FaArrowRight className="hover:translate-x-1 duration-100 cursor-pointer" />
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid md:grid-cols-2  lg:grid-cols-3">
          <div className="rounded-md ">
            <Image className="rounded-md" src={imgone} alt="" />
          </div>
          <div className="rounded-md ">
            <Image className="rounded-md" src={imgtwo} alt="" />
          </div>
          <div className="rounded-md">
            <Image className="rounded-md" src={imgthree} alt="" />
          </div>
          <div className="rounded-md">
            <Image className="rounded-md" src={imgfour} alt="" />
          </div>
          <div className="rounded-md pro-bg">
            <Image className="rounded-md" src={imgfive} alt="" />
          </div>
          <div className="rounded-md pro-bg">
            <Image className="rounded-md" src={imgsix} alt="" />
          </div>
        </div>
      </div>

      {/* Teamate Section */}
      <section className="m-12 w-[400px] md:mx-36  md:w-[1024px] mx-auto">
        <div className="md:grid grid-cols-2 items-center justify-center shadow-xl">
          <div className="w-full">
            <img
              src={slides[currentSlide].url}
              alt="slide"
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="mt-8  md:flex flex-col w-full ml-4">
            <div className="flex flex-col w-full h-full">
              <div className="flex justify-around">
                <div className="">
                  <h1 className="text-4xl font-bold t">
                    {slides[currentSlide].name}
                  </h1>
                  <h2 className="text-2xl font-bold mt-2">
                    {slides[currentSlide].title}
                  </h2>
                </div>
                <FaQuoteRight className="text-6xl text-gray-300" />
              </div>
              <p className="w-96 mt-4 md:mt-12 flex-wrap">
                {slides[currentSlide].description}
              </p>
            </div>
            <div className="flex flex-col items-center justify-between w-full h-full">
              <div className="flex items-center justify-around my-8 w-full h-full">
                <div className="flex items-center gap-x-1">
                  <FaArrowLeft
                    className="text-sm cursor-pointer"
                    onClick={prevSlide}
                  />
                  <small>Pevious</small>
                </div>
                <div className="flex gap-x-1 items-center">
                  <small>Next</small>
                  <FaArrowRight
                    className="text-sm cursor-pointer"
                    onClick={nextSlide}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer Section */}
      <div className="mx-12 mt-36 mb-8 md:mx-36">
        <div className="grid gap-y-4 md:flex  justify-between items-center">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-start">
              <Image
                className="w-10 h-10 text-white p-1  rounded-full border-2 border-gray-300 bg-gray-100"
                src={logo}
                alt=""
              />
              <h2 className="ml-2 text-2xl  font-bold capitalize">
                Alhillal Real Estate
              </h2>
            </div>
            <h3 className="mx-2">Address :Hodan-Mogadisu</h3>
            <h3 className="mx-2">Phone : +(252) 61-5902098</h3>
            <h3 className="mx-2">Gamail :alhilalEsate@gamil.com</h3>
            <div className="flex mx-2 gap-x-8 text-2xl">
              <FaInstagram className="cursor-pointer hover:translate-y-2 duration-1000" />
              <FaFacebook className="cursor-pointer hover:translate-y-2 duration-1000" />
              <FaWhatsapp className="cursor-pointer hover:translate-y-2 duration-1000" />
              <FaTwitter className="cursor-pointer hover:translate-y-2 duration-1000" />
            </div>
          </div>
          <div className="mx-2">
            <h2 className="text-lg mb-4 uppercase font-bold">Our page</h2>
            <ul className="grid gap-y-2">
              <li>
                <a className="hover:underline" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  About us
                </a>
              </li>
              <li>
                <a className="hover:underline" href="#">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="mx-2">
            <h2 className="text-lg mb-4 uppercase font-bold">Other Pages</h2>
            <ul className="grid gap-y-2">
              <li>
                <a className="hover:underline" href="#">
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-12">
        <hr className=" md:hidden border border-cyan-200" />
        <p className="uppercase my-4 mx-12 md:mx-36">
          alhilaal Real estate &copy;2023
        </p>
      </div>
    </main>
  );
}
