import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import './Dashboard.css';


class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <section className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="content">
                <h1>
                  H! <b>{user.name.split(' ')[0]} </b>
                </h1>
                <h3>
                  You are Successfully logged into Unilife
                </h3>
                <button
                  onClick={this.onLogoutClick}
                  className="btn btn-lg btn-warning mt-5">
                  Logout
                </button>
                {/* <Link
                    to="/"
                    className="btn btn-lg btn-outline-none border-3 btn-login"
                  >
                    checkout to payment
                  </Link> */}
                <button  className="checkoutTOpayment" onClick={()=>{
                  fetch('http://localhost:5000/api/users/create-checkout-session',{
                    method:"POST",
                    headers:{
                      "Content-Type" : "application/json"
                    },
                     body:JSON.stringify({
                      items: [
                        { id :1,quantity :2},
                        { id: 2,quantity:1},
                      ],
                    }),
                  })
                  .then(res=> {
                    if(res.ok) return res.json()
                    return res.json().then(json=>Promise.reject(json))
                  })
                  .then(({ url }) => {
                    window.location = url
                  })
                  .catch(e=>{
                    console.error(e.error)
                  })
                 }}
                  >
                      Checkout for payment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
