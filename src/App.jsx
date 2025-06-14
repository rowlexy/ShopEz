import Main from './components/Main'
import Layout from "./components/Layout";
import Category from './routes/Category';
import WomensClothing from './categories/WomensClothing';
import MensClothing from './categories/MensClothing';
import Jewelery from './categories/Jewelery';
import Electronics from './categories/Electronics'
import ElectronicsDetails from './details/ElectronicsDetails';
import JeweleryDetails from './details/JeweleryDetails'
import MensDetails from './details/MensDetails';
import WomensDetails from './details/WomensDetails';
import ProductList from './components/ProductList';
import About from './components/About';
import AuthPage from './Login/AuthPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <>
    <div className="m-0 p-0 box-border">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
                <Route path='/search' element={<ProductList/>} />
                <Route path="/about" element={<About />} />
                <Route path='/login' element={<AuthPage/>} />
                <Route path="/categories" element={<Category />} />
                <Route path="/categories/electronics" element={<Electronics/>}/>
                <Route path="/categories/electronics/:id" element={<ElectronicsDetails/>}/>
                <Route path="/categories/jeweleries" element={<Jewelery/>}/>
                <Route path="/categories/jeweleries/:id" element={<JeweleryDetails/>}/>
                <Route path="/categories/mens-clothing" element={<MensClothing/>}/>
                <Route path="/categories/mens-clothing/:id" element={<MensDetails/>} />
                <Route path="/categories/womens-clothing" element={<WomensClothing/>}/>
                <Route path="/categories/womens-clothing/:id" element={<WomensDetails/>} />
              </Route>
          </Routes>
        </BrowserRouter>
    </div>
    </>
  )
}

export default App