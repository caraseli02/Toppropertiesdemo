import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import FeaturedProperties from "./components/FeaturedProperties";

export default function App() {
  return (
    <main className="page-shell min-h-screen bg-ivory text-charcoal">
      <div className="absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_top,rgba(169,138,90,0.12),transparent_60%)]" />
      <div className="section-shell">
        <Navbar />
        <Hero />
        <FeaturedProperties />
      </div>
    </main>
  );
}
