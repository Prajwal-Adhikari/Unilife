import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import './viewProduct.css';
import { useState,useEffect } from 'react';
import { saveReview } from '../../redux/actions/authActions';
import {FaFlag} from "react-icons/fa"

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
  const [review, setreview] = useState();
	let reviews = [];

	const getReviews = async() => {
    reviews = await fetch('http://localhost:5000/api/users/getreview',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
    })
    .then(res=> {
        if(res.ok) return res.json()
        return res.json().then(json=>Promise.reject(json))
      })
      .then((data)=>{
		  setreview(data);
		  return data;
      })
      .catch(e=>{
        console.error(e.error)
      })
	}

	const addReview = async () => {
	let text = document.getElementById("review").value;
    userRating = await fetch('http://localhost:5000/api/users/addreview',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        itemId : card[0]._id,
		userId : token.name,
		review : text
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
	};

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
        return data;
      })
      .catch(e=>{
        console.error(e.error)
      }) 
      setrating(userRating);
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

  const reportProduct = () => {
    fetch('http://localhost:5000/api/users/reportproduct',{
      method : "POST",
      headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          id : card[0]._id,
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
	  getReviews();
  },[])

      return(
    <div className=''>
      <div className='header'>
        <h1>Product details</h1>
      </div>
      <div className='main-section'>
        <div classname='product-image'>
          <img
            src={card[0].imagepath[0]}
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
              <button className="change_quantity"
                onClick={()=>{
                  handleChange(1); 
                }}>+</button>
                <button className="change_quantity">{quantity}</button>
                <button className="change_quantity" onClick={()=>{
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
          <div>
            <h3>Rating : {card[0].rating}/5</h3>
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
                  onMouseEnter={() => sethover()}
                  onMouseLeave={() => sethover(rating)}
                >
                  <span className="star">&#9733;</span>
                </button>
              );
            })}
          </div>  

          <div classname="report">
           <FaFlag classname="report-flag" title="Report" onClick={()=>{
              window.alert("Thanks for reporting the product. This product will be reviewed by Unilife.")
              reportProduct();
           }}/>
          </div>

        </div>
      </div>
		  <div className="review-section">
		  <h2>Reviews</h2>
		  <form>
				<textarea className="text-area" id='review'></textarea>
				<button className='review-button' type='submit' onClick={addReview}>Submit</button>
		  </form>
			<div className="old-reviews">
			{
				review?.map(item => {
					const {_id, itemId, userId, review} = item;
					if(itemId == card[0]._id) {
						return(
							<div className='review-box' key={_id}>
							<div className='reviewer'>{userId}</div>
							<div className='review'>{review}</div>
							</div>
						)
					}
				})
			}
			</div>
		  </div>
    </div>
      )
}

export default ViewProduct;
