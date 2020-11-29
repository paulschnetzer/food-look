/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import nextCookies from 'next-cookies';
import Footer from '../components/Footer';
import { useState } from 'react';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Header from '../components/Header';
import { getUserBySessionToken } from '../util/database';
import emailjs from 'emailjs-com';
import { css } from '@emotion/core';
import { colors } from '../util/colors';
const container1 = css`
  color: ${colors.almostwhite};
  background-color: ${colors.darkwhite};

  .textcontainer {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('aboutBackground.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 40vh;
    width: 100%;
    h1 {
      font-size: 200%;
      font-weight: 400;
      letter-spacing: 4px;
      word-spacing: 7px;
      margin-bottom: 20px;
      text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
      margin-top: 0;
      text-align: center;
    }
    p {
      font-size: 90%;
      font-weight: 500;
      letter-spacing: 3px;
      word-spacing: 3px;
      text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
      text-align: center;
    }
  }
`;
const container2 = css`
  width: 100%;
  height: 80vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
  .textbox {
    width: 30vw;
    @media (max-width: 1000px) {
      width: 70vw;
      margin-top: 50px;
    }
  }
  form {
    width: 30vw;
    @media (max-width: 1000px) {
      width: 70vw;
      margin: 50px 0;
    }
    > * {
      margin: 20px 0;
    }
    .button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media (max-width: 480px) {
        flex-direction: column-reverse;
      }
      p {
        margin: 0;
        font-weight: bold;
        color: ${colors.darkorange};
        @media (max-width: 480px) {
          margin: 20px;
        }
      }
      button {
        background-color: ${colors.orange};
        border: none;
        border-radius: 15px;
        width: fit-content;
        padding: 10px 20px;
        font-size: 110%;
        font-family: Lato;
        letter-spacing: 4px;
        font-weight: 600;
        color: ${colors.almostwhite};
        cursor: pointer;
        transition: 0.2s;
        transition-timing-function: ease-out;
        :hover {
          background-color: ${colors.darkorange};
          transform: translate(0, 1px);
        }
      }
    }
  }
  h2 {
    color: ${colors.darkorange};
    font-size: 150%;
    font-weight: 400;
    letter-spacing: 4px;
    word-spacing: 4px;
    margin-top: 0;
    @media (max-width: 1000px) {
      text-align: center;
      margin-bottom: 50px;
    }
    @media (max-width: 480px) {
      text-align: center;
      margin-bottom: 20px;
    }
  }
  p {
    font-size: 80%;
    ${colors.almostblack};
    opacity: 80%;
    font-weight: 400;
    line-height: 30px;
    @media (max-width: 400px) {
      font-size: 13px;
    }
  }
  input {
    width: 100%;
    padding: 12px 12px;
    border-radius: 10px;
    border: 1px solid grey;
  }
  textarea {
    width: 100%;
    border-radius: 10px;
    padding: 10px;
    resize: none;
    padding: 10px 20px;
    border: 1px solid grey;
  }
`;

export default function Profile(props) {
  const [message, setMessage] = useState('');
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        'gmail',
        'template_wxub5jw',
        e.target,
        'user_rC0KUsLQ8Z2A68UhujMZ6',
      )
      .then(
        (result) => {
          console.log(result.text);
          setTimeout(setMessage('Thanks for your Message'), 500);
        },
        (error) => {
          setTimeout(setMessage(error), 500);
        },
      );
    e.target.reset();
  }
  return (
    <>
      <Head>Contact</Head>
      <Header loggedIn={props.loggedIn} />
      <div css={container1}>
        <div className="textcontainer">
          <h1>Hi {props.loggedIn ? props.user.userName : 'there'}! </h1>
          <p>Got something to say?</p>
        </div>
      </div>
      <div css={container2}>
        <div className="textbox">
          <h2>Got any Questions?</h2>
          <p>
            Do you want to be able to add Recipes? Do you want to make a
            complaint? Or do you simply want to have a quick talk about our
            service?
            <br />
            We at Food Look asways have an open ear for constructive Feedback or
            new Ideas. We are reliable on our Users, theirfore we will listen to
            what you have to say. Always putting the Users first is our Goal!
            <br /> So if you have anything to say just drop us a message. We
            will come back to you as soon as possible!
          </p>
        </div>
        <div>
          <form onSubmit={sendEmail}>
            <div>
              <input type="text" placeholder="Name" name="name" required />
            </div>
            <div>
              <input type="email" name="email" placeholder="Email" required />
            </div>
            <div>
              <input
                type="text"
                placeholder="Subject"
                name="subject"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                required
                placeholder="Your Message ..."
                rows="5"
                cols="33"
              />
            </div>
            <div className="button">
              <p>{message}</p>
              <button>Send</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />{' '}
    </>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  let user = false;
  if (loggedIn) {
    user = await getUserBySessionToken(token);
  }
  return {
    props: { user: user, loggedIn: loggedIn },
  };
}
