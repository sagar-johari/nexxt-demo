"use client";
import localFont from "next/font/local";
import Link from 'next/link';
import Image from "next/image";
import "./globals.css";
import Head from "next/head";
import { CiTwitter } from "react-icons/ci";
import { FiGithub } from "react-icons/fi";
import { useState,useEffect } from "react";
import CustomCursor from "./components/CustomCursor";

export default function RootLayout({ children }) {
  const [isScrollingUp, setIsScrollingUp] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;

      if (isBottom) {
        setIsAtBottom(true); // At the bottom of the page
      } else {
        setIsAtBottom(false); // Not at the bottom
      }

      if (window.scrollY < lastScrollY  && !isAtBottom) {
        setIsScrollingUp(true);
      } else if (window.scrollY > lastScrollY && !isAtBottom) {
        setIsScrollingUp(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, isAtBottom]);

  function handleCheckChange(e) {
    const isChecked = e.target.checked;
    document.documentElement.style.setProperty(
      '--background',
      isChecked ? '#171717' : '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--foreground',
      isChecked ? '#ffffff' : '#171717'
    );
  }

  

  return (
    <html lang="en">

<CustomCursor/> 
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/ionicons@5.5.2/dist/css/ionicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <body>
      <div className="filter-color"></div>
    <header className={`fixed top-0 left-5 right-5 z-50  transition-transform duration-300 ${
          isScrollingUp ? "translate-y-0" : "-translate-y-full"
        }`} >
      {/* Logo */}
      <div className="flex items-center space-x-4 ps-0">
        <span className="rubik logo">SJ</span>
        {/* Description */}
        <div className="flex space-x-4">
          <p className="">
            Sagar Johari - Front-End Developer
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center">
  <label className="relative inline-block w-14 h-8">
    <input type="checkbox" onChange={handleCheckChange} className="peer hidden" />
    <span
      className="absolute inset-0 rounded-full border-2 border-white bg-black transition peer-checked:bg-white peer-checked:border-black"
    ></span>
    <span
      className="absolute top-1 left-1 h-6 w-6 rounded-full bg-white transition peer-checked:translate-x-6 peer-checked:bg-black border-black"
    ></span>
  </label>
</div>



      <nav className="hidden md:flex space-x-6">
            <Link href="/">Home</Link> 
            <Link href="/about">About</Link> 
            <Link href="/works">Works</Link> 
            <Link href="/works">Skills</Link>  
            <Link href="/contact">Contact</Link>
      </nav>

      {/* Social Icons */}
      <div className="flex gap-4 space-x-4">
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" >
      <CiTwitter size={25}/>
        </a>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="">
        <FiGithub size={20} />
        </a>
      </div>
    </header>
    
        {children}
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>

      </body>
    </html>
  );
}
