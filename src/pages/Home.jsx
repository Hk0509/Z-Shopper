import React, { useState, useEffect } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";

const Home = () => {
  const API_URL = "https://fakestoreapi.com/products";
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("asc");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [randomlyPickedProduct, setRandomlyPickedProduct] = useState(null);
  const [maxPrice, setMaxPrice] = useState(""); // State for maximum price input

  async function fetchProductData() {
    setLoading(true);

    try {
      const res = await fetch(API_URL);
      const data = await res.json();

      setPosts(data);
    } catch (error) {
      console.log("Error occurred while fetching data:", error);
      setPosts([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchProductData();
  }, []);

  const sortPostsByPrice = (direction) => {
    const sortedPosts = [...posts];

    if (direction === "asc") {
      sortedPosts.sort((a, b) => a.price - b.price);
    } else if (direction === "desc") {
      sortedPosts.sort((a, b) => b.price - a.price);
    }

    setPosts(sortedPosts);
    setSortByPrice(direction);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
  };

  const handleRandomPick = () => {
    // Filter products based on maximum price
    const filteredProducts = posts.filter(
      (post) => post.price <= parseFloat(maxPrice)
    );

    if (filteredProducts.length === 0) {
      setRandomlyPickedProduct(null); // No product within the specified price range
    } else {
      const randomIndex = Math.floor(Math.random() * filteredProducts.length);
      const randomProduct = filteredProducts[randomIndex];
      setRandomlyPickedProduct(randomProduct);
    }
  };

  // Case-insensitive category filtering
  const filteredPosts =
    selectedCategory === "all"
      ? posts
      : posts.filter((post) =>
          post.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="p-4">
      <div className="flex flex-wrap items-center mb-4">
        <div className="w-full sm:w-auto sm:mr-4 mb-2 sm:mb-0">
          <label className="text-gray-600 font-semibold">Sort by Price:</label>
          <select
            className="w-full sm:w-40 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md"
            value={sortByPrice}
            onChange={(e) => sortPostsByPrice(e.target.value)}
          >
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </div>

        <div className="w-full sm:w-auto sm:mr-4 mb-2 sm:mb-0">
          <label className="text-gray-600 font-semibold">
            Filter by Category:
          </label>
          <select
            className="w-full sm:w-40 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md"
            value={selectedCategory}
            onChange={(e) => filterByCategory(e.target.value)}
          >
            <option value="all">All</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
          </select>
        </div>

        <div className="w-full sm:w-auto mb-2 sm:mb-0">
          <input
            type="number"
            placeholder="Max Price"
            className="w-full sm:w-40 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded-md shadow-md"
            value={maxPrice}
            onChange={(e) => {
              const value = e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value));
              setMaxPrice(value === '' ? '' : value.toString());
            }}
          />
        </div>

        <div className="w-full sm:w-auto mb-2 sm:mb-0">
          <button
            onClick={handleRandomPick}
            className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-md shadow-md"
            style={{
              fontSize: "0.875rem", // Smaller font size for mobile devices
            }}
          >
            Random Pick
          </button>
        </div>
      </div>

      {randomlyPickedProduct && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Randomly Picked Product:</h2>
          <Product
            key={randomlyPickedProduct.id}
            post={randomlyPickedProduct}
          />
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {filteredPosts.map((post) => (
            <Product key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center">
          <p>No Data Found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
