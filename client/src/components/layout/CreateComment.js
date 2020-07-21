import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import Reply from './Reply';

class CreateComment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
        };
    }

    updateComment(value) {
        this.setState({
            comment: value,
        })
    }

    submit() {
        this.props.submitComment(this.state.comment);

        this.setState({
            comment: '',
        })
    }

    render() {
        return (
            <div>
                <h6>Feel free to leave a comment:</h6>
                <input type="text"
                    placeholder="Share your thoughts"
                    value={this.state.comment}
                    onChange={(e) => { this.updateComment(e.target.value) }}
                />
                <button onClick={() => { this.submit() }}>Comment</button>
            </div>

        )
    }
}

export default withRouter(CreateComment);