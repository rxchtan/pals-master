import React, { Component } from 'react';
import { withRouter, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import CreateComment from './CreateComment';
import locationPin1 from '../layout/locationPin1.png';
import Comment from './Comment';
import Likes from './Likes';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null,
            comments: null
        }
        this.submitComment = this.submitComment.bind(this);
    }

    async componentDidMount() {
        await this.refreshPost();
    }

    async refreshPost() {
        const { match: { params } } = this.props;
        const post = (await axios.get(`api/posts/${params.postId}`)).data;
        this.setState({ post });
        const comments = (await axios.get(`api/comments/${params.postId}`)).data;
        this.setState({ comments });
    }

    async submitComment(comment) {
        const commenting = { text: comment, user: this.props.auth };
        await axios.post(`api/comments/${this.state.post._id}`, commenting);
        await this.refreshPost();
        //console.log(commenting);
    }

    render() {
        const { post, comments } = this.state;
        const { user } = this.props.auth;
        if (post === null) return <p>Loading post...</p>;
        return (
            <div>
                <div className="container">
                    <h3>Check out your friend's review here! </h3>
                    <Likes key={post._id} post={post} />
                </div>


                <div className="container">
                    <h5>Discussion Box:</h5>
                    <div className="all-posts">
                        <CreateComment postId={this.state.post._id} submitComment={this.submitComment} />
                        {this.state.comments && this.state.comments.map((comment) => (
                            <Comment commentId={comment._id} />
                        ))}
                    </div>
                </div>
            </div >
        )
    }
}

Post.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(Post);

