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
//   {
//     eyebrow: "Handmade Atelier",
//     title: "Designed in Nepal, worn worldwide.",
//     copy: "A fusion of timeless minimalism and local craftsmanship—subtle textures, rich hues, precision finish.",
//     // imageSrc: "/babyimage.avif",
//     imageAlt: "Craftsmanship detail shot",
//     reverse: true,
//   },
];

export default function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<Array<HTMLDivElement | null>>([]);
  const timerRef = useRef<number | null>(null);
  const touch = useRef<{ startX: number; dx: number } | null>(null);

  useEffect(() => {
    const advance = () => setIndex((i) => (i + 1) % slides.length);
    timerRef.current = window.setInterval(advance, 2500);
    
    return () => { 
      if (timerRef.current) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const active = slideRefs.current[index];
    const track = trackRef.current;
    if (active && track) {
      track.style.height = `${active.offsetHeight}px`;
    }
  }, [index]);

  const go = (i: number) => {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  };

  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  const onTouchStart = (e: React.TouchEvent) => {
    const x = e.touches[0].clientX;
    touch.current = { startX: x, dx: 0 };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current) return;
    touch.current.dx = e.touches[0].clientX - touch.current.startX;
  };
  const onTouchEnd = () => {
    if (!touch.current) return;
    const { dx } = touch.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) {
        next();
      } else {
        prev();
      }
    }
    touch.current = null;
  };

  return (
    <section className="relative overflow-hidden b">
      {/* Luxe background aura */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(201,164,107,0.22)] via-[rgba(201,164,107,0.08)] to-transparent" />
        <div className="absolute -top-24 -left-24 h-[38rem] w-[38rem] rounded-full blur-[96px] bg-[color:var(--foreground)/0.08]" />
        <div className="absolute -bottom-24 -right-24 h-[36rem] w-[36rem] rounded-full blur-[96px] bg-[color:var(--soft)/0.08]" />
      </div>
      {/* <div className="mx-auto max-w-7xl relative bg-cover flex flex-col" 
 style={{ backgroundImage: "images/brandkit.png" }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      > */}

        <div
          className="group relative flex h-full flex-col items-center justify-end overflow-hidden bg-cover bg-center"
          data-alt="A serene photo of a mother gently holding her baby."
          style={{ backgroundImage: "url('/images/brandkit3.png')" }}
        >
 
        <div
          className="carousel-track flex-1 min-h-[75vh]"
          ref={trackRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          role="region"
          aria-label="Product carousel"
          aria-roledescription="carousel"
          style={{ transition: "height 1s ease" }}
        >
          {slides.map((s, i) => (
            <div
              key={s.title}
              ref={(el) => { slideRefs.current[i] = el; }}
              className={`carousel-slide ${index === i ? "is-active" : "is-next"}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center px-4 mt-24 md:px-8 ">
                {s.reverse ? (
                  <>

                    <div className="ml-8">
                      {s.eyebrow && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--line-color)] bg-[color:var(--foreground)/0.06] text-[color:var(--soft)] text-sm page-load-fade-in">
                          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                          {s.eyebrow}
                        </span>
                      )}
                      <h1 className="font-serif text-[color:var(--foreground)] text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] mt-4 mb-4 page-load-fade-in">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--foreground)] via-[color:var(--foreground)] to-[rgba(201,164,107,1)]">
                          {s.title}
                        </span>
                      </h1>
                      <p className="text-[color:var(--soft)] text-lg md:text-xl max-w-[60ch] page-load-fade-in">
                        {s.copy}
                      </p>
                      <div className="mt-6 flex items-center gap-3 page-load-fade-in">
                        <button
                          onClick={() => { go(i + 1); }}
                          className="px-5 py-2.5 hover:scale-105 hover:font-bold rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] text-sm tracking-wide hover:opacity-95"
                        >
                          Shop New In
                        </button>
                        <button
                          className="px-5 py-2.5 hover:scale-105 hover:font-bold rounded-full border border-[color:var(--line-color)] text-[color:var(--foreground)] text-sm tracking-wide hover:bg-[color:var(--foreground)/0.06]"
                        >
                          View Lookbook
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="ml-8">
                      {s.eyebrow && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[color:var(--line-color)] bg-[color:var(--foreground)/0.06] text-[color:var(--soft)] text-sm page-load-fade-in">
                          <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--foreground)]" />
                          {s.eyebrow}
                        </span>
                      )}
                      <h1 className="font-serif text-[color:var(--foreground)] text-4xl md:text-6xl leading-[1.05] tracking-[-0.03em] mt-4 mb-4 page-load-fade-in">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[color:var(--foreground)] via-[color:var(--foreground)] to-[rgba(201,164,107,1)]">
                          {s.title}
                        </span>
                      </h1>
                      <p className="text-[color:var(--soft)] text-lg md:text-xl max-w-[60ch] page-load-fade-in">
                        {s.copy}
                      </p>
                      <div className="mt-6 flex items-center gap-3 page-load-fade-in">
                        <button
                          onClick={() => { go(i + 1); }}
                          className="px-5 py-2.5 hover:font-bold hover:scale-105 rounded-full bg-[color:var(--foreground)] text-[color:var(--background)] text-sm tracking-wide hover:opacity-95"
                        >
                          Explore Collection
                        </button>
                        <button
                          className="px-5 py-2.5 hover:font-bold hover:scale-105 rounded-full border border-[color:var(--line-color)] text-[color:var(--foreground)] text-sm tracking-wide hover:bg-[color:var(--foreground)/0.06]"
                        >
                          Sustainability
                        </button>
                      </div>
                    </div>

                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Left Control Button */}
        {/* <button
          aria-label="Previous slide"
          onClick={prev}
          onKeyDown={onKeyDown}
          className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 h-12 w-12 md:h-14 md:w-14 grid place-items-center rounded-full bg-white/15 backdrop-blur border border-white/20 text-[color:var(--foreground)] hover:bg-white/25 transition-all cursor-pointer active:scale-95 shadow-xl hover:shadow-2xl font-bold text-2xl"
          tabIndex={0}
          style={{WebkitBackdropFilter: 'blur(16px) saturate(120%)'}}
        >
          ‹
        </button>

        {/* Center Pager Dots */}
        {/* <div className="absolute left-0 bottom-8 flex items-center justify-center z-10 pointer-events-none">
          <div className="flex items-center gap-2 px-4 py-3 rounded-full border border-white/20 bg-white/15 backdrop-blur shadow-2xl" role="toolbar" aria-label="Carousel pager" style={{pointerEvents: 'auto', WebkitBackdropFilter: 'blur(16px) saturate(120%)'}}>
            {[...slides.keys()].map((i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => go(i)}
                className={`rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgba(201,164,107,0.6)] cursor-pointer ${
                  index === i
                    ? "w-8 h-2.5 bg-[color:var(--foreground)]"
                    : "w-2.5 h-2.5 bg-[color:var(--foreground)/0.35] hover:bg-[color:var(--foreground)/0.55]"
                }`}
                tabIndex={0}
              />
            ))}
          </div>
        </div> */}

        {/* Right Control Button */}
        {/* <button
          aria-label="Next slide"
          onClick={next}
          onKeyDown={onKeyDown}
          className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 h-12 w-12 md:h-14 md:w-14 grid place-items-center rounded-full bg-white/15 backdrop-blur border border-white/20 text-[color:var(--foreground)] hover:bg-white/25 transition-all cursor-pointer active:scale-95 shadow-xl hover:shadow-2xl font-bold text-2xl"
          tabIndex={0}
          style={{WebkitBackdropFilter: 'blur(16px) saturate(120%)'}}
        >
          ›
        </button> */} 

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
