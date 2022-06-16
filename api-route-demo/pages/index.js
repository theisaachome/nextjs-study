import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {

  const emailRef = useRef();
  const feedbackRef = useRef();
  const submitHandler = (event)=>{
    event.preventDefault();
    const enteredEmail =  emailRef.current.value;
    const enteredFeedback = feedbackRef.current.value;
    const reqBody = {email:enteredEmail,text:enteredFeedback}
    fetch("/api/feedback",{
      method:"POST",
      body:JSON.stringify(reqBody),
      headers:{
        'Content-Type':"application/json"
      },
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data));
  }
 
  return (
    <div className={styles.container}>
      <h1>The Home Page</h1>
     <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="email">Your Email Address</label>
        <input type="email" name="email" id="email"  ref={emailRef}/>
      </div>
      <div>
        <label htmlFor="feedback">Your Feedback</label>
        <textarea id="feedback" rows={5} ref={feedbackRef}/>
      </div>
      <button>Send feedback</button>
     </form>
    </div>
  )
}
