import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import './viewProduct.css';
import { useState,useEffect } from 'react';
const token = jwt_decode(localStorage.getItem('jwtToken'));
let userRating=0;
let card = [];
const obj = JSON.parse(sessionStorage.getItem('selectedProduct'));
card.push(obj);
let value = 1;

const ViewProduct = () => {
  const [hover,sethover] = useState(0);
  const [rating,setrating] = useState(0);
  const [quantity,setquantity] = useState(1);

  console.log(card);
  //handles quantity change
  const handleChange = async (_quantity) => {
    if(quantity===1&&_quantity===0){
      return window.alert("Can not reduce the quantity");
    }

      //increasing the quantity
      if(_quantity!==0){
        if(quantity<card[0].stock){
          value = quantity + 1;
          setquantity(value) ;
        } 
        else{
          window.alert("The maximum available qunantity from the seller for this item is " + card[0].stock);
        }
      }
      //decreasing the quantity
      if(_quantity===0){
        value = quantity - 1;
        setquantity(value) ;
      }
}


  //loads user rating for the given product
  const UserRating = async() =>{
    userRating = await fetch('http://localhost:5000/api/users/userrating',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        id : token.id,
        itemId : card[0]._id,
      }),
    })
    .then(res=> {
        if(res.ok) return res.json()
        return res.json().then(json=>Promise.reject(json))
      })
      .then((data)=>{
        return data.rating;
      })
      .catch(e=>{
        console.error(e.error)
      })
    console.log(userRating);
}

//saves user rating for the given item
const saveUserRating = async(value) =>{
    await fetch('http://localhost:5000/api/users/saveuserrating',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        id : token.id,
        itemId : card[0]._id,
        rating:value
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

//updates rating of the product
const udpateRating = async(value) =>{
    await fetch('http://localhost:5000/api/users/updaterating',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        itemId : card[0]._id,
        rating:value,
        productby:card[0].productby
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

  const cartclicked = async () => {
    if(card[0].ownerid===token.id){
      return window.alert("You can not buy your own product !!!");
    }
      const response = await fetch('http://localhost:5000/api/users/add-to-cart',{
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            itemId : card[0]._id,
            quantity : value,
            id : token.id,
            imagepath : card[0].imagepath,
            title : card[0].title,
            price : card[0].price,
            productby : card[0].productby,
            stock:card[0].stock
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
    console.log(response);
    if(response===true){
      window.alert("Item added to Cart");
    }
    else{
      window.alert("Error 402 : Can not add item to card");
    }
  } 

   //save changes when going through payment
   const saveCart = async() => {
    console.log("save-cart frotend");
    await fetch('http://localhost:5000/api/users/save-cart',{
          method : "POST",
          headers:{
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              id:token.id,
              items:card,
              quantity:value,
              buy : true
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

  useEffect(()=>{
    UserRating();
},[])

      return(
    <div className=''>
      <div className='header'>
        <h1>Product details</h1>
      </div>
      <div className='main-section'>
        <div classname='product-image'>
          <img
            src={card[0].imagepath}
            alt={card[0].title}
            className='thumbnail'
          />
        </div>
        <div className='product-details'>
          <h3>{card[0].title}</h3>
          <div className='price-rate'>
            Rs. {card[0].price}
          </div>
          <div className='description'>
            {card[0].description}
          </div>
          <div>
              <button onClick={()=>{
                  handleChange(1); 
                }}>+</button>
                <button>{quantity}</button>
                <button onClick={()=>{
                  handleChange(0);
              }}>-</button>
            </div>
          <div className='button-options'>
            <button
              className = 'buy-now'
              onClick={()=>{
                saveCart();
                 fetch('http://localhost:5000/api/users/create-checkout-session',{
                      method:"POST",
                      headers:{
                        "Content-Type" : "application/json"
                      },
                      body:JSON.stringify({
                        items:card,
                        quantity:value
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
                }}
            >
              Buy Now	
            </button>
            <button
              className = 'add-to-cart'
              onClick = {() => cartclicked()}
            >
              Add to Cart	
            </button>
          </div>

          <div className="star-rating">
            {[...Array(5)].map((star, index) => {
              index +=1;
              return (
                <button
                  type="rating_button"
                  key={index}
                  className={index <= (hover || rating) ? "on" : "off"}
                  onClick={() => {
                    setrating(index);
                    saveUserRating(index);
                    udpateRating(index);
                }}
                  onMouseEnter={() => sethover(index)}
                  onMouseLeave={() => sethover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>

        </div>
      </div>
    </div>
      )
}

export default ViewProduct;
