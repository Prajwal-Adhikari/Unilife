import React, { Component } from 'react';
import './admin.css';
import jwt_decode from 'jwt-decode';
import { confirm } from "react-confirm-box";


function validateForm() {
  let x = document.forms["myForm"]["fname"].value;
  if (x == "") {
    alert("Name must be filled out");
    return false;
  }
}

let fetch_data =[];
let delete_user = [];
let fetch_user = [];
const token = jwt_decode(localStorage.getItem('jwtToken'));

class adminProfile extends Component {

    constructor(props){ 
        super(props) 
            
        // Set initial state 
        this.state = {
          isLoading : true,
          name : '',
          title : '',
          email : ''
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

    componentDidMount(){
        this.fetchData();
    }

  render() {
    if(this.state.isLoading){
        return null;
    }
    else{
      const {title,email,name} = this.state;
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

            

            <div className="admin_delete">
            <label class="_labels">Delete User</label><br></br><input type="text" placeholder="Enter username here" id="email" name='username' value={email} onChange={this.onChangeAddItem}/>
            <button className='admin_search_button' onClick={async ()=>{
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
            }}>Delete</button>
            </div>

            <hr id='profile_break'></hr>

            <div className="admin_delete">
            <label class="_labels">Delete Hostel</label><br></br><input type="text" placeholder="Enter hostel name here" name='hostel'/>
            <button className='admin_search_button'>Search</button>
            </div>
            <hr id='profile_break'></hr>

            <div className="admin_delete">
            <label class="_labels">Delete Product</label><br></br><input type="text" placeholder="Enter product name here" name='product'/>
            <button className='admin_search_button'>Search</button>
            </div>


          
            


          </div>
        </div>
        )
    }
  }
}

export default adminProfile;
