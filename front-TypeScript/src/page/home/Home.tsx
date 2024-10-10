import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";



interface Product {
  id: number; 
  product_name: string;
  images: string[]
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]); 

  const getProducts = async () => {
    try {
      const response = await fetch("http://localhost:3030/api/products");
      if (!response.ok) {
        throw new Error("Product not found");
      }
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="container">
      <Header />
      <div id="context" style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width:'1000px', height:'100vh', margin:'20px',background:'red'}}>
        {products.map((e) => (
          <div key={e.id} >
            <h1>{e.product_name}</h1>
            <div>
              <img src={e.images[0]} alt="" style={{height:'150px', width:'150px'}}/>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
