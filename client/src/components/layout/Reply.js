import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import axios from "axios";

class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            reply: null,
        }
    }

    updateReply(value) {
        this.setState({
            reply: value,
        })
    }

    submit() {
        this.props.submitReply(this.state.reply);

        this.setState({
            reply: '',
        })
    }

    render() {
        return (
            <div>
                <input type="text"
                    id="reply"
                    placeholder="Type your reply here"
                    value={this.state.reply}
                    onChange={(e) => { this.updateReply(e.target.value) }}
                />
                <button onClick={() => { this.submit() }}>Reply</button>
            </div>
        )
    }
}

export default withRouter(Reply);