import React from "react";
import { NavLink } from "react-router-dom";

const Links = () => {
    return (
        <div id="classContainer">
            <span>Quick Navigation</span>
            <ul id="quickNavigationList">
                <li>
                <NavLink to="/">Home</NavLink>
                </li>
                <li>
                <NavLink to="/about">Developers</NavLink>
                </li>
                <li>
                <NavLink to="/admin">Administration</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Links;