"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { Account } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export function useAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadAccounts() {
    const all = await db.accounts.orderBy("createdAt").reverse().toArray();

    setAccounts(all);
    setLoading(false);
  }

  async function createAccount(name: string) {
    const account: Account = {
      id: nanoid(),
      name,
      balanceCache: 0,
      createdAt: Date.now(),
    };

    await db.accounts.add(account);
    await loadAccounts();
  }

  useEffect(() => {
    loadAccounts();
  }, []);

  return {
    accounts,
    loading,
    createAccount,
  };
}
