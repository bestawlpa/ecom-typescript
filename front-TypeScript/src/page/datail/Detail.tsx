import React from 'react'
import Header from '../../component/Header';
import Footer from "../../component/Footer";
import { useParams } from "react-router-dom";

const Detail = () => {
    const { id } = useParams();
  return (
    <div>
      <Header />
      <div style={{display:'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', width:'1000px', height:'100vh', margin:'20px'}}>
        <h1>Detail of Product ID: {id}</h1>
      </div>
      <Footer />
    </div>
  )
}

export default Detail
