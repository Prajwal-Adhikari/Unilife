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
        hover : 0,
		review : []
    }

	getReviews = async() => {
    const reviews = await fetch('http://localhost:5000/api/users/getreview',{
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
		  // setreview(data);
		  this.setState({review: data})
		  return data;
      })
      .catch(e=>{
        console.error(e.error)
      })
	}

	addReview = async () => {
	let text = document.getElementById("review").value;
    userRating = await fetch('http://localhost:5000/api/users/addreview',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        itemId : this.state.card._id,
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
	  this.getReviews();
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
                              if(this.state.card.ownerid===token.id){
                                window.alert("Can not rate your own Hostel")
                              }
                              else{
                                this.setState({rating:index});
                                this.saveUserRating(index);
                                this.udpateRating(index);
                              }
                        }}
                        onMouseEnter={() => {
                          if(token.id!==this.state.card.ownerid)
                          {
                            this.setState({hover:index})
                          }
                        }}
                        onMouseLeave={() => {
                          if(token.id!==this.state.card.ownerid)
                          {
                            this.setState({hover:rating})
                          }
                        }}
                        >
                            <span className="star">&#9733;</span>
                        </button>
                        );
                    })}
                 </div>
				</div>
			<div className="view_description">
			<p>{this.state.card.description}</p>
			</div>
                <div classname="report" onClick={()=>{
                  if(token.id===this.state.card.ownerid){
                    window.alert("Can not report your own Hostel")
                  }
                  else{
                    window.alert("Thanks for reporting the Hostel. This hostel will be reviewed by Unilife.")
                    this.reportHostel();
                  } 
                  }}>
                  <FaFlag className="report-flag"/>
					        <span className="report-text">Report</span>
                </div>
                </div>

                </div>
		  <div className="review-section">
		  <h2>Reviews</h2>
		  <form>
				<textarea className="text-area" id='review'></textarea>
				<button className='review-button' type='submit' onClick={() => {this.addReview()}}>Submit</button>
		  </form>
			<div className="old-reviews">
			{
				this.state.review?.map(item => {
					const {_id, itemId, userId, review} = item;
					if(itemId == this.state.card._id) {
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
}

export default viewHostel;
