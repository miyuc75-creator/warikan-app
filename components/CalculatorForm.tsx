"use client";

import type { RoundingUnit, SplitMode } from "@/lib/types";

export interface FormState {
  totalAmount: string;
  participantCount: string;
  mode: SplitMode;
  specifiedCount: string;
  specifiedAmount: string;
  roundingUnit: RoundingUnit;
}

export const defaultFormState: FormState = {
  totalAmount: "",
  participantCount: "",
  mode: "even",
  specifiedCount: "",
  specifiedAmount: "",
  roundingUnit: 1,
};

interface CalculatorFormProps {
  form: FormState;
  onChange: (form: FormState) => void;
  onCalculate: () => void;
  onReset: () => void;
}

export function CalculatorForm({
  form,
  onChange,
  onCalculate,
  onReset,
}: CalculatorFormProps) {
  const update = (partial: Partial<FormState>) => {
    onChange({ ...form, ...partial });
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-red-800">
        割り勘計算
      </h2>

      <div className="space-y-5">
        <div>
          <label className="mb-2 block text-sm font-semibold text-stone-700">
            合計金額
          </label>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-stone-600">¥</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="15800"
              value={form.totalAmount}
              onChange={(e) => update({ totalAmount: e.target.value })}
              className="w-full rounded-xl border-2 border-stone-200 px-4 py-3 text-2xl font-bold text-stone-900 focus:border-red-400 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-semibold text-stone-700">
            参加人数
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              placeholder="5"
              value={form.participantCount}
              onChange={(e) => update({ participantCount: e.target.value })}
              className="w-full rounded-xl border-2 border-stone-200 px-4 py-3 text-2xl font-bold text-stone-900 focus:border-red-400 focus:outline-none"
            />
            <span className="text-lg font-semibold text-stone-600">人</span>
          </div>
        </div>

        <div>
          <p className="mb-2 text-sm font-semibold text-stone-700">
            割り勘方法
          </p>
          <div className="space-y-2">
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-stone-200 px-4 py-3 has-[:checked]:border-red-400 has-[:checked]:bg-red-50">
              <input
                type="radio"
                name="mode"
                checked={form.mode === "even"}
                onChange={() => update({ mode: "even" })}
                className="h-5 w-5 accent-red-600"
              />
              <span className="font-medium">全員で均等割り</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-stone-200 px-4 py-3 has-[:checked]:border-red-400 has-[:checked]:bg-red-50">
              <input
                type="radio"
                name="mode"
                checked={form.mode === "partial"}
                onChange={() => update({ mode: "partial" })}
                className="h-5 w-5 accent-red-600"
              />
              <span className="font-medium">一部の人の金額を指定</span>
            </label>
          </div>
        </div>

        {form.mode === "partial" && (
          <div className="space-y-4 rounded-xl border border-dashed border-red-200 bg-red-50/50 p-4">
            <div>
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                金額を指定する人数
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="2"
                  value={form.specifiedCount}
                  onChange={(e) => update({ specifiedCount: e.target.value })}
                  className="w-full rounded-xl border-2 border-stone-200 px-4 py-3 text-xl font-bold focus:border-red-400 focus:outline-none"
                />
                <span className="font-semibold text-stone-600">人</span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                1人あたりの指定金額
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-stone-600">¥</span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="2500"
                  value={form.specifiedAmount}
                  onChange={(e) => update({ specifiedAmount: e.target.value })}
                  className="w-full rounded-xl border-2 border-stone-200 px-4 py-3 text-xl font-bold focus:border-red-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 text-sm font-semibold text-stone-700">端数設定</p>
          <div className="flex gap-3">
            {([1, 10, 100] as RoundingUnit[]).map((unit) => (
              <label
                key={unit}
                className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-stone-200 px-3 py-3 has-[:checked]:border-red-400 has-[:checked]:bg-red-50"
              >
                <input
                  type="radio"
                  name="rounding"
                  checked={form.roundingUnit === unit}
                  onChange={() => update({ roundingUnit: unit })}
                  className="accent-red-600"
                />
                <span className="font-medium">{unit}円</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="button"
            onClick={onCalculate}
            className="rounded-xl bg-red-600 px-6 py-4 text-lg font-bold text-white shadow-md transition hover:bg-red-700 active:scale-[0.98]"
          >
            割り勘を計算する
          </button>
          <button
            type="button"
            onClick={onReset}
            className="rounded-xl border-2 border-stone-300 px-6 py-3 font-semibold text-stone-600 transition hover:bg-stone-50"
          >
            リセット
          </button>
        </div>
      </div>
    </section>
  );
}
