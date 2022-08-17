import profile from '../static/images/a.png'
import email from '../static/images/email.jpg'
import pass from '../static/images/pass.png'
import "../Styles/login.css"

export default function Login() {
    return (
        // <div className="homepage">
        // <h1>Login</h1>
        // </div>
        <div className="main">
       <div className="sub-main">
         <div>
           <div className="imgs">
             <div className="container-image">
               <img src={profile} alt="profile" className="profile"/>
  
             </div>
  
  
           </div>
           <div>
             <h1>Login Page</h1>
             <div>
               <img src={email} alt="email" className="email"/>
               <input type="text" placeholder="user name" className="name"/>
             </div>
             <div className="second-input">
               <img src={pass} alt="pass" className="email"/>
               <input type="password" placeholder="Password" className="name"/>
             </div>
            <div className="login-button">
            <button>Login</button>
            </div>
             
              <p className="link">
                <a href="#">Forgot password ?</a> Or<a href="#">Sign Up</a>
              </p>
             
   
           </div>
         </div>
         
  
       </div>
      </div>

    );
}

