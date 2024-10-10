import { Route, Routes } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import Home from "./page/home/Home";
import AddProduct from "./page/addProduct/AddProduct";
import Register from "./page/register/Register";


function App() {
  return (
    <SearchProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </SearchProvider>
  )
}

export default App
