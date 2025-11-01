import Navbar from "./ui components/navbar";
import LandingHero from "./ui components/landingHero";
import FeaturedBook from "./ui components/featuredBook";
import Footer from "./ui components/footer";

export default function App() {
  return (
    <div className="min-h-screen text-white bg-black">
      <Navbar />
      <LandingHero />
      <FeaturedBook />
      <Footer />
    </div>
  );
}
