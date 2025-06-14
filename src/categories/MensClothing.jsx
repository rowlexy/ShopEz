import React from "react";
import { categoryColor } from "../../helper";
import { Link } from "react-router-dom";
import { IoChevronBackSharp } from "react-icons/io5";

const MensClothing = () => {
  const [mensClothing, setMensClothing] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    async function getMensClothing() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://fakestoreapi.com/products/category/men's%20clothing`
        );
        if (!response.ok) {
          throw new Error(`Unable to fetch products ${response.status}`);
        }
        const data = await response.json();
        setMensClothing(data);
      } catch (error) {
        setError(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getMensClothing();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <h1 className="text-xl md:text-2xl mb-4">
              There appears to be a broken link, we are unable to complete your
              request at this time
            </h1>
            <p className="text-gray-600">
              Please refresh your browser or return to the{" "}
              <Link to=".." className="text-blue-600 hover:underline">
                homepage
              </Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex justify-center px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 mt-6 border-blue-600 mx-auto mb-4"></div>
            <h1 className="text-xl md:text-2xl">
              Your items will be available shortly........
            </h1>
          </div>
        </div>
      </div>
    );
  }
  const renderMensClothing = mensClothing.map((item) => {
    return (
      <div
        key={item.id}
        id={item.id}
        className="flex flex-col items-center p-2 sm:p-3 md:p-4 lg:p-5 border border-gray-100 rounded-xl shadow-lg"
      >
        <img
          className="w-full h-32 sm:h-40 md:h-48 object-contain"
          src={item.image}
          alt={item.title}
        />
        <p className="font-bold text-sm md:text-base px-1 pt-2 sm:px-2">
          {item.title}
        </p>
        <p className="text-sm md:text-base font-medium px-1 sm:px-2">
          PLN {item.price.toFixed(2)}
        </p>
         <Link to={`/categories/mens-clothing/${item.id}`}><button key={item.id} id={item.id} className={`${categoryColor(item.category)} w-full md:w-48 text-sm mx-1 my-2 md:m-2 hover:bg-gray-700 md:text-base text-white cursor-pointer p-2 rounded transition-all`}>Buy Now</button></Link>
      </div>
    );
  });
  return (
    <>
      <Link to='..'>
        <p className="flex items-center m-4 md:m-8"><IoChevronBackSharp /> Go back</p>
      </Link>
      <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-3 m-4 sm:m-6 md:m-8 lg:m-10'>
        {renderMensClothing}
      </div>
    
    </>
  )
};

export default MensClothing;
