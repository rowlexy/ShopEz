import { NavLink } from 'react-router-dom';

const HeaderList = () => {
    const activeNavLink = ({isActive}) => {
        return isActive ? "text-cyan-300" : null
    }
  return (
        <>
            <NavLink className={activeNavLink} to="/categories/mens-clothing">
                <li key="men" className="hover:text-cyan-300 w-full text-center py-4 cursor-pointer">Men</li>
            </NavLink>
            <NavLink to="/categories/womens-clothing">
                <li key="women" className="hover:text-cyan-300 w-full text-center py-4 cursor-pointer">Women</li>
            </NavLink>
            <NavLink className={activeNavLink} to="/categories/jeweleries">
                <li key="jewleries" className="hover:text-cyan-300 w-full text-center py-4 cursor-pointer">Jewleries</li>
            </NavLink>
            <NavLink className={activeNavLink} to="/categories/electronics">
                <li key="electronics" className="hover:text-cyan-300 w-full text-center py-4 cursor-pointer">Electronics</li>
            </NavLink>
            <NavLink className={activeNavLink} to="/about">
                <li key="about" className="hover:text-cyan-300 w-full text-center py-4 cursor-pointer">About</li>
            </NavLink>
        </>
    
  )
}

export default HeaderList