import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchFilters from "./components/SearchFilters";
import FeaturedProperties from "./components/FeaturedProperties";
import CuratedCollections from "./components/CuratedCollections";
import MarketStats from "./components/MarketStats";
import Benefits from "./components/Benefits";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <Hero />
      <SearchFilters />
      <FeaturedProperties />
      <CuratedCollections />
      <MarketStats />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </div>
  );
}
