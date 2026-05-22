"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight,CheckCircle2 } from "lucide-react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";

interface ServiceCard {
  title: string;
  image: string;
  description: string;
  points: string[];
}

const tabs = [
  {
    id: "hardware",
    label: "Hardware Services",
    services: [
      {
        title: "Desktop Laptop Chip level repairing",
        image: "/images/hardware.jpg",
        description:
          "Complete hardware solutions including gaming CPU assembly, laptop parts, desktop components, and premium accessories from top brands.",
        points: [
          "Custom gaming CPU assembly",
          "Genuine laptop & desktop replacement parts",
          "RAM, SSD & storage upgrades",
          "GPU & processor installations",
          "Premium keyboards, mice & peripherals",
          "Motherboard & power supply units",
        ],
      },
      {
        title: "Annul Maintenance Contract (AMC)",
        image: "/images/business.png",
        description:
          "Our AMC services ensure regular monitoring, preventive care, and priority technical support for uninterrupted business operations.",
        points: [
"Regular preventive maintenance visits",
"On-site & remote technical support",
"Hardware & software troubleshooting",
"Server and network maintenance",
"System performance optimization",
"Virus removal & security updates",

        ],
      },
      {
        title: "Data Backup Recovery ",
        image: "/images/recovery.jpg",
        description:
          "We ensure secure backups and fast recovery from accidental deletion, hardware failure, virus attacks, or system crashes.",
        points: [
"Hard disk & SSD data recovery",
"Deleted file & formatted drive recovery",
"Server & database backup solutions",
"Cloud backup configuration",
"Ransomware & virus data restoration",
"Secure data migration & transfer services",

        ],
      },
      {
        title: " Laptop Desktop accessories",
        image: "/images/laptops.jpg",
        description:
          "Premium and genuine laptop & desktop accessories, including branded headphones from boAt, Logitech, and other leading manufacturers — designed to enhance performance, comfort, and productivity.",
        points: [
          "Processors (Intel & AMD)",
          "Graphics cards for gaming & work",
          "Cabinets & cooling solutions",
          "Memory & storage modules",
          "Power supply units (SMPS)",
          "Cables, connectors & adapters",
        ],
      },
        {
        title: "Server Management  ",
        image: "/images/server.jpg",
        description:
          "Reliable server management solutions to ensure secure, stable, and high-performance IT infrastructure. We provide installation, configuration, monitoring, maintenance, and ongoing technical support for smooth business operations.",
        points: [
"Server installation & configuration",
"Windows & Linux server setup",
"Active Directory & user management",
"Server monitoring & performance optimization",
"Backup & disaster recovery planning",
"Virtualization setup (VMware / Hyper-V)",
"Security patch updates & firewall configuration",
// "Ongoing maintenance & technical support",

        ],
      },
        {
        title: "Networking Solutions",
        image: "/images/networking.jpg",
        description:
          "Enterprise-grade networking infrastructure including server racks, managed switches, and WiFi router configuration for IT parks.",
        points: [
          "Server rack installation & management",
          "Managed & unmanaged switch setup",
          "WiFi router configuration & deployment",
          "Structured cabling solutions",
          "Network security implementation",
          "IT park infrastructure support",
        ],
      },
    ] as ServiceCard[],
  },
  {
    id: "software",
    label: "Software Services",
    services: [
      {
        title: "Industrial Software’s ",
        image: "/images/industry.jpg",
        description:
          "Expert software installation services including OS setup, productivity tools, antivirus, and enterprise applications for corporates.",
        points: [
          "Windows & Linux OS installation",
          "Antivirus & security software setup",
          "Enterprise application deployment",
          "Driver installation & optimization",
          "Software licensing assistance",
          "Bulk deployment for organizations",
        ],
      },
      {
        title: "Microsoft Office 365 Setup ",
        image: "/images/microsoft.jpg",
        description:
          "Complete Microsoft 365 suite configuration including Teams, SharePoint, OneDrive, and admin console setup for your organization.",
        points: [
          "Microsoft 365 tenant setup",
          "Teams & SharePoint configuration",
          "OneDrive for Business deployment",
          "Admin console management",
          "User account provisioning",
          "Security & compliance settings",
        ],
      },
      {
        title: " AutoCAD",
        image: "/images/autocad.jpg",
        description:
          "Professional AutoCAD installation, configuration, and support services for engineering, architectural, and design professionals. We ensure smooth performance, proper licensing, and optimized system setup for high-efficiency design work.",
        points: [
"AutoCAD installation & activation",
"2D & 3D drafting environment setup",
"Plotter & printer configuration",
"Software troubleshooting & updates",
"Technical support & maintenance assistance",

        ],
      },
      {
        title: " CorelDRAW Photoshop",
        image: "/images/design.png",
        description:
          "Professional installation and setup of CorelDRAW and Adobe Photoshop for graphic design, branding, and creative projects. Optimized configuration to ensure smooth and efficient performance.",
        points: [
"Software installation & activation",
"System performance optimization",
"Version upgrades & updates",
"Basic configuration & troubleshooting support",

        ],
      },
      {
        title: " Tally Prime  ",
        image: "/images/tally.jpg",
        description:
          "Professional Tally Prime installation and setup for efficient accounting and business management. We ensure proper configuration, data security, and smooth performance for hassle-free financial operations.",
        points: [
"Tally Prime installation & activation",
"Data migration & backup support",
"GST & taxation setup",
"Multi-user & network configuration",
"Troubleshooting & technical support",

        ],
      },
      {
        title: "Antivirus ",
        image: "/images/antivirus.webp",
        description:
          "Advanced antivirus installation and security solutions to protect your systems from viruses, malware, ransomware, and cyber threats.We ensure real-time protection and secure performance for your business and personal devices.",
        points: [
"Installation & activation",
"Virus & malware removal",
"Security updates & renewal",
"Basic protection configuration",

        ],
      },
      {
        title: "Reporting Software’s  ",
        image: "/images/reporting.jpg",
        description:
          "Efficient reporting software setup to help businesses generate accurate reports, analyze data, and improve decision-making.",
        points: [
"Installation & configuration",
"Custom report setup",
"Data integration support",
"Maintenance & troubleshooting",

        ],
      },
    ] as ServiceCard[],
  },
  {
    id: "rental",
    label: "Rental Services",
    services: [
      {
        title: "Laptop Rentals",
        image: "/images/laptop.jpg",
        description:
          "High-performance laptop rentals for IT companies, events, training sessions, and project-based needs across India.",
        points: [
          "Wide range of brands & configurations",
          "Short-term & long-term rental plans",
          "Pre-configured with required software",
          "Delivery & setup included",
          "Bulk orders for corporate events",
          "Pan-India supply available",
        ],
      },
      {
        title: "Desktop Rentals",
        image: "/images/desktop.jpg",
        description:
          "Desktop computer rentals ideal for offices, call centers, training labs, and temporary project setups with flexible durations.",
        points: [
          "Complete desktop setups with peripherals",
          "Monitor, keyboard & mouse included",
          "Custom specifications on request",
          "Flexible rental durations",
          "On-site installation & support",
          "Available across Pune & pan-India",
        ],
      },
      {
        title: "Projector Rentals",
        image: "/images/projectors.jpg",
        description:
          "Professional projector rentals for presentations, conferences, training sessions, and corporate events with setup assistance.",
        points: [
          "Full HD & 4K projectors available",
          "Portable & fixed installation options",
          "Screen & mounting accessories",
          "Event & conference support",
          "Same-day delivery in Pune",
          "Technical setup included",
        ],
      },
      {
        title: "Servers Machines On rent (high Performers) ",
        image: "/images/server1.jpg",
        description:
          "High-performance server machines available on rent for businesses, startups, and project-based requirements. Flexible and cost-effective solutions without heavy investment.",
        points: [
"Enterprise-grade server rentals",
"Short-term & long-term rental options",
"Pre-configured & custom configurations",
"Quick deployment & setup support",
"Maintenance & technical assistance",
        ],
      },
    ] as ServiceCard[],
  },
 
];

