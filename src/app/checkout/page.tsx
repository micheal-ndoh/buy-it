import { placeOrder } from "./actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import Image from "next/image";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    redirect("/cart");
  }

  const subtotal = cart.items.reduce(
    (acc, item) => acc + Number(item.product.price) * item.quantity,
    0
  );
  const shipping = 5.0;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background">
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 mb-6">
            <Link
              href="/"
              className="text-black dark:text-gray-400 text-sm font-medium hover:text-primary"
            >
              Home
            </Link>
            <span className="text-black dark:text-gray-500">/</span>
            <Link
              href="/cart"
              className="text-black dark:text-gray-400 text-sm font-medium hover:text-primary"
            >
              Cart
            </Link>
            <span className="text-black dark:text-gray-500">/</span>
            <span className="text-red-600 dark:text-red-400 text-sm font-medium">
              Checkout
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-8">
            Checkout
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                  Shipping Information
                </h2>

                <form action={placeOrder} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="addressLine1"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Address Line 1 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="addressLine1"
                      name="addressLine1"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="addressLine2"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Address Line 2{" "}
                      <span className="text-gray-400">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      id="addressLine2"
                      name="addressLine2"
                      className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                      placeholder="Apartment, suite, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Postal Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="10001"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                      >
                        Country <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="country"
                        name="country"
                        required
                        className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                        placeholder="United States"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                      type="submit"
                      className="w-full bg-primary text-white px-6 py-4 rounded-lg font-bold text-lg hover:bg-red-700 dark:hover:bg-red-500 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">lock</span>
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 sticky top-24">
                <h2 className="text-xl font-bold text-black dark:text-white mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {cart.items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white mt-1">
                          $
                          {(Number(item.product.price) * item.quantity).toFixed(
                            2
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
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

                <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-black text-primary">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="material-symbols-outlined text-green-600">
                      verified_user
                    </span>
                    <span>Secure checkout powered by SSL</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
