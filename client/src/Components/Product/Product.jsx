import React, { Component} from "react";
import { saveOptions } from "../../redux/actions/authActions";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { generatePath } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Axios from 'axios';
import "./Product.css";

let response = [];

class Product extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            price: "Low to High",
            isLoading : true,
            category: '',
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    }

    getApiData = async() => {
        try{
          const res = await Axios.get("http://localhost:5000/api/users/loadproduct")
          response = res.data;
          console.log(response);
          this.setState({isLoading:false})
        }
        catch(error){
            console.log(error);
        }
      };

    onChangeAddOptions = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    addOption = e => {
        e.preventDefault();
        const newOption = {
            title: this.state.title,
            price: this.state.price,
            category: this.state.category,
        }
        this.props.saveOptions(newOption, this.props.history);
    };

    openTab = (element) => {
        element.rating = Math.floor(element.rating) > 5 ? 5 : Math.floor(element.rating);
        sessionStorage.setItem("selectedProduct", JSON.stringify(element));
        window.open(`/product/${element._id}`, '_blank');
    }

    getProducts = async () => {
        response = await fetch('http://localhost:5000/api/users/product', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: this.state.title,
                price: this.state.price,
                category: this.state.category,
            }),
        })
            .then(res => {
                if (res.ok) return res.json()
                return res.json().then(json => Promise.reject(json))
            })
            .then((data) => {
                return data;
            })
            .catch(e => {
                console.error(e.error)
            })
    }

    componentDidMount(){
        this.getApiData();
    }

    render() {
        const { errors, isLoading, title, price, category } = this.state;
        if(isLoading){
            return null;
        }
        else{
            try {
                return (
                    <div className='dashboard'>
                        <div className='top-container'>
                            <form
                                noValidate
                                className='searchForm'
                                onSubmit={this.addOption}
                            >
                                <select
                                    name='category'
                                    className='category-list'
                                    id='category'
                                    onChange={this.onChangeAddOptions}
                                >
                                    <option value="All">All</option>
                                    <option value="Fashion">Fashion</option>
                                    <option value="Books">Books</option>
                                    <option value="Electronics">Electronics</option>
                                    <option value="Household">Household</option>
                                    <option value="Sports">Sports</option>
                                    <option value="Crafts">Crafts</option>
                                    <option value="Furniture">Furniture</option>
                                    <option value="Others">Others</option>
                                </select>
                                <input
                                    type='text'
                                    className='searchbar'
                                    id='title'
                                    onChange={this.onChangeAddOptions}
                                    placeholder='Search for products'
                                />
                                <select
                                    name='match'
                                    className='pricebar'
                                    id='price'
                                    onChange={this.onChangeAddOptions}
                                >
                                    <option value="Low to High">Price: Low to High</option>
                                    <option value="High to Low">Price: High to Low</option>
                                </select>
                                <button
                                    type='submit'
                                    className='submit-button'
                                    onClick={this.getProducts}
                                >
                                    <FaSearch />
                                </button>
                            </form>
                        </div>
                            <div className='bottom-container'>
                                {
                                    response.map((curElem) => {
                                        return (
                                            <div key={curElem.id} className="col-10 col-md mt-5">
                                                <div className="product-card p-2">
                                                    <div class="d-flex align-items-center">
                                                        <div class="image"> <img src={curElem.imagepath[0]} alt="" class="rounded" height="150" width="150" /> </div>
                                                        <div class="ml-3 w-100">
                                                            <h4 class="mb-0 mt-0 textLeft" onClick={
                                                                () => this.openTab(curElem)
                                                            }>{curElem.title}</h4> {/*onClick={openTab(curElem._id)} */}
                                                            <span className="textLeft">{curElem.productby}</span>
                                                            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                                                <div class="d-flex flex-column"> <span class="category">Category</span><span class="number1">{curElem.category}</span></div>
                                                                <div class="d-flex flex-column"> <span class="price">Price</span><span class="number2">{curElem.price}</span></div>
                                                                <div class="d-flex flex-column"> <span class="rating">Rating</span><span class="number3">{curElem.rating}/5</span></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            
                        </div>
                    </div>
                )
            } catch (error) {
                alert("Fills all the details in the detail section");
                window.location.reload(false);
            }
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { saveOptions })(withRouter(Product));
