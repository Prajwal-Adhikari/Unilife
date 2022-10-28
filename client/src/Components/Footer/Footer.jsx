import React from "react";
import './Footer.css'
import { Component } from "react";
import {FaTwitter,FaInstagram,FaFacebook} from "react-icons/fa"

class Footer extends Component{
    render(){
        return(
            <section>
                <footer id="footer">
                    <div className="Footer_Container grid grid-three-column">
                        <div className="footer-about">
                            <h3>Unilife</h3>
                            <p>Make your University life easier here with us. Search,find and complete your end goal. Add your product and sell them easily.</p>
                        </div>

                        <div className="footer-social">
                            <h3>Follow Us </h3>
                            <div clasName="footer-social --icons">
                                <div>
                                <a href="#" target="_blank">
                                    <FaTwitter className="icons"/>
                                </a>
                                </div>
                                <div>
                                <a href="#" target="_blank">
                                    <FaFacebook className="icons"/>
                                </a>
                                </div>
                                <div>
                                    <a href="#" target="_blank">
                                    <FaInstagram className="icons"/>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="footer-contact">
                            <h3>Contact Us</h3>
                            <h3>+977 980197869987</h3>
                            <h3>+01 2556456</h3>
                        </div>

                    </div>
                </footer>
            </section>
        )
    }
        
}

export default Footer;