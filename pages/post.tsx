import * as React from "react";
import posts from "../_posts/posts.json";

export default () => (
    <div dangerouslySetInnerHTML={{__html: posts[0].body}}>{
    }</div>
)
