import Link from "next/link";
import { CartSidebar } from "@/components/CartSidebar";
import { SiteHeader } from "@/components/SiteHeader";

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

      <SiteHeader />

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
