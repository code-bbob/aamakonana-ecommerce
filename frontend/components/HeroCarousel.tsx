"use client";
import { useEffect, useRef, useState } from "react";

type Slide = {
  title: string;
  eyebrow?: string;
  copy: string;
  imageSrc?: string;
  imageAlt: string;
  reverse?: boolean;
};

const slides: Slide[] = [
  {
    eyebrow: "New Arrival • Winter '25",
    title: "Premium, luxury layers. Designed in Nepal, Worn worldwide.",
    copy: "Tailored silhouettes in soft-touch fabrics with mindful details. Crafted for comfort, built to last. Only built with the highest quality sustainable materials, inside our factory in Kathmandu.",
    imageSrc: "/babyimage.avif",
    imageAlt: "Premium apparel hero look",
  },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const advance = () => setIndex((i) => (i + 1) % slides.length);
    timerRef.current = window.setInterval(advance, 5000);
    
    return () => { 
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  const go = (i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  };

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden">
      {/* Luxe background aura */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(201,164,107,0.22)] via-[rgba(201,164,107,0.08)] to-transparent" />
        <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full blur-[96px] bg-[color:var(--foreground)/0.08]" />
        <div className="absolute -bottom-24 -right-24 h-[36rem] w-[36rem] rounded-full blur-[96px] bg-[color:var(--soft)/0.08]" />
      </div>

      <div
        className="relative flex h-full flex-col items-center justify-end min-h-[75vh] overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: "url('/images/brandkit3.png')" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 mt-16 md:px-8 w-full">
          <div className="ml-8">
            {slide.eyebrow && (
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--line-color)] bg-[color:var(--foreground)/0.06] text-[color:var(--soft)] text-sm page-load-fade-in">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                {slide.eyebrow}
              </span>
            )}
            <h1 className="font-serif text-[color:var(--foreground)] text-4xl md:text-5xl leading-[1.05] tracking-[-0.03em] mt-4 mb-4 page-load-fade-in">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--foreground)] to-purple-800">
                {slide.title}
              </span>
            </h1>
            <p className="text-[color:var(--soft)] text-lg md:text-xl max-w-[60ch] page-load-fade-in">
              {slide.copy}
            </p>
            <div className="mt-6 flex items-center gap-3 page-load-fade-in">
              <button
                onClick={() => go(index + 1)}
                className="px-5 py-2.5 hover:font-bold hover:scale-105 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] text-sm tracking-wide hover:opacity-95 transition-all"
              >
                Explore Collection
              </button>
              <button
                className="px-5 py-2.5 hover:font-bold hover:scale-105 rounded-full border border-[color:var(--line-color)] text-[color:var(--foreground)] text-sm tracking-wide hover:bg-[color:var(--foreground)/0.06] transition-all"
              >
                Sustainability
              </button>
            </div>
          </div>
        </div>

        {/* Brand marquee for premium feel */}
        <div className="px-6 py-8 flex items-center justify-center gap-8 opacity-70">
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">ORGANIC</span>
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">SUSTAINABLE</span>
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">HANDMADE</span>
          <span className="text-sm tracking-[0.25em] text-[color:var(--soft)]">ETHICAL</span>
        </div>
      </div>
    </section>
  );
}
