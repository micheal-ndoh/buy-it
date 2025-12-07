import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const search = typeof searchParams.search === 'string' ? searchParams.search : undefined;

  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Link href="/" className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium leading-normal hover:text-primary dark:hover:text-primary">Home</Link>
          <span className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium leading-normal">/</span>
          <span className="text-text-light-primary dark:text-text-dark-primary text-sm font-medium leading-normal">Products</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* SideNavBar / Filters */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 flex flex-col gap-6 bg-surface-light dark:bg-surface-dark p-6 rounded-xl border border-border-light dark:border-border-dark">
              <div className="flex justify-between items-center">
                <h2 className="text-text-light-primary dark:text-text-dark-primary text-lg font-bold">Filters</h2>
                <button className="text-text-light-secondary dark:text-text-dark-secondary text-sm font-medium hover:text-primary dark:hover:text-primary">Clear All</button>
              </div>
              {/* Filter Sections */}
              <div className="flex flex-col gap-6">
                <div className="border-t border-border-light dark:border-border-dark pt-6">
                  <h3 className="text-text-light-primary dark:text-text-dark-primary font-semibold mb-3">Search</h3>
                  <form className="flex gap-2">
                    <input
                      type="text"
                      name="search"
                      placeholder="Search..."
                      defaultValue={search}
                      className="w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm"
                    />
                    <button type="submit" className="bg-primary text-white px-3 py-2 rounded hover:bg-red-700">Go</button>
                  </form>
                </div>
                
                {/* Price Filter (Static UI for now) */}
                <div className="border-t border-border-light dark:border-border-dark pt-6">
                  <h3 className="text-text-light-primary dark:text-text-dark-primary font-semibold mb-3">Price Range</h3>
                  <div className="flex items-center gap-2">
                    <input type="range" min="0" max="1000" className="w-full accent-primary" />
                  </div>
                </div>
              </div>
              <button className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-4 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-red-700 dark:hover:bg-red-500 transition-colors">
                Apply Filters
              </button>
            </div>
          </aside>

          {/* Main Content / Product Grid */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-text-light-primary dark:text-text-dark-primary mb-4 sm:mb-0">All Products</h1>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-text-light-secondary dark:text-text-dark-secondary" htmlFor="sort">Sort by:</label>
                <select className="form-select block w-48 rounded-lg border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark text-text-light-primary dark:text-text-dark-primary focus:border-primary focus:ring-primary text-sm" id="sort">
                  <option>Newest Arrivals</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.length > 0 ? products.map((product) => (
                <div key={product.id} className="group flex flex-col overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="relative overflow-hidden aspect-[4/5]">
                    <Image 
                      src={product.image} 
                      alt={product.name} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                      <Link 
                        href={`/products/${product.id}`}
                        className="w-full flex items-center justify-center rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 p-4">
                    <h3 className="text-base font-semibold text-text-light-primary dark:text-text-dark-primary truncate">{product.name}</h3>
                    <p className="text-lg font-bold text-primary">${Number(product.price).toFixed(2)}</p>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <span className="material-symbols-outlined !text-base">star</span>
                      <span className="material-symbols-outlined !text-base">star</span>
                      <span className="material-symbols-outlined !text-base">star</span>
                      <span className="material-symbols-outlined !text-base">star</span>
                      <span className="material-symbols-outlined !text-base">star_half</span>
                      <span className="text-xs text-text-light-secondary dark:text-text-dark-secondary ml-1">({Math.floor(Math.random() * 100) + 20})</span>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="col-span-full text-center py-12 text-gray-500">
                  No products found matching your search.
                </div>
              )}
            </div>

            {/* Pagination (Static) */}
            <div className="mt-12 flex justify-center">
              <nav aria-label="Pagination" className="flex items-center gap-2">
                <button className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="inline-flex items-center justify-center size-10 rounded-lg text-white bg-primary font-medium">1</button>
                <button className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-border-light dark:hover:bg-border-dark font-medium transition-colors">2</button>
                <button className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-primary dark:text-text-dark-primary hover:bg-border-light dark:hover:bg-border-dark font-medium transition-colors">3</button>
                <span className="inline-flex items-center justify-center size-10 text-text-light-primary dark:text-text-dark-primary">...</span>
                <button className="inline-flex items-center justify-center size-10 rounded-lg text-text-light-secondary dark:text-text-dark-secondary hover:bg-border-light dark:hover:bg-border-dark transition-colors">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
