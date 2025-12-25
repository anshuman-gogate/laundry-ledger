"use client";

import { useEffect, useState } from "react";
import { useRateCards } from "@/features/rateCards/useRateCards";
import { Lot } from "@/lib/db/schema";
import { NumericInput } from "./NumericInput";
import { Button } from "./ui/Button";

type Props = {
  accountId: string;
  onSave: (lot: Omit<Lot, "id" | "createdAt">) => void;
  onCancel: () => void;
};

export function AddLotForm({ accountId, onSave, onCancel }: Props) {
  const [pickupDate, setPickupDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const { getActiveRateCard } = useRateCards();
  const rateCard = getActiveRateCard(new Date(pickupDate).getTime());

  const [items, setItems] = useState<
    {
      serviceId: string;
      serviceName: string;
      rate: number;
      quantity: number;
      total: number;
    }[]
  >([]);

  useEffect(() => {
    if (!rateCard) return;

    setItems(
      rateCard.services.map((s) => ({
        serviceId: s.id,
        serviceName: s.name,
        rate: s.rate,
        quantity: 0,
        total: 0,
      }))
    );
  }, [rateCard]);

  if (!rateCard) {
    return (
      <div className="p-4 border rounded">No rate card found for this date</div>
    );
  }

  function updateQuantity(index: number, quantity: number) {
    const next = [...items];
    next[index].quantity = quantity;
    next[index].total = quantity * next[index].rate;
    setItems(next);
  }

  const lotTotal = items.reduce((sum, i) => sum + i.total, 0);

  return (
    <div className="border rounded p-4 space-y-4">
      <h2 className="font-medium">Add Pickup</h2>

      <input
        type="date"
        className="border p-2"
        value={pickupDate}
        onChange={(e) => setPickupDate(e.target.value)}
      />

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={item.serviceId} className="flex gap-2">
            <span className="flex-1">{item.serviceName}</span>

            <NumericInput
              value={item.quantity}
              onChange={(val) => updateQuantity(i, val)}
              className="w-16 text-center"
            />
            <span className="w-16 text-right">₹{item.total}</span>
          </div>
        ))}
      </div>

      <div className="font-medium">Total: ₹{lotTotal}</div>

      <div className="flex gap-2">
        <Button
          className="bg-black text-white px-4 py-2"
          onClick={() =>
            onSave({
              accountId,
              pickupDate: new Date(pickupDate).getTime(),
              items: items.filter((i) => i.quantity > 0),
              lotTotal,
              status: "open",
            })
          }
        >
          Save
        </Button>

        <Button className="px-4 py-2" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
