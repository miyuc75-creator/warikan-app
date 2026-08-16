"use client";

import { useEffect, useState } from "react";
import {
  CalculatorForm,
  defaultFormState,
  type FormState,
} from "@/components/CalculatorForm";
import { HistoryList } from "@/components/HistoryList";
import { ResultDisplay } from "@/components/ResultDisplay";
import { calculateSplit } from "@/lib/calculate";
import { formToSplitInput } from "@/lib/formUtils";
import {
  clearAllHistory,
  createHistoryItem,
  deleteHistoryItem,
  loadHistory,
  saveHistory,
} from "@/lib/storage";
import type { HistoryItem, SplitResult } from "@/lib/types";
import { playRegisterSound } from "@/lib/sound";
import { validateSplitInput } from "@/lib/validation";

function historyToForm(item: HistoryItem): FormState {
  return {
    totalAmount: String(item.totalAmount),
    participantCount: String(item.participantCount),
    mode: item.mode,
    specifiedCount:
      item.mode === "partial" && item.specifiedCount != null
        ? String(item.specifiedCount)
        : "",
    specifiedAmount:
      item.mode === "partial" && item.specifiedAmount != null
        ? String(item.specifiedAmount)
        : "",
    roundingUnit: item.roundingUnit,
  };
}

export default function Home() {
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [result, setResult] = useState<SplitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const handleReset = () => {
    setForm(defaultFormState);
    setResult(null);
    setError(null);
    setTitle("");
  };

  const handleCalculate = () => {
    const input = formToSplitInput(form);
    const validation = validateSplitInput(input);

    if (!validation.valid) {
      setError(validation.error ?? "入力内容を確認してください");
      setResult(null);
      return;
    }

    const calculated = calculateSplit(input);
    setResult(calculated);
    setError(null);
    playRegisterSound();
  };

  const handleSave = () => {
    if (!result) return;

    const input = formToSplitInput(form);
    const remainingCount =
      input.mode === "partial"
        ? input.participantCount - (input.specifiedCount ?? 0)
        : undefined;
    const remainingBreakdown = input.mode === "partial"
      ? result.breakdown.find(
          (b) => b.amountPerPerson !== (input.specifiedAmount ?? 0)
        )
      : undefined;

    const item = createHistoryItem({
      title: title.trim() || "（タイトルなし）",
      totalAmount: input.totalAmount,
      participantCount: input.participantCount,
      mode: input.mode,
      specifiedCount: input.specifiedCount,
      specifiedAmount: input.specifiedAmount,
      remainingCount,
      remainingAmount: remainingBreakdown?.amountPerPerson,
      roundingUnit: input.roundingUnit,
      result,
    });

    setHistory(saveHistory(item));
    setTitle("");
  };

  const handleReuse = (item: HistoryItem) => {
    setForm(historyToForm(item));
    setTitle(item.title === "（タイトルなし）" ? "" : item.title);
    setResult(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    setHistory(deleteHistoryItem(id));
  };

  const handleClearAll = () => {
    if (window.confirm("すべての履歴を削除しますか？")) {
      setHistory(clearAllHistory());
    }
  };

  const totalAmount = Number(form.totalAmount) || 0;

  return (
    <div className="min-h-full bg-gradient-to-b from-amber-100 via-amber-50 to-orange-100 px-4 py-8">
      <div className="mx-auto max-w-md space-y-8">
        <header className="text-center">
          <p className="text-4xl">💰</p>
          <h1 className="mt-2 text-3xl font-bold text-red-800">割り勘計算</h1>
          <p className="mt-2 text-stone-600">会計時にすぐ使える割り勘アプリ</p>
        </header>

        <CalculatorForm
          form={form}
          onChange={setForm}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        <ResultDisplay
          result={result}
          totalAmount={totalAmount}
          error={error}
          title={title}
          onTitleChange={setTitle}
          onSave={handleSave}
          canSave={!!result && !error}
        />

        <HistoryList
          items={history}
          onReuse={handleReuse}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />
      </div>
    </div>
  );
}
