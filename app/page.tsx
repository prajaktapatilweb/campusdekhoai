import Navbar from "@/components/navbar";
import HeroSlider from "@/components/hero-slider";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import AppThemeSetting from "./AppThemeSetting";
import EventCards from "@/components/events";
import Gallery from "@/components/Gallery";

export default function Page() {
  return (
    <>


      <main>
        <AppThemeSetting />
        <Navbar />
        <HeroSlider />
        <AboutSection />
        <EventCards />
        <ServicesSection />
        <Gallery />
        {/* <TestimonialsSection /> */}
        {/* <ContactSection /> */}
        <Footer />
      </main>
    </>
  );
}
