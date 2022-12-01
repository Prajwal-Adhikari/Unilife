import React, { Component } from 'react';
import './admin.css';
import jwt_decode from 'jwt-decode';
import { confirm } from "react-confirm-box";

let fetch_data =[];
let delete_user = [];
let fetch_user = [];
let fetch_hostel =[];
let fetch_product = [];
let delete_hostel = [];
let delete_product = [];
const token = jwt_decode(localStorage.getItem('jwtToken'));

class adminProfile extends Component {

    constructor(props){ 
        super(props) 
            
        // Set initial state 
        this.state = {
          isLoading : true,
          name : '',
          htitle : '',
          ptitle : '',
          email : '',
          productby : '',
        }     
        // Binding this keyword 
        this.updateState = this.updateState.bind(this) 
      } 

      updateState(){ 
        // Changing state 
        this.setState({isLoading :false}) 
      } 

      onChangeAddItem = e => {        
        this.setState({ [e.target.id]: e.target.value });
      };

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
          this.updateState();
    }

    Async = ()=>{
      return new Promise((res)=>{
        setTimeout(()=>{
          res();
        },500)
      })
    }

    deleteUser = async () =>{
      delete_user = await fetch('http://localhost:5000/api/users/searchuser',{
          method : "POST",
      headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          email : this.state.email,
          id : fetch_hostel._id,
          availability : fetch_hostel.availability,
          remove : true
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
        if(delete_user==="negative"){
          window.alert("User not found");
        }
        if(delete_user===true){
          window.alert("User deleted");
        }
   }


  fetchUser = async () =>{
    fetch_user = await fetch('http://localhost:5000/api/users/searchuser',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        email : this.state.email
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
  }

    deleteHostel = async () =>{
      delete_hostel = await fetch('http://localhost:5000/api/users/searchhostel',{
          method : "POST",
      headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          id : fetch_hostel._id,
          availability : fetch_hostel.availability,
          remove : true
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
        if(delete_hostel==="negative"){
          window.alert("Hostel not found");
        }
        if(delete_hostel===true){
          window.alert("Hostel deleted");
        }
   }


  fetchHostel = async () =>{
    fetch_hostel = await fetch('http://localhost:5000/api/users/searchhostel',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        title : this.state.htitle,
        address : this.state.address
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
  }

    componentDidMount(){
        this.fetchData();
    }

    deleteProduct = async () =>{
      delete_hostel = await fetch('http://localhost:5000/api/users/searchproduct',{
          method : "POST",
      headers:{
          "Content-Type" : "application/json"
        },
        body : JSON.stringify({
          id : fetch_product._id,
          availability : fetch_hostel.availability,
          stock : fetch_product.stock,
          remove : true
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
        if(delete_product==="negative"){
          window.alert("Product not found");
        }
        if(delete_product===true){
          window.alert("Product deleted");
        }
   }


  fetchProduct = async () =>{
    fetch_product = await fetch('http://localhost:5000/api/users/searchproduct',{
        method : "POST",
    headers:{
        "Content-Type" : "application/json"
      },
      body : JSON.stringify({
        title : this.state.ptitle,
        productby : this.state.productby
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
  }

  render() {
    
    if(this.state.isLoading){
        return null;
    }

    else{
      const {address,ptitle,htitle,email,name,productby} = this.state;
        return(
            <div>
              <hr></hr>

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
                                    <div class="col-md-12"><label class="labels">Name</label>{fetch_data.name}</div>
                                    
                                </div>
                                <div class="row mt-3">
                
                                <div class="col-md-12"><label class="labels">Email</label>{fetch_data.email}</div>
                                   
                                </div>
                                <div class="row mt-3">
                                    <div class="col-md-6"><label class="labels">Country</label>{fetch_data.country}</div>
                                </div>
                                <div class="mt-5 text-center"><button id='save_button' type="button" onClick={()=>{
                                    window.location.href = '/updateprofile';
                                }}>Update Profile</button></div>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-3 py-5">
                            <div class="col-md-12"><label class="labels">Contact</label>{fetch_data.contact}</div>
                
                
                <div class="col-md-12"><label class="labels">Gender</label>{fetch_data.gender}</div>
                            </div>
                        </div>
        </div>
        </div>

        <hr id='profile_break'></hr>
          <div className="admin_contanier">

            

            <div className="delete_section">
            <label class="_labels">Delete User</label><input type="text" placeholder="Enter user email here" id="email" className="placeholder_admin" name='username' value={email} onChange={this.onChangeAddItem}/>
            <button className='search_admin_btn' onClick={async ()=>{
                this.fetchUser();
                await this.Async();
                if(fetch_user===null){
                  window.alert("User not found");
                }
                else{
                  const result = await confirm("Do you want to delete the user ?\n" + `Name: ${fetch_user.name}` + "\n" +`Email : ${fetch_user.email}`)
                  if(result){
                    this.deleteUser();
                  }
                }
            }}>Search</button>
            </div>

            <hr id='profile_break'></hr>

            <div className="delete_section">
            <label class="_labels">Delete Hostel</label><br/>
            <label className='label_heads'>Hostel Name</label>
            
            <input type="text" className="placeholder_admin"  placeholder="Enter hostel name here" id="htitle" value={htitle} name='hostelname' onChange={this.onChangeAddItem}/><br/><br/>
            <label>Hostel Address</label>
            <input type="text" placeholder="Enter address" name='hosteladdress' className="placeholder_admin"  id='address' value={address} onChange={this.onChangeAddItem}/>
            <button className='search_admin_btn' onClick={async ()=>{
                this.fetchHostel();
                await this.Async();
                if(fetch_hostel===null){
                  window.alert("Hostel not found");
                }
                else{
                  const result = await confirm("Do you want to delete this hostel ?\n" + `Name: ${fetch_hostel.title}` + "\n" +`Owner : ${fetch_hostel.ownedby}` + "\n" + `City : ${fetch_hostel.city}` + "\n" + `Address : ${fetch_hostel.address}`)
                  if(result){
                    this.deleteHostel();
                  }
                }
            }}>Search</button>
            </div>
            <hr id='profile_break'></hr>

         

            <div className="delete_section">
            <label class="_labels">Delete Product</label><br/>
            <label>Product Name</label>
            <input type="text" placeholder="Enter Product name here" className="placeholder_admin" id="ptitle" value={ptitle} name='hostelname' onChange={this.onChangeAddItem}/><br/><br/>
            <label classname="label_for_address">Product By</label>
            <input type="text" placeholder="Product by" className="placeholder_admin" name='hosteladdress' id='productby' value={productby} onChange={this.onChangeAddItem}/>
            <button className='search_admin_btn' onClick={async ()=>{
                this.fetchProduct();
                await this.Async();
                if(fetch_product===null){
                  window.alert("Product not found");
                }
                else{
                  console.log(fetch_product);
                  const result = await confirm("Do you want to delete this Product ?\n" + `Name: ${fetch_product.title}` + "\n" +`ProductBy : ${fetch_product.productby}` + "\n" + `Availability : ${fetch_product.availability}` + "\n" + `Price : ${fetch_product.price}`)
                  if(result){
                    this.deleteProduct();
                  }
                }
            }}>Search</button>
            </div>
          </div>
        </div>
        )
    }
  }
}

export default adminProfile;
