import { useState } from 'react'
import {Routes, Route} from "react-router-dom"
import './App.css'
import Cuisine from './pages/Cuisine';
import Home from './pages/Home';

function App() {




  return (
    <>
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/Cuisine' element={<Cuisine />} />
       <Route path='*' element={<h1> 404:Page Not Found</h1>} />
      </Routes>
    
    
    </>
  )
    
};

 

export default App
