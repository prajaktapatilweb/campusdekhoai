import Navbar from "@/components/navbar";
import HeroSlider from "@/components/hero-slider";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import Footer from "@/components/footer";
import AppThemeSetting from "./AppThemeSetting";
import EventCards, { EventType } from "@/components/events";
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
import SeminarAgendaNew from "@/components/eventstimelineNew";
export const dynamic = "force-dynamic";

export default async function Page() {
  const eventsAll = await getEvents();
  const events = eventsAll.filter(
    (event: EventType) => new Date(event.endDateTime) > new Date(),
  );
  // .map((e: any) => ({
  //   label: e.city,
  //   value: e.city,
  //   id: e._id,
  // }));

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
        <SeminarAgendaNew />
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
          // eventLocations={events
          //   .filter(
          //     (event: EventType) => new Date(event.endDateTime) > new Date(),
          //   )
          //   .map((e: any) => ({
          //     label: e.city,
          //     value: e.city,
          //     id: e._id,
          //   }))}
        />
      </main>
    </>
  );
}
