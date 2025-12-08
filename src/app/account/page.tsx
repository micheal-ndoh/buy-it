import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AccountPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }

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
            <span className="text-red-600 dark:text-red-400 text-sm font-medium">
              Account
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-black text-black dark:text-white mb-8">
            My Account
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
                <div className="flex flex-col items-center text-center">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || ""}
                      className="w-24 h-24 rounded-full border-4 border-gray-100 dark:border-gray-800 mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <span className="material-symbols-outlined text-5xl text-primary">
                        person
                      </span>
                    </div>
                  )}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {session.user.name}
                  </h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {session.user.email}
                  </p>

                  <div className="w-full pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <span className="material-symbols-outlined text-green-600">
                        verified
                      </span>
                      <span>Verified Account</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-2 space-y-4">
              <Link
                href="/account/orders"
                className="block group bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      shopping_bag
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Order History
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      View and track your past orders
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </div>
              </Link>

              <Link
                href="/products"
                className="block group bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-200 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="material-symbols-outlined text-primary text-2xl">
                      storefront
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Continue Shopping
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Browse our latest collection
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 group-hover:text-primary transition-colors">
                    chevron_right
                  </span>
                </div>
              </Link>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400 text-2xl">
                      settings
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Profile Settings
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Manage your personal information
                    </p>
                    <span className="inline-block mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">
                    chevron_right
                  </span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 opacity-60 cursor-not-allowed">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gray-400 text-2xl">
                      favorite
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      Wishlist
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Save your favorite items
                    </p>
                    <span className="inline-block mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                      Coming Soon
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 dark:text-gray-500">
                    chevron_right
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
