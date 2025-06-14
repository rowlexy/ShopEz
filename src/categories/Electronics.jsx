import React from 'react'
import { IoChevronBackSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

const Electronics = () => {

    const [electronics, setElectronics] = React.useState([])
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
            async function getElectronics() {
                setLoading(true)
                try {
                    const response = await fetch(`https://fakestoreapi.com/products/category/electronics`)
                    if(!response.ok) {
                        throw new Error(`Unable to fetch products: ${response.status}`)
                    }
                    const data = await response.json()
                    setElectronics(data)
                }
                catch(error) {
                    setError(error)
                    console.error(error)
                }
                finally {
                    setLoading(false)
                }
            }
            getElectronics()
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
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 mt-6 border-blue-600 mx-auto mb-4">

                        </div>
                        <h1 className="text-xl md:text-2xl">Your items will be available shortly........</h1>
                    </div>
                </div>
            </div>
        )
    }
    const renderElectronics = electronics.map(item => {
        return (
        <div key={item.id} id={item.id}
            className="p-2 sm:p-3 md:p-4 lg:p-5 border border-gray-100 rounded-xl shadow-lg">
            <img className="w-full h-32 sm:h-40 md:h-48 object-contain"
                src={item.image} alt={item.title} />
            
            <p className="font-bold text-sm md:text-base px-1 pt-2 sm:px-2">{item.title}</p>
            <p className="text-sm md:text-base font-medium px-1 sm:px-2">
                PLN {item.price.toFixed(2)}
            </p>
            {/* <p className="text-xs sm:text-sm px-1 sm:px-2">{item.description}</p> */}
            <Link to={`/categories/electronics/${item.id}`}><button key={item.id} id={item.id} className="bg-red-400 text-sm mx-1 my-2 md:m-2 hover:bg-red-300 md:text-base text-white cursor-pointer p-2 rounded">Buy Now</button></Link>
        </div>
        )
    })
  return (
    <>
        <Link to='..'>
            <p className="flex items-center m-4 md:m-8"><IoChevronBackSharp /> Go back</p>
        </Link>
    <div className='grid sm:grid-cols-2 md:grid-cols-2 gap-3 m-4 sm:m-6 md:m-8 lg:m-10'>
        {renderElectronics}
    </div>
    
    </>
  )
}

export default Electronics