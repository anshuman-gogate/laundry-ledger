"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function TopNav() {
  const pathname = usePathname();

  function linkClass(href: string) {
    const isActive =
      pathname === href || (href !== "/" && pathname.startsWith(href));

    return `px-4 py-2.5 rounded-lg text-base transition-colors ${
      isActive ? "bg-blue-600 text-white" : "text-gray-700 hover:bg-blue-50"
    }`;
  }

  return (
    <nav className="bg-white">
      <div className="max-w-4xl mx-auto px-4 py-8 border-b border-b-gray-300 flex justify-between items-center h-14 gap-2">
        <h1 className="font-bold text-xl mr-8">Laundry Ledger</h1>

        <div className="flex items-center gap-2">
          <Link href="/" className={linkClass("/")}>
            Accounts
          </Link>

          <Link href="/rates" className={linkClass("/rates")}>
            Rate Cards
          </Link>
        </div>
      </div>
    </nav>
  );
}
