import React,{Component} from "react";
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

    //handles quantity change
    const handleChange = (item,_quantity) => {
        let ind =-1;
        for(let i=0;i<fetch_data.length;i++){
            if(fetch_data[i]._id===item._id){
                ind = i;
                break;
            }
        } 
        fetch_data[ind].quantity += _quantity ; 
        if(fetch_data[ind].quantity === 0 ) handleRemove(item);
    }

    useEffect(()=>{
        fetchData();
        handlePrice();
    })

    if(isLoading){
        console.log("Returned Null")
        return null;
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
                            <button onClick={()=>{handleChange(item,1)
                                                    handlePrice();
                                    }}>+</button>
                            <button>{item.quantity}</button>
                            <button onClick={()=>{
                                handleChange(item,-1)
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
                <div clasName="total">
                    <span>Total Price</span>
                    <span>Rs - {price}</span>
                </div>
            </section>
        )
    }
}

export default Cart;