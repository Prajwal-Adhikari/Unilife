import React ,{Component} from "react";
import './Emailsent.css';
import { verifyUser } from "../../redux/actions/authActions";
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Emailsent extends Component{

    constructor() {
        super();
        this.state = {
          otp : '',
          errors: {}
        };
      }

      componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors
          });
        }
      }

      onChangeVerify = e => {
        this.setState({ [e.target.id]: e.target.value});
      };

      verifySubmit = e => {
        e.preventDefault();
        const setOtp = {
          otp : this.state.otp,
        };
        this.props.verifyUser(setOtp, this.props.history);
      };

    render()
    {     
        const {errors,otp} = this.state; 
    return(  
                <div className="container_email">
                    <h1>Account Confirmation</h1>
                <form noValidate onSubmit={this.verifySubmit}>
                  <div className="email">
                       <p> An OTP has been sent to your email for verification. Please input the OTP below and verify your unilife account.</p>
                    </div>
                    <div class="check">
                    <p>Check your email and come back to proceed!</p>
                    </div>
                  <div class="_verify">
                      <input
                        type="text"
                        className="otp-section"
                        placeholder="Enter OTP"
                        id="otp"
                        value={otp}
                        onChange={this.onChangeVerify}
                        error={errors.otp}
                        className={classnames('', {
                          invalid: errors.otp
                        })}
                      />{' '}
                      <br />
                      <span className="text-danger">{errors.otp}</span>
                  </div>
                  <div class="verifyButton">
                      <button type="submit" class="btn success">Verify</button>
                  </div>
                  </form>
                  </div>
    )
    }
}
 
Emailsent.propTypes = {
    verifyUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(mapStateToProps, { verifyUser })(withRouter(Emailsent));

// export default Emailsent;