import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import Image from "next/image";
import Link from "next/link";
import { updateCartItem, removeCartItem } from "./actions";

export default async function CartPage() {
  const session = await auth();

  if (!session?.user?.id) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
        <p className="mb-4">Please sign in to view your cart.</p>
        <Link href="/api/auth/signin" className="text-primary hover:underline">
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
            name: 'asc',
          },
        },
      },
    },
  });

  const items = cart?.items || [];
  const subtotal = items.reduce((acc, item) => acc + (Number(item.product.price) * item.quantity), 0);
  const shipping = items.length > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-wrap gap-2 py-4">
          <Link href="/" className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal hover:text-primary">Home</Link>
          <span className="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
          <span className="text-gray-800 dark:text-gray-200 text-sm font-medium leading-normal">Shopping Cart</span>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-3 pb-6">
          <p className="text-gray-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em]">Shopping Cart</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-background-dark rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
            <p className="text-gray-600 dark:text-gray-400 mb-4">Your cart is empty.</p>
            <Link href="/products" className="bg-primary text-white px-6 py-2 rounded hover:bg-red-700 transition-colors">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
            <div className="col-span-1 lg:col-span-2 space-y-4">
              <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 py-4 justify-between items-center border-b border-gray-200 dark:border-gray-800 last:border-0">
                    <div className="flex items-start gap-4 flex-grow">
                      <div className="relative aspect-square rounded-lg size-[70px] overflow-hidden">
                        <Image 
                          src={item.product.image} 
                          alt={item.product.name} 
                          fill 
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <Link href={`/products/${item.product.id}`} className="text-gray-900 dark:text-white text-base font-medium leading-normal hover:text-primary transition-colors">
                          {item.product.name}
                        </Link>
                        <p className="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">${Number(item.product.price).toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="shrink-0">
                        <form action={updateCartItem} className="flex items-center gap-2 text-gray-900 dark:text-white">
                          <input type="hidden" name="itemId" value={item.id} />
                          <select 
                            name="quantity" 
                            defaultValue={item.quantity} 
                            onChange={(e) => e.target.form?.requestSubmit()}
                            className="bg-gray-100 dark:bg-gray-700 border-none rounded-md py-1 px-2 text-sm focus:ring-0 cursor-pointer"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>{num}</option>
                            ))}
                          </select>
                        </form>
                      </div>
                      <p className="text-base font-medium text-gray-900 dark:text-white hidden sm:block">
                        ${(Number(item.product.price) * item.quantity).toFixed(2)}
                      </p>
                      <form action={removeCartItem}>
                        <input type="hidden" name="itemId" value={item.id} />
                        <button type="submit" className="text-gray-500 dark:text-gray-400 hover:text-primary transition-colors">
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </form>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/products" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
                <span className="material-symbols-outlined">arrow_back</span>
                Continue Shopping
              </Link>
            </div>

            <div className="col-span-1 lg:col-span-1">
              <div className="bg-white dark:bg-background-dark p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-400">Estimated Shipping & Tax</span>
                    <span className="font-medium text-gray-800 dark:text-gray-200">${shipping.toFixed(2)}</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
                <Link href="/checkout" className="block w-full bg-primary text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 mt-4 text-center">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
