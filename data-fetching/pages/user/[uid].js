import React from 'react'

const UserDetailPage = (props) => {

  return (
    <div>
        <h1>{props.id}</h1>
    </div>
  )
}

export default UserDetailPage

export const  getServerSideProps = async(context)=>{
    const {params} = context;
    const userId = params.uid;
    return{
        props:{
            id:'userId-' + userId
        }
    }
}