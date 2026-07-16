import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import CategoryCard from "../components/CategoryCard";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <SearchBar />

      <section className="categories">
        <CategoryCard title="Laptops" />
        <CategoryCard title="Phones" />
        <CategoryCard title="Printers" />
        <CategoryCard title="Networking" />
      </section>

      <Footer />
    </>
  );
}