/* eslint-disable react/jsx-no-useless-fragment */
import nextCookies from 'next-cookies';
import React from 'react';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Header from '../components/Header';
import { getUserBySessionToken, getUserRecipe } from '../util/DataBaseUser';
import { css } from '@emotion/core';
import { colors } from '../util/colors';
const container1 = css`
  display: grid;
  color: ${colors.almostblack};
  place-items: center;
  background-image: url('background_login.jpg');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  img {
    height: 200px;
  }
  .savedRecipes {
    display: flex;
    background-color: rgba(250, 252, 255, 0.822);
    justify-content: space-around;
    align-items: center;
    padding: 50px;
  }
  .imgContainer {
    height: 200px;
    width: 200px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
  }
  .textContainer {
    width: 200px;
    margin-left: 20vw;
  }
  hr {
    height: 2px;
    background-color: ${colors.almostblack};
    width: calc(400px + 20vw);
    border: none;
    margin: -1px;
    opacity: 60%;
    z-index: 10;
  }
`;

export default function Profile(props) {
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Header loggedIn={props.loggedIn} />
      <div css={container1}>
        <h1>Hi {props.user.userName}! </h1>
        {props.userRecipes.length === 0 ? (
          <h1>sadly no saved recipes</h1>
        ) : (
          <>
            Here are your saved Recipes{' '}
            {props.userRecipes.map((recipe) => {
              return (
                <>
                  <div className="savedRecipes">
                    <div
                      className="imgContainer"
                      style={{
                        backgroundImage: 'url(' + recipe.img + ')',
                      }}
                    />
                    <div className="textContainer">
                      <p>{recipe.name}</p>
                    </div>
                  </div>
                  <hr />
                </>
              );
            })}
          </>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);

  if (!(await isSessionTokenValid(token))) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  // TODO: Actually, you could do this with one query
  // instead of two like done here
  const user = await getUserBySessionToken(token);
  const userRecipes = await getUserRecipe(user.id);

  return {
    props: { user: user, loggedIn: loggedIn, userRecipes: userRecipes },
  };
}
