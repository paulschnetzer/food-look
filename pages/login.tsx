import React, { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';
import {isSessionTokenValid} from '../util/auth'
import nextCookies from 'next-cookies'
import { GetServerSidePropsContext } from 'next';
import Header from '../components/Header';
type Props = { loggedIn: boolean}

export default function Login(props:Props){
  const[username, setUsername]=useState('')
  const[password, setPassword]=useState('')
  const[errorMessage, setErrorMessage]=useState('')
  const router=useRouter()
  return(
  <>

  <Header loggedIn={props.loggedIn}/>
  <h1>Login</h1>
  <form onSubmit ={async(e)=>{
    e.preventDefault();
    const response=await fetch('/api/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({username, password})
    })
    const {success} =await response.json()
    if(!success){
      setErrorMessage('Login Failed')
    }else{
      setErrorMessage('')
      router.push('/')
    }
  }}>
  <input value={username} onChange={(e)=>setUsername(e.currentTarget.value)}/>
  <input type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
  <button>Submit</button>
  </form>
<p style={{color:"red"}}>{errorMessage}</p>
  <Link href="/register">
        <a>Register</a>
      </Link>

  </>)
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const {session:token} = nextCookies(context)

  if (await isSessionTokenValid(token)) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {loggedIn: false},
  };
}