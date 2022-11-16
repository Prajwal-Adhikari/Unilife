import React, { Component } from 'react';
//import './updateProfile.css';
import {saveHostelChanges} from '../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './updateHostel.css';

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
          imagepath0 : '',
          imagepath1 : '',
          imagepath2 : '',
          imagepath3 : '',
          imagepath4 : '',
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
        this.state.imagepath0 = this.state.imagepath0===""?fetch_data.imagepath[0]:this.state.imagepath0;
        this.state.imagepath1 = this.state.imagepath1===""?fetch_data.imagepath[1]:this.state.imagepath1;
        this.state.imagepath2 = this.state.imagepath2===""?fetch_data.imagepath[2]:this.state.imagepath2;
        this.state.imagepath3 = this.state.imagepath3===""?fetch_data.imagepath[3]:this.state.imagepath3;
        this.state.imagepath4 = this.state.imagepath4===""?fetch_data.imagepath[4]:this.state.imagepath4;
       // e.preventDefault();
       if(fetch_data.availability==="No"){
        const HostelData = {
            ownerid : fetch_data.ownerid,
            hiddenid:fetch_data._id,
            title: `${this.state.title===""?fetch_data.title:this.state.title}`,
            ownedby: `${this.state.ownedby===""?fetch_data.ownedby:this.state.ownedby}`,
            city : `${this.state.city===""?fetch_data.city:this.state.city}`,
            address : `${this.state.address===""?fetch_data.address:this.state.address}`,
            contact : `${this.state.contact===""?fetch_data.contact:this.state.contact}`,
            category : `${this.state.category===fetch_data.category?fetch_data.category:this.state.category}`,
            availability : `${this.state.availability===fetch_data.availability?fetch_data.availability:this.state.availability}`,
            description : `${this.state.description===""?fetch_data.description:this.state.description}`,
            imagepath:[this.state.imagepath0,this.state.imagepath1,this.state.imagepath2,this.state.imagepath3,this.state.imagepath4],
            price : `${this.state.price===""?fetch_data.price:this.state.price}`,
            rating : fetch_data.rating,
            ratedtimes : fetch_data.ratedtimes
          };
          console.log(HostelData);
          this.props.saveHostelChanges(HostelData,this.props.history); 
       }
       else{
        const HostelData = {
            ownerid : fetch_data.ownerid,
            id:fetch_data._id,
            title: `${this.state.title===""?fetch_data.title:this.state.title}`,
            ownedby: `${this.state.ownedby===""?fetch_data.ownedby:this.state.ownedby}`,
            city : `${this.state.city===""?fetch_data.city:this.state.city}`,
            address : `${this.state.address===""?fetch_data.address:this.state.address}`,
            contact : `${this.state.contact===""?fetch_data.contact:this.state.contact}`,
            category : `${this.state.category===""?fetch_data.category:this.state.category}`,
            availability : `${this.state.availability===""?fetch_data.availability:this.state.availability}`,
            description : `${this.state.description===""?fetch_data.description:this.state.description}`,
            imagepath:[this.state.imagepath0,this.state.imagepath1,this.state.imagepath2,this.state.imagepath3,this.state.imagepath4],
            price : `${this.state.price===""?fetch_data.price:this.state.price}`,
            rating : fetch_data.rating,
            ratedtimes : fetch_data.ratedtimes
            
          };
          console.log(HostelData);
          this.props.saveHostelChanges(HostelData,this.props.history); 
       }
      };

   render() {   
    const {isLoading,title,category,ownedby,availability,contact,city,address,price,description,imagepath,imagepath0,imagepath1,imagepath2,imagepath3,imagepath4} = this.state;
    if(isLoading){
        console.log("is Loading");
        return null;
    }
    else{
        return (
            <div>
           <div class="container" id='corner'>
        <div class="row">
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">User Profile</h4>
                    </div>
                    <div class="row mt-3">
                    <div class="title-col col-md-12"><label class="_labels">Title</label><input type="text" className="title-box" id="title"  placeholder={fetch_data.title} value={title} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Owned By</label><input type="text" id="ownedby"  class="form-control" placeholder={fetch_data.ownedby} value={ownedby} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Contact</label><input type="text" id="contact" class="form-control" placeholder={fetch_data.contact} value={contact} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">City</label><input type="text" id="city" class="form-control" placeholder={fetch_data.city} value={city} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Address</label><input type="text" id="address" class="form-control" placeholder={fetch_data.address} value={address} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Price</label><input type="text" id="price"  class="price-box form-control" placeholder={fetch_data.price} value={price} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Description</label><input type="text" id="description"  class="form-control" placeholder={fetch_data.description} value={description} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels ">Image</label>
                    <input type="text" id="imagepath0"  class="image-url form-control" placeholder={fetch_data.imagepath[0]} value={imagepath0} onChange={this.onChange}/>
                    <input type="text" id="imagepath1"  class="image-url form-control" placeholder={fetch_data.imagepath[1]} value={imagepath1} onChange={this.onChange}/>
                    <input type="text" id="imagepath2"  class="image-url form-control" placeholder={fetch_data.imagepath[2]} value={imagepath2} onChange={this.onChange}/>
                    <input type="text" id="imagepath3"  class="image-url form-control" placeholder={fetch_data.imagepath[3]} value={imagepath3} onChange={this.onChange}/>
                    <input type="text" id="imagepath4"  class="image-url form-control" placeholder={fetch_data.imagepath[4]} value={imagepath4} onChange={this.onChange}/>
                    </div>
                    <div class="radio form-row">
                    <div class="radio-opt form-group col-md-12">
                    <label htmlFor="availability">Availability</label>
                      <label><input type="radio" id="availability" name="myCheckbox" value="Yes" onClick={this.onChange}/>Yes</label>
                      <label><input type="radio" id="availability" name="myCheckbox" value="No" onClick={this.onChange}/>No</label>
                    </div>
                  </div>

                  <div class="radio form-row">
                    <div class="radio-opt form-group col-md-12">
                    <label htmlFor="availability">Category</label>
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

