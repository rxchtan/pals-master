import React, { Component } from "react";
import { Link } from "react-router-dom";
import newLogo1 from '../layout/newLogo1.png';
import './NavBar.css';
import Logout from '../dashboard/Logout';
import PropTypes from "prop-types";
import { connect } from "react-redux";
//import { Dropdown } from "react-bootstrap";
import Dropdown from "./Dropdown";


class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: 0
        }
    }

    /*
    componentDidMount() {
        if (this.props.auth.user) {
            this.setState({ loggedIn: 1 });
        }
        console.log(this.state.loggedIn);
    }<li><a href="/allPosts">All Posts</a></li>
    */

    render() {
        const { user } = this.props.auth;
        console.log(user);
        return (
            <div>
                <nav className="nav-bar">
                    <div className="logo2">
                        <Link to="/"><img id="palsLogo2" src={newLogo1} alt="logo"></img></Link>
                    </div>

                    <ul className="nav">
                        <li><a href="/">Home</a></li>
                        <li><a href="/about">About</a></li>
                        <li><a href="/createPost">Create Post</a></li>
                    </ul>
                    <Dropdown user={user} />

                    {user.name ?
                        <div className="reg-log">
                            <Link id="log-btn" to="/profile">
                                <button id="regbutton">Profile</button></Link>
                            <Logout />
                        </div>

                        :

                        <div className="reg-log">
                            <Link id="reg-btn" to="/register">
                                <button id="regbutton">Register</button></Link>
                            <Link id="log-btn" to="/login">
                                <button id="loginbutton">Login</button></Link>
                        </div>

                    }

                </nav>
            </div >
        );
    }
}
Navbar.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(Navbar);