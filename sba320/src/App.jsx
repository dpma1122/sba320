import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import './App.css'

import Cuisine from './pages/Cuisine';
import Home from './pages/Home';
import Nav from './components/Nav'


 export default function App(){


  return (
    <>
<Nav />
      <Routes>
        <Route path='/Home' element={<Home />} />
        <Route path='/Cuisine' element={<Cuisine />} />
       <Route path='*' element={<h1> 404:Page Not Found</h1>} />
      </Routes>
   
    
    </>
  )
    
}
