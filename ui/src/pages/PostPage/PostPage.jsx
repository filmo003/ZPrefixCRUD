import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostPage = ({ posts, useSetRerender, rerender }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [setEdit, setEditState] = useState(false);
    const [error, setError] = useState('');
    const apiUrl = 'http://localhost';

    console.log('posts are',posts);
    let postId = useParams().postId;
    let post = posts.find(post => post.id === parseInt(postId));

    useEffect(() => {
        return () => {
            console.log('setEdit', setEdit);
        }
    }, [setEdit]);

    const handleEditSubmit = (e) => {
        e.preventDefault();
        axios.patch(`http://localhost:8082/api/update-post/${postId}`, {
            title: title,
            content: content
        }, { withCredentials: true })
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    useSetRerender(!rerender);
                    setEditState(false);
                }
                else {
                    console.log("error with handleEditSubmit", res.data.message);
                    window.alert(res.data.message);
                }
            })
            .catch(err => {
                console.log("error with handleEditSubmit", err);
                window.alert(err.response.data);
            });
    }

    const handleDelete = () => {
        console.log("Deleting post");
        axios.delete(`http://localhost:8082/api/delete-post/${postId}`, { withCredentials: true })
            .then(res => {
                console.log(res.status);
                if (res.status === 200) {
                    useSetRerender(!rerender);
                    navigate(`/my-posts`);
                }
                else {
                    console.log("error with handleDelete", res.data.message);
                    window.alert(res.data.message);
                }
            })
            .catch(err => {
                console.log("error with handleDelete", err);
                window.alert(err.response.data);
            });
    }

    if (setEdit === true) {
        if (content === '') {
            setTitle(post.title);
            setContent(post.content);
        }
        else {
            return (
                <div>
                    <h1>Edit Post</h1>
                    <form onSubmit={handleEditSubmit}>
                        <div>
                            <label>Title</label>
                            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                        </div>
                        <div>
                            <label>Content</label>
                            <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                        </div>
                        <button type="submit">Submit</button>
                        <button onClick={() => setEditState(false)}>Cancel</button>
                    </form>
                </div>
            );
        }
    }
    else if (!post) {
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
                <p>Post Author: {post.username}</p>
                <p>Created on: {post.created_at}</p>
                <p>{post.content}</p>
                <div className='editAndDelete'>
                    <button onClick={() => setEditState(true)}>Edit Post</button>
                    <button onClick={() => handleDelete()}>Delete Post</button>
                </div>
            </div>
        );
    }
}

export default PostPage;