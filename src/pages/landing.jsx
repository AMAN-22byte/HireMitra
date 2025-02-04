import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import React from "react";
import { Link } from "react-router-dom";
import companies from "../data/companies.json";
import partners from "../data/partners.json";
import faq from "../data/faq.json";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Landingpage = () => {
  return (
    <main className="relative flex flex-col gap-14 sm:gap-24 py-14 sm:py-24 bg-black text-white">
      {/* Fading Grid Background */}
      <div className="absolute inset-0 bg-grid-white/[0.05] pointer-events-none" />

      {/* Hero Section */}
      <section className="text-center px-6 relative z-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white">
          Find Your Dream Job with <span className="text-green-500">HireMitra!!</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 font-semibold mt-4">
          Explore 1000+ latest jobs and get hired faster than ever.
        </p>
      </section>

      {/* Buttons */}
      <div className="flex gap-6 justify-center items-center py-4 relative z-10">
        <Link to="/jobpage">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg">
            Find Jobs
          </Button>
        </Link>
        <Link to="/postjob">
          <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg">
            Post a Job
          </Button>
        </Link>
      </div>

      {/* Top Recruiters Section */}
      <div className="px-6 relative z-10">
        <h2 className="text-center text-4xl font-extrabold text-green-400">Top Recruiters</h2>
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-16 items-center">
            {companies.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/4 lg:basis-1/6">
                <img src={path} alt={name} className="h-12 sm:h-16 object-contain mx-auto" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div className="px-6 relative z-10">
        <h2 className="text-center text-4xl font-extrabold text-green-400">Top Recruiters</h2>
        <Carousel plugins={[Autoplay({ delay: 2000 })]} className="w-full py-10">
          <CarouselContent className="flex gap-5 sm:gap-16 items-center">
            {partners.map(({ name, id, path }) => (
              <CarouselItem key={id} className="basis-1/4 lg:basis-1/6">
                <img src={path} alt={name} className="h-12 sm:h-16 object-contain mx-auto" />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* FAQ Section */}
      <section className="px-6 max-w-3xl mx-auto relative z-10">
        <h2 className="text-3xl font-bold text-center text-gray-200 mb-6">Frequently Asked Questions</h2>
        <Accordion type="multiple" className="w-full">
          {faq.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`} className="border-b border-gray-700">
              <AccordionTrigger className="text-lg font-semibold text-gray-300 hover:text-green-400">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-400">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
};

export default Landingpage;