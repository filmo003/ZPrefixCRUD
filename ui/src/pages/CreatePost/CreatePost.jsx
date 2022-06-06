import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './CreatePost.css';

const CreatePost = ({ useSetRerender, rerender }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const apiUrl = 'https://zprefix-crud-api.herokuapp.com';

    const handleSubmit = (e) => {
        e.preventDefault();
        const post = {
            title: title,
            content: content,
            user_id: parseInt(Cookies.get("userId"))
        };
        axios.post(`${apiUrl}/api/create-post`, post, { withCredentials: true })
            .then(res => {
                if (res.status === 201) {
                    console.log("redirecting to home page after creating post");
                    useSetRerender(!rerender);
                    navigate(`/my-posts`);
                }
            })
            .catch(err => {
                console.log("error with handleSubmit", err);
                setError(err.response.data.message);
                window.alert(err.response.data);
            }
            );
    }

    return (
        <div>
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div>
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default CreatePost;