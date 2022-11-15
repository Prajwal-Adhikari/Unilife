import React from 'react';
import './Dashboard.css';
import Axios from 'axios';
import { useState,useEffect } from 'react';
import {FaCartArrowDown} from "react-icons/fa"
import jwt_decode from 'jwt-decode';

function Dashboard(){
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] =  useState("");

  function openHostelTab (hostel){
    sessionStorage.setItem("selectedHostel",JSON.stringify(hostel));
    window.open(`/hostel/${hostel._id}`,'_blank');
  }

  function openProductTab(product){
    sessionStorage.setItem("selectedProduct",JSON.stringify(product));
    window.open(`/product/${product._id}`,'_blank');
  }

  const getApiData = async() => {
    try{
      const res = await Axios.get("http://localhost:5000/api/users/dashboard")
      setMyData(res.data);
    }
    catch(error){
      setIsError(error.message);
    }
  };

  useEffect(()=>{
    getApiData();
  },[]);

  const token = jwt_decode(localStorage.getItem('jwtToken'));
  const cartclicked = async (item) => {
    if(item.ownerid===token.id){
     return window.alert("Can not add your product to cart !!!");
    }
      const response = await fetch('http://localhost:5000/api/users/add-to-cart',{
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            itemId : item._id,
            quantity : 1,
            id : token.id,
            imagepath : item.imagepath,
            title : item.title,
            price : item.price,
            productby : item.productby,
            stock:item.stock
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
    else if(response==="exists"){
      window.alert("Item is already in Cart");
    }
    else{
      window.alert("Error 402 : Can not add item to card");
    }
  }

  return(
    <>
    <div class="mainImage">
      <img class="mainimg" src="https://cf.bstatic.com/xdata/images/hotel/max1024x768/144249450.jpg?k=a29ff3ae5c4ac0ccdc92c1edd205f95783234671862bac8b0ddfc187e6231072&o=&hp=1" alt="Unilife">
      </img>
      </div>
    {isError !== "" && <h2>{isError}</h2>}

    <div className = "grid">
    <div className="container-fluid mt-5">
    <div className = "row text-center">
      {
        myData.map((item)=>{
        const {_id,title,rating,imagepath,city,address,category,price,productby} = item;
        if(typeof(productby)!=="undefined"){
          return(
            <div key={_id} className = "col-md mt-5">
              <div className = "card p-2">
                <div class = "d-flex align-items-center">
                  <div class = "image" onClick={  
                      () => openProductTab(item)
                      }> <img src={imagepath} alt="" class="rounded" height="150" width="150"/> </div>
                    <div class="ml-3 w-100">
                      <h4 class = "mb-0 mt-0 textLeft" onClick={  
                      () => openProductTab(item)
                      }>{title}</h4> 
                      <span className = "textLeft">{category}</span>
                      <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                        <div class="d-flex flex-column"> <span class="price">Price</span><span class="number2">{price}</span></div>
                        <div class="d-flex flex-column"> <span class="productby">Product by</span><span class="number3">{productby}</span></div>
                        <FaCartArrowDown class="cart-icon" onClick={()=>{
                          cartclicked(item)
                        }
                        }/>
                      </div>
                      </div>
                  </div>
                </div>
              </div>
          );
        }
        else{
          return(
            <div key={_id} className = "col-md mt-5">
              <div className = "card p-2">  
                <div class = "d-flex align-items-center">
                  <div class = "image"   onClick={() => {
                        openHostelTab(item);
                      }}> <img src={imagepath} alt="" class="rounded" height="150" width="150"/> </div>
                    <div class="ml-3 w-100">
                      <h4 class = "mb-0 mt-0 textLeft" onClick={() => {
                        openHostelTab(item);
                      }}>{title}</h4> 
                      <span className = "textLeft">{address}, {city}</span>
                      <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                        <div class="d-flex flex-column"> <span class="category">Category</span><span class="number1">{category}</span></div>
                        <div class="d-flex flex-column"> <span class="price">Price</span><span class="number2">{price}</span></div>
                        <div class="d-flex flex-column"> <span class="rating">Rating</span><span class="number3">{rating}/5</span></div>
                       </div>
                    </div>
                  </div>
                </div>
              </div>
          );
        }
      })}
    </div>
    </div>
    </div>
    </>
  )
};

export default Dashboard;
