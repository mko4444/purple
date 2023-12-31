import "styles/index.scss";
import type { Metadata } from "next";
import Header from "@/components/Header";
import cn from "classnames";
import Web3Provider from "@/components/Web3Provider";
import { inter } from "@/util/fonts";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={cn([inter.className, "col-c-c w-100"])}>
        <Web3Provider>
          <Header />
          {children}
          <Footer />
        </Web3Provider>
      </body>
    </html>
  );
}
