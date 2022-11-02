import React, { Component } from "react";

class viewHostel extends Component{
    state = {
        card : JSON.parse(localStorage.getItem('selectedHostel'))
    }

    render(){
        localStorage.removeItem('selectedHostel');
        return(
            <div>
                <h1>Details about Hostel</h1>
                <h2>{this.state.card.title}</h2>
                <img src={this.state.card.imagepath}
                alt={this.state.card.title}
                className = "img-fluid img-thumbnail rounded indvCard bg-dark"
                />
                <h3>Rating : {this.state.card.rating}</h3>
            </div>
        )
    }
}

export default viewHostel;
