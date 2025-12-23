import Link from "next/link";
import Image from "next/image";
import { CartSidebar } from "@/components/CartSidebar";
import { CartButton } from "@/components/CartButton";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header className="bg-black text-center text-white py-2 px-2 top-0 z-50 backdrop-blur-sm backdrop-saturate-50 border-b border-[color:var(--line-color)] font-playfair">
        Winter Sale is Live! Up to 30% off on selected items.{' '}
        <Link href="/products" className="underline font-semibold">Shop Now</Link>
      </header>

      <header className="sticky top-0 z-40 bg-purple-300  backdrop-blur-3xl backdrop-saturate-50 border-b border-[color:var(--line-color)] ">
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

      <main id="main">{children}</main>
      <CartSidebar />
      <footer className="border-t border-[color:var(--line-color)] mt-16 py-8 ">
        <div className="max-w-6xl mx-auto px-6" role="contentinfo">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <p>© {new Date().getFullYear()} Aama Ko Nana. All rights reserved.</p>
            <div className="flex gap-4">
              <a className="opacity-70 hover:opacity-100 transition" href="#" aria-label="Instagram">Instagram</a>
              <a className="opacity-70 hover:opacity-100 transition" href="#" aria-label="Facebook">Facebook</a>
              <a className="opacity-70 hover:opacity-100 transition" href="#" aria-label="X">X</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
