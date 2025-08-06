
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Home from './page/Home'
// import { ContextProvider } from './components/context/Context'
// import ItemListContainer from './components/ItemListContainer/ItemListContainer'
// import Navbar from './components/navbar/Navbar'
// import Cart from './components/cart/Cart'
// import Home from './pages/Home'
// import ItemDetail from './components/itemDetails/ItemDetails'
// import SearchPage from './pages/SearchPage'
// import FormDatesClient from './components/orderWsp/FormDatesClient'

function App() {
 

  return (
    // <ContextProvider>
      <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={<Home />} /> 
        {/* <Route path='/categoria/:categoria' element={<ItemListContainer />} />
        <Route path='/detalle/:id' element={<ItemDetail />} />
        <Route path='/carrito' element={<Cart />} />   
        <Route path='/search' element={<SearchPage />} /> 
        <Route path='/ordenes' element={<FormDatesClient/>}/> 
        <Route path='*' element={<p>404 Not Found</p>} /> */}
        <Route path='/dashboard' element={<Dashboard />} />
           
        </Routes>      
        

      </BrowserRouter>      
    // </ContextProvider>
  )
}

export default App
