"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { Payment } from "@/lib/db/schema";
import { nanoid } from "nanoid";
import { updateAccountBalance } from "@/lib/ledger/updateAccountBalance";

export function usePayments(accountId: string) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadPayments() {
    const all = await db.payments
      .where("accountId")
      .equals(accountId)
      .sortBy("date");

    setPayments(all.reverse());
    setLoading(false);
  }

  async function addPayment(amount: number, date: number, note?: string) {
    const payment: Payment = {
      id: nanoid(),
      accountId,
      amount,
      date,
      note,
      createdAt: Date.now(),
    };

    await db.payments.add(payment);
    await updateAccountBalance(accountId);
    await loadPayments();
  }

  useEffect(() => {
    loadPayments();
  }, [accountId]);

  return { payments, loading, addPayment };
}
