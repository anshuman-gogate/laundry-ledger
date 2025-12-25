import Dexie, { Table } from "dexie";
import { Account, RateCard, Lot, Payment } from "./schema";

export class LaundryDB extends Dexie {
  accounts!: Table<Account>;
  rateCards!: Table<RateCard>;
  lots!: Table<Lot>;
  payments!: Table<Payment>;

  constructor() {
    super("laundry-ledger-db");

    this.version(1).stores({
      accounts: "id, createdAt",
      rateCards: "id, effectiveFrom, accountId",
      lots: "id, accountId, pickupDate, status",
      payments: "id, accountId, date",
    });
  }
}

export const db = new LaundryDB();
