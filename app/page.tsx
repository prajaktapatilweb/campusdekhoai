import Navbar from "@/components/navbar";
import HeroSlider from "@/components/hero-slider";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import AppThemeSetting from "./AppThemeSetting";
import EventCards from "@/components/events";
import Gallery from "@/components/Gallery";
import Colleges from "@/components/colleges";
import ExpertGuidesSection from "@/components/expertguide";
import FAQSection from "@/components/faq";
import SeminarAgenda from "@/components/eventstimeline";
import CTABanner from "@/components/ctabanner";
import EventCardsSection from "@/components/Appcard";
import PartnerColleges from "@/components/partnercolleges";
import Partnerstrip from "@/components/partnerstrip";
import UniversityCards from "@/components/Slider";

export default function Page() {
  return (
    <>
      <main>
        <AppThemeSetting />
        <Navbar />
        <HeroSlider />
        <Partnerstrip />
        <AboutSection />
        <EventCards />
        <ServicesSection />
        {/* <Gallery /> */}
        {/* <UniversityCards /> */}
        {/* <PartnerColleges /> */}
        {/* <Colleges /> */}
        {/* <TestimonialsSection /> */}
        <ExpertGuidesSection />
        <SeminarAgenda />
        <FAQSection />
        {/* <CTABanner /> */}
        <Footer />
        {/* <EventCardsSection /> */}
      </main>
    </>
  );
}
