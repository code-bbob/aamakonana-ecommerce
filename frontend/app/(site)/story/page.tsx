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
    <div className="h-full w-full p-10 sm:p-12 flex flex-col">
      <div className="flex-1">
        {side.kicker ? (
          <div className="text-xs font-semibold tracking-[0.25em] text-amber-700 mb-3">
            {side.kicker}
          </div>
        ) : null}

        {side.isCover ? (
          <div className="h-full flex flex-col justify-center text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-slate-900">
              {side.title}
            </h1>
            {side.subtitle ? (
              <p className="mt-4 text-xl sm:text-2xl text-amber-700 font-light">
                {side.subtitle}
              </p>
            ) : null}
            {side.body ? (
              <p className="mt-6 text-base sm:text-lg text-gray-700 leading-relaxed">
                {side.body}
              </p>
            ) : null}
          </div>
        ) : (
          <>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
              {side.title}
            </h2>
            {side.subtitle ? (
              <p className="mt-2 text-base sm:text-lg font-semibold text-pink-600">
                {side.subtitle}
              </p>
            ) : null}
            {side.body ? (
              <p className="mt-5 text-base sm:text-lg text-gray-700 leading-relaxed">
                {side.body}
              </p>
            ) : null}

            {side.isClosing && side.ctaHref && side.ctaLabel ? (
              <div className="mt-8">
                <Link
                  href={side.ctaHref}
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold hover:shadow-lg transition-shadow"
                >
                  {side.ctaLabel}
                </Link>
              </div>
            ) : null}
          </>
        )}
      </div>

      {typeof pageNumber === 'number' ? (
        <div className="pt-6 text-center text-xs text-gray-400">{pageNumber}</div>
      ) : null}
    </div>
  );
}

