import React, { useState, useEffect } from "react";
import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { Link } from "react-router-dom";




interface Product {
  id: number; 
  product_name: string;
  price: number;
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
      <div id="context" style={{display:'grid', gridTemplateColumns: 'repeat(4, 220px)', gap: '40px', width:'1000px', height:'100vh', margin:'40px 0'}}>
        {products.map((e) => (
          <div key={e.id} style={{width:'220px', height:'280px', background:'white', display:'flex', flexDirection:'column', alignItems:'center', borderRadius:'10px', overflow:'hidden'}}>
            <Link to={`/product/${e.id}`} style={{ textDecoration: 'none' }}> 
                <img className="card-img-top" src={e.images[0]} alt="Card image cap" style={{width: "220px", height:'180px', objectFit:'fill'}}/>
                <div className="card-body">
                  <h1 style={{fontSize:'14px', padding:' 0 6px'}}>{e.product_name}</h1>
                  <h4>${e.price}</h4>
                </div> 
            </Link>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
