import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { updateCartItem, removeCartItem } from "./actions";
import { CartSkeleton } from "@/components/SkeletonLoader";
import { Suspense } from "react";

async function CartContent() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="max-w-md mx-auto text-center">
        <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
          <span className="material-symbols-outlined text-5xl text-gray-400">
            shopping_cart
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-black dark:text-white mb-4">
          Your Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Please sign in to view your cart and start shopping.
        </p>
        <Link
          href="/api/auth/signin"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          <span className="material-symbols-outlined">login</span>
          Sign In
        </Link>
      </div>
    );
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: {
          product: {
            name: "asc",
          },
        },
      },
    },
  });

  const items = cart?.items || [];
  const subtotal = items.reduce(
    (acc, item) => acc + Number(item.product.price) * item.quantity,
    0
  );
  const shipping = items.length > 0 ? 5.0 : 0;
  const tax = subtotal * 0.1;
  const total = subtotal + shipping + tax;

  return (
    <>
      {/* Breadcrumbs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Link
          href="/"
          className="text-gray-500 dark:text-gray-400 text-sm font-medium hover:text-primary"
        >
          Home
        </Link>
        <span className="text-gray-400 dark:text-gray-500">/</span>
        <span className="text-black dark:text-white text-sm font-medium">
          Shopping Cart
        </span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-3xl md:text-4xl font-black text-black dark:text-white">
          Shopping Cart
        </h1>
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="text-sm">
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 p-12 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 text-center">
          <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-5xl text-gray-400">
              shopping_cart
            </span>
          </div>
          <h2 className="text-xl font-bold text-black dark:text-white mb-2">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
          >
            <span className="material-symbols-outlined">storefront</span>
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-800">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="relative w-24 h-24 md:w-28 md:h-28 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800"
                      >
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </Link>
                      <div className="flex-1 min-w-0 flex flex-col">
                        <Link
                          href={`/products/${item.product.id}`}
                          className="text-base md:text-lg font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-2 mb-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-1">
                          {item.product.description}
                        </p>
                        <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
                          <p className="text-xl font-bold text-primary">
                            ${Number(item.product.price).toFixed(2)}
                          </p>

                          <div className="flex items-center gap-4">
                            {/* Quantity Selector */}
                            <form
                              action={updateCartItem}
                              className="flex items-center"
                            >
                              <input
                                type="hidden"
                                name="itemId"
                                value={item.id}
                              />
                              <label className="text-sm text-gray-600 dark:text-gray-400 mr-2">
                                Qty:
                              </label>
                              <select
                                name="quantity"
                                defaultValue={item.quantity}
                                className="bg-gray-100 dark:bg-gray-700 border-none rounded-lg py-2 px-3 text-sm font-medium focus:ring-2 focus:ring-primary cursor-pointer"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </form>

                            {/* Item Total */}
                            <p className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">
                              $
                              {(
                                Number(item.product.price) * item.quantity
                              ).toFixed(2)}
                            </p>

                            {/* Remove Button */}
                            <form action={removeCartItem}>
                              <input
                                type="hidden"
                                name="itemId"
                                value={item.id}
                              />
                              <button
                                type="submit"
                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                                aria-label="Remove item"
                              >
                                <span className="material-symbols-outlined">
                                  delete
                                </span>
                              </button>
                            </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 sticky top-24">
              <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                Order Summary
              </h2>

              <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Subtotal ({items.length}{" "}
                    {items.length === 1 ? "item" : "items"})
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${shipping.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Tax (10%)
                  </span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    ${tax.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    Total
                  </span>
                  <span className="text-2xl font-black text-primary">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block w-full bg-primary text-white font-bold py-4 px-6 rounded-lg hover:bg-red-700 transition-all duration-200 text-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 mb-4"
              >
                Proceed to Checkout
              </Link>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="material-symbols-outlined text-green-600">
                    verified_user
                  </span>
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="material-symbols-outlined text-green-600">
                    local_shipping
                  </span>
                  <span>Free shipping over $50</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span className="material-symbols-outlined text-green-600">
                    autorenew
                  </span>
                  <span>30-day return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default function CartPage() {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background">
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Suspense fallback={<CartSkeleton />}>
            <CartContent />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
