import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import Logout from './Logout';
import '../layout/Landing.css';
import newLogo from '../layout/newLogo2.png';

class LoggedIn extends Component {

    render() {
        return (
            <div className="landing-container">
                <div className="row">
                    <Logout history={this.props.history} />
                    <h4>Welcome to </h4>
                    <img id="palsLogo" src={newLogo} alt="logo"></img>
                </div>
                <div>
                    <p>Share your SEP experience with your peers by leaving a review :-)</p>
                </div>
            </div>

        );
    }
}

export default withRouter(LoggedIn);

