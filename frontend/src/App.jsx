import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Navbar from "./components/Navbar";
import About from "./components/About";
import Shop from "./components/Shop";
import Home from "./components/Home";
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
          <Route path="/about" element= {
            <About />
          } />
      </Routes>

      <Routes>
          <Route path="/shop" element= {
            <Shop />
          } />
      </Routes>
    </div>
    </BrowserRouter>



  );
}

export default App;
