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
import { getUserBySessionToken, getUserRecipe } from '../util/database';
import { css } from '@emotion/core';
import { colors } from '../util/colors';
import React, { useState } from 'react';
const container1 = css`
  color: ${colors.almostwhite};
  background-color: ${colors.darkwhite};
  min-height: 80vh;
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
  .recipesGrid {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    height: auto;
  }
`;

const container2 = (recipe) => css`
  display: grid;
  grid-template-columns: 100px 600px 100px;
  grid-template-rows: 20px 200px 20px;
  margin: 50px 0px;
  @media (max-width: 900px) {
    grid-template-columns: 80vw;
    grid-template-rows: 1fr;
  }

  .backgroundContainer {
    grid-column: 1 / 3;
    grid-row: 2 / 4;
    background-color: ${colors.almostwhite};
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 30px;
    border-radius: 10px;

    box-shadow: -5px -5px 10px #e8e8e8, 5px 5px 10px #e8e8e8;
    @media (max-width: 900px) {
      display: none;
    }
    p {
      font-size: 300%;
      font-weight: 600;
      color: ${colors.almostblack};
      opacity: 90%;
      text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.1);
    }
  }
  .frontContainer {
    grid-column: 2 / 4;
    grid-row: 1 / 3;
    display: flex;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    box-shadow: 15px -5px 10px #e8e8e8;
    background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
      url('${recipe.img}');
    border-radius: 10px;
    @media (max-width: 900px) {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
      flex-direction: column;
    }
    .title {
      margin-top: 30px;
      display: inline-block;
      width: fit-content;
      background-color: ${colors.almostwhite};
      border-radius: 0 10px 10px 0;
      @media (max-width: 900px) {
        background-color: hsla(216, 100%, 99%, 0.85);
        margin: 10% 0;
        width: 100%;
        text-align: center;
        border-radius: 10px;
        transform: scale(0.8);
      }
      h2 {
        display: inline-block;
        margin: 10px 20px;
        color: ${colors.almostblack};
        opacity: 90%;
        letter-spacing: 4px;
        word-spacing: 7px;

        text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
      }
    }
    .text {
      margin: 0 100px 10px 20px;
      @media (max-width: 900px) {
        margin: 0 10% 20px 10%;
        font-size: 80%;
      }
      p {
        font-size: 80%;
        line-height: 25px;
        letter-spacing: 2px;
        word-spacing: 2px;
        opacity: 90%;
        margin-top: 0;
      }
    }
    .buttoncontainer {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      margin: 5px -20px 5px 0;
      @media (max-width: 900px) {
        margin: 0 25px -25px 25px;
        flex-direction: row;
      }

      .delete,
      .view {
        background-color: ${colors.orange};
        width: 50px;
        height: 50px;
        border-radius: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition-timing-function: ease-out;
        transition: 0.2s;

        :hover {
          background-color: ${colors.darkorange};
          transform: translate(0, 1px);
        }
      }
      .view {
        img {
          height: 23px;
          width: 23px;
        }
      }
      .delete {
        img {
          height: 20px;
          width: 20px;
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
            <p>You don't have any new recipes.</p>
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
                    <div css={container2(recipe)}>
                      <div className="backgroundContainer">
                        <div>
                          <p>{userRecipe.indexOf(recipe) + 1}</p>
                        </div>
                      </div>
                      <div className="frontContainer">
                        <div>
                          <div className="title">
                            <h2>{recipe.name}</h2>
                          </div>
                          <div className="text">
                            <p>
                              We hope you enjoyed cooking this recipe from Food
                              Look {props.user.userName}.
                              <br /> This as well as the other recipes are super
                              easy to make.
                              <br /> If you want to make it again just hit the
                              visit Button.
                            </p>
                          </div>
                        </div>
                        <div className="buttoncontainer">
                          <div
                            className="delete"
                            onClick={() => {
                              handleDelteState(recipe.recipe_id);
                              handleDelte(recipe.recipe_id, recipe.user_id);
                            }}
                          >
                            <img src="delete2.svg" />
                          </div>

                          <Link href={'/' + recipe.recipe_id}>
                            <a>
                              <div className="view">
                                <img src="link.svg" />
                              </div>
                            </a>
                          </Link>
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
