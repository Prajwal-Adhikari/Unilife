import React, { Component } from "react";

class viewHostel extends Component{
    state = {
        card : JSON.parse(localStorage.getItem('selectedHostel'))
    }


    render(){
        localStorage.removeItem('selectedHostel');
        return(
            <div>
                <h1>What is going on</h1>
                <h2>{this.state.card.title}</h2>
                <img src={this.state.card.imagepath}
                alt={this.state.card.title}
                className = "img-fluid img-thumbnail rounded indvCard bg-dark"
                />
            </div>
        )
    }
}

export default viewHostel;
