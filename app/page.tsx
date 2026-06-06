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
import { getEvents } from "@/lib/getEvents";
import HeroContactPopup from "@/components/HeroContactPopup";

export default async function Page() {
  const events = await getEvents();
  return (
    <>
      <main>
        <AppThemeSetting />
        <Navbar />
        <HeroSlider events={events} />
        <Partnerstrip />
        {/* <AboutSection /> */}
        <EventCards events={events} />
        <ServicesSection />
        {/* <Gallery /> */}
        {/* <UniversityCards /> */}
        {/* <PartnerColleges /> */}
        {/* <Colleges /> */}
        {/* <TestimonialsSection /> */}
        <SeminarAgenda />
        <ExpertGuidesSection />
        <FAQSection />
        {/* <CTABanner /> */}
        <Footer />
        {/* <EventCardsSection /> */}
        <HeroContactPopup
          eventLocations={events.map((e: any) => ({
            label: e.city,
            value: e.city,
            id: e._id,
          }))}
        />
      </main>
    </>
  );
}
