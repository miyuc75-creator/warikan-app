"use client";

import type { HistoryItem } from "@/lib/types";

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
      <section className="rounded-2xl bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-red-800">過去の割り勘</h2>
        <p className="text-center text-stone-500">履歴はまだありません</p>
      </section>
    );
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold text-red-800">過去の割り勘</h2>
        <button
          type="button"
          onClick={onClearAll}
          className="text-sm font-medium text-stone-500 underline hover:text-red-600"
        >
          全削除
        </button>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <article
            key={item.id}
            className="rounded-xl border border-stone-200 bg-amber-50/50 p-4"
          >
            <div className="mb-2">
              <h3 className="text-lg font-bold text-stone-800">
                {item.title || "（タイトルなし）"}
              </h3>
              <p className="text-sm text-stone-500">{formatDate(item.savedAt)}</p>
            </div>

            <p className="mb-2 text-stone-700">
              合計 {formatYen(item.totalAmount)}円 / {item.participantCount}人
            </p>

            <div className="mb-4 space-y-1">
              {formatBreakdown(item).map((line) => (
                <p key={line} className="font-semibold text-stone-800">
                  {line}
                </p>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onReuse(item)}
                className="flex-1 rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
              >
                この設定で再計算
              </button>
              <button
                type="button"
                onClick={() => onDelete(item.id)}
                className="rounded-lg border border-stone-300 px-4 py-2 font-semibold text-stone-600 transition hover:bg-stone-100"
              >
                削除
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
