import BigLogo from "../assets/FelinityBigLogo.png";
import HomeCard from "./HomeCard";

function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F0]">
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col items-center text-center">
          <img
            src={BigLogo}
            alt="Felinity"
            className="w-96 md:w-lg lg:w-160 mb-10"
          />
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-3">
          <HomeCard
            title="Gallery"
            description="Browse an endless collection of adorable cats and save your favourites."
            link="/images"
            buttonText="Explore Gallery"
          />

          <HomeCard
            title="Community"
            description="Share stories, post content, and engage with a community of passionate cat enthusiasts."
            link="/posts"
            buttonText="Join Community"
          />

          <HomeCard
            title="Cat Breeds"
            description="Learn about fascinating cat breeds, their origins, personalities, and unique traits."
            link="/breeds"
            buttonText="Learn More"
          />
        </div>
      </section>

      <footer className="border-t border-taupe-200 py-2 text-center text-taupe-500">
        © 2026 Felinity. Made for cat lovers by a cat lover - Sarthak Rohilla
      </footer>
    </div>
  );
}

export default Home;
