"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/db";
import { RateCard } from "@/lib/db/schema";
import { nanoid } from "nanoid";

export function useRateCards() {
  const [rateCards, setRateCards] = useState<RateCard[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadRateCards() {
    const all = await db.rateCards.orderBy("effectiveFrom").reverse().toArray();

    setRateCards(all);
    setLoading(false);
  }

  async function createRateCard(
    effectiveFrom: number,
    services: { name: string; rate: number }[]
  ) {
    const rateCard: RateCard = {
      id: nanoid(),
      effectiveFrom,
      services: services.map((s) => ({
        id: nanoid(),
        name: s.name,
        rate: s.rate,
      })),
    };

    await db.rateCards.add(rateCard);
    await loadRateCards();
  }

  function getActiveRateCard(forDate: number): RateCard | null {
    return rateCards.find((rc) => rc.effectiveFrom <= forDate) ?? null;
  }

  useEffect(() => {
    loadRateCards();
  }, []);

  return {
    rateCards,
    loading,
    createRateCard,
    getActiveRateCard,
  };
}
