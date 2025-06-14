// import fetch from 'node-fetch';

export function categoryColor(str) {
        switch(str) {
            case "electronics":
                return "bg-red-700 text-white"
            case "jewelery":
                return "bg-yellow-600 text-white"
            case "men's clothing":
                return "bg-gray-800 text-white"
            case "women's clothing":
                return "bg-pink-400 text-white"
            default:
                return "bg-gray-400"
        }
}

export function toTitleCase(str) {
        return str.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
async function getUsers() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`)
                if(!response.ok) {
                    throw new Error(`Unable to fetch products ${response.status}`)
                }
                const data = await response.json()
                console.log(data)
            }
            catch(error) {
                console.error(error)
            }
        }
        getUsers()

export default {categoryColor, toTitleCase}
