import ExploreBtn from "@/components/ExploreBtn"

const Home = () => {
  console.log("server side log")
  return (
    <main>
      <section>
        <h1 className="text-center">
          The Hub for Every Dev <br />
          Event You Can't Miss
        </h1>
        <p className="text-center mt-5">
          Hackathons, Meetups, Conferences, All in One Place
        </p>
        <ExploreBtn />
      </section>
    </main>
  )
}

export default Home
