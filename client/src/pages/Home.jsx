import Cards from "../components/Card/Card";
import FeaturedCarousel from "../components/CardDestac/CardDestac";
import Navbar from "../components/Navbar/Navbar";

export default function Home() {
  return (
    <div>
        <Navbar/>
        <div><FeaturedCarousel/></div>
      <div>
        <Cards />
      </div>
    </div>
  );
}
