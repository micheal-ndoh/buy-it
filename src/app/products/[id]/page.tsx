import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { addToCart } from "./actions";

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
  });

  if (!product) {
    notFound();
  }

  // Fetch related products (just 4 random ones excluding current)
  const relatedProducts = await prisma.product.findMany({
    where: { NOT: { id: product.id } },
    take: 4,
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {/* Breadcrumbs */}
          <div className="mb-6 flex flex-wrap gap-2 text-sm">
            <Link href="/" className="text-gray-500 dark:text-gray-400 hover:text-primary">Home</Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <Link href="/products" className="text-gray-500 dark:text-gray-400 hover:text-primary">Products</Link>
            <span className="text-gray-400 dark:text-gray-500">/</span>
            <span className="text-gray-900 dark:text-white font-medium">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Image Gallery Column */}
            <div className="flex flex-col gap-4">
              <div className="w-full relative aspect-[4/3] bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
                <Image 
                  src={product.image} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  priority
                />
              </div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-full relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                     <Image 
                      src={product.image} 
                      alt={`${product.name} view ${i}`} 
                      fill 
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Information Column */}
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-text-light-primary dark:text-text-dark-primary">{product.name}</h1>
                <div className="flex items-center gap-2">
                  <div className="flex text-primary">
                    <span className="material-symbols-outlined text-xl">star</span>
                    <span className="material-symbols-outlined text-xl">star</span>
                    <span className="material-symbols-outlined text-xl">star</span>
                    <span className="material-symbols-outlined text-xl">star</span>
                    <span className="material-symbols-outlined text-xl text-gray-400 dark:text-gray-600">star_half</span>
                  </div>
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">(121 reviews)</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
              </div>

              <p className="text-4xl font-bold text-gray-900 dark:text-white">${Number(product.price).toFixed(2)}</p>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
                <form action={addToCart}>
                  <input type="hidden" name="productId" value={product.id} />
                  
                  {/* Variant Selector: Size (Static for now) */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="size">Size</label>
                    <select className="w-full rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-primary focus:ring-primary" id="size" name="size">
                      <option>S</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                  </div>

                  {/* Action Panel */}
                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    {/* Quantity Selector */}
                    <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800">
                      <select name="quantity" className="h-full border-none bg-transparent focus:ring-0 py-2 pl-3 pr-8">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                          <option key={num} value={num}>{num}</option>
                        ))}
                      </select>
                    </div>

                    {/* Add to Cart Button */}
                    <button type="submit" className="flex h-12 w-full flex-1 min-w-[150px] cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg bg-primary text-white text-base font-bold shadow-md hover:bg-red-700 dark:hover:bg-red-500 transition-colors">
                      <span className="material-symbols-outlined">add_shopping_cart</span>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Accordion for Details */}
              <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-6">
                <details className="group" open>
                  <summary className="flex justify-between items-center cursor-pointer list-none py-2 text-text-light-primary dark:text-text-dark-primary">
                    <span className="font-medium">Full Description</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">{product.description}</p>
                </details>
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer list-none py-2 text-text-light-primary dark:text-text-dark-primary">
                    <span className="font-medium">Shipping & Returns</span>
                    <span className="material-symbols-outlined transition-transform group-open:rotate-180">expand_more</span>
                  </summary>
                  <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm leading-relaxed">Free standard shipping on all orders. We accept returns within 30 days of purchase for a full refund, provided the item is in its original, unworn condition.</p>
                </details>
              </div>
            </div>
          </div>

          {/* Related Products Section */}
          <div className="mt-16 md:mt-24">
            <h3 className="text-2xl font-bold mb-6 text-text-light-primary dark:text-text-dark-primary">You Might Also Like</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((related) => (
                <Link key={related.id} href={`/products/${related.id}`} className="flex flex-col gap-3 group">
                  <div className="w-full relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                    <Image 
                      src={related.image} 
                      alt={related.name} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-semibold text-text-light-primary dark:text-text-dark-primary group-hover:text-primary transition-colors">{related.name}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">${Number(related.price).toFixed(2)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
