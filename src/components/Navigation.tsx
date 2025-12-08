"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export function Navigation() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl">
              shopping_bag
            </span>
            <span className="text-2xl font-bold text-black dark:text-white">
              Buy It
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/products"
              className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium transition-colors"
            >
              Products
            </Link>

            {session ? (
              <>
                <Link
                  href="/cart"
                  className="relative text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined text-2xl">
                    shopping_cart
                  </span>
                </Link>
                <Link
                  href="/account"
                  className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium transition-colors"
                >
                  Account
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium transition-colors"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn("keycloak")}
                className="bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
