import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
//import DropdownButton from 'react-bootstrap/DropdownButton';
//import DropdownItem from 'react-bootstrap/Dropdown';
//import Dropdown from './Dropdown';
//import { connect } from "react-redux";
import axios from "axios";
import './ExperiencePost.css';


class experiencePost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            country: "",
            //category: "",
            selectedFile: null,
            body: ""
        };
    }

    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
    };

    onSubmit = e => {
        e.preventDefault();
        const newPost = {
            title: this.state.title,
            country: this.state.country,
            review: this.state.review,
            type: "experience"
        };


        axios.post("/api/posts", newPost).then(res => {
            if (res.status === 200) {
                this.props.history.push("/allPosts");
            }
        });

        /* upload file
        const data = new FormData();
        data.append('file', this.state.selectedFile)
        */
        //data.append('post', newPost)

        /*
        axios.post('/api/posts', data)
            .then(result => { // then print response status

            });
        */

        /*
        fetch('/api/posts', {
            // content-type header should not be specified!
            method: 'POST',
            body: data,
        })
            .then(response => response.json())
            .catch(error => console.log(error)
            );
        */

        /* upload file
        axios.post('/api/posts', data, {
            // receive two    parameter endpoint url ,form data
        })
            .then(res => { // then print response status
                console.log(res.statusText);
            });
        */

        //await axios.post(`${HOSTNAME}/reviews`, newPost);
    };

    /*
    fileSelectedHandler = event => {
        this.setState({
            selectedFile: event.target.files[0],
        })
    };
    */

    render() {
        return (
            <div className="container">
                <div style={{ marginTop: "2rem" }} className="row">
                    <div className="col s8 offset-s2">
                        <Link to="/createPost">
                            <i className="material-icons left">keyboard_backspace</i> Choose again
                        </Link>
                        <div>
                            <h3>
                                <b>Tell us about your SEP experience!</b>
                            </h3>
                        </div>
                        <form noValidate onSubmit={this.onSubmit}>
                            <div>
                                <p>Title of review:</p>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.title}
                                    id="title"
                                    type="text"
                                />
                            </div>
                            <div>
                                <p>Country of visit:</p>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.country}
                                    id="country"
                                    type="text"
                                />
                            </div>
                            <div>
                                <p>Tell us more:</p>
                                <textarea onChange={this.onChange} value={this.state.review}
                                    id="review" placeholder="Write your review here" />
                            </div>

                            <button type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>





        );
    }
}

export default withRouter(experiencePost);