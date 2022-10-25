import React from 'react';
import './Dashboard.css';
import Axios from 'axios';
import { useState,useEffect } from 'react';

function Dashboard(){

  const [myData, setMyData] = useState([]);
  const [isError, setIsError] =  useState("");

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

  return(
    <>
    <div class="mainImage">
      <img class="mainimg" src="https://english.onlinekhabar.com/wp-content/uploads/2018/06/Wander-Thirst-2.jpg" alt="Unilife">
      </img>
      </div>
    {isError !== "" && <h2>{isError}</h2>}

    <div className = "grid">
    <div className="container-fluid mt-5">
    <div className = "row text-center">
      {
        myData.map((item)=>{
        const {_id,title,imagepath,country,city,address,category,price,ownedby,productby} = item;
        if(typeof(productby)!=="undefined"){
          return(
            <div key={_id} className = "col-md mt-5">
              <div className = "card p-2">
                <div class = "d-flex align-items-center">
                  <div class = "image"> <img src={imagepath} alt="" class="rounded" height="150" width="150"/> </div>
                    <div class="ml-3 w-100">
                      <h4 class = "mb-0 mt-0 textLeft" onClick={  
                      ()=> this.openTab(item)
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
                  <div class = "image"> <img src={imagepath} alt="" class="rounded" height="150" width="150"/> </div>
                    <div class="ml-3 w-100">
                      <h4 class = "mb-0 mt-0 textLeft" onClick={  
                      ()=> this.openTab(item)
                      }>{title}</h4> 
                      <span className = "textLeft">{address},{city},{country}</span>
                      <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                        <div class="d-flex flex-column"> <span class="category">Category</span><span class="number1">{category}</span></div>
                        <div class="d-flex flex-column"> <span class="price">Price</span><span class="number2">{price}</span></div>
                        <div class="d-flex flex-column"> <span class="ownedby">Owned by</span><span class="number3">{ownedby}</span></div>
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

