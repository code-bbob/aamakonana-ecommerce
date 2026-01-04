import Link from "next/link";
import { CartSidebar } from "@/components/CartSidebar";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { PromoBanner } from "@/components/PromoBanner";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <PromoBanner />
      <SiteHeader />

      <main id="main">{children}</main>
      <CartSidebar />
      <SiteFooter />
    </>
  );
}
