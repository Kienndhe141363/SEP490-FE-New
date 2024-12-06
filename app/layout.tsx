import type { Metadata } from "next";
import { Darker_Grotesque, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });
const darker = Darker_Grotesque({ subsets: ["latin"], weight: "500" });
export const metadata: Metadata = {
  title: "Insight Junction",
  description: "Created by Trang and friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-center" reverseOrder={false} />
        {children}
      </body>
    </html>
  );
}
