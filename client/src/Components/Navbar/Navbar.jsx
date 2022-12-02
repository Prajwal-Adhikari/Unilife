import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { Link, Redirect } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { FaUser } from 'react-icons/fa';
import { FaCartPlus } from 'react-icons/fa';
import './Navbar.css';

// import {useContext} from 'react';
// import { UserContext } from "../../App";


class Navbar extends Component {
  constructor() {
    super();
    this.state = {
     isNavExpanded : false,
     isLoggedIn : false
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

  userLogIn = () => {
    if(this.props.auth) {
      this.setState({
        isLoggedIn : true,
      })
    }
  }
  userLogOut = () => {
    if(this.props.auth) {
      this.setState({
        isLoggedIn : false,
      })
    }
  }
  
  hideNav = () => {
    this.setState({
      isNavExpanded: false
    })
  }
  
  render() {
    const {user} = this.props.auth;
      return (
        
      <nav className="main-nav"> 
        <div>
          <Link to='/'><h1>UNILIFE</h1></Link>
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
            <li className={this.props.auth ? "link loggedIn" : "link loggedOut"} id='sign-up'><Link className='' to='/register' onClick={this.hideNav}>Sign Up</Link></li>
            <li className={this.props.auth ? "link loggedIn" : "link loggedOut"} id='log-in'><Link className='' to='/login' onClick={this.hideNav}>Log In</Link></li>
            <li className={this.state.isLoggedIn ? "link loggedIn" : "link loggedOut"} id=''><Link className='log-out' to='/login' onClick={this.onLogoutClick}>Log Out</Link></li>
            <li className=''><Link className='' to='/cart' onClick={this.hideNav}><FaCartPlus id='cart_icon' /></Link></li>
            <li className=''><Link className='' to='/profile' onClick={this.hideNav}><FaUser /></Link></li>
          </ul>
        </div>
      </nav>
      );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
