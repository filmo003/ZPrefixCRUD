import React from 'react';
import BlogGrid from '../../components/BlogGrid/BlogGrid';
import './Homepage.css';

const Homepage = ({ posts, useSetPostFocusId }) => {

    return (
        <div id='blogs'>
            <h1 id='blogTitle'>Blog Posts</h1>
            <div id='blog-container'>
                <BlogGrid posts={posts}/>
            </div>      
        </div>
    );
}

export default Homepage;