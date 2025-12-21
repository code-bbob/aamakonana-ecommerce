"use client";
import { Manrope } from "next/font/google";
import { useEffect } from "react";
import HeroCarousel from "@/components/HeroCarousel";
import { initRevealObserver } from "@/lib/animations";

const manrope = Manrope({ subsets: ["latin"] });

export default function AmakonanaLanding() {
  useEffect(() => {
    // Initialize reveal observer for scroll animations
    initRevealObserver();
  }, []);

  return (
<div className={`${manrope.className} bg-zinc-200`}>

      {/* Hero Carousel: Premium Quality & Made in Nepal */}
      <HeroCarousel />
      

      <section className="relative grid min-h-[calc(100vh-69px)] grid-cols-1 md:grid-cols-2">
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <h1
            className="font-extrabold text-white/90 text-7xl sm:text-8xl md:text-9xl lg:text-[160px] page-load-fade-in"
            style={{ fontWeight: 800, textShadow: "0 2px 20px rgba(0,0,0,0.3)" }}
          >
            
          </h1>
        </div>

        <div
          className="group relative flex h-full flex-col items-center justify-end overflow-hidden bg-cover bg-center p-8 md:p-12 page-load-fade-in"
          data-alt="A serene photo of a mother gently holding her baby."
          style={{ backgroundImage: "url('/images/mom5.png')" }}
        >
          <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-black/0" />
          <div className="relative z-20 flex flex-col items-center gap-4">
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Mothers</h2>
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
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white">Newborns</h2>
            <button className="flex h-12 cursor-pointer items-center justify-center overflow-hidden border border-white bg-white/10 px-8 text-sm font-bold uppercase tracking-wider text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-black">
              <span className="truncate">Shop Baby Essentials</span>
            </button>
          </div>
        </div>
      </section>

      {/* Mothers Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24" data-reveal="true">
        <h2 className="pb-8 text-center text-3xl font-bold leading-tight tracking-tight text-text-light-primary page-load-fade-in">For Mothers</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[{
            title: "The Everly Dress",
            price: "$120.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBL2F3Fly3xVdim_W3VusHUS4PsNUlLBiK4ADD09irKW78Kn_G1yDQInsqiP1ONVtuhAgdT5hcssqMLIvXZDqqhgSVwStjWJBb7SWfTzPtDFF2swAXhEFhBkeB1PM-VgzHOA8AQe-x2qgJILBqUsbuRUE8jOw6KHZpIxb89ImV2PW0nWcFgkTuEJCfVAUMHm5xmQ-hDCPrLT_gZZA8zO7hQim3TKc6cXeaTyStUME4Fcbc1pjATC1eQ8rLFjYQp7FYGB_mSk3zomt0"
          }, {
            title: "Nourish Belly Butter",
            price: "$35.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCMr93r2yIo-eLN0PnXW9sNKWkuN-6cwMZ6EqSdQeeGXJdCd_e53Oa90zrFd0pqdMxuv1sdAx9ee6Qi_KWB2WfT6VmrKyR0i43IkZWah5llnjJZRNWWa_mgzXlxT03nuZZVvjfM0jzWBok1r2ubSz3W_hZShha8kepJLBXQ845U7Y3WBB1hUmmGutZMfsFSdwptg9EoYqSysdPtpyGxgtfAtBE4HRgvhEO4ncg_4Rk7gmy6cl1ztTL9nLweKHx_x-ThB6EfTC9BtCo"
          }, {
            title: "The Embrace Bra",
            price: "$60.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA9iKYwXw-ih8-3gCPLeT3Y3RnlI5VGKK2HHEV0bske1QKb-ui6kQqzlLCVRX2h3QxVolv4_toGcX1ERXFQMywIi-EoRfL35xaLf8_2GUmZ4MHdpZmMo9v2quea_cnipMSnPAzMEISS9tY3EkBFa9nYrWGz0rue9wMTfOgVNF6GJsTrVydSd_QoWfDWvQQO4EOvan2MG-YNrbURnli1noAlvcBcFZsbdDwlYp34pKJVugS8ktXfcYaiVFUkELNjEuxWd0aj3p3R0Raw"
          }, {
            title: "Recovery Essentials Kit",
            price: "$95.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFI5H3i-0rkEcZ5j9xVmOFXTrb84-k4BpI8oAs2wTjtLjcc9QBpSLM7QEdzhrtkkxHk1ubgXMdeO66Bl8ecNU8Ns3OlMPPyLqqOhwP4SwYT98a_K7tlx5HFPWoQUVnWm-vQp3SzF-f9sVu2XN35jLzP9Q7ZW6QFrr-HcoZ8v8iFGDEeFNwsJz0TzWTOIvVH5KcgJA6wFQbtZH6rRWNcB_8T7NYlamwnxiigOOHmK0WZN7Vj17R9XDwW-3WnXwJ8F2x8QoqtIq--SM"
          }].map((p) => (
            <div key={p.title} className="flex flex-1 flex-col gap-4 bg-background-light">
              <div className="aspect-[3/4] w-full bg-cover bg-center" style={{ backgroundImage: `url('${p.img}')` }} />
              <div className="flex flex-1 flex-col justify-between gap-2 p-2 pt-0 text-center">
                <div>
                  <p className="font-medium leading-normal text-text-light-primary">{p.title}</p>
                  <p className="text-sm font-normal leading-normal text-text-light-secondary">{p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ethos Section */}
      <section className="bg-border-light" data-reveal="true">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:gap-16 md:px-6 md:py-24">
          <div
            className="aspect-square w-full bg-cover bg-center page-load-fade-in"
            data-alt="A beautiful, soft-lit image of natural cotton fibers on a loom."
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDx4gd7sVRvdDxYwIVlXFiUmcGYTED_VI-ATBf7HpA_fGOoZG2f1K4tRDsvFmJQUIsXUg1T0MBCJt0qd3qn7BR0l2WLLjtBYCWFEXFrmIbj_jJSX_qZxLPWdwmHuRS9V4BAkZPU7pyocjKxftTVV60_Az-WUrYVdqjPDU6lCa90rvJr_wyZ8d03ppyRYIFcLOad_-ClEUneTMHi7j16IFl24AGlqNkZVqCWlpu-sQ6gPq0_XlS1n277onqXj6bOthfl0g1BDJHDCjA')" }}
          />
          <div className="flex flex-col gap-4" data-stagger="true">
            <h3 className="text-3xl font-bold tracking-tight text-text-light-primary page-load-fade-in" data-reveal-child>Crafted with Love, Sourced with Care</h3>
            <p className="text-base leading-relaxed text-text-light-secondary page-load-fade-in" data-reveal-child>
              At Amakonana, we believe that the journey of motherhood deserves the purest essentials. Our collections are thoughtfully designed with both mother and baby in mind, using only the finest, sustainably-sourced organic materials. Each piece is a testament to our commitment to quality, comfort, and timeless style.
            </p>
            <a className="mt-4 text-sm font-bold uppercase tracking-wider text-text-light-primary underline-offset-4 hover:underline page-load-fade-in" href="#" data-reveal-child>Discover Our Story</a>
          </div>
        </div>
      </section>

      {/* Newborns Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24" data-reveal="true">
        <h2 className="pb-8 text-center text-3xl font-bold leading-tight tracking-tight text-text-light-primary page-load-fade-in">For Newborns</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {[{
            title: "Organic Cotton Onesie",
            price: "$28.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFhhtP9rfwk4-cq64NgW4N7C9wrXma8zaDRYJlE_t6lzvum1EgoEgasY1dgXIiky42AK410TbGzUT1Nkg_MWJjyqM4besfJ6PYK2KqqjLRywqoZQGyVTaHO3OkqbmtuhbNu06p9xnsIZCijS-VyG73r9iQ4k4ZE8ps7d3LDl4wMyAGCusIu0EK59yV2biGYStsy8LO-gGudIcW6tZJXszaW4YCKWw8GGwqRH3TsSnxiQkPc2ja95Xu6TsHe8RqsTUoMa1zuZjwyy0"
          }, {
            title: "Heirloom Knit Blanket",
            price: "$75.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBVzQfGJYJ39JESCSnEgHFgFutzRZAZ-qvGqxf1i4IA8xj3kLhuZRRKw5X4eHuTfpaIII7mfpOI9eI88UGhlsLu8vQhyf5c3Q0QVJKpZ3zx9MlvoZA6MReM_t7i9U_uYCBUJ-pMmnZPrglXmjQ7N1wy1zlwfWjcP5XFeq0FLqFbObnSk8RGXmRpyfd9BbPB8-tw4c-Xyu4XRJXZFHqTz1OcGInGaXz3p70CAsZ0Q0ck-injuJHiaLayTo31fljXGQ2kCjJFg2wrdl4"
          }, {
            title: "Dreamer's Mobile",
            price: "$55.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8NtZwKrZ06WhKd3PKbHGqs2EpOboyJ1SSMOxO_ZAy5KJvE7Hyifl7JnF2pN3pYD0UvTPXRVA-EAgiYWaMSP20umaOILJCOlfhCQuvYauDJuVSBYEuYsZOnf0qPyB-toFauVnzJjX9pnfPVs5cU5zbMQIKlNW5tbjqUnF0Kd0cEZtwsdctgAgr0T2ZoAwB5hWLfleQTG4m7qphuC4JXpvqaKXcRkXLKEJYqpOCmQRxWt3IYX0SVx-l-9R6xD4pCModIFxjhBqzH9A"
          }, {
            title: "Soothing Bath Wash",
            price: "$22.00",
            img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA35qHM91jAWJNjs-EHYPdqBHs1mzpiadN1GGThCc07w5hIfqZsEsl9KPnxco4dYJ30ZU4uIFnXpHzZ-QhGagvUiMwDS1_JASwvgqFSyjtFE9zY4luTuykf5HIDOZkv_mp9T99N-UHryXxtBvEUrocnCxM9ZjCpNhUrIZWy2KyNv8vJuNYPq-hzQFgXq1rdzH5Q02-gmogUirlvrZGDd_JHzOf4G2-GH8vLS0Y6QIom1lbs0-KWS6FJKHYsy2BeCK5DafFk5DBQOzI"
          }].map((p) => (
            <div key={p.title} className="flex flex-1 flex-col gap-4 bg-background-light">
              <div className="aspect-[3/4] w-full bg-cover bg-center" style={{ backgroundImage: `url('${p.img}')` }} />
              <div className="flex flex-1 flex-col justify-between gap-2 p-2 pt-0 text-center">
                <div>
                  <p className="font-medium leading-normal text-text-light-primary">{p.title}</p>
                  <p className="text-sm font-normal leading-normal text-text-light-secondary">{p.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
