import React, { Component } from "react";
import "./profile.css"
import jwt_decode from 'jwt-decode';

const token = jwt_decode(localStorage.getItem('jwtToken'));

class Profile extends Component {

    loadItems = async () => {
        const list = await fetch('http://localhost:5000/api/users/profileItems',{
          method : "POST",
          headers:{
              "Content-Type" : "application/json"
            },
            body : JSON.stringify({
              id : token.id,
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
        console.log(list);
    }

    componentDidMount(){
        this.loadItems();
    }
    render() {
            return (
         <div>
            <div className="profile_main">
		<div class="profile_info">Pesronal Info</div>
		<div class="profile_activity">Listing and purchases</div>
        </div>
	</div>
    
            )
        } 
    }


export default Profile;


