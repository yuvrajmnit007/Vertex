import React from 'react'
import { Routes,Route,useLocation } from 'react-router-dom'
import Navbar from './components/navbar'
import Home from './pages/Home'
import Movies from './pages/Movies'
import SeatLayout from './pages/SeatLayout'
import MyBookings from './pages/MyBookings'
import Favorites from './pages/Favorites'
import {Toaster} from 'react-hot-toast'
import Footer from './components/Footer'


function App() {
  const isAdminRoute = useLocation().pathname.startsWith('/admin');

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies ' element={<Movies />} />
        <Route path='/movies/:id' element={<SeatLayout />} /> 
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/mybookings' element={<MyBookings />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>

      {!isAdminRoute && <Footer />}
    </>
  )
}

export default App
