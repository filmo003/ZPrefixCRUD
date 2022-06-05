import React from 'react';
import BlogGrid from '../../components/BlogGrid/BlogGrid';

const Homepage = ({ posts }) => {

    return (
        <div>
            <h1>ZPrefix Project</h1>
            <div id='blog-container'>
                <BlogGrid posts={posts}/>
            </div>      
        </div>
    );
}

export default Homepage;