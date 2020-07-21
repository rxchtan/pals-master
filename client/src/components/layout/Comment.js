import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";
import Reply from './Reply';
import './Comment.css';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            replies: null,
            comment: null
        };
        this.submitReply = this.submitReply.bind(this);
    }

    async componentDidMount() {
        await this.refreshComment();
    }

    async refreshComment() {
        //const { match: { params } } = this.props;
        const replies = (await axios.get(`api/replies/${this.props.commentId}`)).data;
        this.setState({ replies });
        const comment = (await axios.get(`api/comment/${this.props.commentId}`)).data;
        this.setState({ comment });
        //console.log(this.props.commentId);
        //console.log(comment);
    }

    async submitReply(reply) {
        const replying = { text: reply, user: this.props.auth }
        await axios.post(`api/replies/${this.state.comment._id}`, replying);
        await this.refreshComment();
    }

    render() {
        const { comment, replies } = this.state;
        const { user } = this.props.auth;
        if (comment === null) return <p>No comments</p>;
        return (
            <div className="all-comments">
                <p><b>{comment.user || "anonymous"} says: </b>{comment.comment}</p>
                {replies && replies.map((reply) => (
                    <p id="reply-reply"><b>{reply.user || "anonymous"} says: </b>{reply.reply}</p>
                ))}
                <Reply commentId={comment._id} submitReply={this.submitReply} />
            </div>

        )
    }
}

Comment.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(Comment);