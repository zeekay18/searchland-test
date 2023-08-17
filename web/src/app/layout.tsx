"use client";

import "./globals.css";
import "@radix-ui/themes/styles.css";
import "react-toastify/dist/ReactToastify.css";

import { Inter } from "next/font/google";
import { Theme } from "@radix-ui/themes";
import { trpcClient } from "./services/trpcClient";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className} id="app">
        <Theme> {children} </Theme>
        <ToastContainer />
      </body>
    </html>
  );
}

export default trpcClient.withTRPC(RootLayout);
