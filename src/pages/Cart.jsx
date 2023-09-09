import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    setTotalAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  return (
    <div className="container mx-auto py-8">
      {cart.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-semibold mb-4">Your Cart</div>
            {cart.map((item, index) => (
              <CartItem key={item.id} item={item} itemIndex={index} />
            ))}
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-2xl font-semibold mb-4">Summary</div>
            <p className="text-xl mb-2">
              <span className="font-semibold">Total Items:</span> {cart.length}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Total Amount:</span> ${totalAmount.toFixed(2)}
            </p>
            <Link to="/checkout">
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                CheckOut Now
              </button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-3xl font-semibold mb-4">Cart Empty</h1>
          <Link to="/">
            <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              Shop Now
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
