import React from 'react'
import { useParams, Link } from 'react-router-dom';
import { IoChevronBackSharp } from "react-icons/io5";
const WomensDetails = () => {
    const [womensDetails, setWomensDetails] = React.useState(null)
    const [error, setError] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const { id } = useParams()

    React.useEffect(() => {
        async function getWomenDetails() {
            setLoading(true)
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                if(!response.ok) {
                        throw new Error(`Unable to fetch products: ${response.status}`)
                }
                const data = await response.json()
                setWomensDetails(data)
            }
            catch(error) {
                setError(error)
                console.error(error)
            }
            finally {
                setLoading(false)
            }
        }
        getWomenDetails()
    }, [id])

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

  return (
     womensDetails && 
     <>
     <Link to="/categories/womens-clothing"><p className="flex items-center m-4 md:m-8"><IoChevronBackSharp /> Go back</p></Link>     
        <div key={womensDetails.id} id={womensDetails.id}
            className="min-h-screen flex flex-col items-center p-2 sm:p-3 md:p-4 lg:p-5">
            <img className="w-full h-32 sm:h-40 md:h-48 object-contain"
                src={womensDetails.image} alt={womensDetails.title} />
            
            <p className="font-bold text-sm md:text-base px-2 sm:px-4">{womensDetails.title}</p>
            <p className="text-sm md:text-base font-medium px-1 sm:px-2">
                PLN {womensDetails.price.toFixed(2)}
            </p>
            <p className="text-xs sm:text-sm px-2 sm:px-4">{womensDetails.description}</p>
            <button className="bg-pink-400 hover:bg-pink-300 active:bg-pink-200 text-white p-2 border m-2 md:m-4 rounded w-full md:w-48 transition-colors">Buy Now</button>
        </div>
     </>
  )
}

export default WomensDetails