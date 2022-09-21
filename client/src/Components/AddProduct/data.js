import { useState } from "react";
import React from "react";
import "./product.css";
import ItemForm from "./addproduct";

function Data (){
  
  
  const [items , setItems] = useState([]);
  const addItem = item => 
  {
    setItems ([...items, item])
  alert(`${item.Name} is added successfully`)
  
  };
  
  

  
  return (
    <div className="App">
       
      <ItemForm addItemProp={addItem}/>
    
      </div>
  
  )
}
export default Data;