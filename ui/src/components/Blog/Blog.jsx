import React from 'react';
import './Blog.css';

const Blog = ({post}) => {

    let postContent = post.content.substring(0,100);
    if (post.content.length > 100) {
        postContent += "...";
    }

    return (
        <div className='blogBox'>
            <h3 className='postTitle'>{post.title}</h3>
            <p className='createdOn'>Created on: {post.created_at}</p>
            <div className='postContainer'>
                <p className='postContent'>{postContent}</p> 
            </div>
        </div>
    );
}

export default Blog;