"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
{ name: "Sarvesh Surve ",  
   avatar: "SS", 
  rating: 5, 
  feedback: "I had given my laptop for repair at Vakratund Infotech and I am very happy with their service The staff was polite and helpful. They repaired my laptop quickly and now it is working very well. The service charges were also reasonable. My uncle had taken a projector on rent from Vakratund Infotech. The proiector quality was excellent and very easy to use. Delivery and return process was also smooth. Overall, we had a very good experience. I would surelv recommend Vakratund Infotech for both laptop repair and projector rental",
 },
  {
    name: "Manish Belekar",
    avatar: "MB",
    rating: 5,
    feedback:
      "I had given my Dell Capmutar new 2nd hand at Vakratund Infotech and I am very happy with their service The staff was polite and helpful. Camputer quickly and now it is working very well. The service charges were also reasonable.The quality was excellent and very easy to use. Delivery and return process was also smooth. Overall, we had a very good experience. recommend Vakratund Infotech for both Camputer and projector rental",
  },
  {
    name: "Priyanka Thakur",
    avatar: "PT",
    rating: 5,
    feedback:
      "Fast & Excellent Service provider @Gaurav. Highly recommended - Vakratund infotech.",
  },
  {
    name: "CA Sagar Lahane",
    avatar: "CA",
    rating: 5,
    feedback:
      "Quick and professional services here. Highly recommended for all IT related products and services. 👍👍",
  },
  {
    name: "Vijay Lode",
    avatar: "VL",
    rating: 5,
    feedback:
      "Excellent service my Laptop windows totally crash recovery all data and we'll service my laptop",
  },
  { name: "Niranjan More ", 
    // role: "IT Director, NexGen Enterprises",
    //  // location: "Bangalore", 
    avatar: "NM",
     rating: 5, feedback: "Laptops offered at best affordable price !", extended: " ", 
    },
{ name: "Akanksha Bhangale",
   // role: "IT Director, NexGen Enterprises", 
   // // location: "Bangalore", 
   avatar: "AB", 
   rating: 5, 
   feedback: "I recently had Vakratund Infotech build a custom PC for me, and the experience was flawless. They helped me pick the best components for my budget and the cable management is incredibly clean. The system was stress-tested before I picked it up, and it’s running like a dream. If you're looking for a professional build without the headache, this is the place to go ", },

{ name: "Sakshi Jha", 
  // role: "IT Director, NexGen Enterprises", 
  // // location: "Bangalore", 
  avatar: "SJ", 
  rating: 5, feedback: "It's was really very nice product the look and the function of the laptop is really very good I like it thanks" },
  ];

export default function TestimonialsSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
const [emblaRef, emblaApi] = useEmblaCarousel({
  loop: true,
  align: "start",
  slidesToScroll: 1,
  containScroll: "trimSnaps",
});

useEffect(() => {
  if (!emblaApi) return;

  const interval = setInterval(() => {
    emblaApi.scrollNext();
  }, 3000); // 3 seconds

  return () => clearInterval(interval);
}, [emblaApi]);



  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section id="testimonials" className="relative overflow-hidden py-24 md:py-32">
      <div className="absolute right-1/4 top-0 h-96 w-96 rounded-full bg-[hsl(var(--primary))]/3 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-4 inline-block rounded-full border border-[hsl(var(--primary))]/30 bg-[hsl(var(--primary))]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[hsl(var(--primary))]">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            What Our Clients{" "}
            <span className="text-[hsl(var(--primary))]">Say</span>
          </h2>
        </div>

        {/* Slider */}
        <div>
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex">
              {testimonials.map((item, index) => {
                const words = item.feedback.split(" ");
                const isLong = words.length > 20;
                const isExpanded = expandedIndex === index;
                const shortText = words.slice(0, 20).join(" ");

                return (
                  <motion.div
                    key={index}
className="flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_calc(100%/3)] px-3 flex"
                  >
                    <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 transition-all hover:border-[hsl(var(--primary))]/30 hover:shadow-lg hover:shadow-[hsl(var(--primary))]/5">
                    <Quote className="mb-4 h-8 w-8 text-[hsl(var(--primary))]/30" />

                    {/* Stars */}
                    <div className="mb-4 flex gap-1">
                      {Array.from({ length: item.rating }).map((_, j) => (
                        <Star
                          key={`star-${item.name}-${j}`}
                          className="h-4 w-4 fill-[hsl(var(--primary))] text-[hsl(var(--primary))]"
                        />
                      ))}
                    </div>

                    {/* Feedback */}
                    <p className="text-gray-400 mb-4">
                      “{isExpanded || !isLong
                        ? item.feedback
                        : shortText + "..."}”
                    </p>

                    {isLong && (
                      <button
                        onClick={() =>
                          setExpandedIndex(isExpanded ? null : index)
                        }
                        className="text-sm font-semibold text-[hsl(var(--primary))] mb-4"
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}

                    {/* Avatar */}
                    <div className="flex items-center gap-3 border-t border-[hsl(var(--border))] pt-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[hsl(var(--primary))]/15 font-serif text-sm font-bold text-[hsl(var(--primary))]">
                        {item.avatar}
                      </div>
                      <h4 className="text-sm font-semibold">
                        {item.name}
                      </h4>
                    </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={scrollPrev}
              className="flex items-center justify-center rounded-full border px-6 py-2 border-[hsl(var(--border))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={scrollNext}
              className="flex items-center justify-center rounded-full border px-6 py-2 border-[hsl(var(--border))] transition-all hover:border-[hsl(var(--primary))] hover:text-[hsl(var(--primary))]"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
