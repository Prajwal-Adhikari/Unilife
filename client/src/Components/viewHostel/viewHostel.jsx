import React, { Component } from "react";
import "./viewHostel.css";
import jwt_decode from 'jwt-decode';
import {FaFlag} from "react-icons/fa"

const token = jwt_decode(localStorage.getItem('jwtToken'));
let userRating=0;

class viewHostel extends Component{
    state = {   
        card : JSON.parse(sessionStorage.getItem('selectedHostel')),
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
            return data;
          })
          .catch(e=>{
            console.error(e.error)
          })
          this.setState({rating:userRating})
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

    reportHostel = () => {
      fetch('http://localhost:5000/api/users/reporthostel',{
        method : "POST",
        headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            id : this.state.card._id,
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

    componentDidMount(){
      this.UserRating();
    }

    render(){
        const {rating,hover} = this.state;
        return(
            <div>

                <div className="view_container">
                <div className="left-container">
                    <h1 id="details">Hostel Details</h1>
                    <img src={this.state.card.imagepath[0]}
                    alt={this.state.card.title}
                    className = "hostel-image"
                    />        
                </div>

                <div className="right-container">
			<h1>{this.state.card.title}</h1>
                    <h3>Rating : {this.state.card.rating}/5</h3>
			<div className="rating-option">
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
			<div className="description">
			<p>{this.state.card.description}</p>
			</div>
                <div classname="report" onClick={()=>{
                  window.alert("Thanks for reporting the Hostel. This hostel will be reviewed by Unilife.")
                  this.reportHostel();
                  }}>
                  <FaFlag className="report-flag"/>
					<span className="report-text">Report</span>
                </div>
                </div>

                </div>
            </div>
        )
    }
}

export default viewHostel;
