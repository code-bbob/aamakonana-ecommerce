'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { CartButton } from "@/components/CartButton";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const isStoryPage = pathname === '/story';

  return (
    <header 
      className={cn(
        "top-0 z-40 bg-purple-300 backdrop-blur-3xl backdrop-saturate-50 border-b border-[color:var(--line-color)]",
        isStoryPage ? "relative" : "sticky"
      )}
    >
      <div className=" px-15 flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold tracking-tight">
          <Image src="/images/logo.png" alt="Aama Ko Nana Logo" width={80} height={80} className="-mt-3 -mb-3"/>
          <Link href="/" className="text-lg font-playfair text-[color:var(--foreground)]">Aama Ko Nana</Link>
        </div>
        <nav className="hidden md:flex items-center gap-5" aria-label="Primary">
          <Link href="/products" className=" hover:text-[color:var(--foreground)] transition-colors">Shop</Link>
          <Link href="/story" className=" hover:text-[color:var(--foreground)] transition-colors">Story</Link>
          <a className=" hover:text-[color:var(--foreground)] transition-colors" href="#materials">Materials</a>
          <a className="hover:text-[color:var(--foreground)] transition-colors" href="#care">Care</a>
          <a className="hover:text-[color:var(--foreground)] transition-colors" href="#newsletter">Updates</a>
        </nav>
        <div className="flex items-center gap-3">
          <CartButton />
        </div>
      </div>
    </header>
  );
}