export default function StoryPage() {
  const spreads: Spread[] = useMemo(
    () => [
      {
        left: {
          isCover: true,
          title: 'Aamako Nana',
          subtitle: 'आमाको न्यानोपनको अनुभूति',
          body: 'Our story of quality, love, and purpose.',
        },
        right: {
          kicker: 'CHAPTER 1',
          title: 'The Beginning',
          subtitle: 'How it all started',
          body:
            "We weren't born from a business plan. We were born from frustration—from watching baby clothes fall apart after one wash, and from seeing a gap no one was filling with real care. A simple question became our mission: Why can’t quality and affordability exist together?",
        },
      },
      {
        left: {
          kicker: 'CHAPTER 1 (CONT.)',
          title: 'The First Investment',
          body:
            "That question led us to invest Rs. 50,000 in premium malmal fabric and stitch 50 sets from home. We didn’t expect much—we hoped for patience from customers who understood what we were trying to build. Instead, we sold out in 7 days.",
        },
        right: {
          kicker: 'CHAPTER 2',
          title: 'Launch Day',
          subtitle: 'Everything changed',
          body:
            "Orders kept coming—homes wanted our products, and hospitals did too. The market was ready. When ‘Aama’ was already registered, we became ‘Aamako Nana’—Mother’s Warmth—a name that captured exactly what we were building.",
        },
      },
      {
        left: {
          kicker: 'CHAPTER 2 (CONT.)',
          title: 'Social Media Magic',
          body:
            'Social media became our megaphone. TikTok and Instagram helped families find us. By 2079–80 BS, we opened a factory in Basundhara, Kathmandu. Today, 18 dedicated team members bring our vision to life—every single day.',
        },
        right: {
          kicker: 'CHAPTER 3',
          title: 'What We Make',
          subtitle: 'Every product tells a story',
          body:
            'Newborn essentials that feel soft against delicate skin. Baby daura-suruwal for cultural moments. Maternity gowns for expecting mothers. Pasni outfits for naming ceremonies. Festive wear for celebrations. Quilts, mattresses, pillows, and bedding sets that turn a crib into a sanctuary.',
        },
      },
      {
        left: {
          kicker: 'CHAPTER 3 (CONT.)',
          title: 'Premium Materials',
          body:
            'We work with premium fabrics—cotton, malmal, muslin, flannel—sourced from India and Dhaka. Every piece is stitched with intention and tested with care. We believe every baby deserves comfort, and every family deserves quality without compromise.',
        },
        right: {
          kicker: 'CHAPTER 4',
          title: 'Our Values',
          subtitle: 'Quality without compromise',
          body:
            'We believe affordability and excellence can walk hand in hand. Clothing sets range from Rs. 1,100 to Rs. 2,700, and premium bedding sets start at Rs. 6,000. Every stitch matters. Every color is tested. Every product is made to last.',
        },
      },
      {
        left: {
          kicker: 'CHAPTER 4 (CONT.)',
          title: 'No Shortcuts',
          body:
            "We don’t believe in shortcuts. We don’t compromise on fabric quality, and we don’t rush the process. Every baby deserves comfort. Every family deserves trust. That’s why we do what we do—and that’s who we are.",
        },
        right: {
          kicker: 'CHAPTER 5',
          title: 'Our Impact',
          subtitle: 'Building more than a business',
          body:
            "We employ 18 people who believe in what we’re building. We train women in sewing and daura-suruwal making, creating skills and income. And we’re expanding beyond Kathmandu—because quality shouldn’t be limited by geography.",
        },
      },
      {
        left: {
          kicker: 'CHAPTER 6',
          title: 'Our Vision',
          subtitle: 'The future we’re building',
          body:
            'We see a Nepal where quality baby wear reaches every household. We see women empowered through sewing and entrepreneurship. We see Aamako Nana in every city and district—because comfort should feel like a right, not a luxury.',
        },
        right: {
          isClosing: true,
          title: 'Join Our Story',
          body:
            'Every purchase is a vote for quality. Every customer becomes part of our community. When you choose us, you choose care—and you help us grow this warmth across Nepal.',
          ctaLabel: 'Shop Our Collection',
          ctaHref: '/products',
        },
      },
    ],
    [],
  );

  const maxFlip = Math.max(0, spreads.length - 1);
  const [targetProgress, setTargetProgress] = useState(0);
  const [displayProgress, setDisplayProgress] = useState(0);
  const startTouchY = useRef<number | null>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }, []);

  // Prevent the page from scrolling to the footer while the flipbook is active.
  useEffect(() => {
    const prevHtmlOverflow = document.documentElement.style.overflow;
    const prevBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = prevHtmlOverflow;
      document.body.style.overflow = prevBodyOverflow;
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion.current) {
      setDisplayProgress(targetProgress);
      return;
    }

    let rafId = 0;
    const tick = () => {
      setDisplayProgress((prev) => {
        const next = prev + (targetProgress - prev) * 0.14;
        return Math.abs(next - targetProgress) < 0.0005 ? targetProgress : next;
      });
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [targetProgress]);

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      if (maxFlip === 0) return;
      const delta = event.deltaY * 0.0016;
      setTargetProgress((p) => clamp(p + delta, 0, maxFlip));
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (maxFlip === 0) return;
      if (event.key === 'ArrowDown' || event.key === 'PageDown' || event.key === ' ') {
        event.preventDefault();
        setTargetProgress((p) => clamp(p + 0.22, 0, maxFlip));
      }
      if (event.key === 'ArrowUp' || event.key === 'PageUp') {
        event.preventDefault();
        setTargetProgress((p) => clamp(p - 0.22, 0, maxFlip));
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setTargetProgress(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setTargetProgress(maxFlip);
      }
    };

    const onTouchStart = (event: TouchEvent) => {
      startTouchY.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (maxFlip === 0) return;
      const currentY = event.touches[0]?.clientY;
      if (typeof currentY !== 'number' || startTouchY.current === null) return;
      event.preventDefault();
      event.stopPropagation();
      const deltaY = startTouchY.current - currentY;
      startTouchY.current = currentY;
      setTargetProgress((p) => clamp(p + deltaY * 0.0032, 0, maxFlip));
    };

    window.addEventListener('wheel', onWheel, { passive: false, capture: true });
    window.addEventListener('keydown', onKeyDown, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true, capture: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false, capture: true });

    return () => {
      window.removeEventListener('wheel', onWheel, true);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('touchstart', onTouchStart, true);
      window.removeEventListener('touchmove', onTouchMove, true);
    };
  }, [maxFlip]);

  const clamped = clamp(displayProgress, 0, maxFlip);
  const atEnd = maxFlip === 0 ? true : clamped >= maxFlip - 0.0001;
  const activeIndex = maxFlip === 0 ? 0 : clamp(Math.floor(clamped), 0, maxFlip - 1);
  const localT = maxFlip === 0 ? 0 : clamp(clamped - activeIndex, 0, 1);
  const turnT = easeInOutCubic(localT);
  const rotation = -180 * turnT;

  // Swap visible face content around the midpoint, but keep the paper opaque.
  // Wider window avoids a "blank" look when the page is near edge-on.
  const faceSwap = smoothstep(0.42, 0.58, localT);
  const frontAlpha = 1 - faceSwap;
  const backAlpha = faceSwap;

  const current = spreads[atEnd ? spreads.length - 1 : activeIndex];
  const next = spreads[Math.min(activeIndex + 1, spreads.length - 1)];
  const showFlip = !atEnd && maxFlip > 0;

  const baseLeftSide = current.left;
  const baseRightSide = atEnd ? current.right : next.right;

  const leftPageNumber = atEnd ? spreads.length * 2 - 1 : activeIndex * 2 + 1;
  const rightPageNumber = atEnd ? spreads.length * 2 : activeIndex * 2 + 2;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100">
      <div className="fixed top-32 inset-0 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-6xl">
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-700">
              Scroll to flip pages ({Math.round(clamped * 2 + 1)} / {spreads.length * 2})
            </p>
            <div className="mt-3 h-2 w-full max-w-md mx-auto rounded-full bg-amber-200 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                style={{ width: `${maxFlip === 0 ? 100 : (clamped / maxFlip) * 100}%` }}
              />
            </div>
          </div>

          <div className="relative mx-auto" style={{ perspective: '1800px' }}>
            <div
              className="relative w-full overflow-hidden rounded-xl shadow-2xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.86))',
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Spine */}
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-[3px] -translate-x-1/2 bg-amber-200/70" />
              <div className="pointer-events-none absolute inset-y-0 left-1/2 w-8 -translate-x-1/2 bg-gradient-to-r from-transparent via-amber-100/80 to-transparent" />

              <div className="grid grid-cols-2" style={{ minHeight: 560 }}>
                {/* Left page (base) */}
                <div className="relative border-r border-amber-100 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-50/50 via-transparent to-transparent" />
                  <div className="relative">
                    <Page side={baseLeftSide} pageNumber={leftPageNumber} />
                  </div>
                </div>

                {/* Right page (under) */}
                <div className="relative bg-white">
                  <div className="absolute inset-0 bg-gradient-to-l from-amber-50/50 via-transparent to-transparent" />
                  <div className="relative">
                    <Page side={baseRightSide} pageNumber={rightPageNumber} />
                  </div>
                </div>
              </div>

              {/* Flipping sheet (right-to-left) */}
              {showFlip ? (
                <div
                  className="absolute top-0 right-0 h-full w-1/2"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformOrigin: '0% 50%',
                    transform: `rotateY(${rotation}deg)`,
                    willChange: 'transform',
                  }}
                >
                  {/* Paper stays opaque (no see-through) */}
                  <div className="absolute inset-0 bg-white" />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-amber-50/50 via-transparent to-transparent" />
                  <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-amber-200/50 to-transparent" />

                  {/* Front face content (current right) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: 'translateZ(1px)',
                      transformStyle: 'preserve-3d',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      opacity: frontAlpha,
                    }}
                  >
                    <div className="relative h-full">
                      <Page side={current.right} pageNumber={activeIndex * 2 + 2} />
                    </div>
                  </div>

                  {/* Back face content (next left) */}
                  <div
                    className="absolute inset-0"
                    style={{
                      transform: 'rotateY(180deg) translateZ(1px)',
                      transformStyle: 'preserve-3d',
                    //   backfaceVisibility: 'hidden',
                    //   WebkitBackfaceVisibility: 'hidden',
                      opacity: backAlpha,
                    }}
                  >
                    <div className="pointer-events-none  absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-amber-200/50 to-transparent" />
                    <div className="relative h-full">
                      <Page side={next.left} pageNumber={(activeIndex + 1) * 2 + 1} />
                    </div>
                  </div>

                  {/* Lighting/shadow during turn */}
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        'linear-gradient(90deg, rgba(0,0,0,0.18), rgba(0,0,0,0) 45%, rgba(0,0,0,0.10))',
                      opacity: clamp(Math.sin(Math.PI * turnT), 0, 1) * 0.7,
                      mixBlendMode: 'multiply',
                    }}
                  />
                </div>
              ) : null}
            </div>

            <div className="mt-6 text-center text-xs text-gray-600">
              Tip: Use the mouse wheel / trackpad. Arrow keys also work.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
