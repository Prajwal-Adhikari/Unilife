import React from "react";

export const ProductListItem = ({product}) => {
   
    return <div>
        <div>{ product.name}</div>
 
        <div>{ product.price}</div>
        <div>{ product.description}</div>

        <input type="button" value="Delete" onClick={deleteItem} />
    </div>
}