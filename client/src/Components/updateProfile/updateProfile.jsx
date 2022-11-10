import React, { Component } from 'react';
import './updateProfile.css';
import jwt_decode from 'jwt-decode';
import {saveProfile} from '../../redux/actions/authActions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

let fetch_data =[];
const token = jwt_decode(localStorage.getItem('jwtToken'));

class updateProfile extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isLoading : true,
          name:'',
          email:'',
          password:'',
          gender:'',
          contact:'',
          country:'',
          errors: {}
        };
      }

      fetchData = async()=>{
        fetch_data = await fetch('http://localhost:5000/api/users/profile',{
            method : "POST",
        headers:{
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({
            id : token.id
          }),
        })
        .then(res=> {
            if(res.ok) return res.json()
            return res.json().then(json=>Promise.reject(json))
          })
          .then((data)=>{
            return data;
          })
          .catch(e=>{
            console.error(e.error)
          })
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
        e.preventDefault();
        const userData = {
          email: this.state.email,
          password: this.state.password,
          country : this.state.country,
          gender : this.state.gender,
          contact : this.state.contact,
        };
        this.props.saveProfile(userData,this.props.history); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
      };

   render() {   
    const {isLoading,name,email,password,gender,contact,country} = this.state;
    if(isLoading){
        console.log("is Loading");
        return null;
    }
    else{
        return (
            <div>
           <div class="container bg-white mt-5 mb-5" id='corner'>
        <div class="row">
            <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">{fetch_data.name}</span><span class="text-black-50">{fetch_data.email}</span><span> </span></div>
            </div>
            <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <h4 class="text-right">User Profile</h4>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-12"><label class="_labels">Name</label><input type="text" class="form-control" placeholder={fetch_data.name} value={name} onChange={this.onChange}/></div>
   
                    </div>
                    <div class="row mt-3">
   
                    <div class="col-md-12"><label class="_labels">Email</label><input type="email" class="form-control" placeholder={fetch_data.email} value={email} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Password</label><input type="password" class="form-control" placeholder={fetch_data.password} value={password} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Contact</label><input type="text" class="form-control" placeholder={fetch_data.contact} value={contact} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Country</label><input type="text" class="form-control" placeholder={fetch_data.country} value={country} onChange={this.onChange}/></div>
                    <div class="col-md-12"><label class="_labels">Gender</label><input type="text" class="form-control" placeholder={fetch_data.gender} value={gender} onChange={this.onChange}/></div>
                    </div>
                    {/* <div class="row mt-3">  
                        <div class="col-md-6"><label class="_labels">Country</label><input type="text" class="form-control" placeholder={fetch_data.country} value={country} onChange={this.onChange}/></div>
                    </div>
                    <div class="col-md-4">
                <div class="p-3 py-5">
                <div class="col-md-12"><label class="_labels">Contact</label><input type="text" class="form-control" placeholder={fetch_data.contact} value={contact} onChange={this.onChange}/></div>
   
    <div class="col-md-12"><label class="_labels">Gender</label><input type="text" class="form-control" id="gender" placeholder={fetch_data.gender} value={gender} onChange={this.onChange}/></div>
   
                </div>
                </div> */}
                    <div class="mt-5 text-center"><button id='save_button' type="button">Save Changes</button></div>
                </div>
            </div>
    </div>
   </div>
    </div>
    )
    }
   }
 }

// updateProfile.propTypes = {
//     registerUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired,
//     errors: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {saveProfile})(withRouter(updateProfile));


//export default updateProfile;