import React, { useState, useEffect, ChangeEvent } from "react";
import { X } from "lucide-react";
import axios from "axios";
import Toast from "../components/Toast";
import { useLocation, useNavigate } from "react-router-dom";

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  categoryId?: number;
}

interface AddProductProps {
  product?: Product;
}

const AddProduct: React.FC<AddProductProps> = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const location = useLocation();
  const product = location.state?.product as Product | undefined;
  const navigate = useNavigate();

  // Form states...
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // Prefill if editing
  useEffect(() => {
    if (product) {
      setTitle(product.title);
      setPrice(product.price.toString());
      setDescription(product.description);
      setImagePreview(product.images?.[0] || null);
    }
  }, [product]);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleProductSubmit = async () => {
    if (!title || !price || !description) {
      setToast({ message: "Please fill all fields", type: "error" });
      return;
    }

    let imageUrls: string[] = [];

    // Upload image if new file selected
    if (selectedFile) {
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);
        const uploadResponse = await axios.post('https://api.escuelajs.co/api/v1/files/upload', formData);
        imageUrls = [uploadResponse.data.location];
      } catch (error) {
        setToast({ message: "Failed to upload image", type: "error" });
        return;
      }
    } else if (product?.images) {
      // Use existing images for updates
      imageUrls = product.images;
    } else {
      // Use placeholder for new products without image
      imageUrls = ["https://placehold.co/600x400"];
    }

    const productData = {
      title,
      price: Number(price),
      description,
      categoryId: 1,
      images: imageUrls,
    };

    try {
      if (product && product.id) {
        // UPDATE
        await axios.put(
          `https://api.escuelajs.co/api/v1/products/${product.id}`,
          productData
        );
        setToast({ message: "Product updated successfully", type: "success" });
      } else {
        // CREATE
        await axios.post(
          `https://api.escuelajs.co/api/v1/products/`,
          productData
        );
        setToast({ message: "Product added successfully", type: "success" });
      }

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      setToast({ message: "Something went wrong.", type: "error" });
      console.error("Error submitting product:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between pb-4 border-b-2 border-sidePanelBorderColor">
        <h1 className="text-[36px] font-bold text-textColor">
          {product ? "Update Product" : "Add Product"}
        </h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-5xl mt-8 space-y-6">
        {/* Image Upload */}
        <div>
          <label className="block mb-1 font-medium text-inputHeaderColor">
            Product image
          </label>

          {imagePreview ? (
            <div className="relative w-[75%] mx-0">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-auto max-h-[400px] object-cover rounded-md shadow-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute p-1 text-gray-700 bg-white rounded-full shadow top-2 right-2 hover:bg-gray-200"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="relative p-6 text-center border-2 border-gray-300 border-dashed rounded-md">
              <p className="text-sm text-gray-600">Drag and drop files</p>
              <p className="mb-2 text-sm text-gray-400">or</p>
              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageChange}
                className="hidden"
                id="imageUpload"
              />
              <label
                htmlFor="imageUpload"
                className="inline-block px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded cursor-pointer"
              >
                Browse
              </label>
            <p className="mt-2 text-xs leading-snug text-center text-gray-400">
          Supported file types: jpg, png and jpeg
          <br />
          format
        </p>
            </div>
          )}
        </div>

        {/* Title and Price */}
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 text-inputHeaderColor">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter product title"
              className={`w-full px-4 py-2 rounded-md border ${
                title.trim() !== ""
                  ? "border-black"
                  : "border-sidePanelBorderColor"
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-inputHeaderColor">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter product price"
              className={`w-full px-4 py-2 rounded-md border ${
                price.trim() !== ""
                  ? "border-black"
                  : "border-sidePanelBorderColor"
              } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-inputHeaderColor">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className={`w-full px-4 py-2 rounded-md border ${
              description.trim() !== ""
                ? "border-black"
                : "border-sidePanelBorderColor"
            } focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none`}
            rows={3}
          />
        </div>

        {/* Submit Button */}
        <button
          type="button"
          className="w-[50%] px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={handleProductSubmit}
        >
          {product ? "Update" : "Add"}
        </button>
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default AddProduct;
