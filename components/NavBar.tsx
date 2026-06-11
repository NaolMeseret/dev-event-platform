"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import AuthButtons from "./AuthButtons"

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header>
      <nav className="relative flex items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvents</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/">Home</Link>
          <Link href="#event-card">Events</Link>
          <Link href="/create-event">Create Event</Link>
        </div>

        <div className="hidden md:block">
          <AuthButtons />
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute left-0 top-full z-50 flex w-full flex-col items-center gap-4 border-t bg-black py-4 md:hidden">
            <Link href="/">Home</Link>
            <Link href="#event-card">Events</Link>
            <Link href="/">Create Event</Link>
            <AuthButtons />
          </div>
        )}
      </nav>
    </header>
  )
}

export default NavBar
