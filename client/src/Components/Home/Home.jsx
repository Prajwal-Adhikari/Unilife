// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';
// import { FaNodeJs, FaReact, FaGithub } from 'react-icons/fa';
// import { DiMongodb } from 'react-icons/di';

// class Home extends Component {
//   render() {
//     return (
//       <section id="banner" className="banner">
//         <div className="container p-0">
//           <div className="row">
//             <div className="col-lg-6">
//               <div className="banner-left">
//                 <div className="test"><h1 className="text-capitalize">
//                   Welcome to
//                   <span className="text-uppercase"> Unilife</span>
                  
//                 </h1></div>
                
//                 <div className="buttons">
//                   <Link
//                     to="/login" target="_blank"
//                     className="btn btn-lg btn-outline-none border-3 btn-login"
//                   >
//                     Login
//                   </Link>
//                   <Link
//                     to="/register" target="_blank"
//                     className="btn btn-lg btn-outline-none border-3 btn-register"
//                   >
//                     Signup
//                   </Link>
//                 </div>
//               </div>
//             </div>
           
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

// export default Home;

import React from 'react';
import './Home.css';
import Axios from 'axios';
import { useState,useEffect } from 'react';
//import {FaCartArrowDown, FaCheck} from "react-icons/fa"
// import jwt_decode from 'jwt-decode';

// openHostelTab =  (element) => {
//     console.log("inside openTab");
//     const item = localStorage.setItem("selectedHostel",JSON.stringify(element));
//     console.log(item);
//     this.props.history.push(generatePath(`/hostel/${element._id}`))
// }

function Home(){
  const [myData, setMyData] = useState([]);
  const [isError, setIsError] =  useState("");

  function openHostelTab (hostel){
    localStorage.setItem("selectedHostel",JSON.stringify(hostel));
   // window.location.href = `/hostel/${hostel._id}`;
    window.open(`/hostel/${hostel._id}`,'_blank');
  }

  function openProductTab(product){
    localStorage.setItem("selectedProduct",JSON.stringify(product));
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

  //const token = jwt_decode(localStorage.getItem('jwtToken'));

  // const cartclicked = async (item) => {
  //     const response = await fetch('http://localhost:5000/api/users/add-to-cart',{
  //       method : "POST",
  //       headers:{
  //           "Content-Type" : "application/json"
  //         },
  //         body : JSON.stringify({
  //           itemId : item._id,
  //           quantity : 1,
  //           id : token.id,
  //           imagepath : item.imagepath,
  //           title : item.title,
  //           price : item.price,
  //           productby : item.productby,
  //           stock:item.stock
  //         }),
  //   })
  //     .then(res=> {
  //           if(res.ok) return res.json()
  //           return res.json().then(json=>Promise.reject(json))
  //         })
  //         .then((data)=>{
  //           return data;
  //         })
  //         .catch(e=>{
  //           console.error(e.error)
  //         })
  //   if(response===true){
  //     window.alert("Item added to Cart");
  //   }
  //   else if(response==="exists"){
  //     window.alert("Item is already in Cart");
  //   }
  //   else{
  //     window.alert("Error 402 : Can not add item to card");
  //   }
  // }

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
        const {_id,title,rating,imagepath,country,city,address,category,price,productby} = item;
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
                      <span className = "textLeft">{address},{city},{country}</span>
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

export default Home;
