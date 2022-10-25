import React, { Component } from "react";

class viewProduct extends Component{
    state = {
        card : JSON.parse(localStorage.getItem('selectedProduct'))
    }


    render(){
        localStorage.removeItem('selectedHostel');
        return(
            <div>
                <h1>See Your Product </h1>
                <h2>{this.state.card.title}</h2>
                <img src={this.state.card.imagepath}
                alt={this.state.card.title}
                className = "img-fluid img-thumbnail rounded indvCard bg-dark"
                />
            </div>
        )
    }
}

export default viewProduct;
