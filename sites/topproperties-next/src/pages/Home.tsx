import { useState } from "react";
import { Link } from "react-router-dom";
import { properties } from "@/data/properties";
import { DEFAULT_FILTERS } from "@/lib/filters";
import { SearchPanel } from "@/components/SearchPanel";
import { PropertyCard } from "@/components/PropertyCard";
import { Container, Eyebrow, SectionHeading, buttonClasses } from "@/components/ui";
import { VillaPreview } from "@/components/VillaPreview";

const destinations = [
  "French Riviera",
  "Amalfi Coast",
  "Tuscany",
  "Costa del Sol",
  "Cyclades",
  "Dubai",
];
const heroImage =
  "https://images.pexels.com/photos/31817160/pexels-photo-31817160.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1400&w=1800";

export function Home() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const featured = properties.filter((p) => p.featured).slice(0, 6);
  return (
    <div className="pt-20">
      <Container>
        <section className="collection-hero" aria-labelledby="collection-title">
          <div className="hero-copy">
            <Eyebrow>The Collection</Eyebrow>
            <h1 id="collection-title">
              A place to live.
              <br />
              <em>A life to love.</em>
            </h1>
            <p>
              Discover remarkable homes in the places you dream of. From a Mediterranean villa to a
              city penthouse, find your own kind of extraordinary.
            </p>
            <Link to="/listings" className={buttonClasses("primary", "lg")}>
              Explore the collection
            </Link>
            <div className="hero-note">
              <span>01 / 06</span>
              <span>
                French Riviera
                <br />
                <strong>Life by the Mediterranean</strong>
              </span>
            </div>
          </div>
          <VillaPreview image={heroImage} />
        </section>
        <section className="discovery-search" aria-label="Find a residence">
          <SearchPanel filters={filters} setFilters={setFilters} />
        </section>
        <div className="collection-index">
          <span>{properties.length} homes in the collection</span>
          <span>Buy · Rent · Discover</span>
          <span>Illustrative property collection</span>
        </div>
      </Container>
      <section className="collection-section">
        <Container>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Selected residences"
              title={
                <>
                  Some places just <em>feel right.</em>
                </>
              }
              description="Distinctive architecture, beautiful settings, and room for the life you imagine."
            />
            <Link to="/listings" className={buttonClasses("outline", "md")}>
              View all residences
            </Link>
          </div>
          <div className="mt-9 grid gap-x-7 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
        </Container>
      </section>
      <section className="collection-section destination-section">
        <Container>
          <div className="destination-heading">
            <Eyebrow>Find your setting</Eyebrow>
            <h2>
              Where will you
              <br />
              <em>feel at home?</em>
            </h2>
            <p>Start with a place. Let the homes tell the rest of the story.</p>
          </div>
          <div className="destination-list">
            {destinations.map((region, i) => {
              const count = properties.filter((p) => p.region === region).length;
              return (
                <Link
                  key={region}
                  to={`/listings?q=${encodeURIComponent(region)}&reserved=1`}
                  className="destination-row"
                >
                  <span className="destination-number">0{i + 1}</span>
                  <span className="destination-name">
                    {region === "Cyclades" ? "Mykonos & the Cyclades" : region}
                  </span>
                  <span className="destination-count">
                    {count} {count === 1 ? "home" : "homes"}
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
}
export default Home;