function ServiceSlider({ services }: { services: ServiceCard[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    
    loop: true,
    align: "start",
      slidesToScroll: "auto",
  containScroll: "keepSnaps",
    
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      {/* Carousel */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="-ml-4 flex md:-ml-6">
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="shrink-0 basis-full pl-4 md:basis-1/3 md:pl-6"
            >
              <div className="group flex h-full flex-col overflow-hidden rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] transition-all duration-300 hover:border-[hsl(var(--primary))]/50 hover:shadow-xl hover:shadow-[hsl(var(--primary))]/5">
                {/* Card Image */}
                <div className="relative h-48 w-full shrink-0 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0,0%,0%)]/70 via-transparent to-transparent" />
                  <h3 className="absolute bottom-3 left-4 right-4 font-serif text-lg font-bold text-[hsl(0,0%,100%)]">
                    {service.title}
                  </h3>
                </div>

                {/* Card Content */}
                <div className="flex flex-1 flex-col p-5">
                  <p className="mb-4 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">
                    {service.description}
                  </p>

                  {/* Bullet Points */}
                  <ul className="mb-5 flex-1 space-y-2">
                    {service.points.map((point) => (
                      <li key={point} className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--primary))]" />
                        <span className="text-xs text-[hsl(var(--foreground))]/80">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* <a
                    href="#contact"
                    className="group/btn inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[hsl(var(--primary))] transition-all hover:gap-3"
                  >
                    Learn More
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </a> */}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="mt-8 flex items-center justify-between">
        {/* Dots */}
        <div className="flex gap-2">
          {services.map((s, i) => (
            <button
              key={s.title}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selectedIndex
                  ? "w-8 bg-[hsl(var(--primary))]"
                  : "w-2 bg-[hsl(var(--muted-foreground))]/30 hover:bg-[hsl(var(--muted-foreground))]/50"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrows */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            disabled={!canScrollPrev}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:hover:border-[hsl(var(--border))] disabled:hover:bg-transparent disabled:hover:text-[hsl(var(--foreground))]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            disabled={!canScrollNext}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--foreground))] transition-all hover:border-[hsl(var(--primary))] hover:bg-[hsl(var(--primary))]/10 hover:text-[hsl(var(--primary))] disabled:opacity-30 disabled:hover:border-[hsl(var(--border))] disabled:hover:bg-transparent disabled:hover:text-[hsl(var(--foreground))]"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-[hsl(var(--card))] py-24 md:py-32"
    >
      {/* Background accents */}
      <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/3 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-[hsl(var(--primary))]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <span className="mb-4 inline-block rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))]">
            Our Services
          </span>
          <h2 className="font-serif text-4xl font-bold text-[hsl(var(--foreground))] md:text-5xl">
            What We{" "}
            <span className="text-[hsl(var(--primary))]">Offer</span>
          </h2>
          {/* <p className="mx-auto mt-4 max-w-2xl text-[hsl(var(--muted-foreground))]">
            Comprehensive IT solutions tailored to meet the demands of modern
            businesses. From rentals to infrastructure, we{"'"}ve got you covered.
          </p> */}
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-10 flex flex-wrap items-center justify-center gap-3"
        >
          {tabs.map((tab, i) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(i)}
              className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                i === activeTab
                  ? "bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] shadow-lg shadow-[hsl(var(--primary))]/25"
                  : "border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:border-[hsl(var(--primary))]/50 hover:text-[hsl(var(--primary))]"
              }`}
            >
              {tab.label}
              {i === activeTab && (
                <motion.div
                  layoutId="activeTabBg"
                  className="absolute inset-0 rounded-full bg-[hsl(var(--primary))]"
                  style={{ zIndex: -1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Tab Content with Slider */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tabs[activeTab].id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
             <ServiceSlider services={tabs[activeTab].services ?? []} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
