import React, { Component} from "react";
import "./hostel.css";
import { saveOptions } from "../../redux/actions/authActions";
import classnames from 'classnames';
import {connect} from 'react-redux';
import { withRouter } from "react-router-dom";
import Axios from "axios";

let response = [];

class Hostel extends Component{
    constructor (){
        super();
        this.state = {
            country : '',
            isLoading : true,
            city : '',
            _category : '',
            rating : 0,
            hover : 0,
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

      getApiData = async() => {
        try{
          const res = await Axios.get("http://localhost:5000/api/users/loadhostel")
          response = res.data;
          this.setState({isLoading:false})
        }
        catch(e){
          console.log(e);
        }
      };

    
      onChangeAddOptions = e => {          
        this.setState({ [e.target.id]: e.target.value });
      };
    
      addOption = e => {                  
        e.preventDefault();
        const newOption = {
          city : this.state.city,
          category:this.state._category,
        }
          this.props.saveOptions(newOption,this.props.history);
      };

      openTab = (element) => {
        element.rating = Math.floor(element.rating) > 5 ? 5 : Math.floor(element.rating);
        sessionStorage.setItem("selectedHostel",JSON.stringify(element));
        window.open(`/hostel/${element._id}`,'_blank');
      }

      getHostels = async ()=> {
        console.log("getHostel function is called");
        response = await fetch('http://localhost:5000/api/users/hostel',{
            method : "POST",
            headers:{
                "Content-Type" : "application/json"
              },
              body : JSON.stringify({
                city : this.state.city,
                category : this.state._category,
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
      this.getApiData();
    }

    render (){
        const {errors,country,city,category,rating,hover,isLoading} = this.state;
        if(isLoading){
          return null;
        }
        else{
          try{
            return(
            <section className="hostelDashboard">
            <div className="left_container">
                    <form className="form-hostel" noValidate onSubmit={this.addOption}>
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
                      <input
                        type="text"
                        className="input-control"
                        placeholder="Boys or Girls"
                        id="_category"
                        value={category}
                        onChange={this.onChangeAddOptions}
                        error={errors.category}
                        className={classnames('', {
                          invalid: errors.category
                        })}
                      />{' '}
                      <span className="text-danger">{errors.category}</span>
                    <button type="submit" className = "searchHostel" onClick={this.getHostels}>
                        Search
                    </button>
                    </form>
            </div>

            
            <div className="right_container">
                <div className="container-fluid mt-5">
                    <div className = "row text-center">
                        {
                          response.map((curElem)=>{
                            return(
                              <div  key={curElem.id} className = "col-10 col-md mt-5">
                            <div className = "card p-2">
                                <div class = "d-flex align-items-center">
                                    <div class = "image"> <img src={curElem.imagepath[0]} alt="" class="rounded" height="150" width="150"/> </div>
                                    <div class="ml-3 w-100">
                                        <h4 class = "mb-0 mt-0 textLeft" onClick={  
                                           ()=> this.openTab(curElem)
                                          }>{curElem.title}</h4> {/*onClick={openTab(curElem._id)} */}
                                        <span className = "textLeft">{curElem.address},{curElem.city}</span>
                                        <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                                            <div class="d-flex flex-column"> <span class="category">Category</span><span class="number1">{curElem.category}</span></div>
                                            <div class="d-flex flex-column"> <span class="price">Price</span><span class="number2">{curElem.price}</span></div>
                                            <div class="d-flex flex-column"> <span class="rating">Rating</span><span class="number3">{curElem.rating}/5</span></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            )
                          })
                        }
                    </div>
                </div>
            </div>  
            </section>
            )
          } catch (error) {
            alert("Fill all the details in the detail section");
            console.log(error);
            window.location.reload();
          }
        }
          
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

export default connect(mapStateToProps, {saveOptions})(withRouter(Hostel));
