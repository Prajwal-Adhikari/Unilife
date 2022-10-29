import React, { Component } from "react";
import jwt_decode from 'jwt-decode';
import {FaCartArrowDown} from "react-icons/fa"

class viewProduct extends Component{
    state = {
        card : JSON.parse(localStorage.getItem('selectedProduct'))
    }

    cartclicked = async (itemid) => {
        const token = jwt_decode(localStorage.getItem('jwtToken'));
        const response = await fetch('http://localhost:5000/api/users/add-to-cart',{
          method : "POST",
          headers:{
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              itemId : itemid,
              quantity : 1,
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
      console.log(response);
      if(response===true){
        window.alert("Item added to Cart");
      }
      else{
        window.alert("Error 402 : Can not add item to card");
      }
    }

    render(){
        localStorage.removeItem('selectedProduct');
        return(
            <div>
                <h1>See Your Product </h1>
                <h2>{this.state.card.title}</h2>
                <img src={this.state.card.imagepath}
                alt={this.state.card.title}
                className = "img-fluid img-thumbnail rounded indvCard bg-dark"
                />
                <div class="cart-div">
                    <FaCartArrowDown class="cart-icon" onClick={()=>{
                        this.cartclicked(this.state.card._id)
                    }
                    }/>
                </div>
            </div>
        )
    }
}

export default viewProduct;