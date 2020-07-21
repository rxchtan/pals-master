import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './AllPosts.css';
import axios from "axios";
import locationPin1 from '../layout/locationPin1.png';
import dollar from '../layout/dollar.png';
import country from '../layout/country.png';
import category from '../layout/category.png';
import Likes from './Likes';
//import { post } from '../../../../routes/api/users';

class ExperiencePosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: null,
        };
    }

    async componentDidMount() {
        const posts = (await axios.get('/api/posts/ExperiencePosts')).data;
        const filteredPosts = posts.filter(post => post.type === "experience");
        this.setState({ posts: filteredPosts });
    }

    render() {
        const { user } = this.props.auth;
        return (
            <div className="container">
                <div style={{ marginTop: "2rem" }} className="row">
                    <div>
                        <Link to="/createPost">
                            Click here to add a review!
                        </Link>
                        <h3>About to embark on SEP but is unsure about the entire process?</h3>
                        <h4>Pals On Exchange is here to clear your doubts! </h4>

                        {this.state.posts === null && <p>Loading all posts...</p>}
                        {this.state.posts && this.state.posts.map((post) => (
                            <Likes key={post._id} post={post} user={{ user }} />
                            /*
                            <div className="all-posts">
                                <h5>{post.title}</h5>
                                <p><img src={country} alt="country"></img>{post.country}</p>
                                <p>{post.category && <img src={category} alt="category"></img>}{post.category}</p>
                                <p>{post.location && <img src={locationPin1} alt="place"></img>}{post.location}</p>
                                <p>{post.budget && <img src={dollar} alt="budget"></img>}{post.budget}</p>
                                <p>{post.review}</p>
                                <Link to={`/${post._id}`}>
                                    Read More...
                                </Link>
                            </div>
                            */
                        ))}
                    </div>
                </div>
            </div >
        );
    }
}

ExperiencePosts.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(ExperiencePosts);
