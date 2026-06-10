import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import GitHub from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/database/user.model"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    // ── Provider 1: Google ──
    Google,
    // automatically reads AUTH_GOOGLE_ID and AUTH_GOOGLE_SECRET
    // from your .env.local

    // ── Provider 2: GitHub ──
    GitHub,
    // automatically reads AUTH_GITHUB_ID and AUTH_GITHUB_SECRET
    // from your .env.local

    // ── Provider 3: Email + Password ──
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string
          password: string
        }

        // connect to database
        await connectDB()

        // find user by email
        const user = await User.findOne({ email })

        // user not found?
        if (!user) return null

        // google/github user trying to use password?
        if (!user.password) return null

        // check password matches
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return null

        // ✅ all good — return user
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        }
      },
    }),
  ],

  // ── Callbacks ──
  // these run automatically during login
  callbacks: {
    // runs when ANY user signs in
    async signIn({ user, account }) {
      // only handle Google and GitHub here
      // credentials users are handled in authorize() above
      if (account?.provider === "credentials") return true

      try {
        await connectDB()

        // check if user already exists
        const exists = await User.findOne({ email: user.email })

        // new user? save to database
        if (!exists) {
          await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider, // "google" or "github"
          })
        }

        return true // ✅ allow login
      } catch (error) {
        console.error("Error saving user:", error)
        return false // ❌ block login if error
      }
    },

    // runs when session is checked
    async session({ session, token }) {
      // add user id to session
      if (token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },

  // ── Pages ──
  // tell Auth.js where your custom pages are
  pages: {
    signIn: "/login", // your custom login page
  },
})
