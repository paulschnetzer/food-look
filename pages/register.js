import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { css } from '@emotion/core';
import Header from '../components/Header';
import { colors } from '../util/colors';

const grid = css`
  display: grid;
  height: 90vh;

  place-items: center;
  background-image: url('background_login.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  @media (max-width: 1000px) {
    background-color: ${colors.lightorange};
    height: 100vh;
  }
  @media (max-width: 380px) {
    font-size: 70%;
  }
  .container {
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: center;
    background-color: rgba(250, 252, 255, 0.822);
    width: 400px;
    padding: 40px;
    border-radius: 50px;
    @media (max-width: 400px) {
      width: 100%;
      border-radius: 0;
    }
    .h1container {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    div {
      width: 100%;
    }
    h1 {
      margin: 0;
      padding: 0 0 3px 3px;
      text-align: center;
      letter-spacing: 6px;
      word-spacing: 7px;
      font-weight: 400;
      text-transform: uppercase;
      font-size: 120%;
      display: inline;
    }
    form {
      h2 {
        margin: 40px 0 5px 14px;
        padding: 0;
        font-size: 90%;
        letter-spacing: 3px;
        font-weight: 600;
      }
      display: flex;
      flex-direction: column;
      opacity: 100%;
      width: 100%;
      button {
        color: ${colors.almostwhite};
        outline: 0;
        border: none;
        padding: 15px;
        border-radius: 20px;
        outline: 0;
        background-color: ${colors.orange};
        margin: 40px 0 -10px 0;
        font-size: 90%;
        letter-spacing: 3px;
        font-weight: 500;
        width: 70%;
        align-self: center;
        transition: 0.2s;
        transition-timing-function: ease-out;
        :hover {
          background-color: ${colors.darkorange};
          transform: translate(0, 1px);
        }
        @media (max-width: 380px) {
          font-weight: 600;
        }
      }
      input {
        background-color: transparent;
        border: 2px solid black;
        padding: 12px;
        border-radius: 20px;
        outline: 0;
      }
    }
  }
`;
export default function Register(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <div css={grid}>
        <div className="container">
          <div>
            <div className="h1container">
              <Link href="/login">
                <a>
                  <h1
                    style={{
                      borderBottom:
                        router.pathname === '/login'
                          ? '2px solid black'
                          : 'none',
                    }}
                  >
                    SIGN IN
                  </h1>
                </a>
              </Link>
              <Link href="/register">
                <a>
                  <h1
                    style={{
                      borderBottom:
                        router.pathname === '/register'
                          ? '2px solid black'
                          : 'none',
                    }}
                  >
                    SIGN UP
                  </h1>
                </a>
              </Link>
            </div>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const response = await fetch('/api/register', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    username: username,
                    password: password,
                    token: props.token,
                  }),
                });
                const { success } = await response.json();

                if (success) {
                  router.push('/login');
                } else {
                  if (response.status === 409) {
                    setErrorMessage('User already exists!');
                  } else {
                    setErrorMessage('Failed!');
                  }
                }
              }}
            >
              <h2>Username</h2>
              <input
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
              />
              <h2>Password</h2>
              <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.currentTarget.value)}
              />

              <button>SIGN UP</button>
            </form>

            <p style={{ color: 'red' }}>{errorMessage}</p>
          </div>
        </div>
      </div>
    </>
  );
}
export async function getServerSideProps() {
  const tokens = new (await import('csrf')).default();
  const secret = process.env.CSRF_TOKEN_SECRET;

  if (typeof secret === 'undefined') {
    throw new Error('CSRF_TOKEN_SECRET environment variable not configured!');
  }

  const token = tokens.create(secret);
  return {
    props: { token: token, loggedIn: false },
  };
}
