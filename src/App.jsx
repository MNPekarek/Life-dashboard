import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/Dashboard'
import Home from './page/Home'

function App() {

  return (
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} /> 
        <Route path='/dashboard' element={<Dashboard />} />
           
        </Routes>      
        

      </BrowserRouter>    
  )
}

export default App
