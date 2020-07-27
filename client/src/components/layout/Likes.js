import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import locationPin1 from '../layout/locationPin1.png';
import dollar from '../layout/dollar.png';
import country from '../layout/country.png';
import category from '../layout/category.png';
import liked from '../layout/liked.png';
import unliked from '../layout/unliked.png';
import './Likes.css';
import { USER_LOADING } from '../../actions/types';
// import { Button } from 'reactstrap';

class Likes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: false,
            likes: null
        }
    }

    async componentDidMount() {
        const postLikes = (await axios.get(`/api/posts/${this.props.post._id}`)).data;
        const likes = postLikes.likes;
        this.setState({ likes });

        const liked = (await axios.get(`api/userLikes/${this.props.auth.user.id}`)).data;
        let count;
        if (liked.includes(this.props.post._id)) {
            count = true;
        } else {
            count = false;
        }
        this.setState({ count });
    }

    async refresh() {
        const postLikes = (await axios.get(`/api/posts/${this.props.post._id}`)).data;
        const likes = postLikes.likes;
        this.setState({ likes });
    }

    changeCount = () => {
        /*
        axios.post(`api/like/${this.props.post._id}`).
            then(() => this.setState(prevState => ({ count: prevState.count = 1 })))
            */
        this.setState({ count: !this.state.count });
        //console.log(this.state.count);
        const numOfLikes = { likes: this.state.likes };
        const user = { user: this.props.user };
        //console.log(user.user.user);
        if (this.state.count === false) {
            axios.post(`api/like/${this.props.post._id}`, numOfLikes).then(this.refresh());
            if (this.props.user) {
                axios.post(`api/userLike/${this.props.post._id}`, user.user.user).then(this.refresh());
                console.log("saved to user");
            }
        } else {
            axios.post(`api/unlike/${this.props.post._id}`, numOfLikes).then(this.refresh());
            if (this.props.user) {
                axios.post(`api/userUnlike/${this.props.post._id}`, user.user.user).then(this.refresh());
                console.log("saved to user");
            }
        }

    }
    //<p><button onClick={this.incrementCount}> 😻Likes: {this.state.count}</button></p>
    render() {
        const post = this.props.post;
        //const { user } = this.props.user;
        return (
            <div key={post._id} className="col-sm-12 col-md-4 col-lg-3">
                <div className="all-posts">
                    <h5>{post.title}</h5>
                    <p>{post.country && <img src={country} alt="country"></img>}{post.country}</p>
                    <p>{post.category && <img src={category} alt="category"></img>}{post.category}</p>
                    <p>{post.location && <img src={locationPin1} alt="place"></img>}{post.location}</p>
                    <p>{post.budget && <img src={dollar} alt="budget"></img>}{post.budget}</p>
                    <p>{post.review}</p>
                    <div className="corner">
                        <p>😻Likes: {this.state.likes}</p>
                    </div>

                    <p><button id="like-button" onClick={this.changeCount}> {this.state.count ? <p><img src={liked} alt="liked"></img>Unlike</p> : <p><img src={unliked} alt="unliked"></img>Like</p>} </button></p>
                    <Link to={`/${post._id}`}>
                        Read More...
                </Link>
                </div>
            </div>
        )
    }
}

Likes.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(Likes);