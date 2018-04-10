import { render, h, Component } from 'preact';
import { PostPreview } from "../components/post-preview/post-preview";

export const renderPosts = (posts) => {
    render((
        <div className='posts'>
            {posts.map((post, i) => {
                return <PostPreview post={post}/>
            })}
        </div>
    ), document.getElementById('posts'));
};

