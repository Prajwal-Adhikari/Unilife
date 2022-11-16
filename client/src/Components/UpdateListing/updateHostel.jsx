import React, { Component } from 'react';
//import './updateProfile.css';
import {saveHostelChanges} from '../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

let fetch_data =[];

class UpdateHostel extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading : true,
          title:'',
          ownedby:'',
          city:'',
          address:'',
          contact:'',
          description:'',
          category : '',
          availability:'',
          imagepath : '',
          price : '',
          errors: {}
        };
      }

    fetchData = async() => {
        fetch_data = JSON.parse(sessionStorage.getItem('updatethisHostel')) 
        this.setState({isLoading:false});
    }

    componentDidMount(){
        this.fetchData();
    }

      onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
        console.log({ [e.target.id]: e.target.value });
      };

       detailsSubmit = e => {
       // e.preventDefault();
       if(fetch_data.availability==="No"){
        const HostelData = {
            ownerid : fetch_data.id,
            hiddenid:fetch_data._id,
            title: `${this.state.title===""?fetch_data.title:this.state.title}`,
            ownedby: `${this.state.ownedby===""?fetch_data.ownedby:this.state.ownedby}`,
            city : `${this.state.city===""?fetch_data.city:this.state.city}`,
            address : `${this.state.address===""?fetch_data.address:this.state.address}`,
            contact : `${this.state.contact===""?fetch_data.contact:this.state.contact}`,
            category : `${this.state.category===fetch_data.category?fetch_data.category:this.state.category}`,
            availability : `${this.state.availability===fetch_data.availability?fetch_data.availability:this.state.availability}`,
            description : `${this.state.description===""?fetch_data.description:this.state.description}`,
            imagepath : `${this.state.imagepath===""?fetch_data.imagepath:this.state.imagepath}`,
            price : `${this.state.price===""?fetch_data.price:this.state.price}`,
            rating : fetch_data.rating,
            ratedtimes : fetch_data.ratedtimes
          };
          console.log(HostelData);
          this.props.saveHostelChanges(HostelData,this.props.history); 
       }
       else{
        const HostelData = {
            ownerid : fetch_data.id,
            id:fetch_data._id,
            title: `${this.state.title===""?fetch_data.title:this.state.title}`,
            ownedby: `${this.state.ownedby===""?fetch_data.ownedby:this.state.ownedby}`,
            city : `${this.state.city===""?fetch_data.city:this.state.city}`,
            address : `${this.state.address===""?fetch_data.address:this.state.address}`,
            contact : `${this.state.contact===""?fetch_data.contact:this.state.contact}`,
            category : `${this.state.category===""?fetch_data.category:this.state.category}`,
            availability : `${this.state.availability===""?fetch_data.availability:this.state.availability}`,
            description : `${this.state.description===""?fetch_data.description:this.state.description}`,
            imagepath : `${this.state.imagepath===""?fetch_data.imagepath:this.state.imagepath}`,
            price : `${this.state.price===""?fetch_data.price:this.state.price}`,
            rating : fetch_data.rating,
            ratedtimes : fetch_data.ratedtimes
            
          };
          console.log(HostelData);
          this.props.saveHostelChanges(HostelData,this.props.history); 
       }
      };

   render() {   
    const {isLoading,title,category,ownedby,availability,contact,city,address,price,description,imagepath} = this.state;
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
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">User Profile</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-12"><label class="_labels">Title</label><input type="text" class="form-control" id="title"  placeholder={fetch_data.title} value={title} onChange={this.onChange}/></div>
   
                    </div>
                    <div class="row mt-3">
   
                    <div class="col-md-12"><label class="_labels">Owned By</label><input type="text" id="ownedby"  class="form-control" placeholder={fetch_data.ownedby} value={ownedby} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Contact</label><input type="text" id="contact" class="form-control" placeholder={fetch_data.contact} value={contact} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">City</label><input type="text" id="city" class="form-control" placeholder={fetch_data.city} value={city} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Address</label><input type="text" id="address" class="form-control" placeholder={fetch_data.address} value={address} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Price</label><input type="text" id="price"  class="form-control" placeholder={fetch_data.price} value={price} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Description</label><input type="text" id="description"  class="form-control" placeholder={fetch_data.description} value={description} onChange={this.onChange}/></div>

                    <div class="form-row">
                    <div class="form-group col-md-12">
                    <label htmlFor="availability">Availability</label> <br/>
                      <label><input type="radio" id="availability" name="myCheckbox" value="Yes" onClick={this.onChange}/>Yes</label>
                      <label><input type="radio" id="availability" name="myCheckbox" value="No" onClick={this.onChange}/>No</label>
                    </div>
                  </div>

                  <div class="form-row">
                    <div class="form-group col-md-12">
                    <label htmlFor="availability">Category</label> <br/>
                      <label><input type="radio" id="category" name="myCheckbox2" value="Boys" onClick={this.onChange} />Boys</label>
                      <label><input type="radio" id="category" name="myCheckbox2" value="Girls" onClick={this.onChange}/>Girls</label>
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

export default connect(mapStateToProps, {saveHostelChanges})(withRouter(UpdateHostel));
