import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Register(props: { token: string }){
  const[username, setUsername]=useState('')
  const[password, setPassword]=useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return(<>
  <h1>REGISTER!</h1>

  <form onSubmit ={async (e)=>{
    e.preventDefault();
    const response= await fetch('/api/register',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({username: username,  password: password, token: props.token})
    })
    const { success } = await response.json();

    if (success) {
      router.push('/');
    } else {

      if (response.status === 409) {
        setErrorMessage('User already exists!');
      } else {
        setErrorMessage('Failed!');
      }

    }
  }}>


  <input value={username} onChange={(e)=>setUsername(e.currentTarget.value)}/>

  <input value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>

  <button>Register</button>
  </form>

  <Link href="/Login">
        <a>Login</a>
      </Link>
      <p style={{ color: 'red' }}>{errorMessage}</p>
  </>)
}
export async function getServerSideProps() {

  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }


  const token = tokens.create(secret);
  return { props: { token } };
}