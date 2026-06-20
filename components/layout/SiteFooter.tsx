import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className=" border-t border-outline-variant/40 py-8">
      <p className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
        Designed and developed by Tran Tuan Hiep using Figma and
        <span className="inline-flex h-5 items-center">
          <Image
            src="/next.svg"
            alt="Next.js"
            width={54}
            height={12}
            className="h-3 w-auto invert"
          />
        </span>
        then deployed on Vercel
        <span className="inline-flex h-5 ">
          <Image
            src="/vercel.svg"
            alt="Vercel"
            width={16}
            height={16}
            className="size-4"
          />
        </span>
      </p>
    </footer>
  );
}
