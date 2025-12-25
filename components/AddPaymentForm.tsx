"use client";

import { useState } from "react";
import { NumericInput } from "./NumericInput";
import { Button } from "./ui/Button";

type Props = {
  onSave: (amount: number, date: number, note?: string) => void;
  onCancel: () => void;
};

export function AddPaymentForm({ onSave, onCancel }: Props) {
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [note, setNote] = useState("");

  return (
    <div className="border rounded p-4 space-y-3">
      <h2 className="font-medium">Add Payment</h2>

      <NumericInput
        value={amount}
        onChange={setAmount}
        placeholder="Amount"
        className="w-full"
      />

      <input
        type="date"
        className="border p-2 w-full"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className="flex gap-2">
        <Button
          className="px-4 py-2"
          onClick={() => {
            if (!amount) return;
            onSave(Number(amount), new Date(date).getTime(), note || undefined);
          }}
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
