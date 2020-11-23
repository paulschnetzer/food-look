import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import React from 'react';
import { css } from '@emotion/core';
import { colors } from '../util/colors';
import nextCookies from 'next-cookies';
import { isSessionTokenValid } from '../util/auth';
import {
  getUserBySessionToken,
  getUserRecipe,
  getComment,
} from '../util/database';
import { useState } from 'react';
import CommentSection from '../components/CommentSection';

const container1 = css`
  display: grid;
  grid-template-columns: 35% 5% 40%;
  grid-template-rows: 25% 5% 60% 5% 1fr;
  margin-bottom: 150px;

  justify-content: center;
  @media (max-width: 1000px) {
    grid-template-columns: 1fr;
    grid-template-rows: 150px 300px 1fr;
    margin: 50px 30px;
  }
  @media (max-width: 500px) {
    margin: 50px 0;
  }
  h1 {
    padding: 0;
    grid-column: 1 / 4;
    grid-row: 1 / 1;
    display: block;
    text-transform: uppercase;
    font-size: 300%;
    font-weight: 300;
    letter-spacing: 4px;
    word-spacing: 6px;
    border-bottom: 2px solid ${colors.almostblack};
    @media (max-width: 1000px) {
      grid-column: 1 / 1;
      grid-row: 1 / 1;
      text-align: center;
      margin-bottom: 50px;
      font-size: 200%;
      border: none;
    }
    @media (max-width: 450px) {
      font-size: 150%;
      border: none;
    }
  }
  .picture {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-color: ${colors.almostwhite};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 2;
    border-radius: 20px;

    @media (max-width: 1000px) {
      grid-column: 1 / 1;
      grid-row: 2 / 2;
      border-radius: 20px 20px 0 0;
      display: flex;
      justify-content: center;
      z-index: 0;
    }
    @media (max-width: 500px) {
      border-radius: 0;
      z-index: 0;
    }
    button {
      background-color: ${colors.orange};
      height: 55px;
      width: 55px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      margin: -10px 0 0 0;
      border: none;
      cursor: pointer;
      transition: 0.2s;
      transition-timing-function: ease-out;
      img[src='checked.svg'] {
        height: 30px;
      }
      img[src='addRecipe.svg'] {
        height: 40px;
      }
      :hover {
        background-color: ${colors.darkorange};
        transform: translate(0, 1px);
      }
    }
    .noAnimation {
      background-color: grey;
      :hover {
        background-color: grey;
        transform: translate(0, 0px);
      }
    }
  }
  .textbox {
    grid-column: 2 / 4;
    grid-row: 2 / 6;
    width: 100%;
    background-color: ${colors.almostwhite};
    box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
    color: ${colors.almostblack};
    padding: 5% 5% 5% 20%;
    border-radius: 20px;
    @media (max-width: 1000px) {
      grid-column: 1 / 1;
      grid-row: 3 / 3;
      border-radius: 0 0 20px 20px;

      padding: 10%;
    }
    @media (max-width: 500px) {
      border-radius: 0;
      background-color: ${colors.almostwhite};
      box-shadow: none;
    }

    h2 {
      text-transform: uppercase;
      font-size: 130%;
      font-weight: 500;
      padding-bottom: 20px;
      color: ${colors.darkorange};
      letter-spacing: 3px;
      word-spacing: 5px;
      border-bottom: 2px solid ${colors.almostblack};
      text-align: center;
      margin-bottom: 5px;
    }
    p {
      opacity: 80%;
      font-size: 80%;
      line-height: 30px;
    }
    ol {
      padding: 10px 0;
      list-style-type: none;
      margin: 0;
    }
    li {
      opacity: 100%;
      font-size: 70%;
      font-weight: bold;
      line-height: 200%;
      letter-spacing: 1.5px;
      word-spacing: 2px;
      text-align: center;

      :first-letter {
        text-transform: uppercase;
      }
    }

    a {
      color: ${colors.darkorange};
      font-weight: bold;
      text-decoration: underline;
    }
  }
`;
const opacitiy = css`
  opacity: 95%;
  font-size: 130%;
`;

function Spices(props) {
  return (
    <div>
      <p>
        Sure if you have {props.food.spices.join(', ')} laying around this would
        add some more flavor to it but its not essetial.
      </p>
    </div>
  );
}

export default function ProductPage(props) {
  function isRecipeSaved() {
    const savedRecipeIds = props.userRecipes.map(
      (userRecipe) => userRecipe.recipe_id,
    );
    return savedRecipeIds.includes(parseInt(props.id));
  }
  const [recipeSavedStatus, setRecipeSavedStatus] = useState(isRecipeSaved());

  const food = props.foodDataBase.find((currentRecipe) => {
    if (currentRecipe.id.toString() === props.id) {
      return true;
    }
    return false;
  });
  async function handleUpload(e) {
    e.preventDefault();
    setRecipeSavedStatus(true);

    const response = await fetch('/api/dynamicpage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: props.id,
        userId: props.user.id,
      }),
    });
    const { success } = await response.json();
  }
  return (
    <>
      <Header loggedIn={props.loggedIn} />{' '}
      <div css={container1}>
        <div
          style={{
            backgroundImage: 'url(' + food.img + ')',
          }}
          className="picture"
        >
          {props.loggedIn ? (
            <button onClick={handleUpload}>
              <img
                src={recipeSavedStatus ? 'checked.svg' : 'addRecipe.svg'}
                alt="Logo"
              />
            </button>
          ) : (
            <button className="noAnimation">
              <img src="addRecipe.svg" alt="Logo" />
            </button>
          )}
        </div>
        <div className="textbox">
          <p>
            If we are honest with our selfs this recipe only need{' '}
            <b>{food.ingredients.length}</b> real ingredients. All recipes here
            are very basic in its core, including this one.
          </p>
          {food.spices.length !== 0 ? <Spices food={food} /> : null}
          <h2>ingredients</h2>
          <ol css={opacitiy}>
            {food.ingredients.map((ing) => {
              return <li>{ing}</li>;
            })}
          </ol>

          <p>
            You can use this{' '}
            {
              <Link href={food.link}>
                <a>recepy</a>
              </Link>
            }{' '}
            as giadance but reber, only {food.ingredients.length} ingredients
            are really neccercary &#128521;{' '}
          </p>
        </div>
        <h1>{food.name}</h1>
      </div>
      <CommentSection
        user={props.user}
        id={props.id}
        userComments={props.userComments}
      />
      <Footer />
    </>
  );
}

export async function getServerSideProps(context) {
  const { getRecipesForProductPage } = await import('../util/database');
  const { session: token } = nextCookies(context);
  const loggedIn = await isSessionTokenValid(token);
  const foodDataBase = await getRecipesForProductPage();
  const userComments = await getComment(context.query.dynamicPage);

  let user = false;
  let userRecipes = [];
  if (loggedIn) {
    user = await getUserBySessionToken(token);
    userRecipes = await getUserRecipe(user.id);
  }

  return {
    props: {
      id: context.query.dynamicPage,
      foodDataBase: foodDataBase,
      loggedIn: loggedIn,
      user: user,
      userRecipes: userRecipes,
      userComments: userComments,
    },
  };
}
