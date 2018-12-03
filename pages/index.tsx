import * as React from "react";
import posts from "../_posts/posts.json";

export default () => (
    <div>{
        posts.map((post: any) => (
            <p>{post.title}</p>
        ))
    }</div>
)
