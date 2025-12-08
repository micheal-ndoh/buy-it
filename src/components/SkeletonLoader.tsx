import React from "react";

export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="group flex flex-col bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md border border-gray-200 dark:border-gray-800">
      <SkeletonLoader className="aspect-square w-full" />
      <div className="p-4 flex flex-col flex-1">
        <SkeletonLoader className="h-5 w-3/4 mb-2" />
        <SkeletonLoader className="h-4 w-full mb-1" />
        <SkeletonLoader className="h-4 w-2/3 mb-3" />
        <div className="mt-auto flex items-center justify-between">
          <SkeletonLoader className="h-6 w-16" />
          <SkeletonLoader className="h-8 w-16 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function ProductDetailSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
      {/* Image Gallery Skeleton */}
      <div className="flex flex-col gap-4">
        <SkeletonLoader className="w-full aspect-[4/3] rounded-xl" />
        <div className="grid grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonLoader
              key={i}
              className="w-full aspect-square rounded-lg"
            />
          ))}
        </div>
      </div>

      {/* Product Info Skeleton */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <SkeletonLoader className="h-8 w-3/4" />
          <div className="flex items-center gap-2">
            <SkeletonLoader className="h-5 w-24" />
            <SkeletonLoader className="h-4 w-16" />
          </div>
          <SkeletonLoader className="h-4 w-full" />
          <SkeletonLoader className="h-4 w-5/6" />
        </div>

        <SkeletonLoader className="h-12 w-32" />

        <div className="border-t border-gray-200 dark:border-gray-700 pt-6 space-y-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <SkeletonLoader className="h-12 w-24 rounded-lg" />
            <SkeletonLoader className="h-12 w-full max-w-xs rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartItemSkeleton() {
  return (
    <div className="p-6 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <div className="flex gap-4">
        <SkeletonLoader className="w-24 h-24 md:w-28 md:h-28 rounded-lg flex-shrink-0" />
        <div className="flex-1 min-w-0 flex flex-col">
          <SkeletonLoader className="h-6 w-3/4 mb-2" />
          <SkeletonLoader className="h-4 w-full mb-1" />
          <SkeletonLoader className="h-4 w-2/3 mb-3" />
          <div className="mt-auto flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <SkeletonLoader className="h-6 w-16" />
            <div className="flex items-center gap-4">
              <SkeletonLoader className="h-8 w-16 rounded-lg" />
              <SkeletonLoader className="h-8 w-8 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CartSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {Array.from({ length: 3 }).map((_, i) => (
              <CartItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-800">
          <SkeletonLoader className="h-6 w-32 mb-6" />
          <div className="space-y-3 pb-4 border-b border-gray-200 dark:border-gray-700">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex justify-between">
                <SkeletonLoader className="h-4 w-20" />
                <SkeletonLoader className="h-4 w-12" />
              </div>
            ))}
          </div>
          <div className="pt-4 mb-6">
            <div className="flex justify-between items-center">
              <SkeletonLoader className="h-5 w-16" />
              <SkeletonLoader className="h-7 w-20" />
            </div>
          </div>
          <SkeletonLoader className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}
