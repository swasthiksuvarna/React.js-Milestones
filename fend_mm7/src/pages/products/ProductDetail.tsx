import { useState } from "react";
import { useDispatch } from "react-redux";
import { Check, Minus, Plus } from "lucide-react";
import { useParams } from "react-router-dom";
import { useProductDetailApi } from "./fetchProductDetail";
import { addToCart } from "../../store/slice/cartSlice";
import Button from "../../components/Button";
import Toast from "../../components/Toast";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { data, loading, error } = useProductDetailApi(id!);

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("Small");
  const [selectedColor, setSelectedColor] = useState("olive");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    if (data) {
      dispatch(
        addToCart({
          id: data.id,
          title: data.name,
          price: data.price,
          color: selectedColor,
          quantity: quantity,
          image: data.images[0],
          size: selectedSize,
        })
      );
      setToast({ message: "Product added to cart", type: "success" });
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen font-inter">
        <main className="flex-grow py-6">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            {/* Breadcrumb Shimmer */}
            <div className="flex items-center gap-2 mb-6 sm:mb-8">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-12"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-1"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-32"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
              {/* Images Shimmer */}
              <div className="lg:col-span-6 flex flex-col md:flex-row gap-3 md:gap-[14px]">
                <div className="order-1 md:order-2 w-full md:w-[444px] h-[300px] md:h-[652px] rounded-[20px] bg-gray-200 animate-pulse"></div>
                <div className="order-2 md:order-1 flex md:flex-col gap-2 md:gap-[14px] w-full md:w-[152px] justify-center md:justify-start">
                  {Array.from({length: 3}).map((_, index) => (
                    <div
                      key={index}
                      className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-[152px] md:h-[208px] rounded-lg md:rounded-[20px] bg-gray-200 animate-pulse"
                    />
                  ))}
                </div>
              </div>

              {/* Product Details Shimmer */}
              <div className="lg:col-span-6 space-y-4 sm:space-y-6">
                <div className="h-8 sm:h-10 bg-gray-200 animate-pulse rounded w-3/4 mx-auto sm:mx-0"></div>
                <div className="h-8 bg-gray-200 animate-pulse rounded w-24 mx-auto sm:mx-0"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-5 bg-gray-200 animate-pulse rounded w-32 mx-auto sm:mx-0"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-48 mx-auto sm:mx-0"></div>
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-52 mx-auto sm:mx-0"></div>
                </div>
                <div className="h-px bg-gray-200 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 animate-pulse rounded w-28 mx-auto sm:mx-0"></div>
                  <div className="flex gap-2 justify-center sm:justify-start">
                    {Array.from({length: 3}).map((_, index) => (
                      <div key={index} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-200 animate-pulse"></div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-gray-200 animate-pulse"></div>
                <div className="space-y-3">
                  <div className="h-5 bg-gray-200 animate-pulse rounded w-24 mx-auto sm:mx-0"></div>
                  <div className="grid grid-cols-2 sm:flex gap-2 justify-center sm:justify-start">
                    {Array.from({length: 4}).map((_, index) => (
                      <div key={index} className="h-10 bg-gray-200 animate-pulse rounded-full w-20"></div>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-gray-200 animate-pulse"></div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <div className="h-12 bg-gray-200 animate-pulse rounded-full w-32 mx-auto sm:mx-0"></div>
                  <div className="h-12 bg-gray-200 animate-pulse rounded-full w-full sm:flex-1"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-600">
          Error loading product details. Please try again.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl">Product not found.</p>
      </div>
    );
  }

  const images = data.images || [];

  return (
    <div className="flex flex-col min-h-screen font-inter">
      <main className="flex-grow py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav className="flex items-center gap-2 text-sm mb-6 sm:mb-8" aria-label="Breadcrumb">
            <a href="/" className="text-gray-500 hover:text-black transition-colors">
              Home
            </a>
            <span className="text-gray-500" aria-hidden="true">&gt;</span>
            <span className="text-gray-700">{data.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-start">
            <div className="lg:col-span-6 flex flex-col md:flex-row gap-3 md:gap-[14px]">
              <div className="order-1 md:order-2 w-full md:w-[444px] h-[300px] md:h-[652px] rounded-[20px] overflow-hidden bg-[#F0EEED]">
                <img
                  src={images[selectedImageIndex]}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="order-2 md:order-1 flex md:flex-col gap-2 md:gap-[14px] w-full md:w-[152px] overflow-x-auto md:overflow-visible pb-2 md:pb-0 justify-center md:justify-start">
                {images.slice(0, 3).map((image, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-[152px] md:h-[208px] rounded-lg md:rounded-[20px] cursor-pointer overflow-hidden bg-[#F0EEED] ${
                      selectedImageIndex === index
                        ? "border border-[#111111]"
                        : "hover:border hover:border-gray-400"
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img
                      src={image}
                      alt={`${data.name} thumbnail ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4 sm:space-y-6 text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl md:text-[32px] font-alfa-slab text-black">
                {data.name}
              </h1>

              <div className="text-2xl sm:text-3xl font-bold text-black">${data.price}</div>

              <p className="text-subtitleColor text-sm sm:text-base leading-relaxed">
                {data.description}
              </p>

              <div className="text-subtitleColor">
                <h3 className="mb-2 font-medium text-sm sm:text-base">Key Features:</h3>
                <ul className="space-y-1 sm:space-y-2">
                  <li className="flex items-center gap-2 text-sm sm:text-base justify-center sm:justify-start">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#4f4631] flex-shrink-0" />
                    <span>Premium 100% Cotton fabric</span>
                  </li>
                  <li className="flex items-center gap-2 text-sm sm:text-base justify-center sm:justify-start">
                    <Check className="w-4 h-4 sm:w-5 sm:h-5 text-[#4f4631] flex-shrink-0" />
                    <span>High-quality screen-printed graphic</span>
                  </li>
                </ul>
              </div>

              <div className="h-px w-full bg-dividerColor bg-opacity-30"></div>

              <div>
                <h3 className="mb-3 font-medium text-sm sm:text-base">Select Colors</h3>
                <div className="flex gap-2 sm:gap-3 justify-center sm:justify-start">
                  <button
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#4f4631] flex items-center justify-center cursor-pointer ${
                      selectedColor === "olive" ? "ring-2 ring-offset-2 ring-gray-400" : ""
                    }`}
                    onClick={() => setSelectedColor("olive")}
                  >
                    {selectedColor === "olive" && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                  </button>
                  <button
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#314f4a] flex items-center justify-center cursor-pointer ${
                      selectedColor === "green" ? "ring-2 ring-offset-2 ring-gray-400" : ""
                    }`}
                    onClick={() => setSelectedColor("green")}
                  >
                    {selectedColor === "green" && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                  </button>
                  <button
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#31344f] flex items-center justify-center cursor-pointer ${
                      selectedColor === "blue" ? "ring-2 ring-offset-2 ring-gray-400" : ""
                    }`}
                    onClick={() => setSelectedColor("blue")}
                  >
                    {selectedColor === "blue" && <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />}
                  </button>
                </div>
              </div>

              <div className="h-px w-full bg-dividerColor bg-opacity-30"></div>

              <div>
                <h3 className="mb-3 font-medium text-sm sm:text-base">Choose Size</h3>
                <div className="grid grid-cols-2 sm:flex gap-2 justify-center sm:justify-start">
                  {["Small", "Medium", "Large", "X-Large"].map((size) => (
                    <button
                      key={size}
                      className={`px-4 py-2 sm:px-6 text-xs sm:text-sm rounded-full cursor-pointer transition-colors ${
                        selectedSize === size
                          ? "bg-black text-white"
                          : "bg-[#f0f0f0] text-subtitleColor hover:bg-gray-200"
                      }`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-px w-full bg-dividerColor bg-opacity-30"></div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center justify-center bg-[#F0F0F0] rounded-full min-w-[120px] sm:w-auto mx-auto sm:mx-0">
                  <button
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 cursor-pointer text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={decrementQuantity}
                  >
                    <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <span className="flex items-center justify-center min-w-[40px] sm:min-w-[60px] py-2 text-sm sm:text-base font-medium text-center">
                    {quantity}
                  </span>
                  <button
                    className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors"
                    onClick={incrementQuantity}
                  >
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  className="w-full sm:flex-1 bg-black text-white rounded-full px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base font-medium hover:bg-subtitleColor transition-colors"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
        </div>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </main>
    </div>
  );
};

export default ProductDetail;
