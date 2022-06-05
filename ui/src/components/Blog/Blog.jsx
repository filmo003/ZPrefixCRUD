import React from 'react';

const Blog = ({post}) => {

    let postContent = post.content.substring(0,100);
    if (post.content.length > 100) {
        postContent += "...";
    }

    return (
        <div>
            <h3>{post.title}</h3>
            <p>Created on: {post.created_at}</p>
            <p>{postContent}</p>
            <div>
                <button>Edit Post</button>
                <button>Delete Post</button>
            </div>
        </div>
    );
}

export default Blog;