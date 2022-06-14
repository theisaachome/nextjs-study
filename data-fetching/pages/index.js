import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import fs from "fs";
import path from "path";
import Link from 'next/link';

export default function Home(props) {
  const {posts} = props;
  return (
    <div className={styles.container}>
      <ul>
        {posts.map((post)=><li key={post.pid}><Link href={`/posts/${post.pid}`}>{post.title}</Link></li>)}
      </ul>
    </div>
  )
}

// not served in client site 
export async function  getStaticProps(){
  console.log("Re-generated");
  const filePath = path.join(process.cwd(),'data','dummy_data.json')
  const jsonData = await fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);
  if(!data){
    return {
      redirect:{
        destination:'/no-data'
      }
    }
  }
  if(data.length===0){
    return {notFound:true};
  }
  return {
    props:{
      posts:data.posts
    },
    revalidate:30,// regenrate data at server site
    redirect:""
  }
}