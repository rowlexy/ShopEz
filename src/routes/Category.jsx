import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import catImg from '../images/Category-img.jpg';
import { FcClearFilters } from "react-icons/fc";
import { categoryColor } from "../../helper";
import { toTitleCase } from "../../helper";
import { incrementCart, decrementCart, setCartCount, cartItems } from "../slicer/cartSlice";
import { useSelector, useDispatch } from "react-redux";


const Category = () => {
    const [categoryItems, setCategoryItems] = React.useState([])
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const [activeCategory, setActiveCategory] = React.useState(null)
    const [searchParam, setSearchParam] = useSearchParams([])

    // Logic for cart Items
    const [cart, setCart] = React.useState({})
    const cartCount = useSelector(cartItems)
    const dispatch = useDispatch()

    function getQuantity(itemId) {
      return cart[itemId] || 0
    }

    function updateCart(itemId, change) {
      setCart(prevCart => {
        const currentQty = prevCart[itemId] || 0
        const newQty = Math.max(0, currentQty + change)
        const updatedCart = { ...prevCart }
        if(newQty === 0) {
          delete updatedCart[itemId]
        }
        else {
          updatedCart[itemId] = newQty
        }
        const total = Object.values(updatedCart).reduce((sum, next) => sum + next, 0)
        dispatch(setCartCount(total))
        return updatedCart
      })
    }
    
function buyNow(item) {
  console.log('Buying now:', item, 'Quantity:', getQuantity(item.id))
}

    const filterType = searchParam.get('category')

    React.useEffect(() => {
        async function getCategories() {
            setLoading(true)
            try {
                const response = await fetch(`https://fakestoreapi.com/products`)
                if(!response.ok) {
                    throw new Error(`Unable to fetch products ${response.status}`)
                }
                const data = await response.json()
                setCategoryItems(data)
            }
            catch(error) {
                setError(error)
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        getCategories()
    }, [])

    if(error) {
        return (
            <div className="min-h-screen flex flex-col">
                <div className="flex-1 flex items-center justify-center px-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-xl md:text-2xl mb-4">There appears to be a broken link, we are unable to complete your request at this time</h1>
                        <p className="text-gray-600">Please refresh your browser or return to the <Link to=".." className="text-blue-600 hover:underline">homepage</Link></p>
                    </div>
                </div>
            </div>
            )
    }
    if(loading) {
      return (
        <div className="min-h-screen flex flex-col">
          <div className="flex-1 flex justify-center px-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 mt-6 border-blue-600 mx-auto mb-4"></div>
                <h1 className="text-xl md:text-2xl">Your items will be available shortly........</h1>
            </div>
          </div>
        </div>
        )
    }

    const showCategories = categoryItems.map(item => {
      return (
        <Link to={item.id} key={item.id}>
          <div key={item.id} id={item.id} 
            className="p-2 sm:p-3 md:p-4 lg:p-5 border border-gray-100 rounded-xl shadow-lg">
            <img className="w-full h-32 sm:h-40 md:h-48 object-contain" src={item.image}
            alt={item.title}/>
                <div className="my-2 md:my-3">
                    <button className={`${categoryColor(item.category)} w-full 
                    p-2 sm:p-3 md:p-4 rounded font-bold
                    sm:text-sm text-xs md:text-base transition-all`}>{toTitleCase(item.category)}</button>
                </div>
                <p className="font-bold text-sm md:text-base px-1 sm:px-2">{item.title}</p>
                <p className="text-sm md:text-base font-medium px-1 sm:px-2">PLN {item.price.toFixed(2)}</p>
                  <div className="flex items-center justify-between pt-2 px-2">
                  <div className="flex items-center gap-2">
                    <button onClick={() => {updateCart(item.id, -1)}} disabled={getQuantity(item.id) === 0}
                     className={`w-8 h-8 rounded-full border flex items-center justify-center
                      ${getQuantity(item.id) === 0 
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' 
                        : 'bg-white text-black border-gray-400 hover:bg-gray-100'}`}> -
                    </button>
                    <span className="font-medium text-sm w-8 text-center">
                      {getQuantity(item.id)}
                    </span>
                    <button onClick={() => {updateCart(item.id, 1)}}
                    className={`w-8 h-8 rounded-full ${categoryColor(item.category)} text-white
                     flex items-center justify-center hover:bg-blue-700`}> +
                    </button>
                  </div>
                    {getQuantity(item.id) > 0 && (
                      <button onClick={() => buyNow(item)} className="bg-green-600 text-white px-3 py-1 
                        rounded-lg text-sm hover:bg-green-700"> Buy Now
                      </button>
                    )}

                </div>
          </div>
        </Link>
      )
    })

    const uniqueCategories = [...new Set(categoryItems.map(items => items.category))];
  
    const categoryElements = uniqueCategories.map((category) => {
      const isActive = filterType === category;
      return (
        <Link to={`?category=${category}`} key={category}
          onClick={() => setActiveCategory(toTitleCase(category))}
          className={`capitalize text-sm md:text-base
              ${ isActive ? `${categoryColor(category)}`: "border-gray-400"}
               hover:bg-gray-100 hover:text-black border border-gray-400 rounded-3xl 
                  py-2 px-3 md:px-4 cursor-pointer whitespace-nowrap`}>{category}
        </Link>
      );
    });
  
    /** To filter the categories */
    const filterCategory = activeCategory ? categoryItems.filter(item => item.category === filterType) : categoryItems

    const filteredEl = filterCategory.map(item => {
      return (
        <div key={item.id} id={item.id} className="p-2 sm:p-3 md:p-4 lg:p-5 border 
        border-gray-100 rounded-xl shadow-lg">
          <img className="w-full h-32 sm:h-40 md:h-48 object-contain" src={item.image} alt={item.title} />
          <div className="my-2 md:my-3">
              <button className={`${categoryColor(item.category)} w-full p-2 sm:p-3 md:p-4 rounded font-bold
              sm:text-sm text-xs md:text-base transition-all`}>{toTitleCase(item.category)}
              </button>
          </div>
          <p className="font-bold text-sm md:text-base px-1 sm:px-2">{item.title}</p>
          <p className="text-sm md:text-base font-medium px-1 sm:px-2">PLN {item.price.toFixed(2)}</p>
          <div className="flex items-center justify-between pt-2 px-2">
            <div className="flex items-center gap-2">
              <button onClick={() => {updateCart(item.id, -1)}} disabled={getQuantity(item.id) === 0}
                className={`w-8 h-8 rounded-full border flex items-center justify-center
                ${getQuantity(item.id) === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300' 
                  : 'bg-white text-black border-gray-400 hover:bg-gray-100'}`}>
                - </button>
              <span className="font-medium text-sm w-8 text-center">{getQuantity(item.id)}</span>
              <button onClick={() => {updateCart(item.id, 1)}} className="w-8 h-8 
              rounded-full bg-blue-600 text-white flex items-center justify-center 
              hover:bg-blue-700"> + </button>
            </div>
              {getQuantity(item.id) > 0 && ( <button onClick={() => buyNow(item)} className="bg-green-600 text-white px-3 py-1 
                  rounded-lg text-sm hover:bg-green-700"> Buy Now </button>)}
          </div>
        </div>
      )
    })
    // clearing the filter
    function clearFilter(key, value) {
        setSearchParam(prevParam => {
            if(!value) {
                prevParam.delete(key)
            }
            else {
                prevParam.set(key, value)
            }
            return prevParam
        })
    }


    return (
      <main className="px-4 py-6 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="w-full h-48 md:h-64 lg:h-120 overflow-hidden">
          <img className="w-full h-full object-cover" src={catImg}
            alt="Picture of lady in a shopping mall" />
        </div>
        <ul className="flex mt-4 flex-wrap gap-2 justify-center overflow-x-auto">
          {categoryElements}
          {filterType && <button onClick={() => clearFilter('category', null)} 
          className="cursor-pointer"><FcClearFilters /></button>}
        </ul>
        <section className="grid grid-cols-1 md:grid-cols-4 gap-3 my-4">
          {filterType ? filteredEl : showCategories}
        </section>
      </main>
    );
};


export default Category