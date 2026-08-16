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
      <section className="receipt-card rounded-lg p-6 pt-8">
        <p className="text-center font-serif text-lg font-bold text-red-700">
          ⚠️ {error}
        </p>
      </section>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <section className="receipt-card rounded-lg p-6 pt-8">
      <h2 className="mb-1 text-center font-serif text-xl font-black tracking-widest text-stone-800">
        お 会 計 票
      </h2>
      <p className="mb-5 text-center text-xs tracking-wider text-stone-500">
        ━━━━━━━━━━━━━━━
      </p>

      <div className="space-y-3 border-y border-dashed border-stone-300 py-5">
        {result.breakdown.map((item, index) => (
          <div
            key={`${item.count}-${item.amountPerPerson}-${index}`}
            className="flex items-baseline justify-between px-2"
          >
            <span className="font-serif text-lg text-stone-600">
              {item.count}人 ×
            </span>
            <span className="font-serif text-3xl font-black text-red-800">
              {formatYen(item.amountPerPerson)}
              <span className="ml-1 text-lg">円</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1 text-center">
        <p className="font-serif text-2xl font-black text-stone-800">
          合計 {formatYen(result.totalVerified)}円
        </p>
        {result.totalVerified === totalAmount ? (
          <p className="text-sm font-medium text-green-700">
            ✓ 元の会計金額（{formatYen(totalAmount)}円）と一致
          </p>
        ) : (
          <p className="text-sm font-medium text-amber-700">
            元の会計金額：{formatYen(totalAmount)}円
          </p>
        )}
      </div>

      <div className="mt-6 space-y-3 border-t border-dashed border-stone-300 pt-6">
        <div>
          <label className="mb-2 block font-serif text-sm font-bold text-stone-700">
            履歴タイトル
          </label>
          <input
            type="text"
            placeholder="会社飲み会"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="izakaya-input w-full rounded-lg px-4 py-3 text-lg"
          />
        </div>
        <button
          type="button"
          onClick={onSave}
          disabled={!canSave}
          className="btn-gold w-full rounded-lg px-6 py-3 font-serif font-bold tracking-wider text-stone-900 transition active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50"
        >
          📋 履歴に保存
        </button>
      </div>
    </section>
  );
}
