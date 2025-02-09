import {Routes, Route, Link, Navigate} from "react-router-dom"
import Footer from "./component/Footer"
import Header from "./component/Header"
import HomePage from "./component/HomePage"
import Product from "./component/Products"
import ProductDetail from "./component/ProductDetail"

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/products' element={<Product />} />
      <Route path='/productdetail' element={<ProductDetail />} />

    </Routes>
    <Footer />
    </>
  )
}

export default App;
