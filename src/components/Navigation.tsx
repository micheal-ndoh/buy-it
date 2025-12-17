"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export function Navigation() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

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

          <div className="hidden md:flex items-center gap-2 sm:gap-6">
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

          <button
            className="md:hidden text-gray-700 dark:text-gray-300 hover:text-primary"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="md:hidden absolute top-16 right-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg z-50 min-w-48">
          <div className="py-2">
            <Link
              href="/products"
              className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </Link>

            {session ? (
              <>
                <Link
                  href="/cart"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMenuOpen(false)}
                >
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-lg">shopping_cart</span>
                    Cart
                  </span>
                </Link>
                <Link
                  href="/account"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setMenuOpen(false)}
                >
                  Account
                </Link>
                <button
                  onClick={() => { signOut(); setMenuOpen(false); }}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => { signIn("keycloak"); setMenuOpen(false); }}
                className="block w-full text-left px-4 py-2 bg-primary text-white hover:bg-red-700"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
