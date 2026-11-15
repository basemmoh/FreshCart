import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Figtree } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "../components/Navbar/Navbar";
import { Footer } from "../components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { WishlistProvider } from "@/src/components/WishlistProvider/WishlistProvider";
import { CartProvider } from "@/src/components/CartProvider/CartProvider";

const figtreeHeading = Figtree({subsets:['latin'],variable:'--font-heading'});

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FreshCart",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable, figtreeHeading.variable)}
    >
      <body className="min-h-full flex flex-col pb-20 md:pb-0">
       <SessionProvider>
         <WishlistProvider>
           <CartProvider>
             <Navbar />
             {children}
             <Footer />
           </CartProvider>
         </WishlistProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
