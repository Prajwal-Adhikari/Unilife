import React, { Component } from 'react';
import './addProduct.css';
import { withRouter } from 'react-router-dom';
import { saveProduct } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import classnames from 'classnames';
import jwt_decode from 'jwt-decode';

const token = jwt_decode(localStorage.getItem('jwtToken'));

class AddProduct extends Component{
  constructor() {
    super();
    this.state = {
      _title : '',
      productby: '',
      description : '',
      imagepath : [],
      imagepath0 : '',
      imagepath1 : '',
      imagepath2 : '',
      imagepath3 : '',
      imagepath4 : '',
      _category :'',
      _price : '',
      availability : '',
      stock : '',
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

  onChangeAddItem = e => {          //onChangeRegister -> onChangeAddItem
    this.setState({ [e.target.id]: e.target.value });
  };

  addItem = e => {                  //registerSubmit -> addItem
    e.preventDefault();
    const newProducts = {
      title:this.state._title,
      ownerid:token.id,
      productby :this.state.productby,
      description:this.state.description,
      imagepath:[this.state.imagepath0,this.state.imagepath1,this.state.imagepath2,this.state.imagepath3,this.state.imagepath4],
      category:this.state._category,
      price:this.state._price,
      availability :this.state.availability,
      stock:this.state.stock
    }
      this.props.saveProduct(newProducts,this.props.history);
  };

  
  render() {
    const { errors, description, price, productby, _title,stock,category,imagepath,imagepath0,imagepath1,imagepath2,imagepath3,imagepath4 } = this.state;
    return (
      <div className="containerProduct">
      <div className="_row">
        <div className="col-lg-6">
          <div className="addproduct-_title">
            <h1 className='add_product__title'>Add Product</h1>
            <form noValidate onSubmit={this.addItem}>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label htmlFor="_title">Product</label> <br />
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Enter Product Name"
                    id="_title"
                    value={_title}
                    onChange={this.onChangeAddItem}
                    error={errors.title}
                    className={classnames('', {
                      invalid: errors.title
                    })}
                  />{' '}
                  <br />
                  <span className="text-danger">{errors.title}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label htmlFor="productby">ProductBy</label> <br />
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Product By"
                    id="productby"
                    value={productby}
                    onChange={this.onChangeAddItem}
                    error={errors.productby}
                    className={classnames('', {
                      invalid: errors.productby
                    })}
                  />{' '}
                  <br />
                  <span className="text-danger">{errors.productby}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label htmlFor="description">Description</label> <br />
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Description about product"
                    id="description"
                    value={description}
                    onChange={this.onChangeAddItem}
                    error={errors.description}
                    className={classnames('', {
                      invalid: errors.description
                    })}
                  />{' '}
                  <br />   
                  <span className="text-danger">{errors.description}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label htmlFor="price">Price</label>
                  <br />
                  <input
                    type="number"
                    className="input-control"
                    placeholder="Price in USD"
                    id="_price"
                    value={price}
                    onChange={this.onChangeAddItem}
                    error={errors.price}
                    className={classnames('', {
                      invalid: errors.price
                    })}
                  />{' '}
                  <br />
                  <span className="text-danger">{errors.price}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label htmlFor="category">Stock</label> <br />
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Available quantity"
                    id="stock"
                    value={stock}  
                    onChange={this.onChangeAddItem}
                    error={errors.stock}
                    className={classnames('', {
                      invalid: errors.stock
                    })}
                  />{' '}
                  <br />   
                  <span className="text-danger">{errors.stock}</span>
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label htmlFor="category">Category</label> <br />
                  <input
                    type="text"
                    className="input-control"
                    placeholder="Description about product"
                    id="_category"
                    value={category}  
                    onChange={this.onChangeAddItem}
                    error={errors.category}
                    className={classnames('', {
                      invalid: errors.category
                    })}
                  />{' '}
                  <br />   
                  <span className="text-danger">{errors.category}</span>
                </div>
              </div>
              <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="imagepath">Image URL</label> <br />
                      <input
                        type="url"
                        className="input-control"
                        placeholder="Url to image ( Main Image )"
                        id="imagepath0"
                        value={imagepath0}
                        onChange={this.onChangeAddItem}
                        error={errors.imagepath0}
                        className={classnames('', {
                          invalid: errors.imagepath0
                        })}
                      />{' '}

                      <input
                        type="url"
                        className="input-control"
                        placeholder="Url to image"
                        id="imagepath1"
                        value={imagepath1}
                        onChange={this.onChangeAddItem}
                        error={errors.imagepath1}
                        className={classnames('', {
                          invalid: errors.imagepath1
                        })}
                      />{' '}
                      <input
                        type="url"
                        className="input-control"
                        placeholder="Url to image"
                        id="imagepath2"
                        value={imagepath2}
                        onChange={this.onChangeAddItem}
                        error={errors.imagepath2}
                        className={classnames('', {
                          invalid: errors.imagepath2
                        })}
                      />{' '}
                      <input
                        type="url"
                        className="input-control"
                        placeholder="Url to image"
                        id="imagepath3"
                        value={imagepath3}
                        onChange={this.onChangeAddItem}
                        error={errors.imagepath3}
                        className={classnames('', {
                          invalid: errors.imagepath3
                        })}
                      />{' '}
                      <input
                        type="url"
                        className="input-control"
                        placeholder="Url to image"
                        id="imagepath4"
                        value={imagepath4}
                        onChange={this.onChangeAddItem}
                        error={errors.imagepath4}
                        className={classnames('', {
                          invalid: errors.imagepath4
                        })}
                      />{' '}


                      <br />   
                      <span className="text-danger">{errors.imagepath}</span>
                    </div>
                  </div>
              {/* <div class="confirm"> */}
              {/* </div> */}

              <div class="form-row">
                    <div class="form-group col-md-12">
                    <label htmlFor="availability">Availability</label> <br/>
                      <label><input type="radio" id="availability" name="myCheckbox" value="Yes" onClick={this.onChangeAddItem}/>Yes</label>
                      <label><input type="radio" id="availability" name="myCheckbox" value="No" onClick={this.onChangeAddItem}/>No</label>
                    </div>
               </div>

              <div class="form-row">  
                <div class="form-group col-md-12">
                  <p><input type="checkbox" id="onlyChoice" name="confirm" value="confirming" required="required"
                  onChange="document.getElementById('addProduct').disabled=!this.checked"/>
                  By clicking this you agree to the terms and conditions of Unilife and will be found guilty for any misbehaves caused by your product.</p>
                  <button type="submit" id="addProduct" className="btn additem">
                    Add Product
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
// export default AddProduct;
export default connect(mapStateToProps, {saveProduct})(withRouter(AddProduct));




