import React from 'react';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { cartItems, calculateTotal, updateQuantity, removeFromCart } = useCart();

  return (
    <div className="mt-8 p-4 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-2">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-2">
            {cartItems.map((item) => (
              <li key={item._id} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Price: ₹{item.price}</p>
                  <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  <div className="flex gap-2 mt-1">
                    <button
                      className="px-2 py-1 text-sm bg-red-500 text-white rounded"
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <button
                      className="px-2 py-1 text-sm bg-green-500 text-white rounded"
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <button
                      className="px-2 py-1 text-sm bg-gray-400 text-white rounded"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-sm font-semibold">Subtotal: ₹{Number(item.price) * item.quantity}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 text-right font-bold text-lg">
            Total: ₹{calculateTotal()}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
