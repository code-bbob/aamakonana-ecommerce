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
    <div className="h-full w-full p-10 sm:p-12 flex flex-col bg-white">
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
              <div className="mt-8">
                <Link
                  href={side.ctaHref}
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-all active:scale-95"
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
        left: { isCover: true, title: 'Aamako Nana', subtitle: 'आमाको न्यानोपनको अनुभूति', body: 'Our story of quality, love, and purpose.' },
        right: { kicker: 'CHAPTER 1', title: 'The Beginning', subtitle: 'How it all started', body: "We weren't born from a business plan. We were born from frustration—from watching baby clothes fall apart after one wash." },
      },
      {
        left: { kicker: 'CHAPTER 1 (CONT.)', title: 'The First Investment', body: "That question led us to invest Rs. 50,000 in premium malmal fabric and stitch 50 sets from home. We sold out in 7 days." },
        right: { kicker: 'CHAPTER 2', title: 'Launch Day', subtitle: 'Everything changed', body: "Orders kept coming—homes wanted our products, and hospitals did too. When ‘Aama’ was already registered, we became ‘Aamako Nana’." },
      },
      {
        left: { kicker: 'CHAPTER 2 (CONT.)', title: 'Social Media Magic', body: 'Social media became our megaphone. TikTok and Instagram helped families find us. By 2079–80 BS, we opened a factory in Basundhara.' },
        right: { kicker: 'CHAPTER 3', title: 'What We Make', subtitle: 'Every product tells a story', body: 'Newborn essentials, Pasni outfits, and festive wear. Bedding sets that turn a crib into a sanctuary.' },
      },
      {
        left: { kicker: 'CHAPTER 3 (CONT.)', title: 'Premium Materials', body: 'We work with premium fabrics—cotton, malmal, muslin, flannel. Every piece is stitched with intention and tested with care.' },
        right: { kicker: 'CHAPTER 4', title: 'Our Values', subtitle: 'Quality without compromise', body: 'Clothing sets range from Rs. 1,100 to Rs. 2,700. Every stitch matters. Every color is tested.' },
      },
      {
        left: { kicker: 'CHAPTER 4 (CONT.)', title: 'No Shortcuts', body: "We don’t believe in shortcuts. We don’t compromise on fabric quality. Every baby deserves comfort." },
        right: { kicker: 'CHAPTER 5', title: 'Our Impact', subtitle: 'Building more than a business', body: "We employ 18 people. We train women in sewing and daura-suruwal making, creating skills and income." },
      },
      {
        left: { kicker: 'CHAPTER 6', title: 'Our Vision', subtitle: 'The future we’re building', body: 'We see a Nepal where quality baby wear reaches every household. We see women empowered through entrepreneurship.' },
        right: { isClosing: true, title: 'Join Our Story', body: 'Every purchase is a vote for quality. Choose care—help us grow this warmth across Nepal.', ctaLabel: 'Shop Our Collection', ctaHref: '/products' },
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
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // The sticky element is h-screen (100vh).
      // The total scrollable distance within the container is containerHeight - windowHeight.
      const elementHeight = windowHeight;
      const totalScrollableDistance = rect.height - elementHeight;
      
      // rect.top is the distance from the top of the viewport to the top of the container.
      // When rect.top is 0, the container is at the top of the viewport.
      // As we scroll down, rect.top becomes negative.
      const scrolled = -rect.top;
      
      let progress = 0;
      if (totalScrollableDistance > 0) {
        progress = scrolled / totalScrollableDistance;
      }
      
      const clamped = clamp(progress, 0, 1);
      setTargetProgress(clamped * maxFlip);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
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
      className="relative bg-amber-50"
      style={{ height: `${spreads.length * 100}vh` }}
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

        <div className="relative shadow-2xl rounded-xl bg-white" style={{ perspective: '2000px', overflow: 'visible' }}>
          
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