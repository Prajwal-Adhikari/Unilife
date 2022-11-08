import React from "react";
import jwt_decode from 'jwt-decode';
import './checkedOut.css';
import { useState,useEffect } from 'react';

const token = jwt_decode(localStorage.getItem('jwtToken'));
let fetch_data=[];

const CheckedOut = () => {
    const [price,setPrice] = useState();
    const [isLoading,setisLoading] = useState(true);


    const Remove = async () => {
        console.log("fetch_data")
        fetch_data = await fetch('http://localhost:5000/api/users/remove',{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                id : token.id,
                items : fetch_data
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


    //to load data from backend  
    let fetchData = async () => {
        let ans=0;
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
        fetch_data.map((item)=>(ans+=item.price*item.quantity));
        setPrice(ans);
        setisLoading(false);

    }

    useEffect(()=>{
      console.log("useEffect running");
        fetchData();
       // handlePrice();
    },[])

    //removing the cart after loading
    if(!isLoading){
        Remove();
    }

    if(isLoading){
        console.log("Returned Null")
        return null;
    }

    else{
        return(
            <section>
                <div>
                    <h3>Items Bought : </h3>
                </div>
                {
                  fetch_data.map((item)=>(
                    <div className="cart_box" key={item._id}>
                        <div className="cart_img">
                            <img src={item.imagepath}/>
                            <p>{item.title}</p>
                        </div>
                    </div>
                  ))  
                }
                
                <div className="total">
                    <span>Total Price</span>
                    <span>Rs - {price}</span>
                </div>
            </section>
        )
    }
}

export default CheckedOut;