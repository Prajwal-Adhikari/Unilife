import React, { Component } from 'react';
//import './updateProfile.css';
import {saveProductChanges} from '../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

let fetch_data =[];

class UpdateProduct extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading : true,
          title:'',
          productby:'',
          stock:'',
          description:'',
          category : '',
          availability:'',
          imagepath : '',
          price : '',
          imagepath0 : '',
          imagepath1 : '',
          imagepath2 : '',
          imagepath3 : '',
          imagepath4 : '',
          errors: {}
        };
      }

    fetchData = async() => {
        fetch_data = JSON.parse(sessionStorage.getItem('updatethisProduct')) 
        this.setState({isLoading:false});
    }

    componentDidMount(){
        this.fetchData();
    }

      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };

       detailsSubmit = e => {
        this.state.imagepath0 = this.state.imagepath0===""?fetch_data.imagepath[0]:this.state.imagepath0;
        this.state.imagepath1 = this.state.imagepath1===""?fetch_data.imagepath[1]:this.state.imagepath1;
        this.state.imagepath2 = this.state.imagepath2===""?fetch_data.imagepath[2]:this.state.imagepath2;
        this.state.imagepath3 = this.state.imagepath3===""?fetch_data.imagepath[3]:this.state.imagepath3;
        this.state.imagepath4 = this.state.imagepath4===""?fetch_data.imagepath[4]:this.state.imagepath4;
       // e.preventDefault();
       if(fetch_data.availability==="No"){
        const ProductData = {
            ownerid : fetch_data.ownerid,
            hiddenid:fetch_data._id,
            title: `${this.state.title===""?fetch_data.title:this.state.title}`,
            productby: `${this.state.productby===""?fetch_data.productby:this.state.productby}`,
            stock : `${this.state.stock===""?fetch_data.stock:this.state.stock}`,
            category : `${this.state.category===fetch_data.category?fetch_data.category:this.state.category}`,
            availability : `${this.state.availability===fetch_data.availability?fetch_data.availability:this.state.availability}`,
            description : `${this.state.description===""?fetch_data.description:this.state.description}`,
            imagepath:[this.state.imagepath0,this.state.imagepath1,this.state.imagepath2,this.state.imagepath3,this.state.imagepath4],
            price : `${this.state.price===""?fetch_data.price:this.state.price}`,
            rating : fetch_data.rating,
            ratedtimes : fetch_data.ratedtimes,
            report : fetch_data.report
          };
          console.log(ProductData);
          this.props.saveProductChanges(ProductData,this.props.history); 
       }
       else{
        const ProductData = {
            ownerid : fetch_data.ownerid,
            itemId:fetch_data._id,
            title: `${this.state.title===""?fetch_data.title:this.state.title}`,
            productby: `${this.state.productby===""?fetch_data.productby:this.state.productby}`,
            stock : `${this.state.stock===""?fetch_data.stock:this.state.stock}`,
            category : `${this.state.category===""?fetch_data.category:this.state.category}`,
            availability : `${this.state.availability===""?fetch_data.availability:this.state.availability}`,
            description : `${this.state.description===""?fetch_data.description:this.state.description}`,
            imagepath:[this.state.imagepath0,this.state.imagepath1,this.state.imagepath2,this.state.imagepath3,this.state.imagepath4],
            price : `${this.state.price===""?fetch_data.price:this.state.price}`,
            rating : fetch_data.rating,
            ratedtimes : fetch_data.ratedtimes,
            report : fetch_data.report
            
          };
          console.log(ProductData);
          this.props.saveProductChanges(ProductData,this.props.history); 
       }
      };

   render() {   
    const {isLoading,title,category,stock,productby,availability,price,description,imagepath,imagepath0,imagepath1,imagepath2,imagepath3,imagepath4} = this.state;
    if(isLoading){
        console.log("is Loading");
        return null;
    }
    else{
        return (
            <div>
           <div class="container bg-white mt-5 mb-5" id='corner'>
        <div class="row">
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="row mt-3">
                    <div class="col-md-12"><label class="_labels">Title</label><input type="text" class="form-control" id="title"  placeholder={fetch_data.title} value={title} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Product By</label><input type="text" id="productby"  class="form-control" placeholder={fetch_data.productby} value={productby} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Price</label><input type="text" id="price"  class="form-control" placeholder={fetch_data.price} value={price} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Description</label><input type="text" id="description"  class="form-control" placeholder={fetch_data.description} value={description} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Stock</label><input type="text" id="stock"  class="form-control" placeholder={fetch_data.stock} value={stock} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Category</label><input type="text" id="category"  class="form-control" placeholder={fetch_data.category[0]} value={category} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Image</label>
                    <input type="text" id="imagepath0"  class="form-control" placeholder={fetch_data.imagepath[0]} value={imagepath0} onChange={this.onChange}/>
                    <input type="text" id="imagepath1"  class="form-control" placeholder={fetch_data.imagepath[1]} value={imagepath1} onChange={this.onChange}/>
                    <input type="text" id="imagepath2"  class="form-control" placeholder={fetch_data.imagepath[2]} value={imagepath2} onChange={this.onChange}/>
                    <input type="text" id="imagepath3"  class="form-control" placeholder={fetch_data.imagepath[3]} value={imagepath3} onChange={this.onChange}/>
                    <input type="text" id="imagepath4"  class="form-control" placeholder={fetch_data.imagepath[4]} value={imagepath4} onChange={this.onChange}/>
                    </div>
                    <div class="form-row">
                    <div class="form-group col-md-12">
                    <label htmlFor="availability">Availability</label> <br/>
                      <label><input type="radio" id="availability" name="myCheckbox" value="Yes" onClick={this.onChange}/>Yes</label>
                      <label><input type="radio" id="availability" name="myCheckbox" value="No" onClick={this.onChange}/>No</label>
                    </div>
                  </div>

                    </div>
                    <div class="mt-5 text-center"><button id='save_button' type="button" onClick={()=>{
                      this.detailsSubmit();
                    }}>Save Changes</button></div>
                </div>
            </div>
    </div>
   </div>
    </div>
    )
    }
   }
 }

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {saveProductChanges})(withRouter(UpdateProduct));

