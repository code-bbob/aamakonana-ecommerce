"use client";
import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <h3 className="font-playfair text-2xl font-bold tracking-wide">Aama Ko Nana</h3>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
              Crafting premium essentials for mothers and newborns with love, care, and the finest organic materials from Nepal.
            </p>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-neutral-200">Shop</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li>
                <Link href="/products?category=Moms" className="hover:text-white transition-colors">
                  Maternity
                </Link>
              </li>
              <li>
                <Link href="/products?category=Babies" className="hover:text-white transition-colors">
                  Newborns
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/collections" className="hover:text-white transition-colors">
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* About Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-neutral-200">Company</h4>
            <ul className="space-y-4 text-sm text-neutral-400">
              <li>
                <Link href="/our-story" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="hover:text-white transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors">
                  Shipping & Returns
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-6 text-neutral-200">Stay Connected</h4>
            <p className="text-neutral-400 text-sm mb-4">
              Join our community for exclusive offers and stories.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-neutral-900 border border-neutral-800 text-white px-4 py-3 text-sm focus:outline-none focus:border-neutral-600 transition-colors"
              />
              <button
                type="submit"
                className="bg-white text-black px-4 py-3 text-sm font-bold uppercase tracking-wider hover:bg-neutral-200 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-neutral-500 text-xs">
            © {new Date().getFullYear()} Aama Ko Nana. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a href="#" aria-label="Instagram" className="text-neutral-400 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Facebook" className="text-neutral-400 hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Twitter" className="text-neutral-400 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          <div className="flex gap-6 text-xs text-neutral-500">
            <Link href="/privacy" className="hover:text-neutral-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-neutral-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
