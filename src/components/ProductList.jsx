import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchAllTerms, setProducts, setLoading, searchAllProducts, errorHandler, setError, loadingHandler } from '../slicer/searchSlice';

const ProductList = () => {
    const error = useSelector(errorHandler)
    const loading = useSelector(loadingHandler)
    const products = useSelector(searchAllProducts)
    const searchTerm = useSelector(searchAllTerms)

    const dispatch = useDispatch()

    React.useEffect(() => {
            async function getCategories() {
                dispatch(setLoading(true))
                try {
                    const response = await fetch(`https://fakestoreapi.com/products`)
                    if(!response.ok) {
                        throw new Error(`Unable to fetch products ${response.status}`)
                    }
                    const data = await response.json()
                    dispatch(setProducts(data))
                }
                catch(error) {
                    setError(error)
                    console.error(error)
                }
                finally {
                    dispatch(setLoading(false))
                }
            }
            getCategories()
        }, [dispatch])
    
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

    const filteredItems = searchTerm.length > 0 
        ? products.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        : products
  return (
    <div className="min-h-screen container mx-auto px-4 py-8">
        {searchTerm && (
            <h2 className="text-2xl font-bold mb-6">
                Search results for: "{searchTerm}" ({filteredItems.length} items found)
            </h2>
        )}
        
        {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredItems.map(item => (
                <div key={item.id} className="border p-4 rounded-lg shadow-md">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-contain mb-4"/>
                    <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
                    <p className="text-gray-600 mb-2 capitalize">{item.category}</p>
                    <p className="text-lg font-bold text-green-600">${item.price}</p>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700">
                        Add to Cart
                    </button>
                </div>
    ))}
            </div>
        ) : (
            searchTerm && (
                <div className="text-center py-12">
                    <h3 className="text-xl text-gray-600 mb-2">No products found</h3>
                    <p className="text-gray-500">Try different keywords or browse all categories</p>
                </div>
            )
        )}
    </div>
  )
}

export default ProductList