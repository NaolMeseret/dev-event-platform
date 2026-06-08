"use server"
import { Event } from "@/database"
import connectDB from "../mongodb"

export const getEvents = async () => {
  try {
    await connectDB()
    const events = await Event.find().sort({ createdAt: -1 }).lean()
    return events
  } catch (e) {
    console.error("Error fetching events:", e)
    return []
  }
}

export const getEventBySlug = async (slug: string) => {
  try {
    await connectDB()
    const event = await Event.findOne({ slug }).lean()
    return event
  } catch (e) {
    console.error("Error fetching event by slug:", e)
    return null
  }
}

export const getSimilarEventsBySlug = async (slug: string) => {
  try {
    await connectDB()
    const event = await Event.findOne({ slug })
    return await Event.find({
      _id: { $ne: event._id },
      tags: { $in: event.tags },
    }).lean()
  } catch (e) {
    return []
  }
}
