"use client"

import Link from "next/link"
import Image from "next/image"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-t-taupe-900 bg-color-dark-100 mt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
              <p className="font-semibold text-foreground">DevEvents</p>
            </Link>
            <p className="text-sm text-muted-foreground">
              The hub for every dev event you can&apos;t miss.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">
              Navigation
            </h3>
            <ul className="space-y-2 list-none">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="#event-card"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Create Event
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Resources</h3>
            <ul className="space-y-2 list-none">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground text-sm">Connect</h3>
            <ul className="space-y-2 list-none">
              <li>
                <Link
                  href="https://x.com/NaolMeseret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Twitter
                </Link>
              </li>
              <li>
                <Link
                  href="https://github.com/NaolMeseret"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://www.linkedin.com/in/naol-meseret-8300232b7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Linkedin
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className=""></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} DevEvents. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Developed by Naol Technologies
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/"
              className="text-xs text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
