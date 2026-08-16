"use client";

import type { RoundingUnit, SplitMode } from "@/lib/types";
import { WoodPanel } from "@/components/IzakayaDecor";

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
    <WoodPanel>
      <h2 className="mb-1 text-center font-serif text-xl font-bold tracking-widest text-amber-100">
        お品書き
      </h2>
      <p className="mb-5 text-center text-xs text-amber-200/60">
        金額と人数を入力してください
      </p>

      <div className="paper-card space-y-5 rounded-lg p-5">
        <div>
          <label className="mb-2 flex items-center gap-2 font-serif text-sm font-bold text-stone-700">
            <span className="text-base">🍶</span> 合計金額
          </label>
          <div className="flex items-center gap-2">
            <span className="font-serif text-xl font-bold text-red-800">¥</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="15800"
              value={form.totalAmount}
              onChange={(e) => update({ totalAmount: e.target.value })}
              className="izakaya-input w-full rounded-lg px-4 py-3 text-2xl font-bold"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 flex items-center gap-2 font-serif text-sm font-bold text-stone-700">
            <span className="text-base">👥</span> 参加人数
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              inputMode="numeric"
              placeholder="5"
              value={form.participantCount}
              onChange={(e) => update({ participantCount: e.target.value })}
              className="izakaya-input w-full rounded-lg px-4 py-3 text-2xl font-bold"
            />
            <span className="font-serif text-lg font-bold text-stone-600">
              人
            </span>
          </div>
        </div>

        <div>
          <p className="mb-2 font-serif text-sm font-bold text-stone-700">
            割り勘方法
          </p>
          <div className="space-y-2">
            <label className="menu-tag flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3">
              <input
                type="radio"
                name="mode"
                checked={form.mode === "even"}
                onChange={() => update({ mode: "even" })}
                className="h-5 w-5 accent-red-700"
              />
              <span className="font-medium">全員で均等割り</span>
            </label>
            <label className="menu-tag flex cursor-pointer items-center gap-3 rounded-lg px-4 py-3">
              <input
                type="radio"
                name="mode"
                checked={form.mode === "partial"}
                onChange={() => update({ mode: "partial" })}
                className="h-5 w-5 accent-red-700"
              />
              <span className="font-medium">一部の人の金額を指定</span>
            </label>
          </div>
        </div>

        {form.mode === "partial" && (
          <div className="space-y-4 rounded-lg border-2 border-dashed border-red-300/60 bg-red-50/80 p-4">
            <p className="text-center font-serif text-xs font-bold tracking-wider text-red-800">
              ── 特別割引 ──
            </p>
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
                  className="izakaya-input w-full rounded-lg px-4 py-3 text-xl font-bold"
                />
                <span className="font-semibold text-stone-600">人</span>
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-stone-700">
                1人あたりの指定金額
              </label>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-red-800">¥</span>
                <input
                  type="number"
                  inputMode="numeric"
                  placeholder="2500"
                  value={form.specifiedAmount}
                  onChange={(e) => update({ specifiedAmount: e.target.value })}
                  className="izakaya-input w-full rounded-lg px-4 py-3 text-xl font-bold"
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <p className="mb-2 font-serif text-sm font-bold text-stone-700">
            端数設定
          </p>
          <div className="flex gap-2">
            {([1, 10, 100] as RoundingUnit[]).map((unit) => (
              <label
                key={unit}
                className="menu-tag flex flex-1 cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-3"
              >
                <input
                  type="radio"
                  name="rounding"
                  checked={form.roundingUnit === unit}
                  onChange={() => update({ roundingUnit: unit })}
                  className="accent-red-700"
                />
                <span className="text-sm font-bold">{unit}円</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <button
            type="button"
            onClick={onCalculate}
            className="btn-noren rounded-lg px-6 py-4 font-serif text-lg font-bold tracking-wider text-amber-50"
          >
            🧮 割り勘を計算する
          </button>
          <button
            type="button"
            onClick={onReset}
            className="btn-wood rounded-lg px-6 py-3 font-semibold transition active:translate-y-0.5"
          >
            リセット
          </button>
        </div>
      </div>
    </WoodPanel>
  );
}
