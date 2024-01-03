import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

//shadcn
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "To-Do List App",
  description: "A ToDo List for all",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + ` bg-gray-50`}>
        <main className="flex justify-center w-full h-full">
          <div className="w-full h-full max-w-3xl p-6">
            <h1 className="w-full text-center font-extrabold text-4xl text-gray-500 mb-8">
              TODO LIST
            </h1>
            {children}
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
