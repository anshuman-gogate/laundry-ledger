"use client";

import { Account } from "@/lib/db/schema";

type Props = {
  account: Account;
};

export function AccountHeader({ account }: Props) {
  const balance = account.balanceCache;

  const balanceColor =
    balance > 0
      ? "text-red-600"
      : balance < 0
      ? "text-green-600"
      : "text-gray-600";

  const balanceLabel =
    balance > 0 ? "Amount Due" : balance < 0 ? "Advance" : "Settled";

  return (
    <div className="border-b pb-4 space-y-1">
      <h1 className="text-xl font-semibold">{account.name}</h1>

      <div className="flex items-center gap-2">
        <span className={`text-lg font-medium ${balanceColor}`}>
          ₹{Math.abs(balance)}
        </span>
        <span className="text-sm text-gray-500">{balanceLabel}</span>
      </div>
    </div>
  );
}
