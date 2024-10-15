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
      <div style={{display:'flex', justifyContent:'center',alignItems:'start', width:'1000px', height:'100vh', margin:'40px 0'}}>
        <div style={{display:'grid', gridTemplateColumns:'200px 200px 200px 200px', columnGap:'60px', rowGap:'40px' , width:'1000px'}}>
          {products.map((e) => (
            <div className="product-card" key={e.id} style={{width:'220px', height:'300px', background:'white', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'space-between', borderRadius:'8px', overflow:'hidden', border:''}}>
              <div style={{width: "220px", height:'200px'}}>
                <img src={e.images[0]} alt="Card image cap" style={{width: "220px", height:'200px', objectFit:'cover'}}/>
              </div>
              <div style={{width:'220px', height:'90px', display:'flex', flexDirection:'column'}}>
                <div style={{width:'220px', height:'45px', padding:'0 10px'}}>
                  <Link className="product-name" to={`/product/${e.id}`} style={{ textDecoration: 'none' }}>
                    <h1 style={{fontSize:'14px', color:'black',}}>{e.product_name}</h1>
                  </Link>
                </div>   
                <div style={{width:'220px', height:'45px', display:'flex', justifyContent:'end'}}>
                  <h4 style={{paddingRight:'10px', color:'red'}}>${e.price}</h4>
                </div>
              </div> 
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
