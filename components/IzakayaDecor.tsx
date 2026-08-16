import type { ReactNode } from "react";

export function NorenHeader() {
  return (
    <div className="relative mb-6">
      {/* 提灯 */}
      <div className="absolute -left-2 top-0 flex flex-col items-center">
        <div className="h-1 w-6 bg-stone-800" />
        <div className="lantern-glow relative">
          <div className="flex h-14 w-10 flex-col items-center justify-center rounded-b-full border-2 border-amber-900 bg-gradient-to-b from-red-500 via-red-600 to-red-800 shadow-lg">
            <span className="text-[10px] font-bold leading-tight text-amber-100">
              割
            </span>
            <span className="text-[10px] font-bold leading-tight text-amber-100">
              勘
            </span>
          </div>
        </div>
      </div>
      <div className="absolute -right-2 top-0 flex flex-col items-center">
        <div className="h-1 w-6 bg-stone-800" />
        <div className="lantern-glow relative">
          <div className="flex h-14 w-10 flex-col items-center justify-center rounded-b-full border-2 border-amber-900 bg-gradient-to-b from-red-500 via-red-600 to-red-800 shadow-lg">
            <span className="text-[10px] font-bold leading-tight text-amber-100">
              計
            </span>
            <span className="text-[10px] font-bold leading-tight text-amber-100">
              算
            </span>
          </div>
        </div>
      </div>

      {/* のれん */}
      <div className="mx-8 overflow-hidden rounded-sm shadow-xl">
        <div className="noren-banner relative bg-red-900 px-6 py-5 text-center">
          <div className="absolute inset-x-0 top-0 h-2 bg-stone-900" />
          <p className="font-serif text-4xl font-black tracking-widest text-amber-50 drop-shadow-md">
            割り勘
          </p>
          <p className="mt-1 font-serif text-sm tracking-[0.4em] text-amber-200/80">
            会計計算所
          </p>
          {/* のれんの裾 */}
          <div className="noren-fringe absolute -bottom-3 left-0 right-0 h-3" />
        </div>
      </div>
    </div>
  );
}

export function SectionDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
      {label && (
        <span className="font-serif text-xs tracking-widest text-amber-800/70">
          {label}
        </span>
      )}
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-amber-700/50 to-transparent" />
    </div>
  );
}

export function WoodPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`wood-panel rounded-lg p-6 ${className}`}>
      {children}
    </section>
  );
}
