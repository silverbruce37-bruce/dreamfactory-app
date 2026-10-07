import Link from "next/link";

export function Navbar() {
  return (
    <header className="mx-auto flex max-w-[1080px] items-center justify-between px-5 py-5 md:px-8">
      <Link href="/" className="text-[18px] font-black tracking-[-0.04em] text-ink">
        드림팩토리
      </Link>
      <Link href="/programs" className="text-[15px] font-bold text-muted hover:text-ink">
        프로그램
      </Link>
    </header>
  );
}
