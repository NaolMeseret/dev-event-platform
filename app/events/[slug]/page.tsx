import { notFound } from "next/navigation"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>
}) => {
  const { slug } = await params
  const request = await fetch(`${BASE_URL}/api/events/${slug}
    `)
  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
    },
  } = await request.json()
  if (!event) return notFound()
  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
      </div>
    </section>
  )
}

export default EventDetailsPage
