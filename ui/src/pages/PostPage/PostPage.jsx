import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { NavLink } from 'react-router-dom';
import './PostPage.css';

const PostPage = ({ posts, useSetRerender, rerender }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [setEdit, setEditState] = useState(false);
    const [error, setError] = useState('');
    const apiUrl = 'https://zprefix-crud-api.herokuapp.com';

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
        axios.patch(`${apiUrl}/api/update-post/${postId}`, {
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
        axios.delete(`${apiUrl}/api/delete-post/${postId}`, { withCredentials: true })
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
            <div id='postNotFount'>
                <h2>Post not found</h2>
            </div>
        );
    }
    else if (Cookies.get("userId")) {
        // signed in, allow to edit/delete
        return (
            <div id='postContainer'>
                <h1>{post.title}</h1>
                <p id='createdOn'>Created on: {post.created_at}</p>
                <p id='content'>{post.content}</p>
                <div className='editAndDelete'>
                    <button onClick={() => setEditState(true)}>Edit Post</button>
                    <button onClick={() => handleDelete()}>Delete Post</button>
                </div>
            </div>
        );
    }
    else {
        // not signed in, only allow to read
        return (
            <div>
                <h1>{post.title}</h1>
                <p>Created on: {post.created_at}</p>
                <p>{post.content}</p>
                <div className='editAndDelete'>
                    <NavLink to={`/login`}>Sign in to edit or delete</NavLink>
                </div>
            </div>
        );
    }
}

export default PostPage;