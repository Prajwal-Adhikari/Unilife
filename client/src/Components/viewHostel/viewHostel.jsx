import React, { Component } from "react";
import "./viewHostel.css";
import jwt_decode from 'jwt-decode';

const token = jwt_decode(localStorage.getItem('jwtToken'));
let userRating=0;

class viewHostel extends Component{
    state = {   
        card : JSON.parse(localStorage.getItem('selectedHostel')),
        rating : 0,
        hover : 0
    }
    
    UserRating = async() =>{
        userRating = await fetch('http://localhost:5000/api/users/userrating',{
            method : "POST",
        headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            id : token.id,
            itemId : this.state.card._id,
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

    saveUserRating = async(value) =>{
        await fetch('http://localhost:5000/api/users/saveuserrating',{
            method : "POST",
        headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            id : token.id,
            itemId : this.state.card._id,
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

    udpateRating = async(value) =>{
        await fetch('http://localhost:5000/api/users/updaterating',{
            method : "POST",
        headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            itemId : this.state.card._id,
            rating:value,
            productby:this.state.card.productby
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

    render(){
        const {rating,hover} = this.state;
       // localStorage.removeItem('selectedHostel');
        return(
            <div>
                <div className="view_container">
                <div className="left">
                    <img src={this.state.card.imagepath}
                    alt={this.state.card.title}
                    className = "hostel-image"
                    />      
                </div>
                <div className="right">
                    <h1 id="details">Details about {this.state.card.title}</h1>
                  
                    
                    <h3>Rating : {this.state.card.rating}</h3>
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
                            this.setState({rating:index});
                            this.saveUserRating(index);
                            this.udpateRating(index);
                        }}
                            onMouseEnter={() => this.setState({hover:index})}
                            onMouseLeave={() => this.setState({hover:rating})}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                        );
                    })}
                 </div>
                </div>
            </div>
               
   
        )
    }
}

export default viewHostel;