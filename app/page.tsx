export const dynamic = 'force-dynamic'

import About from "@/components/home/About";

import Gallery from "@/components/home/Gallery";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div>
      <Hero />
      <About />
      <div id="services">
        <Services />
      </div>
      <Testimonials />
      <Gallery />
    </div>
  );
}
