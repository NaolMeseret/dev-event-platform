import bcrypt from "bcryptjs"
import connectDB from "@/lib/mongodb"
import User from "@/database/user.model"
import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    // 1. get data from request
    const { name, email, password } = await req.json()

    // 2. validate — make sure nothing is empty
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 },
      )
    }

    console.log(name, email)

    // 3. connect to database
    await connectDB()

    // 4. check if email already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 400 },
      )
    }

    // 5. hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    //                                              👆
    //                                    "salt rounds" — how strong
    //                                    10 is the standard ✅

    // 6. save user to database
    await User.create({
      name,
      email,
      password: hashedPassword, // never save plain password!
      provider: "credentials",
    })

    // 7. return success
    return NextResponse.json(
      { message: "Account created successfully" },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 },
    )
  }
}
