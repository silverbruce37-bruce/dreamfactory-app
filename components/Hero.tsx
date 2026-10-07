import Link from "next/link";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-[1080px] items-center gap-10 px-5 pb-16 pt-4 md:grid-cols-2 md:gap-16 md:px-8 md:pb-24 md:pt-10">
      <div>
        <h1 className="text-[40px] font-black leading-[1.32] tracking-[-0.045em] text-ink md:text-[56px]">
          한 줄로
          <br />
          그림을 만듭니다.
        </h1>
        <Link
          href="/create"
          className="mt-8 flex h-14 w-full items-center justify-center rounded-2xl bg-ink text-[17px] font-bold tracking-[-0.02em] text-white hover:bg-black sm:inline-flex sm:w-auto sm:px-8"
        >
          만들기
        </Link>
      </div>

      <div className="relative h-[300px] overflow-hidden rounded-[28px] bg-lemon md:h-[440px]" aria-hidden="true">
        <div className="absolute left-[12%] top-[16%] h-[42%] w-[40%] rounded-[20px] bg-white" />
        <div className="absolute bottom-[14%] right-[12%] h-[34%] w-[32%] rounded-[20px] bg-ink" />
        <div className="absolute right-[20%] top-[18%] h-3 w-3 rounded-full bg-ink" />
      </div>
    </section>
  );
}
