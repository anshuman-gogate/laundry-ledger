import { db } from "@/lib/db";

export async function calculateAccountBalance(
  accountId: string
): Promise<number> {
  const lots = await db.lots.where("accountId").equals(accountId).toArray();

  const payments = await db.payments
    .where("accountId")
    .equals(accountId)
    .toArray();

  const lotTotal = lots.reduce((sum, lot) => sum + lot.lotTotal, 0);

  const paymentTotal = payments.reduce((sum, p) => sum + p.amount, 0);

  return lotTotal - paymentTotal;
}
