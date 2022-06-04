import React from 'react';
import BlogGrid from '../../components/BlogGrid/BlogGrid';
import axios from 'axios';
import { useState } from 'react';

const Homepage = () => {
    const [posts, setPosts] = React.useState([]);
    // get all posts/blogs
    React.useEffect( () => {
        
        axios.get('http://localhost:8082/api/post', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                setPosts(res.data);
            })
            .catch(err => {
                console.log("error with handleSubmit", err);
            });
    }, []);

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