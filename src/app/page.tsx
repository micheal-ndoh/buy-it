import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const featuredProducts = await prisma.product.findMany({
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col bg-background dark:bg-background-dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        {/* Header is handled in layout.tsx, but we need to match the design there too. 
            For now, I will implement the main content here matching the design. */}
        
        <main className="flex-1 px-4 sm:px-6 lg:px-10 py-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-12">
            <section className="@container">
              <div className="@[480px]:p-0">
                <div className="flex min-h-[520px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4 text-center relative overflow-hidden rounded-xl">
                  <Image 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5Hf3oE8vXG1F8tjUBPKJ3j2NhWG91H1mSo0LVzQHGnFJuBppHPYSMaENkFz3mpelgMJYir-NCJOOPj500mlx1oXOGS5Ro0JoBt584v72g1I6IXPvH4kCOuRQCz24C1bFGNTzPmyoIUOFSZUArvah5q68IbWg7vLc0nguZnTsLHVudqiLUJGxFLRap7d4fp5fcRI5qQaoWrr6n8DIRraYRLVLdisE_dWB6-dRj-6Jtx87iuXvvtqrfMVcwHkAEa1HjaZXS0Opix8uC"
                    alt="Fashion model"
                    fill
                    className="object-cover -z-10 brightness-50"
                    priority
                  />
                  <div className="flex flex-col gap-4 z-10">
                    <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">New Season Arrivals</h1>
                    <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal max-w-xl mx-auto">Discover the latest trends and styles for this season. Unveiling our new collection designed for the modern trendsetter.</h2>
                  </div>
                  <Link href="/products" className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-red-700 transition-colors duration-200 z-10">
                    <span className="truncate">Shop Now</span>
                  </Link>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: "Men's Apparel", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdxTxS7bHEpQgma6N_cjQwgw92FVfSoDySo9iQV7CdCJdF_2wa7iQBlN8vxnf4bd-JGM8d-k0pPvkXSR2F9bxNUgzu7TFucULA4rYG01xIMfYmFuxTdiY2ZabTmRTuyNGCpZk86wes9un9fz3wxN4lx2V9_XLAAL9ReBfwLVXvkN6k47BI-BdTcaOg6Nkt1-0Rz6wHJGoQ_hEXvO6tXchmR9p6Ql3-MU_5nn687VHnq6Kpvdgcrh_C9NI6aNuZplU21DDAdW7Slz8H" },
                  { name: "Women's Footwear", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDfLxADR5yJus2aEFcODtIIiNzubSwlPKwlDpJDoelPWwr9rgEaKTKGSGInG_kQHdFsF9yvPZuvJevbMqJkSMQ9nbkn_eVl1HgWhWH6SgBq9jX1xBFGGiy7UAW0dZcLrbFXLiIA4BqYEOjFrHCSd-JY9YzrIb9p4wSldAHBTd_E9Uxeq99cbGtJ0AaY6aup4Sv3Vtz5h_PnJbwrrMHX06RXxN9-U9dYcRiHzoTahgtVDQPEH6BrNudPx7a1lPnf8lF-THaxcN_UAH4y" },
                  { name: "Accessories", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCNmskTyaLTPYdtaqPLJw6BqPtGH6WhGQGOeNjmC9P6Q04Zth7yzM1LWE_kEY1h0JaFT2hGZGn9pyPouQGToSs2gvjCbFloR4g0uaEH1vt8JJWLyK-hkA6vx31cTDlTT6WDF5NiSlbWScIpHbcGrFCO4IB2Sn-wT6Cdzb15q84AUobYmhdEPnOHIYqYlDPmJ3TWnZbO9ifTFODx8MmF8GzlxlyW3PWaCsn0M2lxAwuKyt3BPcU4_bbRwE_AmV19LjFRTfuM4xW9lRok" },
                  { name: "New In", img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAGYFrL0E_CEKjdQMI5uJ-bnW_ILXXZ4T-Ag0RTJtzSeCs7kq-6GqiOBbs6gXd5eosOiSp6hp2peR-uRo0Enkke0JxOvOsB_nRNWw4vLFdyp9Z-sdoAA-0yMVHA7crrteyULh_Pv3JRdbgiV0pPB90EmcRPwyiGWMQACn5Ock-tjqVeh9I2UnvuIFZuPY2mARqpltBQOLQV9ATcHxJCYgpGvwOJUlAKw1HtqnVe_RNhLb3Hpl-lsEEXoeW-iQ4RazmkOv6NvO4hoqS" }
                ].map((cat) => (
                  <div key={cat.name} className="group relative flex flex-col rounded-lg justify-end p-4 aspect-[4/5] overflow-hidden cursor-pointer">
                    <Image 
                      src={cat.img} 
                      alt={cat.name} 
                      fill 
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <p className="relative text-white text-lg font-bold leading-tight line-clamp-2 z-10">{cat.name}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-gray-800 dark:text-gray-200 text-2xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4">Featured Products</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {featuredProducts.length > 0 ? featuredProducts.map((product) => (
                  <div key={product.id} className="group flex flex-col gap-3 bg-white dark:bg-gray-900 rounded-lg overflow-hidden transition-shadow hover:shadow-xl">
                    <div className="relative aspect-square w-full overflow-hidden">
                      <Image 
                        src={product.image} 
                        alt={product.name} 
                        fill 
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="text-gray-800 dark:text-gray-200 font-semibold leading-snug">{product.name}</h3>
                      <p className="text-primary font-bold mt-1 mb-3">${Number(product.price).toFixed(2)}</p>
                      <Link 
                        href={`/products/${product.id}`}
                        className="mt-auto flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-md h-10 px-4 bg-primary/20 dark:bg-primary/30 text-primary text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary hover:text-white transition-colors duration-200"
                      >
                        Add to Cart
                      </Link>
                    </div>
                  </div>
                )) : (
                  <p className="text-center text-gray-500 py-12 col-span-full">No products found. Please seed the database.</p>
                )}
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
