"use client"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"
import Image from "next/image"

const AuthButtons = () => {
  const { data: session, status } = useSession()

  // still loading — show nothing to avoid flicker
  if (status === "loading") {
    return (
      <div className="flex items-center gap-3">
        <div className="w-20 h-8 rounded-full bg-dark-200 animate-pulse" />
        <div className="w-20 h-8 rounded-full bg-dark-200 animate-pulse" />
      </div>
    )
  }

  // NOT logged in
  if (!session) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/login"
          className="text-light-200 hover:text-white text-sm font-medium transition-colors"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-primary hover:bg-primary/90 text-black text-sm font-semibold px-5 py-2 rounded-full transition-colors"
        >
          Sign Up
        </Link>
      </div>
    )
  }

  // IS logged in
  return (
    <div className="flex items-center gap-3">
      {/* avatar */}
      {session.user?.image ? (
        <Image
          src={session.user.image}
          alt="avatar"
          width={32}
          height={32}
          className="rounded-full border border-dark-200"
        />
      ) : (
        // fallback — first letter of name
        <div className="w-8 h-8 rounded-full bg-primary flex-center text-black text-sm font-bold flex-shrink-0">
          {session.user?.name?.[0]?.toUpperCase()}
        </div>
      )}

      {/* name */}
      <span className="text-light-100 text-sm font-medium max-sm:hidden">
        Hi, {session.user?.name?.split(" ")[0]} 👋
      </span>

      {/* logout */}
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-light-200 hover:text-white text-sm font-medium transition-colors cursor-pointer"
      >
        Logout
      </button>
    </div>
  )
}

export default AuthButtons
