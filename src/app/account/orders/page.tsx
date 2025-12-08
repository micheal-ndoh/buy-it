import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

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
              href="/account"
              className="text-black dark:text-gray-400 text-sm font-medium hover:text-primary"
            >
              Account
            </Link>
            <span className="text-black dark:text-gray-500">/</span>
            <span className="text-red-600 dark:text-red-400 text-sm font-medium">
              Orders
            </span>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <h1 className="text-3xl md:text-4xl font-black text-black dark:text-white">
              Order History
            </h1>
            <Link
              href="/account"
              className="flex items-center gap-2 text-primary font-medium hover:underline"
            >
              <span className="material-symbols-outlined">arrow_back</span>
              Back to Account
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 p-12 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 text-center">
              <div className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-5xl text-gray-400">
                  shopping_bag
                </span>
              </div>
              <h2 className="text-xl font-bold text-black dark:text-white mb-2">
                No orders yet
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                You haven&apos;t placed any orders yet. Start shopping to see your
                orders here.
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
            <div className="space-y-6">
              {orders.map((order) => {
                const statusColors: Record<string, string> = {
                  PENDING:
                    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                  PROCESSING:
                    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                  SHIPPED:
                    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
                  COMPLETED:
                    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                  CANCELLED:
                    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
                };

                return (
                  <div
                    key={order.id}
                    className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="material-symbols-outlined text-primary">
                              receipt_long
                            </span>
                            <p className="font-semibold text-gray-900 dark:text-white">
                              Order #{order.id.slice(0, 8)}
                            </p>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Placed on{" "}
                            {order.createdAt.toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                        <div className="flex flex-col sm:items-end gap-2">
                          <p className="text-2xl font-bold text-gray-900 dark:text-white">
                            ${Number(order.total).toFixed(2)}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full ${
                              statusColors[order.status] || statusColors.PENDING
                            }`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex gap-4">
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <Link
                                href={`/products/${item.product.id}`}
                                className="font-medium text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-1"
                              >
                                {item.product.name}
                              </Link>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                                Quantity: {item.quantity} × $
                                {Number(item.price).toFixed(2)}
                              </p>
                            </div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                              ${(Number(item.price) * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Link
                          href={`/orders/${order.id}`}
                          className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                        >
                          <span className="material-symbols-outlined">
                            visibility
                          </span>
                          View Details
                        </Link>
                        <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                          <span className="material-symbols-outlined">
                            download
                          </span>
                          Download Invoice
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
