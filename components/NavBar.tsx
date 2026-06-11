import Image from "next/image"
import Link from "next/link"
import AuthButtons from "./AuthButtons" // 👈 import

const NavBar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image src="/icons/logo.png" alt="logo" width={24} height={24} />
          <p>DevEvents</p>
        </Link>
        <ul>
          <Link href="/">Home</Link>
          <Link href="#event-card">Events</Link>
          <Link href="/">Create Event</Link>
        </ul>
        <AuthButtons />
      </nav>
    </header>
  )
}

export default NavBar
