import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from "./components/private-route/PrivateRoute";
import Dashboard from "./components/dashboard/Dashboard";
import LoggedIn from "./components/dashboard/LoggedIn";
import createPost from './components/layout/CreatePost';
import allPosts from './components/layout/AllPosts';
import Post from './components/layout/Post';
import About from './components/layout/About';
import experiencePost from './components/layout/ExperiencePost';
import placePost from './components/layout/PlacePost';
import Likes from './components/layout/Likes';
import Profile from './components/layout/Profile';
import ExperiencePosts from './components/layout/ExperiencePosts';
import PlacePosts from './components/layout/PlacePosts';


// Check for token to keep user logged in

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: ''
    }
  }

  componentDidMount() {
    if (localStorage.jwtToken) {
      this.setState({ loggedIn: true });
      // Set auth token header auth
      const token = localStorage.jwtToken;
      setAuthToken(token);
      // Decode token and get user info and exp
      const decoded = jwt_decode(token);
      // Set user and isAuthenticated
      store.dispatch(setCurrentUser(decoded));
      // Check for expired token
      const currentTime = Date.now() / 1000; // to get in milliseconds
      if (decoded.exp < currentTime) {

        // Logout user
        store.dispatch(logoutUser());
        // Redirect to login
        window.location.href = "./login";
        this.setState({ loggedIn: false });
      }
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <NavBar />
            {this.state.loggedIn ?
              <Switch>
                <PrivateRoute exact path="/dashboard" component={LoggedIn} />
                <PrivateRoute exact path="/profile" component={Profile} />
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/createPost" component={createPost} />
                <Route exact path="/experiencePost" component={experiencePost} />
                <Route exact path="/placePost" component={placePost} />
                <Route exact path="/allPosts" component={allPosts} />
                <Route exact path="/ExperiencePosts" component={ExperiencePosts} />
                <Route exact path="/PlacePosts" component={PlacePosts} />
                <Route exact path="/:postId" component={Post} />
                <Route exact path="/Likes" component={Likes} />
              </Switch>
              :

              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/createPost" component={createPost} />
                <Route exact path="/experiencePost" component={experiencePost} />
                <Route exact path="/placePost" component={placePost} />
                <Route exact path="/allPosts" component={allPosts} />
                <Route exact path="/ExperiencePosts" component={ExperiencePosts} />
                <Route exact path="/PlacePosts" component={PlacePosts} />
                <Route exact path="/:postId" component={Post} />
                <Route exact path="/Likes" component={Likes} />
              </Switch>

            }

          </div>
        </Router>
      </Provider>
    );
  }
}


export default App;
