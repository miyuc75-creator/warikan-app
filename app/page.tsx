"use client";

import { useEffect, useState } from "react";
import {
  CalculatorForm,
  defaultFormState,
  type FormState,
} from "@/components/CalculatorForm";
import { HistoryList } from "@/components/HistoryList";
import { NorenHeader, SectionDivider } from "@/components/IzakayaDecor";
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
    <div className="izakaya-bg min-h-full px-4 py-8 pb-16">
      <div className="mx-auto max-w-md space-y-6">
        <NorenHeader />

        <p className="text-center font-serif text-sm tracking-widest text-amber-200/60">
          ── お会計のお手伝い ──
        </p>

        <CalculatorForm
          form={form}
          onChange={setForm}
          onCalculate={handleCalculate}
          onReset={handleReset}
        />

        {(result || error) && (
          <>
            <SectionDivider label="お会計" />
            <ResultDisplay
              result={result}
              totalAmount={totalAmount}
              error={error}
              title={title}
              onTitleChange={setTitle}
              onSave={handleSave}
              canSave={!!result && !error}
            />
          </>
        )}

        <SectionDivider label="履歴帳" />
        <HistoryList
          items={history}
          onReuse={handleReuse}
          onDelete={handleDelete}
          onClearAll={handleClearAll}
        />

        <footer className="pt-4 text-center">
          <p className="font-serif text-xs tracking-widest text-amber-200/30">
            ご利用ありがとうございました
          </p>
        </footer>
      </div>
    </div>
  );
}
