import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@prisma/client';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-200 relative">
        <Image 
          src={product.image} 
          alt={product.name} 
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">${Number(product.price).toFixed(2)}</span>
          <Link 
            href={`/products/${product.id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
