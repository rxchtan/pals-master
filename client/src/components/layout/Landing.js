import React, { Component } from "react";
//import { Link } from "react-router-dom";
import './Landing.css';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import newLogo from '../layout/newLogo2.png';
import axios from "axios";
import Likes from './Likes';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            latestPosts: null,
        };
    }

    async componentDidMount() {
        const posts = (await axios.get('/api/posts')).data;
        let latestPosts = [posts[posts.length - 1]];
        latestPosts.push(posts[posts.length - 2]);
        latestPosts.push(posts[posts.length - 3]);
        this.setState({ latestPosts });
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container">

                <div className="landing-container">

                    <div className="row">
                        <h4>Welcome to </h4>
                        <img id="palsLogo" src={newLogo} alt="logo"></img>
                    </div>
                    <div>
                        <p>Share your SEP experience with your peers by leaving a review :-)</p>
                    </div>
                    <h3>Latest Posts:</h3>
                </div>

                {this.state.latestPosts && this.state.latestPosts.map((post) => (
                    <Likes key={post._id} post={post} user={{ user }} />
                ))}

            </div>
        );
    }
}


Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(Landing);