"use client";

import { useState } from "react";
import {
  CalculatorForm,
  defaultFormState,
  type FormState,
} from "@/components/CalculatorForm";
import { ResultDisplay } from "@/components/ResultDisplay";
import { calculateSplit } from "@/lib/calculate";
import { formToSplitInput } from "@/lib/formUtils";
import type { SplitResult } from "@/lib/types";
import { validateSplitInput } from "@/lib/validation";

export default function Home() {
  const [form, setForm] = useState<FormState>(defaultFormState);
  const [result, setResult] = useState<SplitResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState("");

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
  };

  const totalAmount = Number(form.totalAmount) || 0;

  return (
    <div className="min-h-full bg-amber-50 px-4 py-8">
      <div className="mx-auto max-w-md space-y-8">
        <header className="text-center">
          <h1 className="text-3xl font-bold text-red-800">割り勘計算</h1>
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
          onSave={() => {}}
          canSave={false}
        />
      </div>
    </div>
  );
}
