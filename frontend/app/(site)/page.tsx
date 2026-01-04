"use client";
import { Manrope } from "next/font/google";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import HeroCarousel from "@/components/HeroCarousel";
import { initRevealObserver } from "@/lib/animations";
import { useProductAPI } from "@/hooks/useProductAPI";
import EditorialProductSection from "@/components/EditorialProductSection";

const manrope = Manrope({ subsets: ["latin"] });

export default function AmakonanaLanding() {
  const { getProducts } = useProductAPI();
  const [motherProducts, setMotherProducts] = useState<any[]>([]);
  const [babyProducts, setBabyProducts] = useState<any[]>([]);

  useEffect(() => {
    // Initialize reveal observer for scroll animations
    initRevealObserver();

    const fetchProducts = async () => {
      const mothers = await getProducts(1, { category: "Moms" });
      if (mothers && mothers.results)
        setMotherProducts(mothers.results.slice(0, 8)); // Fetch more products for carousel

      const babies = await getProducts(1, { category: "Babies" });
      if (babies && babies.results) setBabyProducts(babies.results.slice(0, 8));
    };
    fetchProducts();
  }, [getProducts]);



  return (
    <div className={`${manrope.className} bg-white`}>
      {/* Hero Carousel: Premium Quality & Made in Nepal */}
      <HeroCarousel />

      <section className="relative grid min-h-[calc(100vh-69px)] grid-cols-1 md:grid-cols-2">
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <h1
            className="font-extrabold text-white/90 text-7xl sm:text-8xl md:text-9xl lg:text-[160px] page-load-fade-in"
            style={{
              fontWeight: 800,
              textShadow: "0 2px 20px rgba(0,0,0,0.3)",
            }}
          ></h1>
        </div>

        <div
          className="group relative flex h-full flex-col items-center justify-end overflow-hidden bg-cover bg-center p-8 md:p-12 page-load-fade-in"
          data-alt="A serene photo of a mother gently holding her baby."
          style={{ backgroundImage: "url('/images/mom5.png')" }}
        >
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
          <div className="relative z-20 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">
              Mothers
            </h2>
            <button className="flex h-12 cursor-pointer items-center justify-center overflow-hidden border border-white bg-white/10 px-8 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black">
              <span className="truncate">Shop Her Collection</span>
            </button>
          </div>
        </div>

        <div
          className="group relative flex h-full flex-col items-center justify-end overflow-hidden bg-cover bg-center p-8 md:p-12 page-load-fade-in"
          data-alt="A close-up, tender photo of a newborn baby's feet."
          style={{ backgroundImage: "url('/images/baby.png')" }}
        >
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
          <div className="relative z-20 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">
              Newborns
            </h2>
            <button className="flex h-12 cursor-pointer items-center justify-center overflow-hidden border border-white bg-white/10 px-8 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black">
              <span className="truncate">Shop Baby Essentials</span>
            </button>
          </div>
        </div>
      </section>

      
            <EditorialProductSection 
              title="For Newborns" 
              subtitle="The purest essentials for your little one's first moments."
              description="Soft, breathable, and safe. Our newborn collection is designed to mimic the warmth and comfort of a mother's embrace."
              products={babyProducts}
              categorySlug="Newborns"
              featuredImage="/images/baby.png"
              imagePosition="right"
              theme="light"
            />

      {/* Ethos Section */}
      <section className="bg-yellow-50 py-12" data-reveal="true">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 md:grid-cols-2">
            <div
              className="aspect-square w-full bg-cover bg-center page-load-fade-in transition-all duration-700"
              data-alt="A beautiful, soft-lit image of natural cotton fibers on a loom."
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDx4gd7sVRvdDxYwIVlXFiUmcGYTED_VI-ATBf7HpA_fGOoZG2f1K4tRDsvFmJQUIsXUg1T0MBCJt0qd3qn7BR0l2WLLjtBYCWFEXFrmIbj_jJSX_qZxLPWdwmHuRS9V4BAkZPU7pyocjKxftTVV60_Az-WUrYVdqjPDU6lCa90rvJr_wyZ8d03ppyRYIFcLOad_-ClEUneTMHi7j16IFl24AGlqNkZVqCWlpu-sQ6gPq0_XlS1n277onqXj6bOthfl0g1BDJHDCjA')" }}
              />
            <div className="flex flex-col gap-8 justify-center" data-stagger="true">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">Our Ethos</span>
              <h3 className="font-playfair text-5xl md:text-6xl text-neutral-900 leading-tight page-load-fade-in" data-reveal-child>
                Crafted with love,<br/>
                <span className="italic text-neutral-600">sourced with care.</span>
              </h3>
              <p className="text-lg leading-relaxed text-neutral-600 font-light page-load-fade-in" data-reveal-child>
                At Amakonana, we believe that the journey of motherhood deserves the purest essentials. Our collections are thoughtfully designed with both mother and baby in mind, using only the finest, sustainably-sourced organic materials.
              </p>
              <a className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-neutral-900 border-b border-black pb-2 hover:text-neutral-600 hover:border-neutral-400 transition-colors inline-block w-fit" href="#" data-reveal-child>Read the Story</a>
            </div>
          </div>
        </div>
      </section>
              <EditorialProductSection 
                title="For Mothers" 
                subtitle="Thoughtfully designed essentials to support you through every stage of motherhood."
                description="Our maternity collection combines traditional Nepali craftsmanship with modern comfort. Featured here is our signature cotton loungewear, perfect for nursing and recovery."
                products={babyProducts}
                categorySlug="Mothers"
                featuredImage="/images/mom5.png"
                imagePosition="left"
                theme="warm"
              />
    </div>
  );
}
