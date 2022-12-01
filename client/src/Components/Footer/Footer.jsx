import React from "react";
import './Footer.css';
import logo from '../../static/image.png';
import { Component } from "react";
import {FaTwitter,FaInstagram,FaFacebook,FaMapMarkerAlt, FaPhone, FaEnvelope} from "react-icons/fa"
// import { Facebook, Instagram, Twitter, Room, Phone, MailOutline } from "@material-ui/icons";

class Footer extends Component{
    render(){
        return(
            <div className="container-footer">
          
                <div className="left">
                    
                    <div className="title">
                    <img src={logo} alt="Logo" className="logo-image"/>
                    </div>
                    <div className="description">
                    Make your University life easier with Unilife. All in one place for businesses and students to do e-commerce in a new way. Search,find and complete your end goal. Add your product and sell them easily.
                    </div>
                    <div className="socialContainer">

                       
                        <div className="socialIcon" id="facebook">
                            <FaFacebook /> 
                        </div>
                        <div className="socialIcon" id="instagram">
                            <FaInstagram /> 
                        </div>
                        <div className="socialIcon" id="twitter">
                            <FaTwitter /> 
                        </div>
                    </div>
                </div>

                <div className="center">
                    <div className="title">USEFUL LINKS</div>
                        <div className="list">
                      
                            <div className="listItem"><a href="/" style={{color:"white"}}> Home</a></div>
                            <div className="listItem"><a href="/about" style={{color:"white"}}>About Us </a></div>
                            <div className="listItem"><a href="/hostel" style={{color:"white"}}> Hostels</a></div>
                            <div className="listItem"><a href="/hostel" style={{color:"white"}}> Rooms</a></div>
                            <div className="listItem"><a href="/product" style={{color:"white"}}> Shop</a></div>
                            <div className="listItem"><a href="/cart" style={{color:"white"}}> Cart</a></div>
                            {/* <div className="listItem"><a href="#" style={{color:"white"}}> Terms</a></div> */}
                        </div>


                </div>
                <div className="footer_right">
                   <div className="title">CONTACTS</div>
                    <div className="contactItem">
                     <FaMapMarkerAlt className="fa-icons"/> 28 Kilo, Banepa-4, Dhulikhel</div>
                    <div className="contactItem">
                       <FaPhone className="fa-icons"/> +977 999 888 7771</div>
                    <div className="contactItem">
                       <FaEnvelope className="fa-icons"/> teamunilife@gmail.com</div>
                <div className="copyright"><p>&copy; Team Unilife copyright 2022 </p></div>
                </div>

            </div>
        )
    }
        
}

export default Footer;