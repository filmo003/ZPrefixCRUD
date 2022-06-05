import React from 'react';
import { useParams } from 'react-router-dom';

const PostPage = ({ posts }) => {
    console.log('posts are',posts);
    let postId = useParams().postId;
    let post = posts.find(post => post.id === parseInt(postId));
    if (!post) {
        return (
            <div>
                <h2>Post not found</h2>
            </div>
        );
    }
    else {
        return (
            <div>
                <h1>{post.title}</h1>
                <p>{post.content}</p>
            </div>
        );
    }
}

export default PostPage;