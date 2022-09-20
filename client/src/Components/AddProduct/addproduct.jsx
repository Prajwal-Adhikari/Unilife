import React, { useState } from "react";

export const ItemForm = ({ addItemProp }) => {
  const [Name, setName] = useState("");

  const [Price, setPrice] = useState("");
  const [description, setdescription] = useState("");

  const addItem = _=>{ 
    addItemProp({
      id: (new Date).getTime(),
      Name,
      Price,
      description,
    })
    setName('')
    setPrice('');
    setdescription('');
  } 
   

  return <div className="Data ">
      <h1>Add Item</h1>
      <div className="name">
      <input
        
        type="text"
        placeholder="Product Name"
        value={Name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      </div>
<div class="description">
      <input 
   type="text"
        placeholder="description"
        value={description}
        onChange={(event) => {
          setdescription(event.target.value);
        }}
      />
      </div>
      <div class="price">
      <input
        type="number"
        placeholder="Price"
        value={Price}
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />
       </div>
      <div className="Btn" >
        
      <input type="button" value="Add" onClick={addItem} />
      </div>
    </div>
  
};

export default ItemForm;