import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "./components/side-bar/side-bar";


export const metadata: Metadata = {
  title: "Papercritic | Find your next read",
  description: "Discover your next favorite book.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
        <Sidebar />
        {children}
      </body>
    </html>
  );
}
