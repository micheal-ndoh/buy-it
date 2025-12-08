import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default async function OrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }

  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  const statusColors: Record<string, string> = {
    PENDING:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
    PROCESSING:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
    SHIPPED:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
    COMPLETED:
      "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
    CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  };

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
            <Link
              href="/account/orders"
              className="text-black dark:text-gray-400 text-sm font-medium hover:text-primary"
            >
              Orders
            </Link>
            <span className="text-black dark:text-gray-500">/</span>
            <span className="text-red-600 dark:text-red-400 text-sm font-medium">
              #{order.id.slice(0, 8)}
            </span>
          </div>

          {/* Success Banner */}
          <div className="bg-green-50 dark:bg-green-900/20 border-2 border-green-200 dark:border-green-800 rounded-xl p-6 text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-4xl text-green-600 dark:text-green-400">
                check_circle
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-green-800 dark:text-green-400 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-green-700 dark:text-green-500">
              Thank you for your purchase. Your order has been received and is
              being processed.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Order Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary">
                          receipt_long
                        </span>
                        <h2 className="text-xl font-bold text-black dark:text-white">
                          Order #{order.id.slice(0, 8)}
                        </h2>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Placed on{" "}
                        {order.createdAt.toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span
                      className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-full ${
                        statusColors[order.status] || statusColors.PENDING
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-current"></span>
                      {order.status}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold text-black dark:text-white mb-4">
                    Order Items
                  </h3>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
                      >
                        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-800">
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
                            className="font-semibold text-gray-900 dark:text-white hover:text-primary transition-colors line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            ${Number(item.price).toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">
                            ${(Number(item.price) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/account/orders"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="material-symbols-outlined">arrow_back</span>
                  Back to Orders
                </Link>
                <Link
                  href="/products"
                  className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  <span className="material-symbols-outlined">storefront</span>
                  Continue Shopping
                </Link>
              </div>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
                <h3 className="text-lg font-bold text-black dark:text-white mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Subtotal
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      $
                      {order.items
                        .reduce(
                          (acc, item) =>
                            acc + Number(item.price) * item.quantity,
                          0
                        )
                        .toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Shipping
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      $5.00
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      Tax
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      $
                      {(
                        order.items.reduce(
                          (acc, item) =>
                            acc + Number(item.price) * item.quantity,
                          0
                        ) * 0.1
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      Total
                    </span>
                    <span className="text-2xl font-black text-primary">
                      ${Number(order.total).toFixed(2)}
                    </span>
                  </div>
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                  <span className="material-symbols-outlined">download</span>
                  Download Invoice
                </button>

                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-semibold text-black dark:text-white mb-3">
                    Need Help?
                  </h4>
                  <div className="space-y-2 text-sm">
                    <a
                      href="#"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        support_agent
                      </span>
                      Contact Support
                    </a>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
                    >
                      <span className="material-symbols-outlined text-lg">
                        help
                      </span>
                      Track Order
                    </a>
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
