import type { BreakdownItem, RoundingUnit, SplitInput, SplitResult } from "./types";

function floorToUnit(amount: number, unit: RoundingUnit): number {
  return Math.floor(amount / unit) * unit;
}

function distributeAmount(
  groups: { count: number; rawAmount: number }[],
  totalAmount: number,
  unit: RoundingUnit
): BreakdownItem[] {
  const groupAmounts = groups.map((g) => ({
    count: g.count,
    amount: floorToUnit(g.rawAmount, unit),
  }));

  let remainder =
    totalAmount -
    groupAmounts.reduce((sum, g) => sum + g.count * g.amount, 0);

  const people: { amount: number }[] = [];
  for (const g of groupAmounts) {
    for (let i = 0; i < g.count; i++) {
      people.push({ amount: g.amount });
    }
  }

  let idx = 0;
  while (remainder >= unit && people.length > 0) {
    people[idx % people.length].amount += unit;
    remainder -= unit;
    idx++;
  }

  const amountCounts = new Map<number, number>();
  for (const p of people) {
    amountCounts.set(p.amount, (amountCounts.get(p.amount) ?? 0) + 1);
  }

  const breakdown: BreakdownItem[] = [];
  for (const [amount, count] of amountCounts) {
    breakdown.push({ count, amountPerPerson: amount });
  }

  breakdown.sort((a, b) => a.amountPerPerson - b.amountPerPerson);
  return breakdown;
}

export function calculateEvenSplit(input: SplitInput): SplitResult {
  const { totalAmount, participantCount, roundingUnit } = input;
  const rawPerPerson = totalAmount / participantCount;

  const breakdown = distributeAmount(
    [{ count: participantCount, rawAmount: rawPerPerson }],
    totalAmount,
    roundingUnit
  );

  const totalVerified = breakdown.reduce(
    (sum, g) => sum + g.count * g.amountPerPerson,
    0
  );

  return { breakdown, totalVerified };
}

export function calculatePartialSplit(input: SplitInput): SplitResult {
  const {
    totalAmount,
    participantCount,
    specifiedCount = 0,
    specifiedAmount = 0,
    roundingUnit,
  } = input;

  const specifiedTotal = specifiedCount * specifiedAmount;
  const remainingAmount = totalAmount - specifiedTotal;
  const remainingCount = participantCount - specifiedCount;
  const rawRemainingPerPerson = remainingAmount / remainingCount;

  const groups: { count: number; rawAmount: number }[] = [];

  if (specifiedCount > 0) {
    groups.push({ count: specifiedCount, rawAmount: specifiedAmount });
  }
  if (remainingCount > 0) {
    groups.push({ count: remainingCount, rawAmount: rawRemainingPerPerson });
  }

  const breakdown = distributeAmount(groups, totalAmount, roundingUnit);

  const totalVerified = breakdown.reduce(
    (sum, g) => sum + g.count * g.amountPerPerson,
    0
  );

  return { breakdown, totalVerified };
}

export function calculateSplit(input: SplitInput): SplitResult {
  if (input.mode === "even") {
    return calculateEvenSplit(input);
  }
  return calculatePartialSplit(input);
}
