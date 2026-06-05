import connectDB from "@/lib/mongodb"
import { v2 as cloudinary } from "cloudinary"
import { NextRequest, NextResponse } from "next/server"
import Event from "@/database/event.model"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST(req: NextRequest) {
  try {
    await connectDB()

    const formData = await req.formData()
    let event

    try {
      event = Object.fromEntries(formData.entries())
    } catch (e) {
      return NextResponse.json(
        {
          message: "Invalid JSON data format",
        },
        { status: 400 },
      )
    }
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json(
        {
          message: "Image file is requires",
        },
        {
          status: 400,
        },
      )
    }

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "image",
            folder: "Dev-Event",
          },
          (error, results) => {
            if (error) return reject(error)
            // if (results) return
            resolve(results)
          },
        )
        .end(buffer)
    })

    event.image = (uploadResult as { secure_url: string }).secure_url
    const createdEvent = await Event.create(event)
    return NextResponse.json(
      {
        message: "Event Created Successfully",
        event: createdEvent,
      },
      {
        status: 201,
      },
    )
  } catch (e) {
    console.error("FULL ERROR:", e)
    return NextResponse.json(
      {
        message: "Event Creation Failed",
        error: e instanceof Error ? e.message : JSON.stringify(e),
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    await connectDB()
    const events = await Event.find().sort({ createdAt: -1 })
    return NextResponse.json(
      {
        message: "Events Fetched Successfully",
        events,
      },
      { status: 200 },
    )
  } catch (e) {
    return NextResponse.json(
      {
        message: "Event Fetching failed",
        error: e,
      },
      {
        status: 500,
      },
    )
  }
}
