import { Suspense } from "react";
import { CreateStudio } from "@/components/CreateStudio";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export const metadata = {
  title: "Studio — DREAMFRAME",
};

export default function CreatePage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-ink pt-28">
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-20 text-white/50">Opening studio…</div>}>
          <CreateStudio />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
