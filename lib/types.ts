export type RoundingUnit = 1 | 10 | 100;

export type SplitMode = "even" | "partial";

export interface SplitInput {
  totalAmount: number;
  participantCount: number;
  mode: SplitMode;
  specifiedCount?: number;
  specifiedAmount?: number;
  roundingUnit: RoundingUnit;
}

export interface BreakdownItem {
  count: number;
  amountPerPerson: number;
}

export interface SplitResult {
  breakdown: BreakdownItem[];
  totalVerified: number;
}

export interface HistoryItem {
  id: string;
  title: string;
  savedAt: string;
  totalAmount: number;
  participantCount: number;
  mode: SplitMode;
  specifiedCount?: number;
  specifiedAmount?: number;
  remainingCount?: number;
  remainingAmount?: number;
  roundingUnit: RoundingUnit;
  result: SplitResult;
}
