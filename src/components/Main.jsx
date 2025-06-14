import shoppingImg from "../images/shopping-homepage.jpg";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <main className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
      <div className="w-full h-48 md:h-64 lg:h-96 overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={shoppingImg}
          alt="Picture of lady in a shopping mall"
        />
      </div>
      <div className="min-h-full grid grid-cols-1 gap-2 bg-slate-50 p-4 rounded-xl">
        <h2 className="font-bold text-2xl md:text-3xl mt-4">Welcome to ShopEz</h2>
        <p className="text-purple-500">Your Ultimate Shopping Destination</p>
        <p>Discover premium products, enjoy lightning-fast delivery, 
          and experience shopping like never before. From the latest tech 
          gadgets to fashion essentials, we've got everything 
          you need to elevate your lifestyle.
        </p>
        <Link to="/categories">
          <button className="text-base md:text-xl cursor-pointer bg-purple-500
           text-white rounded-2xl p-4">
            Start Shopping Now
          </button>
        </Link>
      </div>
      <section className="bg-blue-50 p-4 rounded-xl min-h-full mt-6">
          <h2 className="font-bold text-2xl md:text-3xl mt-4">Why Choose ShopEz?</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
          <div className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white p-4 rounded-xl">
            <h3 className="font-bold sm:text-xl md:text-2xl">Premium Quality</h3>
            <p className="text-xs sm:text-sm md:text-base">Every product meets our rigorous quality standards for your complete satisfaction</p>
          </div>
          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 text-white p-4 rounded-xl">
            <h3 className="font-bold sm:text-xl md:text-2xl">Fast Shipping</h3>
            <p className="text-xs sm:text-sm md:text-base">Get your orders delivered in 24-48 hours with our express shipping network</p>
          </div>
          <div className="bg-gradient-to-r from-emerald-400 to-green-500 text-white p-4 rounded-xl">
            <h3 className="font-bold sm:text-xl md:text-2xl">Secure Shopping</h3>
            <p className="text-xs sm:text-sm md:text-base">Shop with confidence using our bank-grade security and encrypted payments</p>
          </div>
          <div className="bg-gradient-to-r from-amber-400 to-orange-500 text-white p-4 rounded-xl">
            <h3 className="font-bold text-base sm:text-xl md:text-2xl">Best Prices</h3>
            <p className="text-xs sm:text-sm md:text-base">Unbeatable prices with price-match guarantee and exclusive member discounts</p>
          </div>
        </div>
      </section>
      <section className="bg-purple-50 rounded-xl mt-6 p-4 min-h-full">
        <h2 className="text-center font-bold text-2xl md:text-3xl">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Link to="/categories/electronics">
          <div className="bg-neutral-50 rounded-xl flex flex-col items-center
           p-2 sm:p-4 lg:p-6 hover:bg-neutral-100 transition-colors duration-300 max-w-sm mx-auto">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">🖥️</p>
            <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">Electronics</h3>
            <p className="text-xs sm:text-sm md:text-base text-center">Televisions, SSD cards, Hard drives  and Monitors</p>
          </div>
        </Link>
        <Link to="/categories/jeweleries">
          <div className="bg-neutral-50 rounded-xl flex flex-col items-center
           p-2 sm:p-4 lg:p-6 hover:bg-neutral-100 transition-colors duration-300 max-w-sm mx-auto">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">💍</p>
            <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">Jewelery</h3>
            <p className='text-xs sm:text-sm md:text-base text-center'>Trendy accessories and Jeweleries made perfectly for you</p>
          </div>
        </Link>
        <Link to="/categories/mens-clothing">
          <div className="bg-neutral-50 rounded-xl flex flex-col items-center 
          p-2 sm:p-4 lg:p-6 hover:bg-neutral-100 transition-colors duration-300 max-w-sm mx-auto">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">👕</p>
            <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">Men's Clothing</h3>
            <p className="text-xs sm:text-sm md:text-base text-center">Quality Men's casual wear and trendy jackets</p>
          </div>
        </Link>
        <Link to="/categories/womens-clothing">
          <div className="bg-neutral-50 rounded-xl 
          flex flex-col items-center 
          p-2 sm:p-4 lg:p-6 hover:bg-neutral-100 transition-colors duration-300 max-w-sm mx-auto">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">👗</p>
            <h3 className="font-bold text-base sm:text-lg md:text-xl lg:text-2xl">Women's Clothing</h3>
            <p className="text-xs sm:text-sm md:text-base text-center">Quality Women's clothings and trendy jackets</p>
          </div>
        </Link>
        </div>
      </section>
    </main>
  );
};

export default Main;
