import React from 'react'
import { GiShoppingCart } from "react-icons/gi";
import { FiSearch, FiMenu } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import { AiOutlineShopping } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchAllTerms, setSearchTerm } from '../slicer/searchSlice';
import { cartItems } from '../slicer/cartSlice'
import HeaderList from './HeaderList';

const Header = () => {
    const [openMenu, setOpenMenu] = React.useState(false)
    const searchTerm = useSelector(searchAllTerms)
    const dispatch = useDispatch()
    const cartCount = useSelector(cartItems)
    const navigate = useNavigate()

    const handleSearchSubmit = (e) => {
        e.preventDefault()
        if(searchTerm.trim()) {
            navigate('/search')
        }
    }

    return (
    <header className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white sticky top-0 z-50">
        <section className="flex justify-evenly items-center">
            <NavLink to="/">
            <h1 className="text-2xl md:text-3xl font-bold flex items-center px-4 py-3"> 
                <GiShoppingCart className="text-cyan-600"/> Shop 
                <span className="text-green-600">Ez</span>
            </h1>
            </NavLink>
            <nav className="hidden md:flex items-center gap-8" aria-label="navigation-menu">
                <ul className="flex items-center gap-6 text-xl"><HeaderList /></ul>
            </nav>
            
            <nav className="flex items-center gap-8" aria-label="menu-icon">
                <ul className="hidden md:flex items-center gap-6">
                    {/* Flex display on medium screens and up (≥768px), but hidden on mobile (<768px). */}
                    <li className="hover:text-cyan-300 cursor-pointer">
                        <div className='relative'>
                            <form onSubmit={handleSearchSubmit}>
                                <input className="border pr-10 px-3 py-2 rounded"
                                value={searchTerm} name='searchField' placeholder="Search...." 
                                onChange={(e) => dispatch(setSearchTerm(e.target.value))} />
                                <button type="submit">
                                    <FiSearch className="absolute right-3 top-1.5 transform translate-y-0.5 w-6 h-6 md:w-6 md:h-6"/>
                                </button>
                            </form>
                        </div>
                    </li>
                    <li className="hover:text-cyan-300 cursor-pointer">
                        <NavLink to="/login"><RxAvatar className="w-6 h-6 md:w-6 md:h-6"/></NavLink>
                    </li>
                    <li className="hover:text-cyan-300 cursor-pointer">
                        <div className="flex items-center ">
                            <AiOutlineShopping className="w-6 h-6 md:w-8 md:h-6"/>
                            {cartCount > 0 && (
                            <span className="relative top-0 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                {cartCount}
                            </span>)}
                        </div>
                    </li>
                </ul>

            </nav>
            <section className="md:hidden flex flex-col justify-center">
                {/* Hide on medium screens and up (≥768px), but visible on mobile (<768px). */}
                <nav className="flex" aria-label="mobile-menu">
                    <button onClick={() => setOpenMenu(prev => !prev)}>
                        {openMenu ? <IoCloseSharp className="w-8 h-8"/> : <FiMenu className="w-8 h-8"/> }
                    </button>
                </nav>
            </section>
        </section>
        {openMenu && <section className="md:hidden absolute w-full
         bg-cyan-700 min-h-screen top-full flex flex-col justify-center">
            {/* Hide on medium screens and up (≥768px), but visible on mobile (<768px). */}
            <nav>
                <ul className="flex flex-col items-center gap-6 text-xl">
                    <HeaderList />
                    <NavLink to="/login"><li>Login</li></NavLink>
                </ul>
            </nav>
        </section>}

    </header>
  )
}

export default Header