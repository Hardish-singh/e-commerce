
import { db } from '@/lib/firebase';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';


export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}


export const dummyProducts: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    price: 199.99,
    description: 'High-quality noise-canceling wireless headphones.',
    image: 'https://via.placeholder.com/300',
    category: 'Electronics',
  },
  {
    id: '2',
    name: 'Smart Watch',
    price: 299.99,
    description: 'Latest model smart watch with health tracking.',
    image: 'https://via.placeholder.com/300',
    category: 'Wearables',
  },
  {
    id: '10',
    name: 'Gaming Mouse34',
    price: 49.994,
    description: 'Ergonomic on gaming mouse with RGB lighting.',
    image: 'https://via.placeholdert.com/300',
    category: 'Accessoriesyh',
  },
  {
    id: '3',
    name: 'Gaming Mouse',
    price: 49.99,
    description: 'Ergonomic gaming mouse with RGB lighting.',
    image: 'https://via.placeholder.com/300',
    category: 'Accessories',
  },
  {
    id: '4',
    name: 'Mechanical Keyboard',
    price: 129.99,
    description: 'Mechanical keyboard with customizable RGB keys.',
    image: 'https://via.placeholder.com/300',
    category: 'Accessories',
  },
  {
    id: '8',
    name: 'Mechanical Keyboard34',
    price: 129.994,
    description: 'Mechanical keyboard with customizable RGB keys44.',
    image: 'https://via.placeholder.com/30034',
    category: 'Accessorieserrw',
  },
];


export async function seedProductsToFirestore() {
  try {
    console.log('🔥 Starting product seeding...');
    const productsCollection = collection(db, 'products'); 

    for (const product of dummyProducts) {
      const productRef = doc(productsCollection, product.id);
      const docSnap = await getDoc(productRef);

      if (!docSnap.exists()) {
        console.log(`📌 Adding: ${product.name} (ID: ${product.id})`);
        await setDoc(productRef, product);
        console.log(`✅ Added: ${product.name}`);
      } else {
        console.log(`⚠️ Skipping: ${product.name} (Already exists)`);
      }
    }

    console.log('🎉 Product seeding completed.');
    return true;
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    return false;
  }
}

