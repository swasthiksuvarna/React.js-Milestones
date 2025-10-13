import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";
import ProductList from "./pages/ProductList";
import AddProduct from "./pages/AddProduct";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

const Layout: React.FC = () => {

  return (
    <div className="flex font-family-inter">
      <Sidebar />
      <main className="flex-1 bg-white">
        <TopBar />
        
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/edit-product/" element={<AddProduct />} />
        </Routes>
      </main>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;