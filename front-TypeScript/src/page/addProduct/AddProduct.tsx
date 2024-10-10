import React, { useState } from "react";

interface Product {
  product_name: string;
  price: number;
  category_name: string;
  images: string[]; 
  description: string;
  inventory_quantity: number;
  rating: number;
}

const AddProduct = () => {
  const [productName, setProductName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productName || price === undefined || !category || images.length === 0 || !description || quantity === undefined || rating === undefined) {
    alert("Please fill all fields correctly.");
    return;
  }
    try {
      const response = await fetch("http://localhost:3030/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_name: productName,
          price: price,
          category_name: category,
          images: images,
          description: description,
          inventory_quantity: quantity,
          rating: rating,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <input
        type="text"
        placeholder="productname"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <input
        type="number"
        placeholder="price"
        value={price}
        onChange={(e) => setPrice(parseFloat(e.target.value))}
      />
      <input
        type="text"
        placeholder="category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="text"
        placeholder="images"
        value={images.join(", ")}
        onChange={(e) => setImages(e.target.value.split(",").map(img => img.trim()))}
      />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="quantity"
        value={quantity}
        onChange={(e) => setQuantity(parseFloat(e.target.value))}
      />
      <input
        type="number"
        placeholder="rating"
        value={rating}
        onChange={(e) => setRating(parseFloat(e.target.value))}
      />
      <button onClick={handleAddProduct}>add</button>
    </div>
  );
};

export default AddProduct;
