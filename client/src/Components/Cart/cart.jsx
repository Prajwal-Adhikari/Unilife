import React from "react";
import jwt_decode from 'jwt-decode';
import './cart.css';
import { useState,useEffect } from 'react';

const token = jwt_decode(localStorage.getItem('jwtToken'));
let fetch_data=[];

const Cart = () => {
    const [price,setPrice] = useState();
    const [isLoading,setisLoading] = useState(true);

    //to load data from backend  
    let fetchData = async () => {
        fetch_data = await fetch('http://localhost:5000/api/users/load-cart',{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                id : token.id,
              }),
        })
          .then(res=> {
                if(res.ok) return res.json()
                return res.json().then(json=>Promise.reject(json))
              })
              .then((data)=>{
                return data;
              })
              .catch(e=>{
                console.error(e.error)
              })
        setisLoading(false);
        handlePrice();
    }

    const handleRemove = async (elems) => {
        const arr = fetch_data.filter((item) => item._id !== elems._id);
        fetch_data = arr;
        handlePrice();
        fetch_data = await fetch('http://localhost:5000/api/users/remove-from-cart',{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                id : token.id,
                _id: elems._id
              }),
        })
          .then(res=> {
                if(res.ok) return res.json()
                return res.json().then(json=>Promise.reject(json))
              })
              .then((data)=>{
                return data;
              })
              .catch(e=>{
                console.error(e.error)
              })
        fetchData();
    }

    const handlePrice = () => {
        let ans = 0;
        fetch_data.map((item)=>(ans+=item.price*item.quantity));
        setPrice(ans);
    }

    //save changes when going through payment
    const saveCart = async() => {
      console.log("save cart")
      await fetch('http://localhost:5000/api/users/save-cart',{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                items:fetch_data,
                buycart:true
              }),
        })
          .then(res=> {
                if(res.ok) return res.json()
                return res.json().then(json=>Promise.reject(json))
              })
              .then((data)=>{
                return data;
              })
              .catch(e=>{
                console.error(e.error)
              })
    }

    //handles quantity change
    const handleChange = async (item,_quantity) => {
        let ind = fetch_data.findIndex((obj)=>{
          return obj._id===item._id;
        });

        //item found
        if(ind!==-1){
          //increasing the quantity
          if(_quantity!==0){
            if(item.quantity<item.stock){
              fetch_data[ind].quantity ++ ;
            } 
            else{
              window.alert("The maximum available qunantity from the seller for this item is " + item.stock);
            }
          }
          //decreasing the quantity
          if(_quantity===0){
            fetch_data[ind].quantity--;
            //removing the item when quantity becomes zero
            if(fetch_data[ind].quantity === 0 ) {
              handleRemove(item);
            }
          }
        }
        //item not found
        else{
          window.alert("Could not delete the item from cart");
        }
    }

    useEffect(()=>{
        fetchData();
        handlePrice();
    },[])

    if(isLoading){
        return null;
    }

    else if(fetch_data.length===0){
      return(
        <h1>Nothing in the cart</h1>
      )
    }

    else{
        return(
            <section>
                {
                  fetch_data.map((item)=>(
                    <div className="cart_box" key={item._id}>
                        <div className="cart_img">
                            <img src={item.imagepath}/>
                            <p>{item.title}</p>
                        </div>
                        <div>
                            <button onClick={()=>{
                              handleChange(item,1); 
                              handlePrice();
                                    }}>+</button>
                            <button>{item.quantity}</button>
                            <button onClick={()=>{
                                handleChange(item,0);
                                handlePrice();
                              }}>-</button>
                        </div>
                        <div>
                            <span>{item.price}</span>
                            <button onClick={()=>
                                {   handleRemove(item);
                                }
                                }>Remove</button>
                        </div>
                    </div>
                  ))  
                }
                
                <div className="total">
                    <span>Total Price</span>
                    <span>Rs - {price}</span>
                </div>

                <div className="checkout_button">
                          <button  className="checkoutTOpayment" onClick={()=>{
                            saveCart();
                             fetch('http://localhost:5000/api/users/create-checkout-session',{
                                  method:"POST",
                                  headers:{
                                    "Content-Type" : "application/json"
                                  },
                                  body:JSON.stringify({
                                    items: fetch_data,
                                  }),
                                })
                                .then(res=> {
                                  if(res.ok) return res.json()
                                  return res.json().then(json=>Promise.reject(json))
                                })
                                .then(({ url }) => {
                                  window.location = url
                                })
                                .catch(e=>{
                                  console.error(e.error)
                                })
                            }}>
                            Checkout
                        </button>
                        </div>
            </section>
        )
    }
}

export default Cart;