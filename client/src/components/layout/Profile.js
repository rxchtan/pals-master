import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Likes from './Likes';
import smiley from '../layout/smiley.png';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            liked: null,
            posts: null
        }
    }

    async componentDidMount() {
        const { user } = this.props.auth;
        const likedPost = (await axios.get(`api/userLikes/${this.props.auth.user.id}`)).data;
        this.setState({ liked: likedPost });
        const posts = (await axios.get('/api/posts')).data;
        let likedPosts = [];
        for (var a = 0; a < likedPost.length; a++) {
            likedPosts.push((await axios.get(`/api/posts/${likedPost[a]}`)).data);
        }
        this.setState({ posts: likedPosts });
        console.log(likedPosts);
    }

    render() {
        const { user } = this.props.auth;
        //console.log(user) .split(" ")[0];
        return (
            <div style={{ height: "75vh" }} className="container">
                <div className="row">
                    <div className="col s12">
                        <br />
                        <h3>
                            <b>Hello there,</b> {user.name}

                        </h3>
                        <br />
                        <h4>
                            Want to share your SEP story? Create a review {" "}
                            <Link to="/createPost">
                                here!
                        </Link>
                        </h4>

                        <h4>Check out the reviews you liked:</h4>

                        {this.state.posts && this.state.posts.map((post) => (
                            <Likes key={post._id} post={post} user={{ user }} />
                        ))}

                    </div>
                </div>
            </div >
        );
    }
}

/*
{this.state.liked && this.state.liked.map((likedPost) => (
                            <Likes key={likedPost} post={(await axios.get(`/api/posts/${likedPost}`)).data} user={{ user }} />
                        ))}
  <p><Link to={`/${likedPost}`}>
                                Liked Post
                            </Link></p>
{this.state.liked.map((likedPost) => (
                            <p><Link to={`/${likedPost}`}>
                                Liked Post 1
                            </Link></p>
                        ))}
                        */
Profile.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(Profile);