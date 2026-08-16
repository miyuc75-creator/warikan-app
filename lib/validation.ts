import type { SplitInput } from "./types";

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateSplitInput(input: SplitInput): ValidationResult {
  const { totalAmount, participantCount, mode, specifiedCount, specifiedAmount } =
    input;

  if (!Number.isFinite(totalAmount) || totalAmount <= 0) {
    return { valid: false, error: "合計金額は1円以上の数値を入力してください" };
  }

  if (!Number.isInteger(participantCount) || participantCount < 1) {
    return { valid: false, error: "参加人数は1人以上の整数を入力してください" };
  }

  if (mode === "partial") {
    const count = specifiedCount ?? 0;
    const amount = specifiedAmount ?? 0;

    if (!Number.isInteger(count) || count < 1) {
      return {
        valid: false,
        error: "指定人数は1人以上の整数を入力してください",
      };
    }

    if (count >= participantCount) {
      return {
        valid: false,
        error: "指定人数は参加人数より少なくしてください",
      };
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return {
        valid: false,
        error: "指定金額は1円以上の数値を入力してください",
      };
    }

    const specifiedTotal = count * amount;
    if (specifiedTotal >= totalAmount) {
      return {
        valid: false,
        error: "指定人数×指定金額は合計金額より少なくしてください",
      };
    }

    const remainingCount = participantCount - count;
    if (remainingCount < 1) {
      return {
        valid: false,
        error: "残り人数が0人になっています",
      };
    }
  }

  return { valid: true };
}
