"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { Lot } from "@/lib/db/schema";
import { nanoid } from "nanoid";
import { updateAccountBalance } from "@/lib/ledger/updateAccountBalance";

export function useLots(accountId: string) {
  const [lots, setLots] = useState<Lot[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadLots() {
    const all = await db.lots
      .where("accountId")
      .equals(accountId)
      .sortBy("pickupDate");

    setLots(all.reverse());
    setLoading(false);
  }

  async function addLot(lot: Omit<Lot, "id" | "createdAt">) {
    await db.lots.add({
      ...lot,
      id: nanoid(),
      createdAt: Date.now(),
    });

    await updateAccountBalance(accountId);
    await loadLots();
  }

  async function markLotDone(lotId: string) {
    await db.lots.update(lotId, {
      status: "done",
    });

    await loadLots();
  }

  useEffect(() => {
    loadLots();
  }, [accountId]);

  return { lots, loading, addLot, markLotDone };
}
