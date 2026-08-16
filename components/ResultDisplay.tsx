"use client";

import type { SplitResult } from "@/lib/types";

interface ResultDisplayProps {
  result: SplitResult | null;
  totalAmount: number;
  error: string | null;
  title: string;
  onTitleChange: (title: string) => void;
  onSave: () => void;
  canSave: boolean;
}

function formatYen(amount: number): string {
  return amount.toLocaleString("ja-JP");
}

export function ResultDisplay({
  result,
  totalAmount,
  error,
  title,
  onTitleChange,
  onSave,
  canSave,
}: ResultDisplayProps) {
  if (error) {
    return (
      <section className="rounded-2xl border-2 border-red-300 bg-red-50 p-6">
        <p className="text-center font-semibold text-red-700">{error}</p>
      </section>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-center text-xl font-bold text-red-800">
        計算結果
      </h2>

      <div className="space-y-3 rounded-xl bg-amber-50 p-5">
        {result.breakdown.map((item, index) => (
          <p
            key={`${item.count}-${item.amountPerPerson}-${index}`}
            className="text-center text-2xl font-bold text-stone-800"
          >
            {item.count}人 × {formatYen(item.amountPerPerson)}円
          </p>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-center">
        <p className="text-lg text-stone-600">
          合計：{formatYen(result.totalVerified)}円
        </p>
        {result.totalVerified === totalAmount ? (
          <p className="text-sm font-medium text-green-600">
            元の会計金額（{formatYen(totalAmount)}円）と一致しています
          </p>
        ) : (
          <p className="text-sm font-medium text-amber-600">
            元の会計金額：{formatYen(totalAmount)}円
          </p>
        )}
      </div>

      <div className="mt-6 space-y-3 border-t border-stone-200 pt-6">
        <div>
          <label className="mb-2 block text-sm font-semibold text-stone-700">
            タイトル（履歴用）
          </label>
          <input
            type="text"
            placeholder="会社飲み会"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full rounded-xl border-2 border-stone-200 px-4 py-3 text-lg focus:border-red-400 focus:outline-none"
          />
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          className="w-full rounded-xl bg-amber-600 px-6 py-3 font-bold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          履歴に保存
        </button>
      </div>
    </section>
  );
}
