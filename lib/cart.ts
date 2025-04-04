
import { db } from './firebase';
import { doc, updateDoc, arrayUnion, arrayRemove, getDoc } from 'firebase/firestore';

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export async function addToCart(userId: string, productId: string, quantity: number) {
  const userRef = doc(db, 'users', userId);
  
  // Get product details
  const productRef = doc(db, 'products', productId);
  const productSnap = await getDoc(productRef);
  
  if (!productSnap.exists()) {
    throw new Error('Product not found');
  }

  const productData = productSnap.data();
  
  const cartItem: CartItem = {
    productId,
    name: productData.name,
    price: productData.price,
    quantity,
    image: productData.image
  };

  await updateDoc(userRef, {
    cartItems: arrayUnion(cartItem)
  });
}

export async function getCartItems(userId: string): Promise<CartItem[]> {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  
  if (userSnap.exists()) {
    return userSnap.data().cartItems || [];
  }
  return [];
}

export async function removeFromCart(userId: string, productId: string) {
  const userRef = doc(db, 'users', userId);
  const cartItems = await getCartItems(userId);
  
  const itemToRemove = cartItems.find(item => item.productId === productId);
  
  if (itemToRemove) {
    await updateDoc(userRef, {
      cartItems: arrayRemove(itemToRemove)
    });
  }
}