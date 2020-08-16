import React from 'react';
import './Dropdown.css';
import { Link } from "react-router-dom";
import arrowdown from '../layout/arrowdown.png';

class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false
        };

        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        //this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
        //this.changeButton = this.changeButton.bind(this);
    };

    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({ displayMenu: !this.state.displayMenu });
    }
    /*
    hideDropdownMenu() {
        this.setState({ displayMenu: false }, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });

    }
    

    changeButton(e) {
        this.setState({ displayMenu: false }, () => {

        })
    }<img id="arrow" src={arrowdown} alt="arrow"></img>
    */

    render() {
        /*
        let loggedIn = false;
        if ("name" in this.props.user) {
            return (
                <div className="dropdown" style={{ width: "200px" }
                } >
                    <div id="dropdown-button" onClick={this.showDropdownMenu}><Link to="/allPosts">All Posts</Link><img id="arrow" src={arrowdown} alt="arrow"></img></div>
                    {
                        this.state.displayMenu ? (
                            <ul className="drop">
                                <li onClick={this.showDropdownMenu}><Link to="/ExperiencePosts">Experience</Link></li>
                                <li onClick={this.showDropdownMenu}><Link to="/PlacePosts">Place</Link></li>
                            </ul>
                        ) :
                            (
                                null
                            )
                    }

                </div >
            )
        } else {
            return (<div className="dropdown" style={{ width: "200px" }
            } >
                <div id="dropdown-button" onClick={this.showDropdownMenu}><Link to="/allPosts">All Posts</Link><img id="arrow" src={arrowdown} alt="arrow"></img></div>
                {
                    this.state.displayMenu ? (
                        <ul className="drop">
                            <li onClick={this.showDropdownMenu}><Link to="/ExperiencePosts">Experience</Link></li>
                            <li onClick={this.showDropdownMenu}><Link to="/PlacePosts">Place</Link></li>
                        </ul>
                    ) :
                        (
                            null
                        )
                }

            </div >)
        }
    }
    */
        return (

            <div className="dropdown" style={{ width: "200px" }
            } >
                <div id="dropdown-button" onClick={this.showDropdownMenu}><Link to="/allPosts">All Posts</Link><img id="arrow" src={arrowdown} alt="arrow"></img></div>
                {
                    this.state.displayMenu ? (
                        <ul className="drop">
                            <li onClick={this.showDropdownMenu}><Link to="/ExperiencePosts">Experience</Link></li>
                            <li onClick={this.showDropdownMenu}><Link to="/PlacePosts">Place</Link></li>
                        </ul>
                    ) :
                        (
                            null
                        )
                }

            </div >




        );
    }
}


export default Dropdown;
