import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navbar from "./components/Navbar";
import About from "./components/About";
import Shop from "./components/Shop";
import Home from "./components/Home";
import Hostel from "./components/Hostel";
import Restaurants from "./components/Restaurant";
import Login from "./components/Login";
//functions
import { getTest } from "./functions/test";

function App() {
  // const [data, setData] = useState("Unilife");
  // useEffect(() => {
  //   getTest()
  //     .then((res) => {
  //       setData(res.message);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);
  
  return (
    
    <BrowserRouter>
    <div className="App">
      <Navbar />
      <Routes>
          <Route path="/" exact element= {
            <Home />
          } />
      </Routes>
      <Routes>
          <Route path="/about" element= {
            <About />
          } />
      </Routes>

      <Routes>
          <Route path="/shop" element= {
            <Shop />
          } />
      </Routes>
      <Routes>
          <Route path="/hostels" element= {
            <Hostel />
          } />
      </Routes>
      <Routes>
          <Route path="/restaurants" element= {
            <Restaurants />
          } />
      </Routes>
      <Routes>
          <Route path="/login" element= {
            <Login />
          } />
      </Routes>
    </div>
    </BrowserRouter>



  );
}

export default App;
