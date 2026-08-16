"use client";

import { useState } from "react";
import {
  CalculatorForm,
  defaultFormState,
  type FormState,
} from "@/components/CalculatorForm";

export default function Home() {
  const [form, setForm] = useState<FormState>(defaultFormState);

  const handleReset = () => {
    setForm(defaultFormState);
  };

  const handleCalculate = () => {
    // Calculation wired in Step 4
  };

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
      </div>
    </div>
  );
}
