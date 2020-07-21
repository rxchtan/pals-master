import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import Upload from "./Upload";
// import './PlacePost.css';


class placePost extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            country: "",
            category: "",
            location: "",
            budget: "",
            review: ""
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
            category: this.state.category,
            location: this.state.location,
            budget: this.state.budget,
            review: this.state.review,
            type: "place"
        };


        axios.post("/api/posts", newPost).then(res => {
            if (res.status === 200) {
                this.props.history.push("/allPosts");
            }
        });
    };


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
                                <b>Memorable place to visit!</b>
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
                                <p>Category:</p>
                                {/* <select value={this.state.category} onChange={this.onChange}>
                                    <option value="Accommodation">Accommodation</option>
                                    <option value="Food">Food</option>
                                    <option value="SightSeeing">SightSeeing</option>
                                    <option value="Shopping">Shopping</option>
                                </select> */}
                                <input
                                    onChange={this.onChange}
                                    value={this.state.category}
                                    id="category"
                                    type="text"
                                />
                            </div>
                            <div>
                                <p>Location:</p>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.location}
                                    id="location"
                                    type="text"
                                />
                            </div>
                            <div>
                                <p>Budget:</p>
                                <input
                                    onChange={this.onChange}
                                    value={this.state.budget}
                                    id="budget"
                                    type="text"
                                />
                            </div>
                            <div>
                                <p>Review:</p>
                                <textarea onChange={this.onChange} value={this.state.body}
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

export default withRouter(placePost);