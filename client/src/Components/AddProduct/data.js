import { useState } from "react";
import React from "react";
import "./product.css";
import ItemForm from "./addproduct";

function Data (){
  const [image, setImage] = useState('')
  const [loading, setLoading] = useState(false)

  const uploadImage = async e => {
    const files = e.target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset')
    setLoading(true)
    
   

    
    setLoading(false)
  }
  const [items , setItems] = useState([]);
  const addItem = item => 
  {
    setItems ([...items, item])
  alert(`${item.Name} is added successfully`)
  
  };
  const deleteItem = items => 
  {
    setItems (items.filter(itemproduct => itemproduct.id !== items.id ))
  alert(`${items.Name} is deleted successfully`)
  
  };
  

  
  return (
    <div className="App">
       
      <ItemForm addItemProp={addItem}/>
    < div className="files-input">
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: '300px' }} />
      )}
      </div>
    </div>
  )
}
export default Data;