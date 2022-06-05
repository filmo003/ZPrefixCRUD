import React from "react";
import { NavLink } from "react-router-dom";
import Cookies from "js-cookie";

const Links = () => {
    if (Cookies.get("username")) {
        return (
            <div className="linkContainer">
                <span>Quick Navigation</span>
                <ul className="quickNavigationList">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/my-posts">My Posts</NavLink>
                    </li>
                    <li>
                        <NavLink to="/create-post">Create Post</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
    else {
        return (
            <div className="linkContainer">
                <span>Quick Navigation</span>
                <ul className="quickNavigationList">
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login">Login to See Your Posts</NavLink>
                    </li>
                </ul>
            </div>
        );
    }
};

export default Links;