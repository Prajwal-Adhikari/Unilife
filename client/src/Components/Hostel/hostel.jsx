import React, { Component} from "react";
import "./hostel.css";
import { saveOptions } from "../../redux/actions/authActions";
import classnames from 'classnames';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";


// getHostels = async () => {
//     console.log("getHostel function is called");
//     const response = await fetch('http://localhost:5000/api/users/hostel',{
//         method : "POST",
//         headers:{
//             "Content-Type" : "application/json"
//           },
//     })
    // .then(res=> {
    //   if(res.ok) return res.json()
    //   return res.json().then(json=>Promise.reject(json))
    // })
    // .then((data)=>{
    //   console.log(data);
    //   return data;
    // })
    // .then(({ url }) => {
    //   window.location = url
    // })
    // .catch(e=>{
    //   console.error(e.error)
    // })


//     .then((response)=> {
//       response.json();
//     })
//     .then((data)=>{
//       console.log("inside data");
//       console.log(data);
//       return data;
//     })
//     .catch(e=>{
//       console.error(e.error);
//     })
//     console.log("outside from function");
//     // console.log(response);
//    //console.log(response);
// }


class Hostel extends Component{
    constructor (){
        super();
        this.state = {
            country : '',
            city : '',
            category : '',
            errors : {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }
    
      onChangeAddOptions = e => {          
        this.setState({ [e.target.id]: e.target.value });
      };
    
      addOption = e => {                  
        e.preventDefault();
        const newOption = {
          country : this.state.country,
          city : this.state.city,
          category:this.state.category,
        }
          this.props.saveOptions(newOption,this.props.history);
      };

      getHostels = async ()=> {
        console.log("getHostel function is called");
        const response = await fetch('http://localhost:5000/api/users/hostel',{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
              },
              body : JSON.stringify([]),
        })
          .then(res=> {
                if(res.ok) return res.json()
                return res.json().then(json=>Promise.reject(json))
              })
              .then((data)=>{
                console.log(data);
                return data;
              })
              // .then(({ url }) => {
              //   window.location = url
              // })
              .catch(e=>{
                console.error(e.error)
              })

        // .then((response)=> {response.json()})
        // .then((data)=>{
        //   console.log("inside data");
        //   console.log(data);
        // })
        // .catch(e=>{
        //   console.error(e.error);
        // })

        console.log("From outside of data");
        console.log(response);
    }

    componentDidMount(){
        this.getHostels();
    } 

    render (){
        const {errors,country,city,category} = this.state;
        return(
            <section className="Hosteldashboard">
            <div className="left_container">
                <h2>Yo che left section</h2>
                <div>
                    <form noValidate onSubmit={this.addOption}>
                    <div class="form-row">
                    <label htmlFor="country">Country</label> <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Country name"
                        id="country"
                        value={country}
                        onChange={this.onChangeAddOptions}
                        error={errors.country}
                        className={classnames('', {
                          invalid: errors.country
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.country}</span>
                    </div>
                    <div class="form-row">
                    <label htmlFor="city">City</label> <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="City name"
                        id="city"
                        value={city}
                        onChange={this.onChangeAddOptions}
                        error={errors.city}
                        className={classnames('', {
                          invalid: errors.city
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.city}</span>
                    </div>
                    <div class="form-row">
                    <label htmlFor="category">Category</label> <br />
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Boys or Girls"
                        id="category"
                        value={category}
                        onChange={this.onChangeAddOptions}
                        error={errors.category}
                        className={classnames('', {
                          invalid: errors.category
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.category}</span>
                    </div>
                    <div>
                    <button type="submit" className = "searchHostel" onClick={this.getHostels}>
                        Search
                    </button>
                    </div>
                    </form>
                </div>
            </div>

            
            <div className="right_container">
                <h2 >List of Available Hostels</h2>
                <div className="container-fluid mt-5">
                    <div className = "row text-center">
                        <div className = "col-10 col-md mt-5">
                            <div className = "card p-2">
                                <div class = "d-flex align-items-center">
                                    <div class = "image"> <img src="" alt="" class="rounded" width="155"/> </div>
                                    <div class="ml-3 w-100">
                                        <h4 class = "mb-0 mt-0 textLeft">Prashant Shrestha</h4> <span className = "textLeft">Web Developer</span>
                                        <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                            <div class="d-flex flex-column"> <span class="articles">Articles</span><span class="number1">38</span></div>
                                            <div class="d-flex flex-column"> <span class="followers">Followers</span><span class="number1">980</span></div>
                                            <div class="d-flex flex-column"> <span class="rating">Rating</span><span class="number1">8.9</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className = "col-10 col-md mt-5">
                            <div className = "card p-2">
                                <div class = "d-flex align-items-center">
                                    <div class = "image"> <img src=""  alt="" class="rounded" width="155"/> </div>
                                    <div class="ml-3 w-100">
                                        <h4 class = "mb-0 mt-0 textLeft">Prashant Shrestha</h4> <span className = "textLeft">Web Developer</span>
                                        <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                            <div class="d-flex flex-column"> <span class="articles">Articles</span><span class="number1">38</span></div>
                                            <div class="d-flex flex-column"> <span class="followers">Followers</span><span class="number1">980</span></div>
                                            <div class="d-flex flex-column"> <span class="rating">Rating</span><span class="number1">8.9</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                
            </section>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
//export default Hostel;
export default connect(mapStateToProps, {saveOptions})(withRouter(Hostel));