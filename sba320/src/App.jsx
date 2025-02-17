import { useState, useEffect } from 'react'
import {Routes, Route} from "react-router-dom"
import './App.css'
import Cuisine from './pages/Cuisine';
import Home from './pages/Home';
import Nav from './components/Nav'


function App() {


//gather info from DB
  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("www.themealdb.com/api/json/v1/1/list.php?c=list"); 
        const data = await response.json; 
        setCategories(data);
      } catch (error) {
        console.error(error)
      }
    
    }
    getData();
  }, []); 
  
  function loaded() {
    return (
      <div>
        <h1>ForkFul of Flavor</h1>
        <ul>
          {Cuisine.map(item => (
            <li key={item.idCatergory}>
              {item.strCategory}
              <button onClick={() => deleteItem(item.idCategory)}>Delete</button>
           </li>
          ))}
        </ul>
      </div>
    )
  }

  // async function deleteItem() {
  //   try {
  //     await fetch("www.themealdb.com/api/json/v1/1/list.php?c=list")
  //     catch(error) {
        
  //     }
  //   }
  // }



  const loading = () => <h1>Loading..</h1>
  

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
    
};

 

export default App
