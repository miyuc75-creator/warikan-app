import type { FormState } from "@/components/CalculatorForm";
import type { SplitInput } from "@/lib/types";

export function formToSplitInput(form: FormState): SplitInput {
  return {
    totalAmount: Number(form.totalAmount),
    participantCount: Number(form.participantCount),
    mode: form.mode,
    specifiedCount:
      form.mode === "partial" ? Number(form.specifiedCount) : undefined,
    specifiedAmount:
      form.mode === "partial" ? Number(form.specifiedAmount) : undefined,
    roundingUnit: form.roundingUnit,
  };
}
