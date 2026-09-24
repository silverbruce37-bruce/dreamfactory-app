import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink px-4 py-10 md:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-display text-3xl tracking-[-0.04em] text-white">DreamFrame</p>
          <p className="mt-2 max-w-sm text-sm text-white/45">
            AI image generation for stills that already know how to hold a room.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-white/50">
          <Link href="/create" className="hover:text-white">
            Studio
          </Link>
          <Link href="#features" className="hover:text-white">
            Features
          </Link>
          <Link href="#models" className="hover:text-white">
            3D
          </Link>
          <Link href="/programs" className="hover:text-white">
            Programs catalog
          </Link>
        </div>
      </div>
    </footer>
  );
}
