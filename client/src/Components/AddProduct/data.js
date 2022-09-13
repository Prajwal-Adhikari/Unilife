import { useState } from "react";
import { ProductListItem } from "./ProductListItem";
import FileUpload from './FileUpload/FileUpload';
import FileList from './FileList/FileList';
import'./app.css'


function App() {
    const [files, setFiles] = useState([])

  const removeFile = (filename) => {
    setFiles(files.filter(file => file.name !== filename))
  }
  useState[(Items, setItems)] = useState([]);
  const addItem = item => 
  {
    setItems([...items, item])
    alert(`${item.name} is added successfully`)
  }
  const deleteItem = item =>{
    setItems(Items.filter(itemProduct  => itemProduct.id !== product.id))
    alert(`${item.name} is removed successfully`)  
}

  return (
    <div className="data">
      <ItemForm addItemProp={addItem} />
      {
        items.map(item => <ProductListItem key={ product.id} product = {item}/>)
      }
      <div className="title">Upload file</div>
      <FileUpload files={files} setFiles={setFiles}
        removeFile={removeFile} />
      <FileList files={files} removeFile={removeFile} />
    </div>
  );
    }
