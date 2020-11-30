import { css } from '@emotion/core';
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import nextCookies from 'next-cookies';
import { colors } from '../util/colors';
import { isSessionTokenValid } from '../util/auth';
import { getUserBySessionToken } from '../util/database';

const footer = () => css`
  width: 100%;
  overflow: hidden;
  @media (max-width: 400px) {
    font-size: 14px;
  }

  section {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 50px;
    .dog {
      @media (max-width: 1050px) {
        display: none;
      }
    }
    img {
      width: 400px;
      border-radius: 5px;
    }
    div {
      width: 30vw;
      margin: 0 20px;
      @media (max-width: 1050px) {
        width: 80vw;
      }
      @media (max-width: 400px) {
        margin: 0px;
      }
      h2 {
        color: ${colors.darkorange};
        font-size: 150%;
        font-weight: 400;
        letter-spacing: 4px;
        word-spacing: 4px;
        @media (max-width: 400px) {
          font-weight: bold;
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
    }
  }

  .backgroundimage {
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
      url('aboutBackground.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: grid;
    place-items: center;
    height: 40vh;
    width: 100%;

    span {
      color: ${colors.almostwhite};
      text-align: center;
      h1 {
        font-size: 300%;
        font-weight: 300;
        letter-spacing: 4px;
        word-spacing: 7px;
        margin-bottom: 20px;
        text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
        margin-top: 0;
      }
      p {
        font-size: 90%;
        font-weight: 500;
        letter-spacing: 3px;
        word-spacing: 3px;
        text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
      }
    }
  }
`;

export default function Home(props) {
  return (
    <>
      <Header loggedIn={props.loggedIn} />
      <div css={footer()}>
        <div className="backgroundimage">
          <span>
            <h1>About Food Look</h1>
            <p>Finding your midweek meal</p>
          </span>
        </div>
        <section>
          <div className="dog">
            <img src="dog.jpg" alt="confused dog" />
          </div>
          <div>
            <h2>What is Food Look?</h2>
            <p>
              Food Look helps you to find your midweek meals. We have a limited
              amount of recipes that we consider easy, quick and affordable.{' '}
              <br />
              Just type in your ingredients in the search bar and find out what
              you can make out of it.
              <br />
              We broke all the recipes down to their core ingredients to show
              you what you can make with as little ingredients as possible.
              Making cooking easy and simple.
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  let admin = await getUserBySessionToken(token);
  const loggedIn = await isSessionTokenValid(token);
  if (admin === undefined || admin.userRoleId !== 1) {
    admin = false;
  } else {
    admin = true;
  }

  return {
    props: {
      loggedIn: loggedIn,
      admin: admin,
    },
  };
}
