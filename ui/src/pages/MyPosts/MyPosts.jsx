import React from 'react';
import Cookies from 'js-cookie';
import Blog from '../../components/Blog/Blog';
import { useNavigate } from 'react-router-dom';
import './MyPosts.css';


const MyPosts = ({ posts }) => {
    const navigate = useNavigate();
    
    let myPosts = posts.filter(post => {
        return post.user_id === parseInt(Cookies.get("userId"));
    });

    if (myPosts.length === 0) {
        return (
            <div id='noPost'>
                <h3>You have no posts</h3>
            </div>
        );
    }
    else {
        return (
            <div>
                <h3 id='myPostTitle'>My Posts</h3>
                <div id='blogBoxContainer'>
                    {myPosts.map(post => {
                        return (
                            <div className='blogContainer' key={post.id} onClick={ () => {
                                navigate(`/post/${post.id}`);
                            }}>
                                <Blog post={post} />
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyPosts;