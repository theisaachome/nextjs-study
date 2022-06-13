import React from 'react'

import fs from "fs";
import path from "path";

const PostDetailPage = (props) => {
  const {loadedPost}=props;
  return (
    <>
    <h1>{loadedPost.title}</h1>
    <p>{loadedPost.description}</p>
    </>
  );
}


// context parameter is required for dynamic value.
export const getStaticProps = async(context)=>{
    const {params}=context;
    console.log(params);
    const postId = params.pid;
    const filePath = path.join(process.cwd(),'data','dummy_data.json')
    const jsonData = await fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    const post = data.posts.find((post)=> post.id ===postId);
    return {
       props:{
        loadedPost:post,
       }
    }
} 

export default PostDetailPage

