import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './AllPosts.css';
import axios from "axios";
import locationPin1 from '../layout/locationPin1.png';
import Likes from './Likes';
//import { post } from '../../../../routes/api/users';

class allPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allPosts: null,
            posts: null,
            postFilter: "",
            // filteredPosts: null

        };
    }

    onSubmit = e => {
        e.preventDefault();
        //on sub,it attempted to filter
        console.log('Submit button wqs clicked');
        let filteredPosts = this.state.allPosts;
        filteredPosts = filteredPosts.filter(l => {
            return l.country.toLowerCase().match(this.state.postFilter.toLowerCase());
        })
        console.log(filteredPosts);

        this.setState({
            posts: filteredPosts
        })
    }

    handleChange = (e) => {
        this.setState({
            postFilter: e.target.value
        })
        // this.props.onChange(event.target.value)
    }



    async componentDidMount() {
        const allPosts = (await axios.get('/api/posts')).data;
        this.setState({ allPosts });
        this.setState({ posts: allPosts });
    }

    render() {
        const { user } = this.props.auth;

        return (

            <div className="container">
                <div style={{ marginTop: "2rem" }} className="row">
                    <div>
                        <h4>
                            Want to share your SEP story? Create a review {" "}
                            <Link to="/createPost">
                                here!
                        </Link>
                        </h4>
                        <h3>About to embark on SEP but is unsure about the entire process?</h3>
                        <h4>Pals On Exchange is here to clear your doubts! </h4>
                        {/* <input label="Search Country" icon="search" onChange={this.onChange}></input>
                       {
                            filteredCountries.map( country => {
                                return this.renderCountry(country)
                            })
                        }  */}
                        {/* <div><Search/></div> */}
                        <div>
                            <div>
                                <label htmlFor="filter">Search by country: </label>
                                <input type="text" id="filter"
                                    value={this.state.postFilter}
                                    onChange={this.handleChange} />
                            </div>
                            <button type="submit" onClick={this.onSubmit}>🔍</button>
                        </div>

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

allPosts.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(
    mapStateToProps
)(allPosts);

//export default withRouter(allPosts);