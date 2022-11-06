import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { Link, Redirect } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'
import { useState } from 'react';
import './Navbar.css';

// import {useContext} from 'react';
// import { UserContext } from "../../App";


class Navbar extends Component {
  constructor() {
    super();
    this.state = {
     isNavExpanded : false
    }
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  toogleNav = () => {
    this.setState({
      isNavExpanded : !this.state.isNavExpanded
    })
  }

  hideNav = () => {
    this.setState({
      isNavExpanded: false
    })
  }
  
  render() {
      return (
        // <nav class="navbar navbar-expand-md navbar-dark ">
        //   <div className="container">
        //     <Link class="navbar-brand border-none" to="/">
        //       <p className='logo'>Unilife</p>
        //     </Link>
        //     <button
        //       class="navbar-toggler d-lg-none"
        //       type="button"
        //       data-toggle="collapse"
        //       data-target="#collapsibleNavId"
        //       aria-controls="collapsibleNavId"
        //       aria-expanded="false"
        //       aria-label="Toggle navigation"
        //     >
        //       <span class="navbar-toggler-icon"></span>
        //     </button>
        //     <div class="collapse navbar-collapse" id="collapsibleNavId">
        //       <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
        //         {/* <li class="nav-item active">
        //           <Link class="nav-link" to="#">
        //             Home <span class="sr-only">(current)</span>
        //           </Link>
        //         </li> */}
        //         <li class="nav-item">
        //           <Link
        //             className="nav-link btn btn-links button-outline-none"
        //             to="/addhostel"
        //           >
        //             Add Hostel
        //           </Link>
        //         </li>

        //         <li class="nav-item"> 
        //           <Link
        //             className="nav-link btn btn-links button-outline-none"
        //             to="/additems"
        //           >
        //             Add Product
        //           </Link>
        //         </li>

        //         <li class="nav-item">
        //           <Link
        //             className="nav-link btn btn-links button-outline-none"
        //             to="/hostel"
        //           >
        //             Search Hostel
        //           </Link>
        //         </li>

        //         <li class="nav-item">
        //           <Link
        //             className="nav-link btn btn-links button-outline-none"
        //             to="/product"
        //           >
        //             Search Product
        //           </Link>
        //         </li>

        //         <li class="nav-item">
        //           <Link
        //             className="nav-link btn btn-login button-outline-none"
        //             to="/login"
        //           >
        //             Login
        //           </Link>
        //         </li>

        //         <li class="nav-item">
        //         <button
        //           onClick={this.onLogoutClick}>
        //             LogOut
        //         </button>
        //         </li>

        //         <li class="nav-item">
        //           <Link
        //             className="nav-link btn btn-register button-outline-none"
        //             to="/register"
        //           >
        //             Signup
        //           </Link>

        //         </li>
        //       </ul>
        //     </div>
        //   </div>
        // </nav>
      <nav className="main-nav"> 
        <div>
          <h1>UniLife</h1>
        </div>
        <button className='dropdown' onClick={this.toogleNav}>
          <FaBars />
        </button>
        <div className={this.state.isNavExpanded ? "menu-links expanded" : "menu-links"}>
          <ul>
            <li className='link'><Link className='' to='/' onClick={this.hideNav}>Home</Link></li>
            <li className='link'><Link className='' to='/product' onClick={this.hideNav}>Search Product</Link></li>
            <li className='link'><Link className='' to='/hostel' onClick={this.hideNav}>Search Hostel</Link></li>
            <li className='link'><Link className='' to='/about' onClick={this.hideNav}>About Us</Link></li>
            <li className='link' id='sign-up'><Link className='' to='/register' onClick={this.hideNav}>Sign Up</Link></li>
            <li className='link' id='log-in'><Link className='' to='/login' onClick={this.hideNav}>Log In</Link></li>
          </ul>
        </div>
      </nav>
      );
  }
}



// const Navbar = () => {
//   const {state,dispatch} = useContext(UserContext);
//   const RenderMenu = () => {
//     if(state){
//       return(
//         <>
//         <li class="nav-item">
//                  <Link
//                    className="nav-link btn btn-login button-outline-none"
//                    to="/additems"
//                  >
//                    Additems
//                 </Link>
//                 </li>
//         </>
//       )
//     }
//     else{
//       return(
//         <>
//               <li class="nav-item">
//                  <Link
//                    className="nav-link btn btn-login button-outline-none"
//                    to="/login"
//                  >
//                    Login
//                  </Link>
//                </li>
//                <li class="nav-item">
//                  <Link
//                    className="nav-link btn btn-register button-outline-none"
//                    to="/register"
//                  >
//                    Signup
//                  </Link>
//                </li>
//         </>
//       )
//     }
//   }
//   return(
//     <>
//     <nav class="navbar navbar-expand-md navbar-dark ">
//           <div className="container">
//             <Link class="navbar-brand border-none" to="/">
//               <p className='logo'>Unilife</p>
//            </Link>
//              <button
//               class="navbar-toggler d-lg-none"
//               type="button"
//               data-toggle="collapse"
//               data-target="#collapsibleNavId"
//               aria-controls="collapsibleNavId"
//               aria-expanded="false"
//                aria-label="Toggle navigation"
//              >
//               <span class="navbar-toggler-icon"></span>
//              </button>
//              <div class="collapse navbar-collapse" id="collapsibleNavId">
//                <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
//                  {/* <li class="nav-item active">
//                    <Link class="nav-link" to="#">
//                      Home <span class="sr-only">(current)</span>
//                    </Link>
//                  </li> */}
//                 <RenderMenu/>
//               </ul>
//            </div>
//          </div>
//        </nav>
//     </>
//   )
// }

//export default Navbar;
// Navbar.propTypes = {
//   logoutUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired
// };

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);