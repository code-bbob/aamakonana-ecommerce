import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { CartSidebar } from "@/components/CartSidebar";
import { CartButton } from "@/components/CartButton";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aama Ko Nana – आमाको न्यानोपनको अनुभूति (Coming Soon)",
  description:
    "Aama Ko Nana – आमाको न्यानोपनको अनुभूति | Countdown to a new crafted experience blending design, narrative & commerce.",
  keywords: [
    "Aama Ko Nana",
    "coming soon",
    "design",
    "portfolio",
    "commerce",
    "Nepal",
  ],
  openGraph: {
    title: "Aama Ko Nana — Coming Soon",
    description: "आमाको न्यानोपनको अनुभूति. A bold creative & commerce destination in the making.",
    url: "https://example.com",
    siteName: "Aama Ko Nana",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aama Ko Nana Coming Soon",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aama Ko Nana — Coming Soon",
    description: "आमाको न्यानोपनको अनुभूति.",
    images: ["/og-image.png"],
  },
  robots: { index: false, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased min-h-full bg-[var(--background)] text-[color:var(--foreground)] selection:bg-[var(--foreground)] selection:text-[var(--background)]`}
      >
        <AuthProvider>
          <CartProvider>
            <header className="bg-black text-center text-white py-2 px-2 top-0 z-50 bg-black  backdrop-blur-sm backdrop-saturate-50 border-b border-[color:var(--line-color)] font-playfair">
              Winter Sale is Live! Up to 30% off on selected items. <a href="#newborns" className="underline font-semibold">Shop Now</a>
            </header>

            <header className="sticky top-0 z-40 bg-purple-200  backdrop-blur-3xl backdrop-saturate-50 border-b border-[color:var(--line-color)] ">
              <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold tracking-tight">
                  <Image src="/images/logo.png" alt="Aama Ko Nana Logo" width={80} height={80} className="-mt-3 -mb-3"/>
                  <Link href="/" className="text-lg font-playfair text-[color:var(--foreground)]">Aama Ko Nana</Link>
                </div>
                <nav className="hidden md:flex items-center gap-5" aria-label="Primary">
                  <Link href="/products" className=" hover:text-[color:var(--foreground)] transition-colors">Shop</Link>
                  <a className=" hover:text-[color:var(--foreground)] transition-colors" href="#story">Story</a>
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
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
