import React, { useState } from "react";
import { saveProduct } from '../../redux/actions/authActions';
import { connect} from "react-redux";

export const ItemForm = ({ addItemProp }) => {
  const [Name, setName] = useState("");
  const [Price, setPrice] = useState("");
  const [Description, setDescription] = useState("");
  const [Productby, setProductby] = useState("");
  const [Imagepath, setImagepath] = useState("");
  const [Category, setCategory] = useState("");


//  const addItem = () => { 
//     const addItemProp = ({
//       // id: (new Date).getTime(),
//       Name,
//       Price,
//       Description, 
//       Productby,
//       Category,
//       Imagepath,
//     });
//     setName('');
//     setPrice('');
//     setDescription('');
//     setProductby('');
//     setCategory('');
//     setImagepath('');
//   } 
   
  addItem = e => {                  //registerSubmit -> addItem
        e.preventDefault();
        const newProducts = {
          title:this.state.title,
          productby :this.state.productby,
          description:this.state.description,
          imagepath:this.state.imagepath,
          category:this.state.category,
          price:this.state.price
        }
          this.props.saveProduct(newProducts,this.props.history);
    }



  return <div className="Data ">
      <h1>Add Item</h1>
      <div className="name">
      <input
        type="text"
        placeholder="Product Name"
        value={Name}
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      </div>

      <div class="price">
      <input
        type="number"
        placeholder="Price"
        value={Price}
        onChange={(event) => {
          setPrice(event.target.value);
        }}
      />

       </div>
       <div class="product">
      <input
        type="text"
        placeholder="Product By"
        value={Productby}
        onChange={(event) => {
          setProductby(event.target.value);
        }}
      />

        </div>
       <div class="category">
      <input
        type="text"
        placeholder="Category"
        value={Category}
        onChange={(event) => {
          setCategory(event.target.value);
        }}
      />

      <div class="description">
      <input 
        type="text"
        placeholder="Description"
        value={Description}
        onChange={(event) => {
          setDescription(event.target.value);
        }}
      />
      </div>
      
       </div>
       <div class="Image">
      <input 
        type="text"
        placeholder="Image URL"
        value={Imagepath}
        onChange={(event) => {
          setImagepath(event.target.value);
        }}
      />
      </div>
   

      <div className="Btn" >
      <input type="button" value="Add" onClick={addItemProp} />
      </div>
    </div>
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{saveProduct})(ItemForm);

// import classnames from 'classnames';
// import { saveProduct } from '../../redux/actions/authActions';
// import React, { Component } from 'react';
// import './addProduct.css';
// import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// const express = require('express');
// const jwt = require('jsonwebtoken');

// class AddProduct extends Component{
//   constructor() {
//     super();
//     this.state = {
//       title : '',
//       productby: '',
//       description : '',
//       imagepath : '',
//       category :'',
//       price : '',
//       errors: {}
//     };
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }

