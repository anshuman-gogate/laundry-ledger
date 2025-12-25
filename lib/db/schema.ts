// DOMAIN RULES
// 1. Lots are immutable once created
// 2. Rates are snapshot at lot creation time
// 3. Payments never reference lots
// 4. Account balance = sum(lotTotal) - sum(payment.amount)
// 5. RateCards affect only future lots

export type Account = {
  id: string;
  name: string;
  balanceCache: number;
  createdAt: number;
};

export type RateCard = {
  id: string;
  accountId?: string | null;
  effectiveFrom: number;
  services: {
    id: string;
    name: string;
    rate: number;
  }[];
};

export type Lot = {
  id: string;
  accountId: string;
  pickupDate: number;
  items: {
    serviceId: string;
    serviceName: string;
    rate: number;
    quantity: number;
    total: number;
  }[];
  lotTotal: number;
  status: "open" | "done";
  createdAt: number;
};

export type Payment = {
  id: string;
  accountId: string;
  date: number;
  amount: number;
  note?: string;
  createdAt: number;
};
