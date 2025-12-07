import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function OrdersPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const orders = await prisma.order.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Order History</h1>
        <Link href="/account" className="text-blue-600 hover:underline">
          Back to Account
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b bg-gray-50 flex justify-between items-center">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-sm text-gray-600">{order.createdAt.toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">${Number(order.total).toFixed(2)}</p>
                  <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-4">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden relative">
                           {/* Use a small image or placeholder */}
                        </div>
                        <div>
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <p className="font-medium">${Number(item.price).toFixed(2)}</p>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 pt-4 border-t text-right">
                  <Link href={`/orders/${order.id}`} className="text-blue-600 hover:underline text-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
