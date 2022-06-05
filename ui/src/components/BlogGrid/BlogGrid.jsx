import React from 'react';
import Blog from '../../components/Blog/Blog';

const BlogGrid = ({ posts }) => {
    return (
        <div>
            {posts.map(post => {
                return (
                    <div key={post.id}>
                        <Blog post={post} />
                    </div>
                );
            })}
        </div>
    );
}

export default BlogGrid;