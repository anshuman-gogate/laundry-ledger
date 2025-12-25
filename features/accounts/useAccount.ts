"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { Account } from "@/lib/db/schema";
import { liveQuery } from "dexie";

export function useAccount(accountId: string) {
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const subscription = liveQuery(() => db.accounts.get(accountId)).subscribe({
      next: (acc) => {
        setAccount(acc ?? null);
        setLoading(false);
      },
      error: () => {
        setAccount(null);
        setLoading(false);
      },
    });

    return () => subscription.unsubscribe();
  }, [accountId]);

  return { account, loading };
}
