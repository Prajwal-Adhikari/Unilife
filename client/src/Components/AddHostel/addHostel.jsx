import React, { Component } from 'react';
import './addHostel.css';
import { withRouter } from 'react-router-dom';
import { saveHostel } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import classnames from 'classnames';


class AddHostel extends Component{
  constructor() {
    super();
    this.state = {
      title : '',
      ownedby: '',
      latitude : '',
      longitude : '',
      description : '',
      imagepath : '',
      category :'',
      price : '',
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

  onChangeAddItem = e => {          
    this.setState({ [e.target.id]: e.target.value });
  };

  addItem = e => {                  
    e.preventDefault();
    const newHostel = {
      title:this.state.title,
      ownedby :this.state.ownedby,
      latitude : this.state.latitude,
      longitude : this.state.longitude,
      description:this.state.description,
      imagepath:this.state.imagepath,
      category:this.state.category,
      price:this.state.price
    }
      this.props.saveHostel(newHostel,this.props.history);
  };

  
  render() {
    const { errors, description, price, ownedby,latitude,longitude, title,category,imagepath } = this.state;
    return (
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="addproduct-title">
                <h1>Add Your Hostel</h1>
                <form noValidate onSubmit={this.addItem}>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="title">Hostel</label> <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Enter Hostel Name"
                        id="title"
                        value={title}
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
                      <label htmlFor="productby">OwnedBy</label> <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Owned By"
                        id="ownedby"
                        value={ownedby}
                        onChange={this.onChangeAddItem}
                        error={errors.ownedby}
                        className={classnames('', {
                          invalid: errors.ownedby
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.ownedby}</span>
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
                      <label htmlFor="price">Latitude</label>
                      <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Latitude"
                        id="latitude"
                        value={latitude}
                        onChange={this.onChangeAddItem}
                        error={errors.latitude}
                        className={classnames('', {
                          invalid: errors.latitude
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.latitude}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="price">Longitude</label>
                      <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Longitude"
                        id="longitude"
                        value={longitude}
                        onChange={this.onChangeAddItem}
                        error={errors.longitude}
                        className={classnames('', {
                          invalid: errors.longitude
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.longitude}</span>
                    </div>
                  </div>
                  <div class="form-row">
                    <div class="form-group col-md-12">
                      <label htmlFor="price">Price in USD ( Monthly )</label>
                      <br />
                      <input
                        type="number"
                        className="input-control"
                        placeholder="Price in USD"
                        id="price"
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
                      <label htmlFor="category">Category</label> <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Description about product"
                        id="category"
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
                        placeholder="Url to image"
                        id="imagepath"
                        value={imagepath}
                        onChange={this.onChangeAddItem}
                        error={errors.imagepath}
                        className={classnames('', {
                          invalid: errors.imagepath
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
                      <p><input type="checkbox" id="onlyChoice" name="confirm" value="confirming" required="required"
                      onChange="document.getElementById('addProduct').disabled=!this.checked;"
                      />By clicking this you agree to the terms and conditions of Unilife and will be found guilty for any misbehaves caused by your product.</p>
                      <button type="submit" id="addProduct" className="btn additem">
                        Add Hostel
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
export default connect(mapStateToProps, {saveHostel})(withRouter(AddHostel));





