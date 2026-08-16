"use client";

import type { HistoryItem } from "@/lib/types";
import { WoodPanel } from "@/components/IzakayaDecor";

interface HistoryListProps {
  items: HistoryItem[];
  onReuse: (item: HistoryItem) => void;
  onDelete: (id: string) => void;
  onClearAll: () => void;
}

function formatYen(amount: number): string {
  return amount.toLocaleString("ja-JP");
}

function formatDate(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleDateString("ja-JP", {
    month: "long",
    day: "numeric",
  });
}

function formatBreakdown(item: HistoryItem): string[] {
  if (item.mode === "even") {
    const amount = item.result.breakdown[0]?.amountPerPerson ?? 0;
    return [`全員 × ${formatYen(amount)}円`];
  }
  return item.result.breakdown.map(
    (b) => `${b.count}人 × ${formatYen(b.amountPerPerson)}円`
  );
}

export function HistoryList({
  items,
  onReuse,
  onDelete,
  onClearAll,
}: HistoryListProps) {
  if (items.length === 0) {
    return (
      <WoodPanel>
        <h2 className="mb-1 text-center font-serif text-xl font-bold tracking-widest text-amber-100">
          過去の割り勘
        </h2>
        <p className="mb-4 text-center text-xs text-amber-200/60">
          帳簿
        </p>
        <div className="paper-card rounded-lg p-6 text-center">
          <p className="font-serif text-stone-500">履歴はまだありません</p>
          <p className="mt-2 text-xs text-stone-400">
            計算結果を保存するとここに表示されます
          </p>
        </div>
      </WoodPanel>
    );
  }

  return (
    <WoodPanel>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="font-serif text-xl font-bold tracking-widest text-amber-100">
            過去の割り勘
          </h2>
          <p className="text-xs text-amber-200/60">帳簿</p>
        </div>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-medium text-amber-200/70 underline hover:text-red-300"
        >
          全削除
        </button>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="ledger-card rounded-lg p-4 shadow-sm"
          >
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-800">
                  {item.title || "（タイトルなし）"}
                </h3>
                <p className="text-xs text-stone-500">
                  {formatDate(item.savedAt)}
                </p>
              </div>
              <span className="rounded bg-red-800/10 px-2 py-0.5 font-serif text-xs font-bold text-red-800">
                伝票
              </span>
            </div>

            <p className="mb-2 text-sm text-stone-600">
              合計 {formatYen(item.totalAmount)}円 / {item.participantCount}人
            </p>

            <div className="mb-4 space-y-0.5 border-l-2 border-amber-700/30 pl-3">
              {formatBreakdown(item).map((line) => (
                <p key={line} className="font-serif font-semibold text-stone-800">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onReuse(item)}
                className="btn-noren flex-1 rounded-lg px-3 py-2 text-sm font-bold text-amber-50"
              >
                この設定で再計算
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="rounded-lg border-2 border-stone-300 bg-stone-100 px-3 py-2 text-sm font-semibold text-stone-600 transition hover:bg-stone-200"
              >
                削除
              </button>
            </div>
          </article>
        ))}
      </div>
    </WoodPanel>
  );
}
