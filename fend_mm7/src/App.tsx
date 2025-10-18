import "./App.css";
import { X, Search } from "lucide-react";
import profileSvg from "./assets/icons/profile.svg";
import ShoppingCart from "./assets/icons/shoppingcart.svg";
import dropdownSvg from "./assets/icons/dropdown.svg";

import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { getCurrentUser } from "aws-amplify/auth";
import HomePage from "./pages/listing/HomePage";
import ProductDetail from "./pages/products/ProductDetail";
import { Provider } from "react-redux";
import { store } from "./store/store";
import CartPage from "./pages/cart/CartPage";
import AuthForm from "./pages/Profile/AuthForm";
import ProfileScreen from "./pages/Profile/ProfileScreen"; // Import the new ProfileScreen component

interface FooterLink {
  title: string;
  links: string[];
}

const footerLinks: Record<string, FooterLink> = {
  COMPANY: {
    title: "COMPANY",
    links: ["About", "Features", "Works", "Career"],
  },
  HELP: {
    title: "HELP",
    links: [
      "Customer Support",
      "Delivery Details",
      "Terms & Conditions",
      "Privacy Policy",
    ],
  },
  FAQ: {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  RESOURCES: {
    title: "RESOURCES",
    links: [
      "Free eBooks",
      "Development Tutorial",
      "How to - Blog",
      "Youtube Playlist",
    ],
  },
};

// Header component that will be reused across all pages
const Header = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status when component mounts
  useEffect(() => {
    checkAuthState();
  }, []);

  // Function to check if user is authenticated
  const checkAuthState = async () => {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
    } catch (error) {
      console.log("Error: ", error)
      setIsAuthenticated(false);
    }
  };

  // Handle profile icon click based on authentication status
  const handleProfileClick = () => {
    if (isAuthenticated) {
      navigate("/profile");
    } else {
      navigate("/auth");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Promo Banner */}
      <div className="bg-black text-white py-3">
        <div className="container mx-auto px-3 sm:px-4 flex justify-between items-center">
          <div></div> {/* Empty left spacer */}
          <p className="text-center text-sm">
            <span className="text-white font-inter font-normal">
              Sign up and get 20% off to your first order.{" "}
            </span>
            <a href="#" className="font-inter font-medium underline tracking-normal">
              Sign Up Now
            </a>
          </p>
          <button className="cursor-pointer">
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <nav className="py-4 sm:py-6 bg-white">
        <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left side: Logo and Links */}
        <div className="flex items-center gap-4 sm:gap-8 md:gap-12">
          <Link
            to="/"
            className="font-alfa-slab text-xl sm:text-2xl md:text-[32px] font-normal"
          >
            FAKESTORE
          </Link>
          <div className="hidden lg:flex items-center gap-4 lg:gap-8 font-inter">
            <div className="relative group">
              <Link to="/shop" className="font-inter font-normal text-base">
                Shop
              </Link>
              <img src={dropdownSvg} alt="Dropdown" className="inline-block ml-1 h-3 w-3" />
            </div>
            <Link to="/sale" className="font-inter font-normal text-base">
              On Sale
            </Link>
            <Link to="/new-arrivals" className="font-inter font-normal text-base">
              New Arrivals
            </Link>
            <Link to="/brands" className="font-inter font-normal text-base">
              Brands
            </Link>
          </div>
        </div>

        {/* Right side: Search and Icons */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Search bar */}
          <div className="relative flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-xs sm:max-w-md">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search for products..."
              className="bg-transparent border-none outline-none ml-2 w-full text-sm"
            />
          </div>

          {/* Icons */}
          <button
            className="p-2 cursor-pointer"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <img src={ShoppingCart} alt="Shopping Cart" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
          <button
            className="p-2 cursor-pointer"
            onClick={handleProfileClick}
            aria-label="Open profile"
          >
            <img src={profileSvg} alt="Profile" className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>
        </div>
      </nav>
    </div>
  );
};

// Footer component that will be reused across all pages
const Footer = () => {
  return (
    <footer className="mt-auto bg-[#F0F0F0] font-inter">
      <div className="pt-[140px] pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 md:mb-12 mx-4 sm:mx-8 md:mx-[100px]">
          {/* Store Info */}
          <div className="col-span-2 sm:col-span-4 lg:col-span-2 text-center sm:text-left">
            <h2 className="text-2xl sm:text-3xl mb-4 font-alfa-slab">FAKESTORE</h2>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              We have clothes that suits your style 
              <br className="hidden sm:block" />
              and which you're proud to wear.
              <br className="hidden sm:block" />
              From women to men.
            </p>

            {/* Social Media Icons */}
            <div className="flex justify-center sm:justify-start space-x-3 sm:space-x-4 mt-8">
              <a href="#" className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <FaTwitter className="text-gray-800 text-sm" />
              </a>
              <a href="#" className="w-7 h-7 bg-black rounded-full flex items-center justify-center">
                <img src="/src/assets/icons/facebook.svg" alt="Facebook" className="w-3.5 h-3.5" />
              </a>
              <a href="#" className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <FaInstagram className="text-gray-800 text-sm" />
              </a>
              <a href="#" className="w-7 h-7 bg-white rounded-full flex items-center justify-center">
                <FaGithub className="text-gray-800 text-sm" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={section.title} className="lg:col-span-1 text-center sm:text-left">
                <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">{section.title}</h3>
                <ul className="space-y-2 sm:space-y-4">
                  {section.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-gray-600 hover:text-gray-900 text-xs sm:text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
      <div className="h-px bg-dividerColor bg-opacity-30 mt-4 sm:mt-6 md:mt-8 mb-4 mx-4 sm:mx-8 md:mx-[100px]"></div>
        {/* Copyright and Payment Methods */}
        <div className="mt-1 pt-1 flex flex-col sm:flex-row justify-between items-center sm:items-start mx-4 sm:mx-8 md:mx-[100px]">
          <p className="text-[#00000099] font-inter text-xs sm:text-sm md:text-[14px] mb-4 sm:mb-0 text-center sm:text-left">
            Fakestore© 2000-2023, All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center sm:justify-end gap-2 sm:gap-3 md:gap-4">
            <img src="/visa.png" alt="Visa" className="h-6 sm:h-8 md:h-10" />
            <img
              src="/mastercard.png"
              alt="Mastercard"
              className="h-6 sm:h-8 md:h-10"
            />
            <img src="/paypal.png" alt="PayPal" className="h-6 sm:h-8 md:h-10" />
            <img src="/applepay.png" alt="Apple Pay" className="h-6 sm:h-8 md:h-10" />
            <img src="/googlepay.png" alt="Google Pay" className="h-6 sm:h-8 md:h-10" />
          </div>
        </div>
      </div>
    </footer>
  );
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex flex-col font-inter">
      <Header />
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-[100px] sm:h-[110px] md:h-[120px]"></div>
      {children}
      <Footer />
    </main>
  );
};

// Create an Auth-protected route wrapper
const ProtectedRoute = ({ element }: { element: React.ReactNode }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        await getCurrentUser();
        setIsAuthenticated(true);
      } catch (error) {
        console.log("Error: ", error)
        navigate('/auth');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, [navigate]);

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[50vh]">Loading...</div>;
  }

  return isAuthenticated ? <>{element}</> : null;
};

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/auth"
            element={
              <Layout>
                <AuthForm />
              </Layout>
            }
          />
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductDetail />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <CartPage />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <ProtectedRoute element={<ProfileScreen />} />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;