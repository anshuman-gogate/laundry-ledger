"use client";

import { Account } from "@/lib/db/schema";
import Link from "next/link";

type Props = {
  account: Account;
};

export function AccountCard({ account }: Props) {
  const balance = account.balanceCache;

  const balanceColor =
    balance > 0
      ? "text-red-600"
      : balance < 0
      ? "text-green-600"
      : "text-gray-500";

  const balanceLabel =
    balance > 0 ? "Due" : balance < 0 ? "Advance" : "Settled";

  return (
    <Link href={`/account/${account.id}`}>
      <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
        <div className="flex justify-between items-center">
          <div>
            <div className="font-medium">{account.name}</div>
            <div className="text-sm text-gray-500">{balanceLabel}</div>
          </div>

          <div className={`font-semibold ${balanceColor}`}>
            ₹{Math.abs(balance)}
          </div>
        </div>
      </div>
    </Link>
  );
}
