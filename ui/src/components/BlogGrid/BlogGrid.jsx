import React from 'react';
import Blog from '../../components/Blog/Blog';
import './BlogGrid.css';
import { useNavigate } from 'react-router-dom';


const BlogGrid = ({ posts }) => {
    const navigate = useNavigate();
    return (
        <div>
            {posts.map(post => {
                return (
                    <div className='blogContainer' key={post.id} onClick={ () => {
                        navigate(`/post/${post.id}`);
                    }}>
                        <Blog post={post} />
                    </div>
                );
            })}
        </div>
    );
}

export default BlogGrid;