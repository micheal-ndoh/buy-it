import { placeOrder } from "./actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function CheckoutPage() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect('/api/auth/signin');
  }

  const cart = await prisma.cart.findUnique({
    where: { userId: session.user.id },
    include: { items: true },
  });

  if (!cart || cart.items.length === 0) {
    redirect('/cart');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold">Checkout</h1>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
        <form action={placeOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" name="fullName" required className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
            <input type="text" name="addressLine1" required className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Address Line 2</label>
            <input type="text" name="addressLine2" className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" name="city" required className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Postal Code</label>
              <input type="text" name="postalCode" required className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input type="text" name="country" required className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3" />
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-blue-700">
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
