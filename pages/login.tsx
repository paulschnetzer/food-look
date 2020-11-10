import React, { useState } from 'react';
import Link from 'next/link';
import { css } from '@emotion/core';
import { useRouter } from 'next/router';
import {isSessionTokenValid} from '../util/auth'
import nextCookies from 'next-cookies'
import { GetServerSidePropsContext } from 'next';
import Header from '../components/Header';
import { colors } from '../util/colors';
type Props = { loggedIn: boolean}

const grid = css`
  display:grid;
  height:90vh;

  place-items:center;
  background-image: url("background_login.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .container {
    display:flex;
    flex-direction:row;
    align-content:center;
    justify-content:center;
    background-color:rgba(250, 252, 255, 0.822);
    width:400px;
    padding:40px;
    border-radius:50px;
    .h1container{

      display:flex;
      justify-content:space-between;
      margin-bottom:10px;

    }
    div{
      width:100%;
    }
    h1{margin:0;
      padding:0 0 3px 3px;
      text-align:center;
      letter-spacing:6px;
      word-spacing:7px;
      font-weight:400;
      text-transform:uppercase;
      font-size:120%;
      display:inline;


    }
    form{
      display:flex;
      flex-direction:column;

      opacity:100%;
      width:100%;
      h2{
      margin:40px 0 5px 14px;
      padding:0;
      font-size:90%;
      letter-spacing:3px;
      font-weight:600;
    }
      button{
        color:${colors.almostwhite};
        outline: 0;
        border:none;
        padding:15px;
        border-radius:20px;
        outline: 0;
        background-color:${colors.orange};
        margin:40px 0 -10px 0;
        font-size:90%;
        letter-spacing:3px;
        font-weight:500;
        width:70%;
        align-self:center;
        transition: 0.2s;
        transition-timing-function: ease-out;
        :hover {
      background-color: ${colors.darkorange};
      transform: translate(0, 1px);
    }
      }
      input{
        background-color:transparent;
        border:2px solid black;
        padding:12px;
        border-radius:20px;
        outline: 0;





      }

    }



  }
`;



export default function Login(props:Props){
  const router = useRouter()
  const[username, setUsername]=useState('')
  const[password, setPassword]=useState('')
  const[errorMessage, setErrorMessage]=useState('')


  return(
  <>

  <Header loggedIn={props.loggedIn}/>
  <div css={grid}>
    <div className="container">
      <div>
        <div className="h1container">
  <Link href="/login">
    <a>
  <h1 style={{borderBottom: router.pathname === "/login" ? '2px solid black' : 'none',}}>
  SIGN IN
    </h1>
    </a>
    </Link>
    <Link href="/register">
    <a>
  <h1 style={{borderBottom: router.pathname === "/register" ? '2px solid black' : 'none',}}>SIGN Up</h1>
  </a>
  </Link></div>
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
  <h2>Username</h2>
  <input value={username} onChange={(e)=>setUsername(e.currentTarget.value)}/>
  <h2>Password</h2>
  <input type="password" value={password} onChange={(e)=>setPassword(e.currentTarget.value)}/>
  <button>SIGN IN</button>
  </form>
<p style={{color:"red"}}>{errorMessage}</p>

      </div>
      </div>
      </div>

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