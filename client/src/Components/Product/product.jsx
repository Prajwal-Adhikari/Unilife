import React, { Component } from "react";
import "./product.css";
import { saveOptions } from "../../redux/actions/authActions";
import classnames from 'classnames';
import { connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import { generatePath } from 'react-router-dom';

let response = [];

class Product extends Component {
    constructor() {
        super();
        this.state = {
            title: '',
            price: '',
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
        console.log("inside openTab");
        const item = localStorage.setItem("selectedProduct", JSON.stringify(element));
        console.log(item);
        window.open(`/product/${element._id}`, '_blank');
        //this.props.history.push(generatePath(`/hostel/${element._id}`))
    }

    getProducts = async () => {
        console.log("getProducts function is called");
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

    render() {
        const { errors, title, price, category } = this.state;
        try {
            return (
                <section className="productDashboard">
                    <div className="productDashboard">
                        <div className="left_container">
                            <h2>Details about Product</h2>
                            <div className="search_form">
                                <form noValidate onSubmit={this.addOption}>
                                    <div class="form-row">
                                        <label htmlFor="title">Title</label> <br />
                                        <input
                                            type="text"
                                            className="input-control"
                                            placeholder="Product Name"
                                            id="title"
                                            value={title}
                                            onChange={this.onChangeAddOptions}
                                            error={errors.title}
                                            className={classnames('', {
                                                invalid: errors.title
                                            })}
                                        />{' '}
                                        <br />
                                        <span className="text-danger">{errors.title}</span>
                                    </div>
                                    <div class="form-row">
                                        <label htmlFor="price">Price</label> <br />
                                        <input
                                            type="text"
                                            className="input-control"
                                            placeholder="Price Value"
                                            id="price"
                                            value={price}
                                            onChange={this.onChangeAddOptions}
                                            error={errors.price}
                                            className={classnames('', {
                                                invalid: errors.price
                                            })}
                                        />{' '}
                                        <br />
                                        <span className="text-danger">{errors.price}</span>
                                    </div>
                                    <div class="form-row">
                                        <label htmlFor="category">Category</label> <br />
                                        {/* <input
                                            type="text"
                                            className="input-control"
                                            placeholder="Input type of product"
                                            id="category"
                                            value={category}
                                            onChange={this.onChangeAddOptions}
                                            error={errors.category}
                                            className={classnames('', {
                                                invalid: errors.category
                                            })}
                                        />{' '} */}
                                        <select
                                            className="input-control"
                                            id="category"
                                            onChange={this.onChangeAddOptions}
                                            error={errors.category}
                                            className={classnames('', {
                                                invalid: errors.category
                                            })}
                                        >
                                            <option value="Education">Education</option>
                                            <option value="Furniture">Furniture</option>
                                            <option value="Others">Others</option>
                                        </select>
                                        <br />
                                        <span className="text-danger">{errors.category}</span>
                                    </div>
                                    <div>
                                        <button type="submit" className="searchProduct" onClick={this.getProducts}>
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>


                        <div className="right_container">
                            <h2 >List of Products</h2>
                            <div className="container-fluid mt-5">
                                <div className="row text-center">
                                    {
                                        response.map((curElem) => {
                                            return (
                                                <div key={curElem.id} className="col-10 col-md mt-5">
                                                    <div className="card p-2">
                                                        <div class="d-flex align-items-center">
                                                            <div class="image"> <img src={curElem.imagepath} alt="" class="rounded" height="150" width="150" /> </div>
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
                        </div>
                    </div>
                </section>
            )
        } catch (error) {
            alert("Fill all the details in the detail section");
            console.log(error);
            window.location.reload();
        }
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { saveOptions })(withRouter(Product));