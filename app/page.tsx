import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import WorkExperience from "@/components/WorkExperience";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Education from "@/components/Education";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnalyticsEvents from "@/components/AnalyticsEvents";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <WorkExperience />
      <Projects />
      <Services />
      <Education />
      <BlogPreview />
      <Contact />
      <Footer />
      {/* Tracks section views, scroll depth, outbound clicks */}
      <AnalyticsEvents />
    </>
  );
}
