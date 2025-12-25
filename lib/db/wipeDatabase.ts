import { db } from "@/lib/db";

export async function wipeDatabase() {
  // HARD SAFETY CHECK
  if (process.env.NODE_ENV === "production") {
    throw new Error("wipeDatabase() is disabled in production");
  }

  // Optional extra guard (recommended)
  const confirmed = window.confirm(
    "This will DELETE ALL local data permanently. Continue?"
  );

  if (!confirmed) return;

  await db.delete();

  // Reload to re-init DB cleanly
  window.location.reload();
}
