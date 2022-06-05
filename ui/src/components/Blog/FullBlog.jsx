import React from 'react';

const FullBlog = ({post}) => {
    return (
        <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
}

export default FullBlog;