//   onChangeAddItem = e => {          //onChangeRegister -> onChangeAddItem
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   addItem = e => {                  //registerSubmit -> addItem
//     e.preventDefault();
//     const newProducts = {
//       title:this.state.title,
//       productby :this.state.productby,
//       description:this.state.description,
//       imagepath:this.state.imagepath,
//       category:this.state.category,
//       price:this.state.price
//     }
//       this.props.saveProduct(newProducts);
//   };

  

//   render() {
//     const { errors, description, price, productby, title,category,imagepath } = this.state;
//     return (
//       <section className="addproduct">  
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-6">
//               {/* <div className="signup-left">
//                 <h4 className="text-capitalize">
//                   To Register With Our Application You should must Put Your Own
//                   mongoURI Id in the <kbd>config/default.json</kbd>
//                 </h4>
//               </div> */}
//             </div>
//             <div className="col-lg-6">
//               <div className="addproduct-right">
//                 <h1>Add Product</h1>
//                 <form noValidate onSubmit={this.addItem}>
//                   <div class="form-row">
//                     <div class="form-group col-md-12">
//                       <label htmlFor="title">Product</label> <br />
//                       <input
//                         type="text"
//                         className="input-control"
//                         placeholder="Enter Product Name"
//                         id="title"
//                         value={title}
//                         onChange={this.onChangeAddItem}
//                         error={errors.title}
//                         className={classnames('', {
//                           invalid: errors.title
//                         })}
//                       />{' '}
//                       <br />
//                       <span className="text-danger">{errors.title}</span>
//                     </div>
//                   </div>
//                   <div class="form-row">
//                     <div class="form-group col-md-12">
//                       <label htmlFor="productby">ProductBy</label> <br />
//                       <input
//                         type="text"
//                         className="input-control"
//                         placeholder="Product By"
//                         id="productby"
//                         value={productby}
//                         onChange={this.onChangeAddItem}
//                         error={errors.productby}
//                         className={classnames('', {
//                           invalid: errors.productby
//                         })}
//                       />{' '}
//                       <br />
//                       <span className="text-danger">{errors.productby}</span>
//                     </div>
//                   </div>
//                   <div class="form-row">
//                     <div class="form-group col-md-12">
//                       <label htmlFor="description">Description</label> <br />
//                       <input
//                         type="text"
//                         className="input-control"
//                         placeholder="Description about product"
//                         id="description"
//                         value={description}
//                         onChange={this.onChangeAddItem}
//                         error={errors.description}
//                         className={classnames('', {
//                           invalid: errors.description
//                         })}
//                       />{' '}
//                       <br />   
//                       <span className="text-danger">{errors.description}</span>
//                     </div>
//                   </div>
//                   <div class="form-row">
//                     <div class="form-group col-md-12">
//                       <label htmlFor="price">Price in USD</label>
//                       <br />
//                       <input
//                         type="number"
//                         className="input-control"
//                         placeholder="Price in USD"
//                         id="price"
//                         value={price}
//                         onChange={this.onChangeAddItem}
//                         error={errors.price}
//                         className={classnames('', {
//                           invalid: errors.price
//                         })}
//                       />{' '}
//                       <br />
//                       <span className="text-danger">{errors.price}</span>
//                     </div>
//                   </div>
//                   <div class="form-row">
//                     <div class="form-group col-md-12">
//                       <label htmlFor="category">Category</label> <br />
//                       <input
//                         type="text"
//                         className="input-control"
//                         placeholder="Description about product"
//                         id="category"
//                         value={category}
//                         onChange={this.onChangeAddItem}
//                         error={errors.category}
//                         className={classnames('', {
//                           invalid: errors.category
//                         })}
//                       />{' '}
//                       <br />   
//                       <span className="text-danger">{errors.category}</span>
//                     </div>
//                   </div>
//                   <div class="form-row">
//                     <div class="form-group col-md-12">
//                       <label htmlFor="imagepath">Image URL</label> <br />
//                       <input
//                         type="url"
//                         className="input-control"
//                         placeholder="Url to image"
//                         id="imagepath"
                        // value={imagepath}
                        // onChange={this.onChangeAddItem}
//                         error={errors.imagepath}
//                         className={classnames('', {
//                           invalid: errors.imagepath
//                         })}
//                       />{' '}
//                       <br />   
//                       <span className="text-danger">{errors.imagepath}</span>
//                     </div>
//                   </div>
//                   <div class="form-row">
//                     <div class="form-group col-md-12">
//                       <button type="submit" className="btn btn-md btn-register">
//                         Add Product
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }
// }

// // Register.propTypes = {
// //   registerUser: PropTypes.func.isRequired,
// //   auth: PropTypes.object.isRequired,
// //   errors: PropTypes.object.isRequired
// // };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// // export default AddProduct;
// export default connect(mapStateToProps, { saveProduct })(withRouter(AddProduct));





