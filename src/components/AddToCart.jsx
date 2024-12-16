import React, { useContext } from 'react';
import { CartContext } from '../state/CartProvider'; // Import CartContext

export default function AddToCart({ product }) {
  // Destructure the addToCart function from the CartContext
  const { addToCart } = useContext(CartContext);

  // Handle click event to add the product to the cart
  const handleClick = () => {
    console.log("Adding to cart", product);
    addToCart(product); // Call the addToCart function
  };

  return (
    <button
      className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black"
      onClick={handleClick}
    >
      Add to Cart
    </button>
  );
}