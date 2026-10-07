import { Suspense } from "react";
import { CreateStudio } from "@/components/CreateStudio";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "만들기 · 드림팩토리",
};

export default function CreatePage() {
  return (
    <main id="main" className="min-h-screen">
      <Navbar />
      <Suspense fallback={<div className="min-h-[70vh]" />}>
        <CreateStudio />
      </Suspense>
      <Footer />
    </main>
  );
}
