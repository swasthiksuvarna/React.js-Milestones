import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteModal from "../components/DeletePopup";
import Toast from "../components/Toast";
import DeleteIcon from "../assets/delete.svg";
import EditIcon from "../assets/edit.svg";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Filter, Upload, Plus } from "lucide-react";

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  creationAt?: string;
}

const ProductList: React.FC = () => {
  const navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page") || "1", 10);
  const [page, setPage] = useState(initialPage);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const limit = 10;
  const offset = (page - 1) * limit;
  const totalPages = Math.ceil(totalProducts / limit);

  const fetchProducts = async () => {
    try {
      const [productsResponse, totalResponse] = await Promise.all([
        axios.get(`/api/v1/products?offset=${offset}&limit=${limit}`),
        axios.get('/api/v1/products')
      ]);
      const sortedProducts = productsResponse.data.sort((a: Product, b: Product) => 
        new Date(b.creationAt || 0).getTime() - new Date(a.creationAt || 0).getTime()
      );
      setProducts(sortedProducts);
      setTotalProducts(totalResponse.data.length);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [offset]);

  const updatePage = (newPage: number) => {
    if (newPage < 1) return;
    setPage(newPage);
    navigate(`?page=${newPage}`);
  };

  const handleDeleteClick = (product: Product) => {
    setProduct(product);
    setShowModal(true);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `/api/v1/products/${product?.id}`
      );
      setShowModal(false);
      setToast({ message: "Product deleted successfully", type: "success" });
      fetchProducts();
    } catch (error) {
      setShowModal(false);
      setToast({ message: "Something went wrong.", type: "error" });
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className=" w-full px-6 pt-[32px] bg-white">
        {/* Title */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-sidePanelBorderColor">
          <h1 className="text-[36px] font-bold text-textColor">Products</h1>

          {/* Buttons */}
          <div className="flex items-center space-x-3">
            {/* Filter button with badge */}
            <div className="relative">
              <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </button>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                1
              </span>
            </div>

            {/* Export button */}
            <button className="flex items-center px-3 py-2 border border-gray-300 rounded-md text-gray-700 text-sm hover:bg-gray-100">
              <Upload className="w-4 h-4 mr-1" />
              Export
            </button>

            {/* Add Product button */}
            <button
              onClick={() => navigate("/add-product")}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Product
            </button>
          </div>
        </div>
      </div>
      <div className="px-6 pt-4 flex flex-col" style={{ height: "calc(100vh - 160px)" }}>
        <div className="flex-1 overflow-y-auto">
        <table className="min-w-full border-b border-sidePanelBorderColor text-left">
          <thead className="bg-white text-tableTitleColor uppercase text-[14px]">
            <tr className="">
              <th className="p-2 pl-5 pr-5">
                <input
                  type="checkbox"
                  className="w-4 h-4 border border-gray-400 rounded-sm"
                />
              </th>
              <th className="p-2 pr-5">Image</th>
              <th className="p-2 pr-5">Title</th>
              <th className="p-2 pr-5">Description</th>
              <th className="p-2 pr-30">Price</th>
              <th className="p-2 pr-5 ">Actions</th>
            </tr>
          </thead>
          <tbody className="text-textColor text-[14px]">
            {products.map((product: Product) => (
              <tr
                key={product.id}
                className="border-t border-sidePanelBorderColor"
              >
                <td className="p-2 pl-5">
                  <input
                    type="checkbox"
                    className="w-4 h-4 border border-gray-400 rounded-sm"
                  />
                </td>
                <td className="p-2">
                  <img
                    src={product.images[0]?.replace('https://api.escuelajs.co/api/v1/files/', '/files/') || 'https://placehold.co/48x48'}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      e.currentTarget.src = 'https://placehold.co/48x48';
                    }}
                  />
                </td>
                <td className="p-2">{product.title}</td>
                <td className="p-2">{product.description.split(".")[0]}</td>
                <td className="p-2 pr-30">${product.price}</td>
                <td className="p-2 pr-5 flex gap-2">
                  <button
                    className="group"
                    onClick={() => handleDeleteClick(product)}
                  >
                    <img
                      src={DeleteIcon}
                      alt="Delete"
                      className="w-10 h-10 group-hover:scale-120 "
                    />
                  </button>
                  <button
                    className="group"
                    onClick={() =>
                      navigate("/edit-product", { state: { product } })
                    }
                  >
                    <img
                      src={EditIcon}
                      alt="Delete"
                      className="w-10 h-10 group-hover:scale-120"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Pagination */}
        {totalProducts > 10 && (
          <div className="flex justify-between items-center mt-4 px-6 py-3 bg-white border-t border-sidePanelBorderColor">
          <button
            disabled={page === 1}
            onClick={() => updatePage(page - 1)}
            className={`px-4 py-2 border rounded-md text-sm ${
              page === 1 
                ? "text-gray-400 cursor-not-allowed" 
                : "text-textColor hover:bg-gray-200"
            }`}
          >
            <span className="flex gap-2 items-center">
              <ArrowLeft /> Previous
            </span>
          </button>
          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => updatePage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${
                  page === p
                    ? "text-[#4094F7] border border-gray-300"
                    : "text-gray-700 border border-gray-300 hover:bg-gray-100"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            disabled={page === totalPages}
            onClick={() => updatePage(page + 1)}
            className={`px-4 py-2 border rounded-md text-sm ${
              page === totalPages 
                ? "text-gray-400 cursor-not-allowed" 
                : "text-textColor hover:bg-gray-200"
            }`}
          >
            <span className="flex gap-2 items-center">
              Next <ArrowRight />
            </span>
          </button>
        </div>
        )}
      </div>
      <DeleteModal
        isOpen={showModal}
        productName={product?.title || ""}
        onCancel={() => setShowModal(false)}
        onConfirm={handleDelete}
      />
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </>
  );
};

export default ProductList;
