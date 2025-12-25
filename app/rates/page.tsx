"use client";

import { useState } from "react";
import { useRateCards } from "@/features/rateCards/useRateCards";
import { NumericInput } from "@/components/NumericInput";
import { Button } from "@/components/ui/Button";

export default function RateCardsPage() {
  const { rateCards, loading, createRateCard } = useRateCards();
  const [effectiveFrom, setEffectiveFrom] = useState("");
  const [services, setServices] = useState([{ name: "", rate: 0 }]);

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Rate Cards</h1>

      {/* Existing Rate Cards */}
      <div className="space-y-4">
        {rateCards.map((rc) => (
          <div key={rc.id} className="border p-3 rounded">
            <div className="font-medium">
              Effective from: {new Date(rc.effectiveFrom).toDateString()}
            </div>
            <ul className="text-sm text-gray-600">
              {rc.services.map((s) => (
                <li key={s.id}>
                  {s.name}: ₹{s.rate}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Create Rate Card */}
      <div className="border-t pt-4 space-y-2">
        <h2 className="font-medium">Add New Rate Card</h2>

        <input
          type="date"
          className="border p-2"
          value={effectiveFrom}
          onChange={(e) => setEffectiveFrom(e.target.value)}
        />

        {services.map((s, i) => (
          <div key={i} className="flex gap-2">
            <input
              className="border p-2 flex-1"
              placeholder="Service name"
              value={s.name}
              onChange={(e) => {
                const next = [...services];
                next[i].name = e.target.value;
                setServices(next);
              }}
            />
            <NumericInput
              value={s.rate}
              onChange={(val) => {
                const next = [...services];
                next[i].rate = val;
                setServices(next);
              }}
              className="w-24"
            />
          </div>
        ))}

        <button
          className="text-sm text-blue-600"
          onClick={() => setServices([...services, { name: "", rate: 0 }])}
        >
          + Add Service
        </button>

        <Button
          className="block bg-black text-white px-4 py-2"
          onClick={() => {
            if (!effectiveFrom) return;
            createRateCard(
              new Date(effectiveFrom).getTime(),
              services.filter((s) => s.name && s.rate > 0)
            );
            setEffectiveFrom("");
            setServices([{ name: "", rate: 0 }]);
          }}
        >
          Save Rate Card
        </Button>
      </div>
    </div>
  );
}
