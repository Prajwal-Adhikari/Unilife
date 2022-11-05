import React, { Component } from "react";
import "./viewHostel.css";

class viewHostel extends Component{
    state = {   
        card : JSON.parse(localStorage.getItem('selectedHostel'))
    }

    render(){
        localStorage.removeItem('selectedHostel');
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
                </div>
            </div>
               
   
        )
    }
}

export default viewHostel;