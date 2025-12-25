"use client";

import { use } from "react";
import { useAccount } from "@/features/accounts/useAccount";

import { AccountHeader } from "@/components/AccountHeader";
import { useState } from "react";
import { useLots } from "@/features/lots/useLots";
import { AddLotForm } from "@/components/AddLotForm";

import { usePayments } from "@/features/payments/usePayments";
import { AddPaymentForm } from "@/components/AddPaymentForm";
import { Button } from "@/components/ui/Button";

export default function AccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { account, loading } = useAccount(id);
  const [activeTab, setActiveTab] = useState<"lots" | "payments">("lots");
  const { lots, loading: lotsLoading, addLot, markLotDone } = useLots(id);
  const [showAddLot, setShowAddLot] = useState(false);

  const pendingLots = lots.filter((l) => l.status === "open");
  const doneLots = lots.filter((l) => l.status === "done");

  const { payments, loading: paymentsLoading, addPayment } = usePayments(id);

  const [showAddPayment, setShowAddPayment] = useState(false);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (!account) {
    return <div className="p-4">Account not found</div>;
  }

  return (
    <div className="p-4 space-y-4">
      <AccountHeader account={account} />

      <Button onClick={() => setShowAddLot(true)}>+ Add Pickup</Button>

      {showAddLot && (
        <AddLotForm
          accountId={id}
          onSave={async (lot) => {
            await addLot(lot);
            setShowAddLot(false);
          }}
          onCancel={() => setShowAddLot(false)}
        />
      )}

      <div className="flex gap-4 border-b">
        <button
          className={`pb-2 ${
            activeTab === "lots"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("lots")}
        >
          Lots
        </button>

        <button
          className={`pb-2 ${
            activeTab === "payments"
              ? "border-b-2 border-black font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("payments")}
        >
          Payments
        </button>
      </div>

      <div>
        {activeTab === "lots" && (
          <div className="space-y-6">
            {/* Pending */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Pending
              </h3>

              {pendingLots.length === 0 ? (
                <div className="text-sm text-gray-500">No pending pickups</div>
              ) : (
                <div className="space-y-2">
                  {pendingLots.map((lot) => (
                    <div
                      key={lot.id}
                      className="border rounded p-3 flex justify-between items-center"
                    >
                      <div>
                        <div className="text-sm text-gray-500">
                          {new Date(lot.pickupDate).toDateString()}
                        </div>
                        <div className="font-medium">₹{lot.lotTotal}</div>
                      </div>

                      <button
                        className="text-sm text-blue-600"
                        onClick={() => markLotDone(lot.id)}
                      >
                        Mark Done
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Done */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Done</h3>

              {doneLots.length === 0 ? (
                <div className="text-sm text-gray-500">
                  No completed pickups
                </div>
              ) : (
                <div className="space-y-2 opacity-70">
                  {doneLots.map((lot) => (
                    <div
                      key={lot.id}
                      className="border rounded p-3 flex justify-between"
                    >
                      <div className="text-sm text-gray-500">
                        {new Date(lot.pickupDate).toDateString()}
                      </div>
                      <div className="font-medium">₹{lot.lotTotal}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-4">
            <Button onClick={() => setShowAddPayment(true)}>
              + Add Payment
            </Button>

            {showAddPayment && (
              <AddPaymentForm
                onSave={async (amount, date, note) => {
                  await addPayment(amount, date, note);
                  setShowAddPayment(false);
                }}
                onCancel={() => setShowAddPayment(false)}
              />
            )}

            {paymentsLoading ? (
              <div className="text-gray-500">Loading payments...</div>
            ) : payments.length === 0 ? (
              <div className="text-gray-500">No payments yet</div>
            ) : (
              <div className="space-y-2">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="border rounded p-3 flex justify-between"
                  >
                    <div>
                      <div className="text-sm text-gray-500">
                        {new Date(payment.date).toDateString()}
                      </div>
                      {payment.note && (
                        <div className="text-sm text-gray-400">
                          {payment.note}
                        </div>
                      )}
                    </div>
                    <div className="font-medium text-green-600">
                      ₹{payment.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
