import React from "react";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";
import { FaTrash } from "react-icons/fa"; // You can use the FaTrash icon from react-icons for the delete button

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed");
  };

  return (
    <div className="p-4 border rounded-md shadow-md mb-4">
      <div className="flex items-center">
        <div className="w-16 h-16 mr-4">
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div>
          <h1 className="text-lg font-semibold mb-2">{item.title}</h1>
          <p className="text-gray-600 text-sm mb-4">{item.description}</p>
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold text-green-600">
              ${item.price}
            </p>
            <div
              className="cursor-pointer text-red-600 hover:text-red-800"
              onClick={removeFromCart}
            >
              <FaTrash className="text-xl" /> {/* Use FaTrash icon */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
