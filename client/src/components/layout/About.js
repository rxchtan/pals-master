import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import './About.css';
import travelPic from '../layout/travel1.png';
import axios from "axios";

class about extends Component {
    render() {
        return (

            <div className="landing-container">

                <div className="row">
                    <img id="travel" src={travelPic} alt="logo"></img>
                    <h1 class="about-us"><b>About Us</b></h1>
                    <h2>Let's face it. Most people find SEP application process to be tedious and complex.
                        <br />
                        <br />
                        From module mapping, to submission of application, booking of flights and accommodation,
                        the list is endless. In the end, some students give up going on exchange due to the long procedures.
                        <br />
                        <br />
                        With Pals On Exchange, we hope to assist undergraduates who are about to
                             embark on SEP with their application process. Simply browse through the posts
                              shared by your peers whom have been on exchange to clarify your queries. And the best part is,
                              you may even make some new and long-lasting friends in the process!
                        </h2>
                </div>
            </div>
        );
    }
}
export default withRouter(about);