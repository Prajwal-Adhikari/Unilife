import React, { Component } from 'react'
import './profile.css'
import jwt_decode from 'jwt-decode'


let fetch_data = []
let list = []
const token = jwt_decode(localStorage.getItem('jwtToken'))

class Profile extends Component {
  constructor(props) {
    super(props)

    // Set initial state
    this.state = { isLoading: true }

    // Binding this keyword
    this.updateState = this.updateState.bind(this)
  }

  updateState() {
    // Changing state
    this.setState({ isLoading: false })
  }


  fetchData = async () => {
    fetch_data = await fetch('http://localhost:5000/api/users/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: token.id,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json()
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.error(e.error)
      })
  }

  listData = async () => {
    console.log('listData running')
    list = await fetch('http://localhost:5000/api/users/profileItems', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: token.id,
      }),
    })
      .then((res) => {
        if (res.ok) return res.json()
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.error(e.error)
      })
    console.log(list)
    this.updateState()
  }

  RemoveHostel = async(elem)=>{
    console.log("Remove called");
    await fetch("http://localhost:5000/api/users/updatehostel", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id:elem._id,
        availability:elem.availability,
        remove:true
      }),
    })
      .then((res) => {
        if (res.ok) return res.json()
        return res.json().then((json) => Promise.reject(json))
      })
      .then((data) => {
        return data
      })
      .catch((e) => {
        console.error(e.error)
      })
      this.listData();
  }

  // RemoveProduct = async(elem)=>{
  //   console.log("Remove called");
  //   await fetch("http://localhost:5000/api/users/updateproduct", {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       id:elem._id,
  //       availability:elem.availability,
  //       remove:true
  //     }),
  //   })
  //     .then((res) => {
  //       if (res.ok) return res.json()
  //       return res.json().then((json) => Promise.reject(json))
  //     })
  //     .then((data) => {
  //       return data
  //     })
  //     .catch((e) => {
  //       console.error(e.error)
  //     })
  //     this.listData();
  // }


  componentDidMount() {
    this.fetchData()
    this.listData()
  }

  render() {
    if (this.state.isLoading) {
      return null
    } else {
      return (
        <div>
          <hr></hr>

          <div class="container bg-white mt-5 mb-5" id="corner">
            <div class="row">
              <div class="col-md-3 border-right">
                <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                  <img
                    class="rounded-circle mt-5"
                    width="150px"
                    src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
                  />
                  <span class="font-weight-bold">{fetch_data.name}</span>
                  <span class="text-black-50">{fetch_data.email}</span>
                  <span> </span>
                </div>
              </div>
              <div class="col-md-5 border-right">
                <div class="p-3 py-5">
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">User Profile</h4>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12">
                      <label class="labels">Name</label>
                      {fetch_data.name}
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-12">
                      <label class="labels">Email</label>
                      {fetch_data.email}
                    </div>
                  </div>
                  <div class="row mt-3">
                    <div class="col-md-6">
                      <label class="labels">Country</label>
                      {fetch_data.country}
                    </div>
                  </div>
                  <div class="mt-5 text-center">
                    <button
                      id="save_button"
                      type="button"
                      onClick={() => {
                        window.location.href = '/updateprofile'
                      }}
                    >
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
              <div class="col-md-4">
                <div class="p-3 py-5">
                  <div class="col-md-12">
                    <label class="labels">Contact</label>
                    {fetch_data.contact}
                  </div>

                  <div class="col-md-12">
                    <label class="labels">Gender</label>
                    {fetch_data.gender}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr id="profile_break"></hr>

            <div className="listing_header">
              <div className="listing_title">
              Your Activities
              </div>
              </div>
            

            {list.map((curElem) => {
              return (
                <div className='canvas'>
                <div className='main_container'>
                  <div class="img_container">
                    <img src={curElem.imagepath} alt="" className='main_image' />
                  </div>

                  <div class="card-desc">
                    <span class="card-desc-first">
                      <strong id='card_title'>{curElem.title}</strong>

                      <div><p>Category : {curElem.category}</p></div>
                      <div><p> Rs. {curElem.price}</p></div>
                    </span>

                    <hr />

                  <div class="update_remove">
                    <button className='update' onClick={()=>{
                      if(typeof(curElem.productby)==="undefined"){
                        sessionStorage.setItem("updatethisHostel",JSON.stringify(curElem));
                          window.location.href='/updatehostel';
                      }
                      else{
                        sessionStorage.setItem("updatethisProduct",JSON.stringify(curElem));
                        window.location.href="/updateproduct";
                      }
                    }}>Update</button>
                    <button className='update' onClick={()=>{
                      if(typeof(curElem.productby)==="undefined"){
                        this.RemoveHostel(curElem);
                      }
                      else{
                        this.RemoveProduct(curElem);
                      }
                    }}>Remove</button>
                    {/* <button className='update'>Remove</button> */}
                  </div>
                  </div>
                </div>
               
                </div>
              )
            })}
          
        </div>
      )
    }
  }
}

export default Profile
