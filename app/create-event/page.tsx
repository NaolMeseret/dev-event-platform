"use client"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

const MODES = ["online", "offline", "hybrid"]

export default function CreateEventPage() {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [form, setForm] = useState({
    title: "",
    date: "",
    time: "",
    venue: "",
    location: "",
    mode: "",
    overview: "",
    description: "",
    organizer: "",
    audience: "",
    tags: "",
    agenda: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit() {
    const required = [
      "title",
      "date",
      "time",
      "venue",
      "location",
      "mode",
      "overview",
      "description",
      "organizer",
      "audience",
      "tags",
      "agenda",
    ]
    for (const key of required) {
      if (!form[key as keyof typeof form].trim()) {
        setError(`Please fill in all fields (missing: ${key})`)
        return
      }
    }
    if (!image) {
      setError("Please upload an event image")
      return
    }

    try {
      setLoading(true)
      setError("")

      const formData = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (key === "tags") {
          formData.append(
            "tags",
            JSON.stringify(
              val
                .split(",")
                .map((t) => t.trim())
                .filter(Boolean),
            ),
          )
        } else if (key === "agenda") {
          formData.append(
            "agenda",
            JSON.stringify(
              val
                .split("\n")
                .map((a) => a.trim())
                .filter(Boolean),
            ),
          )
        } else {
          formData.append(key, val)
        }
      })
      formData.append("image", image)

      const res = await fetch("/api/events", {
        method: "POST",
        body: formData,
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.message || "Failed to create event")
        return
      }

      router.push("/")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* heading */}
        <div className="text-center mb-10">
          <h1
            className="text-4xl font-bold text-white mb-2"
            style={{ backgroundImage: "none", WebkitTextFillColor: "white" }}
          >
            Create an Event
          </h1>
          <p className="text-light-200 text-sm">
            Fill in the details below to publish your event
          </p>
        </div>

        {/* card */}
        <div className="bg-dark-100 border border-dark-200 rounded-2xl px-8 py-10 card-shadow flex flex-col gap-6">
          {/* error */}
          {error && (
            <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20">
              <svg
                className="w-4 h-4 text-red-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                />
              </svg>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Event Title */}
          <Field label="Event Title">
            <Input
              name="title"
              placeholder="Enter event title"
              value={form.title}
              onChange={handleChange}
            />
          </Field>

          {/* Date + Time — side by side */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Event Date">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-light-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all [color-scheme:dark]"
                />
              </div>
            </Field>
            <Field label="Event Time">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-light-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all [color-scheme:dark]"
                />
              </div>
            </Field>
          </div>

          {/* Venue + Location — side by side */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Venue">
              <Input
                name="venue"
                placeholder="Enter venue name"
                value={form.venue}
                onChange={handleChange}
              />
            </Field>
            <Field label="Location">
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-light-200">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                </span>
                <input
                  name="location"
                  placeholder="Enter venue or online link"
                  value={form.location}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white placeholder-light-200/40 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                />
              </div>
            </Field>
          </div>

          {/* Event Type */}
          <Field label="Event Type">
            <div className="relative">
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all appearance-none cursor-pointer"
              >
                <option value="" disabled className="text-light-200">
                  Select event type
                </option>
                {MODES.map((m) => (
                  <option key={m} value={m} className="capitalize">
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </option>
                ))}
              </select>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-light-200 pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </div>
          </Field>

          {/* Image Upload */}
          <Field label="Event Image / Banner">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-full rounded-lg border border-dashed border-dark-200 bg-dark-200 hover:border-primary/40 transition-all cursor-pointer overflow-hidden"
            >
              {preview ? (
                <div className="relative w-full h-48">
                  <Image
                    src={preview}
                    alt="preview"
                    fill
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity rounded-lg">
                    <p className="text-white text-sm font-medium">
                      Click to change
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-2 py-8">
                  <div className="w-10 h-10 rounded-full bg-dark-100 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                      />
                    </svg>
                  </div>
                  <p className="text-light-200 text-sm">
                    Upload event image or banner
                  </p>
                  <p className="text-light-200/50 text-xs">
                    PNG, JPG up to 10MB
                  </p>
                </div>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImage}
                className="hidden"
              />
            </div>
          </Field>

          {/* Organizer + Audience — side by side */}
          <div className="grid grid-cols-2 gap-4">
            <Field label="Organizer">
              <Input
                name="organizer"
                placeholder="Event organizer name"
                value={form.organizer}
                onChange={handleChange}
              />
            </Field>
            <Field label="Target Audience">
              <Input
                name="audience"
                placeholder="e.g. Junior developers"
                value={form.audience}
                onChange={handleChange}
              />
            </Field>
          </div>

          {/* Tags */}
          <Field
            label="Tags"
            hint="Separate with commas e.g. react, nextjs, typescript"
          >
            <Input
              name="tags"
              placeholder="Add tags such as react, next, js"
              value={form.tags}
              onChange={handleChange}
            />
          </Field>

          {/* Overview */}
          <Field
            label="Event Overview"
            hint="Short summary (max 500 characters)"
          >
            <textarea
              name="overview"
              placeholder="Brief overview of the event"
              value={form.overview}
              onChange={handleChange}
              rows={2}
              maxLength={500}
              className="w-full px-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white placeholder-light-200/40 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            />
          </Field>

          {/* Description */}
          <Field
            label="Event Description"
            hint="Full description (max 1000 characters)"
          >
            <textarea
              name="description"
              placeholder="Briefly describe the event"
              value={form.description}
              onChange={handleChange}
              rows={4}
              maxLength={1000}
              className="w-full px-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white placeholder-light-200/40 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none"
            />
          </Field>

          {/* Agenda */}
          <Field
            label="Agenda"
            hint="One item per line e.g. 09:00 AM - Opening Keynote"
          >
            <textarea
              name="agenda"
              placeholder={
                "09:00 AM - Opening Keynote\n10:00 AM - Workshop\n12:00 PM - Lunch"
              }
              value={form.agenda}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white placeholder-light-200/40 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all resize-none font-martian-mono"
            />
          </Field>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full py-3 rounded-lg bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-black text-sm font-bold transition-all flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {loading ? (
              <>
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Publishing event...
              </>
            ) : (
              "Save Event"
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Reusable Field wrapper ──
function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label className="text-light-100 text-sm font-medium">{label}</label>
        {hint && <span className="text-light-200/60 text-xs">{hint}</span>}
      </div>
      {children}
    </div>
  )
}

// ── Reusable Input ──
function Input({
  name,
  placeholder,
  value,
  onChange,
}: {
  name: string
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <input
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 rounded-lg bg-dark-200 border border-dark-200 text-white placeholder-light-200/40 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
    />
  )
}
