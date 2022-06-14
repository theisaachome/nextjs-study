import fs from "fs";
import path from "path";

const PostDetailPage = (props) => {
  const {loadedPost}=props;
  if(!loadedPost){
    return <p>loading...</p>
  }
  return (
    <>
     <div className="card">
     <h1>{loadedPost.title}</h1>
    <p>{loadedPost.title}</p>
    <p>{loadedPost.body}</p>
     </div>
    </>
  );
}

const getData=async()=>{
  const filePath = path.join(process.cwd(),'data','dummy_data.json')
    const jsonData = await fs.readFileSync(filePath);
   return JSON.parse(jsonData);

}

// context parameter is required for dynamic value.
export const getStaticProps = async(context)=>{
    const {params}=context;
    const postId = +params.pid;
    const data =await getData()
    const post = data.posts.find((post)=> post.pid === postId);
    if(!post){
      return {notFound:true}
    }
    return {
       props:{
        loadedPost:post
       },

    }
} 

// tell next js which instances  of the dyanmic page should be generated
export async function getStaticPaths(){
  const data = await getData();
  const ids = data.posts.map((post)=>post.pid);
  const pathsWithParams = ids.map((id)=>({params:{pid:id.toString()}}));
  return {
    paths:pathsWithParams,
    fallback:false,
  }
}

export default PostDetailPage

