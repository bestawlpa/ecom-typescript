import React,{useState,useEffect} from 'react'
import Header from '../../component/Header';
import Footer from "../../component/Footer";
import { useParams } from "react-router-dom";


interface Product {
  id: number; 
  product_name: string;
  price: number;
  images: string[]
}
const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  console.log(product);
  

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3030/api/products/${id}`)
      if(!response.ok){
        throw new Error('product not found')
      }
      const data = await response.json();
      console.log('data',data);
      
      setProduct(data)
    } catch (error) {
      console.error('Internal Server Error')
    }
  }

  useEffect(() => {
    getProduct()
  },[]);

  return (
    <div className="container">
      <Header />
      <div style={{display:'flex', justifyContent:'center', background:'red',alignItems:'start', width:'1000px', height:'100vh', margin:'40px 0'}}>
        <h1>Detail of Product ID: {id}</h1>
        <div>
           {product ? (
          <div style={{ maxWidth: '800px', textAlign: 'left' }}>
            <h2>{product.product_name}</h2>
            <p><strong>Category:</strong> {product.category_name}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Inventory:</strong> {product.inventory_quantity} left</p>
            <p><strong>Rating:</strong> {product.rating} stars</p>
            <div>
              <h3>Images</h3>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={product.product_name}
                  style={{ width: '150px', marginRight: '10px' }}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>Loading product details...</p>
        )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Detail
