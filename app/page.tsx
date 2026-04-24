import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import MemoryGame from "@/components/game/MemoryGame";
import WorkExperience from "@/components/sections/WorkExperience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import BlogPreview from "@/components/sections/BlogPreview";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";
import AnalyticsEvents from "@/components/analytics/AnalyticsEvents";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <MemoryGame />
      <WorkExperience />
      <Projects />
      <Services />
      <Education />
      <Certifications />
      <BlogPreview />
      <Contact />
      <Footer />
      {/* Tracks section views, scroll depth, outbound clicks */}
      <AnalyticsEvents />
    </>
  );
}
