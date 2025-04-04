"use client"

import Link from 'next/link';
import { useEffect } from 'react';
import { seedProductsToFirestore} from '@/lib/products'




interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

const products: Product[] = [
  { id: 1, name: 'Wireless Headphones', price: 199.99, image: 'https://via.placeholder.com/300' },
  { id: 2, name: 'Smart Watch', price: 299.99, image: 'https://via.placeholder.com/300' },
  { id: 3, name: 'Laptop Backpack', price: 89.99, image: 'https://via.placeholder.com/300' },
  { id: 4, name: 'Bluetooth Speaker', price: 129.99, image: 'https://via.placeholder.com/300' },
];

 

export default function Home() {

  useEffect(() => {
    console.log("🔥 useEffect triggered - Seeding products to Firestore");
    
    const seedData = async () => {
      const success = await seedProductsToFirestore();
      if (success) {
        console.log("✅ Seeding successful");
      } else {
        console.error("❌ Seeding failed");
      }
    };

    seedData(); 

  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Featured Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg overflow-hidden shadow-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">${product.price}</p>
              <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          href="/products"
          className="bg-gray-800 text-white px-6 py-3 rounded hover:bg-gray-700"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
}