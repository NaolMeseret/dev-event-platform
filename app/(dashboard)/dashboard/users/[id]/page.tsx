import React from "react"

const UserDetails = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  return (
    <div>
      <h1>Showing the details for user #{id}</h1>
    </div>
  )
}

export default UserDetails
