import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";

export default async function OrderPage({ params }: { params: { id: string } }) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const order = await prisma.order.findUnique({
    where: { id: params.id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order || order.userId !== session.user.id) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-green-800 mb-2">Order Confirmed!</h1>
        <p className="text-green-700">Thank you for your purchase. Your order ID is {order.id}</p>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold">Order Details</h2>
          <p className="text-gray-600">Placed on {order.createdAt.toLocaleDateString()}</p>
          <p className="text-gray-600">Status: {order.status}</p>
        </div>

        <ul className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <li key={item.id} className="p-6 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{item.product.name}</h3>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              </div>
              <div className="font-medium">
                ${Number(item.price).toFixed(2)}
              </div>
            </li>
          ))}
        </ul>

        <div className="p-6 bg-gray-50 flex justify-between items-center">
          <span className="text-lg font-semibold">Total</span>
          <span className="text-2xl font-bold">${Number(order.total).toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center">
        <Link href="/products" className="text-blue-600 hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
