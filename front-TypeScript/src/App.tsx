import { Route, Routes } from "react-router-dom";
import Home from "./page/home/Home";
import AddProduct from "./page/addProduct/AddProduct";
import Register from "./page/register/Register";
import Detail from "./page/datail/Detail";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<Detail />} />
      </Routes>
  )
}

export default App
