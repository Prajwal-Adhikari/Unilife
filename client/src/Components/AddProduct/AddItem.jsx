
import { useState } from "react";


export const Item = (addItemProp) => {
  const [Name, setName] = useState("");

  const [price, setPrice] = useState("");
  const[description, setdescription] = useState("");

  const addItem = _ => addItemProp({
    id:(new Date).getTime().getTime,
    Name , price ,description
  })
  setName('');
  setPrice('');
  setdescription('');
}
  return (
    <div>
      <h1>Add Item</h1>
      <input
        type="text"
        placeholder="Product Name"
        value={Name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      
       <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(event) => {
          setdescription(event.target.value);
        }}
      />
      <input type="button" value="Add" onClick={addItem} />
    </div>
  );

