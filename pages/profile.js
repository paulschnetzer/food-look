/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-useless-fragment */
import nextCookies from 'next-cookies';
import Footer from '../components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Header from '../components/Header';
import { getUserBySessionToken, getUserRecipe } from '../util/DataBase';
import { css } from '@emotion/core';
import { colors } from '../util/colors';
import React, { useState } from 'react';
const container1 = css`
  color: ${colors.almostwhite};
  background-color: ${colors.almostwhite};
  min-height: 80vh;
  margin-bottom: 40px;

  img {
    height: 200px;
  }
  .textcontainer {
    background-color: ${colors.darkorange};
    text-align: center;
    padding: 20px;
    margin-bottom: 40px;

    h1 {
      letter-spacing: 3px;
      word-spacing: 4px;
      font-weight: 400;
    }
    p {
      letter-spacing: 2px;
      word-spacing: 3px;
      font-weight: 600;
      font-size: 90%;
      opacity: 90%;
    }
  }

  .recipesGrid {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    width: 100%;
  }
  .savedRecipes {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 40px;
    @media (max-width: 700px) {
      padding: 40px 0;
    }

    .title {
      border-radius: 20px 20px 0 0;
      border: 0;
      p {
        font-size: 130%;
        margin: 10px;
        letter-spacing: 2px;
        word-spacing: 4px;
        font-weight: 400;
        color: ${colors.almostblack};
      }
    }
  }
  .imgContainer {
    height: 250px;
    width: 600px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    justify-content: flex-end;
    align-items: stretch;
    border-radius: 30px;
    background-color: transparent;
    box-shadow: 2px 5px 11px 5px rgba(0, 0, 0, 0.09);
    @media (max-width: 700px) {
      width: 400px;
    }
    @media (max-width: 450px) {
      width: 300px;
    }

    div {
      background-color: white;
      width: 30%;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      border-radius: 0 20px 20px 0;

      p {
        background-color: transparent;
        font-weight: 600;
        font-size: 80%;
        color: ${colors.almostwhite};
      }
      .view {
        height: 100%;
        width: 100%;
        border-top: 2px ${colors.almostwhite} solid;
        background-color: ${colors.orange};
        transition: 0.5s;
        border-radius: 0 0 20px 0;
        cursor: pointer;
        border: 2px ${colors.almostwhite} solid 0;
        :hover {
          background-color: ${colors.darkorange};
        }
        a {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: space-evenly;
          align-items: center;
        }
      }
      .delete {
        background-color: ${colors.orange};
        height: 100%;
        width: 100%;
        border-radius: 0 20px 0 0;
        transition: 0.5s;
        cursor: pointer;
        :hover {
          background-color: ${colors.darkorange};
        }
      }
    }
  }
`;

export default function Profile(props) {
  async function handleDelte(recipeId, userId) {
    const response = await fetch('/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: recipeId,
        userId: userId,
      }),
    });
    const { success } = await response.json();
    console.log(success);
  }
  const [userRecipe, setUserRecipe] = useState(props.userRecipes);
  function handleDelteState(recipe_id) {
    console.log(recipe_id);
    const newUserRecipe = userRecipe;
    const arraydelete = newUserRecipe.filter(
      (recipe) => recipe.recipe_id !== recipe_id,
    );

    setUserRecipe(arraydelete);
  }
  console.log(userRecipe);
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Header loggedIn={props.loggedIn} />
      <div css={container1}>
        {props.userRecipes.length === 0 ? (
          <div className="textcontainer">
            <h1>Hi {props.user.userName}! </h1>
            <p>You dont have any new recipes.</p>
            <p>Check out our awesome Recipes and save some.</p>
          </div>
        ) : (
          <>
            <div className="textcontainer">
              <h1>Hi {props.user.userName}! </h1>
              <p>Here are your favorite Recipes</p>{' '}
            </div>
            <div className="recipesGrid">
              {userRecipe.map((recipe) => {
                return (
                  <>
                    <div className="savedRecipes">
                      <div
                        className="imgContainer"
                        style={{
                          backgroundImage: 'url(' + recipe.img + ')',
                        }}
                      >
                        <div>
                          <div
                            className="delete"
                            onClick={() => {
                              handleDelteState(recipe.recipe_id);
                              handleDelte(recipe.recipe_id, recipe.user_id);
                            }}
                          >
                            <p>Delete</p>
                          </div>

                          <div className="view">
                            <Link href={'/' + recipe.recipe_id}>
                              <a>
                                <p>View</p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </>
        )}
      </div>
      <Footer />
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

  const user = await getUserBySessionToken(token);
  const userRecipes = await getUserRecipe(user.id);

  return {
    props: { user: user, loggedIn: loggedIn, userRecipes: userRecipes },
  };
}
