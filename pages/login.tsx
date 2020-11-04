import React, { useState } from 'react';
import Link from 'next/link';
export default function Login(){
  const[username, setUsername]=useState('')
  const[password, setPassword]=useState('')
  return(<><h1>Login</h1>
  <form onSubmit ={(e)=>{
    e.preventDefault();
    fetch('/api/login',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({username, password})
    })
  }}>
  <input value={username} onChange={(e)=>setUsername(e.currentTarget.value)}/>
  <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
  <button>Submit</button>
  </form>
  <Link href="/register">
        <a>Register</a>
      </Link>
  </>)
}