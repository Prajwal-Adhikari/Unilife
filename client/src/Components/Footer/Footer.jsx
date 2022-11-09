import React from "react";
import './Footer.css';
import logo from '../../static/logo.png';
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
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam natus doloribus non eum dignissimos ullam aspernatur obcaecati porro deleniti aliquid incidunt perspiciatis consequatur earum recusandae officiis officia, eligendi tenetur minima, dolore amet dolorum enim velit.
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
                            <div className="listItem"><a href="/dashboard" style={{color:"white"}}> Rooms</a></div>
                            <div className="listItem"><a href="/dashboard" style={{color:"white"}}> Shop</a></div>
                            <div className="listItem"><a href="/cart" style={{color:"white"}}> Cart</a></div>
                            <div className="listItem"><a href="/terms" style={{color:"white"}}> Terms</a></div>
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
                </div>
            </div>
        )
    }
        
}

export default Footer;