import React, { Component } from 'react'
import './profile.css'

class UpdateProfile extends Component {
  render() {
    return (
        <div>
<div class="container bg-white mt-5 mb-5" id='corner'>
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"/><span class="font-weight-bold">Uniuser</span><span class="text-black-50">uniuser@unimail.com.</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">User Profile</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-12"><label class="labels">Name</label><input type="text" class="form-control" placeholder="first name" value="" /></div>
                    
                </div>
                <div class="row mt-3">

                <div class="col-md-12"><label class="labels">Email</label><input type="email" class="form-control" placeholder="email" value=""/></div>

                <div class="col-md-12"><label class="labels">Password</label><input type="password" class="form-control" placeholder="password" value=""/></div>
                    
                   
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Country</label><input type="text" class="form-control" placeholder="country" value=""/></div>
                    <div class="col-md-6"><label class="labels">State/Region</label><input type="text" class="form-control" value="" placeholder="state"/></div>
                </div>
                <div class="mt-5 text-center"><button id='save_button' type="button">Update Profile</button></div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="p-3 py-5">
            <div class="col-md-12"><label class="labels">Contact</label><input type="text" class="form-control" placeholder="enter phone number" value=""/></div>

<div class="col-md-12"><label class="labels">Address</label><input type="text" class="form-control" placeholder="enter address" value=""/></div>


<div class="col-md-12"><label class="labels">Gender</label><input type="text" class="form-control" placeholder="enter gender" value=""/></div>

<div class="col-md-12"><label class="labels">Number of Hostels
</label><input type="text" class="form-control" placeholder="Number of Hostels
" value=""/></div>
<div class="col-md-12"><label class="labels">Number of Products
</label><input type="text" class="form-control" placeholder="Number of Products
" value=""/></div>

            </div>
        </div>
    </div>
</div>







</div>



    )
  }
}

export default UpdateProfile;
