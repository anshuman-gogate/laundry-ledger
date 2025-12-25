"use client";

import { useState } from "react";
import { useAccounts } from "@/features/accounts/useAccounts";
import { AccountCard } from "@/components/AccountCard";
import { Button } from "@/components/ui/Button";

export default function Dashboard() {
  const { accounts, loading, createAccount } = useAccounts();
  const [name, setName] = useState("");

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div className="p-4 space-y-6">
      <h1 className="text-xl font-semibold">Accounts</h1>

      {accounts.length === 0 ? (
        <div className="text-gray-500">No accounts yet</div>
      ) : (
        <div className="grid gap-3">
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      )}

      <div className="pt-6 border-t space-y-2">
        <input
          className="border rounded p-2 w-full"
          placeholder="Account name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Button
          onClick={() => {
            if (!name.trim()) return;
            createAccount(name);
            setName("");
          }}
        >
          Add Account
        </Button>
      </div>
    </div>
  );
}
