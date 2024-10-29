// RootLayout.tsx
"use client"
import { useState } from "react";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { ApolloWrapper } from "@/lib/apollo/ApolloWrapper";
import { Sidebar } from "@/components/layout/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloWrapper>
          <div className="flex min-h-screen">
            {isSidebarOpen && (
              <aside className="fixed inset-0 z-40 w-64 bg-white sm:hidden border-r">
                <Sidebar OpenSidebar={setIsSidebarOpen} />
                <button
                  onClick={toggleSidebar}
                  className="absolute top-4 right-4 text-gray-600"
                  aria-label="Close sidebar"
                >
                  Close
                </button>
              </aside>
            )}

            <aside className="hidden w-64 sm:block border-r">
              <Sidebar OpenSidebar={setIsSidebarOpen} />
            </aside>

            <main className="flex-1">
              <Header onToggleSidebar={toggleSidebar} />
              <div className="p-8">{children}</div>
              <Toaster />
            </main>
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}
