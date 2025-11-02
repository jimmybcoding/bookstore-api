import Navbar from "./ui-components/navbar";
import LandingHero from "./ui-components/landingHero";
import FeaturedBook from "./ui-components/featuredBook";
import Footer from "./ui-components/footer";

export default function App() {
  return (
    <div className="min-h-screen text-white bg-black flex flex-col">
      <Navbar />
      <main className="flex-1">
        <LandingHero />
        <FeaturedBook />
        <Footer />
      </main>
    </div>
  );
}
