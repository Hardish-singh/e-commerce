'use client';
import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';
import { CartItem, getCartItems, removeFromCart } from '@/lib/cart';

export default function CartPage() {
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchCart = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const items = await getCartItems(user.uid);
      setCartItems(items);
      calculateTotal(items);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
    setLoading(false);
  };

  const calculateTotal = (items: CartItem[]) => {
    const totalPrice = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  const handleRemove = async (productId: string) => {
    if (!user) return;
    try {
      await removeFromCart(user.uid, productId);
      const updatedItems = cartItems.filter(item => item.productId !== productId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return <p className="text-center text-lg">Loading cart...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600">Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item.productId} className="border rounded-lg p-4 flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="text-xl font-semibold">{item.name}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.price * item.quantity}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemove(item.productId)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="text-2xl font-bold mt-8">
            Total: ${total.toFixed(2)}
          </div>
          <button className="bg-green-500 text-white px-6 py-3 rounded hover:bg-green-600">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}
