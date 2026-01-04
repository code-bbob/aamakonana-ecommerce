'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

type PageSide = {
  kicker?: string;
  title: string;
  subtitle?: string;
  body?: string;
  isCover?: boolean;
  isClosing?: boolean;
  ctaLabel?: string;
  ctaHref?: string;
};

type Spread = {
  left: PageSide;
  right: PageSide;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

function Page({ side, pageNumber }: { side: PageSide; pageNumber?: number }) {
  return (
    <div className="h-full w-full p-10 sm:p-12 flex flex-col bg-purple-100">
      <div className="flex-1">
        {side.kicker && (
          <div className="text-xs font-semibold tracking-[0.25em] text-amber-700 mb-3 uppercase">
            {side.kicker}
          </div>
        )}

        {side.isCover ? (
          <div className="h-full flex flex-col justify-center text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight">
              {side.title}
            </h1>
            {side.subtitle && (
              <p className="mt-4 text-xl sm:text-2xl text-amber-700 font-light italic">
                {side.subtitle}
              </p>
            )}
            {side.body && (
              <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed max-w-sm mx-auto">
                {side.body}
              </p>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {side.title}
            </h2>
            {side.subtitle && (
              <p className="mt-2 text-base sm:text-lg font-semibold text-pink-600">
                {side.subtitle}
              </p>
            )}
            {side.body && (
              <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed">
                {side.body}
              </p>
            )}

            {side.isClosing && side.ctaHref && side.ctaLabel && (
              <div className="mt-24">
                <Link
                  href={side.ctaHref}
                  className="flex justify-center rounded-lg px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-all active:scale-95"
                >
                  {side.ctaLabel}
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {typeof pageNumber === 'number' && (
        <div className="pt-8 text-center text-xs font-medium text-gray-400 tabular-nums">
          {pageNumber}
        </div>
      )}
    </div>
  );
}

export default function StoryPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const spreads: Spread[] = useMemo(
  () => [
    {
      left: { 
        isCover: true, 
        title: 'Aama Ko Nana', 
        subtitle: 'आमाको न्यानोपनको अनुभूति', 
        body: 'Aamako Nana was born from a simple truth: nothing feels safer than a mother’s warmth. Inspired by that feeling, we create babywear that wraps newborns in comfort, care, and protection. Every piece we make carries the softness of love, the patience of handwork, and the promise of quality that families can trust from the very first day.' 
      },
      right: { 
        kicker: 'CHAPTER 1', 
        title: 'The Beginning', 
        subtitle: 'Where the question began', 
        body: "Our story didn’t start in a boardroom—it started at home. Watching baby clothes lose shape, fade, and tear after a single wash left us asking a hard question: why should parents accept less for their children? That moment of frustration slowly transformed into a purpose—to design clothing that respects a baby’s skin, lasts through countless washes, and gives parents peace of mind." 
      },
    },
    {
      left: { 
        kicker: 'CHAPTER 1 (CONT.)', 
        title: 'The First Investment', 
        body: "With belief stronger than resources, we invested Rs. 50,000 in premium malmal fabric and stitched 50 sets by hand from home. Every piece was sewn slowly and carefully, tested for softness, strength, and comfort. When all 50 sets sold out within just 7 days, it wasn’t the profit that excited us—it was the trust families placed in our work." 
      },
      right: { 
        kicker: 'CHAPTER 2', 
        title: 'Launch Day', 
        subtitle: 'A name rooted in love', 
        body: "Orders soon arrived from households and hospitals alike. Word spread about quality that felt different—gentler, stronger, and more thoughtful. When the name ‘Aama’ was already taken, we chose ‘Aamako Nana’—a reminder of a grandmother’s warmth, wisdom, and care. That name became our identity and our responsibility." 
      },
    },
    {
      left: { 
        kicker: 'CHAPTER 2 (CONT.)', 
        title: 'Social Media Magic', 
        body: 'Social media became our storyteller. Through short videos, honest conversations, and behind-the-scenes moments, families across Nepal discovered who we were and why we cared so deeply. TikTok and Instagram helped us grow organically, and by 2079–80 BS, we opened our own factory in Basundhara—scaling production while protecting the quality we started with.' 
      },
      right: { 
        kicker: 'CHAPTER 3', 
        title: 'What We Make', 
        subtitle: 'Thoughtfully designed essentials', 
        body: 'We design newborn essentials, Pasni outfits, festive wear, and bedding sets that feel as comforting as home. Each product is made to support a baby’s daily routines—sleeping, playing, growing—while also carrying cultural meaning and modern design. Nothing is mass-produced without intention.' 
      },
    },
    {
      left: { 
        kicker: 'CHAPTER 3 (CONT.)', 
        title: 'Premium Materials', 
        body: 'Fabric is where quality begins. We carefully select the best quality cotton, malmal, muslin, and flannel for their breathability, softness, and durability. Each fabric we select is tested for comfort against sensitive skin, and each stitch is reinforced for long-term use. We design for real life—washing, drying, wearing, and repeating.' 
      },
      right: { 
        kicker: 'CHAPTER 4', 
        title: 'Our Values', 
        subtitle: 'Quality is non-negotiable', 
        body: 'Our pricing—ranging from Rs. 1,100 to Rs. 2,700—reflects honest craftsmanship and ethical production. We test colors for safety, check seams for strength, and review every detail before a product leaves our hands. Quality isn’t a feature for us; it’s a responsibility we take personally.' 
      },
    },
    {
      left: { 
        kicker: 'CHAPTER 4 (CONT.)', 
        title: 'No Shortcuts', 
        body: "We refuse shortcuts because babies don’t get second chances at comfort. From sourcing materials to final packaging, every step is intentional. We believe parents should never have to question what touches their baby’s skin—and that belief guides every decision we make." 
      },
      right: { 
        kicker: 'CHAPTER 5', 
        title: 'Our Impact', 
        subtitle: 'People at the heart of everything', 
        body: "Behind every product is a human story. We employ 18 skilled individuals and actively train women in sewing and traditional daura-suruwal making. By creating stable income and transferable skills, we’re helping families grow stronger—proving that business can be both compassionate and sustainable." 
      },
    },
    {
      left: { 
        kicker: 'CHAPTER 6', 
        title: 'Our Vision', 
        subtitle: 'Growing warmth across Nepal', 
        body: 'We imagine a future where every newborn in Nepal has access to safe, high-quality clothing made with care. We see Aamako Nana as a platform for empowering women, preserving craftsmanship, and setting a new standard for babywear—one rooted in trust, dignity, and love.' 
      },
      right: { 
        isClosing: true, 
        title: 'Join Our Story', 
        body: 'Every time you choose Aamako Nana, you support thoughtful design, ethical production, and a community built on care. Your trust allows us to grow, innovate, and share this warmth with more families. Together, we are stitching comfort, culture, and compassion into every beginning.', 
        ctaLabel: 'Shop Our Collection', 
        ctaHref: '/products' 
      },
    },
  ],
  []
);


  const maxFlip = spreads.length - 1;
  const [targetProgress, setTargetProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      setDisplayProgress((prev) => {
        const next = prev + (targetProgress - prev) * 0.1;
        return Math.abs(next - targetProgress) < 0.0005 ? targetProgress : next;
      });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetProgress]);

  useEffect(() => {
    let metrics = {
      containerTop: 0,
      containerHeight: 0,
      windowHeight: 0,
      totalScrollableDistance: 0
    };

    const updateMetrics = () => {
      if (!containerRef.current) return;
      metrics.containerTop = containerRef.current.offsetTop;
      metrics.containerHeight = containerRef.current.offsetHeight;
      metrics.windowHeight = window.innerHeight;
      metrics.totalScrollableDistance = metrics.containerHeight - metrics.windowHeight;
    };

    const handleScroll = () => {
      if (!containerRef.current) return;
      
      // If metrics are not initialized, update them
      if (metrics.containerHeight === 0) updateMetrics();

      const scrollTop = window.scrollY;
      const scrolledInContainer = scrollTop - metrics.containerTop;
      
      let progress = 0;
      if (metrics.totalScrollableDistance > 0) {
        progress = scrolledInContainer / metrics.totalScrollableDistance;
      }
      
      const clamped = clamp(progress, 0, 1);
      setTargetProgress(clamped * maxFlip);
    };

    const handleResize = () => {
      updateMetrics();
      handleScroll();
    };

    // Initial setup
    updateMetrics();
    handleScroll();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [maxFlip]);

  // Derived Logic for Synchronization
  const activeIndex = clamp(Math.floor(displayProgress), 0, maxFlip);
  const localT = clamp(displayProgress - activeIndex, 0, 1);
  const turnT = easeInOutCubic(localT);
  
  // Page content for the current and next spreads
  const currentSpread = spreads[activeIndex];
  const nextSpread = spreads[Math.min(activeIndex + 1, maxFlip)];

  // Static Background Logic
  const baseLeftSide = currentSpread.left;
  const baseLeftNum = activeIndex * 2 + 1;
  
  // The right page underneath is always the NEXT spread's right side
  const baseRightSide = nextSpread.right;
  const baseRightNum = (activeIndex + 1) * 2 + 2;

  // Flipping Sheet Logic
  const flipFrontSide = currentSpread.right;
  const flipFrontNum = activeIndex * 2 + 2;
  
  const flipBackSide = nextSpread.left;
  const flipBackNum = (activeIndex + 1) * 2 + 1;

  const rotation = -180 * turnT;
  const faceSwap = smoothstep(0.48, 0.52, localT); // Sharper swap for page numbers

  return (
      <div
  ref={containerRef}
  className="relative bg-gray-100 bg-cover bg-center bg-no-repeat"
  style={{
    height: `${spreads.length * 100}vh`,
    backgroundImage: "url('/images/pbg.png')",

  }}
>

      <div className="sticky top-0 h-screen w-full flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
        
        {/* Progress UI */}
        <div className="mb-2 text-center">
          <p className="text-sm font-medium text-gray-600 mb-2">
            Page {Math.round(displayProgress * 2 + 1)} of {spreads.length * 2}
          </p>
          <div className="h-1.5 w-64 mx-auto rounded-full bg-amber-200 overflow-hidden">
            <div 
              className="h-full bg-pink-500 transition-all duration-300" 
              style={{ width: `${(displayProgress / maxFlip) * 100}%` }} 
            />
          </div>
        </div>

        <div className="relative shadow-2xl rounded-xl " style={{ perspective: '2000px', overflow: 'visible' }}>
          
          {/* Static Background Layer */}
          <div className="grid grid-cols-2" style={{ minHeight: '550px' }}>
            {/* Left Static Page */}
            <div className="relative border-r border-amber-50">
                <Page side={baseLeftSide} pageNumber={baseLeftNum} />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-black/5 to-transparent" />
            </div>
            
            {/* Right Static Page (Wait underneath) */}
            <div className="relative">
                <Page side={baseRightSide} pageNumber={baseRightNum} />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-l from-black/5 to-transparent" />
            </div>
          </div>

          {/* Spine Detail */}
          <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-gray-200 z-10" />
          <div className="absolute inset-y-0 left-1/2 w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent z-10" />

          {/* Flipping Sheet */}
          {displayProgress < maxFlip && (
            <div
              className="absolute top-0 right-0 h-full w-1/2"
              style={{
                transformStyle: 'preserve-3d',
                transformOrigin: 'left center',
                transform: `rotateY(${rotation}deg)`,
                zIndex: 20,
              }}
            >
              {/* Front of the flipping page (Current Right) */}
              <div 
                className="absolute inset-0 backface-hidden"
                style={{ 
                    backfaceVisibility: 'hidden', 
                    opacity: 1 - faceSwap,
                    WebkitBackfaceVisibility: 'hidden' 
                }}
              >
                <Page side={flipFrontSide} pageNumber={flipFrontNum} />
                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
              </div>

              {/* Back of the flipping page (Next Left) */}
              <div 
                className="absolute inset-0"
                style={{ 
                    transform: 'rotateY(180deg)', 
                    opacity: faceSwap,
                }}
              >
                <Page side={flipBackSide} pageNumber={flipBackNum} />
                {/* Shadow logic for the back of the page */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent pointer-events-none" />
              </div>
              
              {/* Realistic Page Lighting */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,0,0,0.05), rgba(255,255,255,0.2), rgba(0,0,0,0.05))',
                  opacity: Math.sin(Math.PI * localT) * 0.5,
                  mixBlendMode: 'multiply'
                }}
              />
            </div>
          )}
        </div>
        
        <p className="mt-8 text-center text-xs text-gray-400 font-medium">
          SCROLL TO FLIP
        </p>
      </div>
      </div>
    </div>
  );
}