import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Minus, Plus, ArrowRight, Tag } from "lucide-react";
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../store/slice/cartSlice";
import type { RootState } from "../../store/store";
import Button from "../../components/Button";
import { useState } from "react";
import Toast from "../../components/Toast";
import trashSvg from "../../assets/icons/trash.svg";

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  // Calculate cart totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discount = subtotal * 0.2; // 20% discount
  const deliveryFee = 15;
  const total = subtotal - discount + deliveryFee;

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart(id));
    setToast({ message: "Product removed from cart", type: "success" });
  };

  const handleDecreaseQuantity = (id: string) => {
    dispatch(decreaseQuantity(id));
  };

  const handleIncreaseQuantity = (id: string) => {
    dispatch(increaseQuantity(id));
  };
  const PromoCodeInput: React.FC<{ onApply: (code: string) => void }> = () => {
    const [promoCode, setPromoCode] = useState<string>("");

    return (
      <div className="flex w-full gap-4">
        <div className="relative flex items-center w-full rounded-full bg-gray-100">
          <div className="absolute left-4 text-gray-400">
            <Tag />
          </div>
          <input
            type="text"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
            placeholder="Add promo code"
            className="w-full h-12 pl-12 pr-28 bg-transparent border-none rounded-full focus:outline-none"
          />
        </div>
        <Button className="bg-black text-white rounded-full px-10 py-4 text-sm hover:bg-subtitleColor w-[30%]">
          Apply
        </Button>
      </div>
    );
  };
  return (
    <div className="container mx-auto py-8 px-4 font-inter">
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-gray-700">
          Home
        </Link>
        <span className="mx-2">&gt;</span>
        <span className="font-medium text-gray-900">Cart</span>
      </div>

      <h1 className="text-[32px] mb-8 font-alfa-slab">Your cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div
          className={cartItems.length === 0 ? "lg:col-span-3" : "lg:col-span-2"}
        >
          <div className="border border-dividerColor rounded-[20px] overflow-hidden">
            {cartItems.length === 0 ? (
              <div className="p-6 text-center w-full">
                <p className="text-gray-500">Your cart is empty</p>
              </div>
            ) : (
              cartItems.map((item, index) => (
                <div key={item.id} className="p-6">
                  <div className="flex items-start">
                    {/* Left side: Image + Quantity Controls */}
                    <div className="flex-shrink-0">
                      {/* Product Image */}
                      <div className="w-40 h-40 bg-gray-100 rounded-md overflow-hidden mb-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      
                      {/* Quantity Controls + Delete button below image */}
                      <div className="flex items-center gap-6">
                        <div className="flex items-center bg-[#F0F0F0] rounded-[62px] w-fit">
                          <button
                            className={`px-3 py-3 cursor-pointer ${item.quantity === 1 ? 'text-gray-400' : 'text-black'}`}
                            onClick={() => handleDecreaseQuantity(item.id)}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={18} />
                          </button>
                          <span className="px-6 py-3">{item.quantity}</span>
                          <button
                            className="px-3 py-3 cursor-pointer"
                            onClick={() => handleIncreaseQuantity(item.id)}
                            aria-label="Increase quantity"
                          >
                            <Plus size={18} />
                          </button>
                        </div>
                        
                        {/* Delete button beside quantity on small screens */}
                        <button
                          className="text-red-500 sm:hidden cursor-pointer"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <img src={trashSvg} alt="Trash" className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Right side: Product Info + Delete */}
                    <div className="ml-4 flex-grow flex flex-col justify-between min-h-[160px]">
                      {/* Top row: title + delete */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-[20px]">
                            {item.title}
                          </h3>
                          {item.size && (
                            <p className="flex text-[14px] text-black">
                              Size:
                              <span className="text-sm text-subtitleColor ml-1">
                                {item.size}
                              </span>
                            </p>
                          )}
                          {item.color && (
                            <p className="flex text-[14px] text-black">
                              Color:{" "}
                              <span className="text-sm text-subtitleColor ml-1">
                                {item.color}
                              </span>
                            </p>
                          )}
                        </div>
                        <button
                          className="text-red-500 ml-4 hidden sm:block cursor-pointer"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          <img src={trashSvg} alt="Trash" className="h-5 w-5" />
                        </button>
                      </div>

                      {/* Bottom: price only */}
                      <div className="mt-auto pt-4">
                        <span className="font-[700] text-[24px]">
                          ${item.price}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Divider (except for last item) */}
                  {index < cartItems.length - 1 && (
                    <div className="h-px w-full bg-dividerColor bg-opacity-30 mt-10"></div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div>
            <div className="border border-dividerColor rounded-[20px] p-6">
              <h2 className="text-[24px] font-[700] mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between text-[20px]">
                  <span className="text-subtitleColor font-[400]">
                    Subtotal
                  </span>
                  <span className="font-[700]">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[20px]">
                  <span className="text-subtitleColor font-[400]">
                    Discount (-20%)
                  </span>
                  <span className="text-red-500 font-[700]">
                    -${discount.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between text-[20px]">
                  <span className="text-subtitleColor font-[400]">
                    Delivery Fee
                  </span>
                  <span className="font-[700]">${deliveryFee.toFixed(2)}</span>
                </div>
                {/* Divider */}
                <div className="h-px w-full bg-dividerColor bg-opacity-30 "></div>

                <div className="">
                  <div className="flex justify-between">
                    <span className="text-[20px] font-[400]">Total</span>
                    <span className="text-[24px] font-[700]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex mt-6">
                  <PromoCodeInput onApply={() => {}} />
                </div>
                <Button className="bg-black text-white rounded-full px-10 py-4 text-sm hover:bg-subtitleColor w-full">
                  Go to Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
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

export default CartPage;
