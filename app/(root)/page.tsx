// import Hello from "../components/Hello"
import Hello from "@/components/Hello"

const Home = () => {
  console.log("server side log")
  return (
    <main>
      <div>Welcome to Next.js</div>
      <Hello />
    </main>
  )
}

export default Home
