import Link from "next/link";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1080px] flex-col gap-3 px-5 py-10 text-[13px] font-bold text-muted md:flex-row md:items-center md:justify-between md:px-8">
      <p>팀 아이캔 · 드림팩토리</p>
      <nav className="flex gap-4" aria-label="바로가기">
        <Link href="/create#models" className="hover:text-ink">
          입체
        </Link>
        <Link href="/programs" className="hover:text-ink">
          프로그램
        </Link>
      </nav>
    </footer>
  );
}
