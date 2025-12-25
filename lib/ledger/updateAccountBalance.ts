import { db } from "@/lib/db";
import { calculateAccountBalance } from "./calculateAccountBalance";

export async function updateAccountBalance(accountId: string) {
  const balance = await calculateAccountBalance(accountId);

  await db.accounts.update(accountId, {
    balanceCache: balance,
  });

  return balance;
}
