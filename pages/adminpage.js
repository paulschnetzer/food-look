import nextCookies from 'next-cookies';
import { css } from '@emotion/core';
import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
import Autocomplete from '../components/Autocomplete';
import { getUserBySessionToken } from '../util/database';
import React, { useState } from 'react';
const grid = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  section {
    border: 2px solid black;
    width: 70vw;
    padding: 50px;
    margin: 20px;
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
    .newIng {
      border: 2px solid black;
      padding: 10px;
      width: 80%;
      margin: 5px 0 5px 25px;
      p {
        margin: 0;
        margin-bottom: 5px;
        text-align: center;
        font-weight: bold;
        text-transform: uppercase;
      }
      .isMain {
        height: 20px;
        width: 20px;
        padding-right: 16px;
        background-color: transparent;
        border: 2px solid black;
        margin-bottom: 10px;
      }
      .delete {
      }
      .buttonContainer {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
      }
    }
    form {
      display: grid;
      place-items: center;
    }
    .ingForm {
      display: flex;
      align-items: flex-start;
      input {
        margin-top: 9px;
      }
    }
    .UploadButton {
      margin-top: 50px;
      background-color: red;
      color: white;
      padding: 20px;
    }

    a {
      color: blue;
    }
  }
  .delete {
    display: flex;
    flex-direction: column;
  }
`;

let number = 0;
export default function Profile(props) {
  const [recipeName, setrecipeName] = useState('');
  const [recipeImg, setrecipeImg] = useState('');
  const [recipeLink, setrecipeLink] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  function handleSubmitIng(e) {
    e.preventDefault();
    number = number + 1;
    setIngredients([
      ...ingredients,
      { name: newIngredient, id: number, mainIng: true },
    ]);
    setNewIngredient('');
  }

  function handleType(id) {
    const newingredients = [...ingredients];
    const ingredientPlusStatus = newingredients.find(
      (guest) => guest.id === id,
    );
    ingredientPlusStatus.mainIng = !ingredientPlusStatus.mainIng;
    setIngredients(newingredients);
  }
  async function handleUpload(e) {
    e.preventDefault();

    const response = await fetch('/api/adminpage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: recipeName,
        img: recipeImg,
        link: recipeLink,
        ingredients: ingredients,
      }),
    });
    const { success } = await response.json();
    console.log(success);
    window.location.reload();
  }
  async function handleDelete(id) {
    const response = await fetch('/api/deleteRecipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    });
    const { success } = await response.json();
    console.log(success);
    window.location.reload();
  }
  function handleDeleteIng(id) {
    const deletedIngArray = ingredients.filter((ing) => {
      return ing.id !== id;
    });
    setIngredients(deletedIngArray);
  }

  return (
    <div css={grid}>
      <Head>
        <title>Profile</title>
      </Head>
      <h1>Add new Recipe</h1>
      <section>
        <div>
          <form onSubmit={handleUpload}>
            recipeName
            <input
              value={recipeName}
              required
              onChange={(e) => setrecipeName(e.currentTarget.value)}
            />
            <br />
            recipeImg
            <input
              value={recipeImg}
              required
              onChange={(e) => setrecipeImg(e.currentTarget.value)}
            />
            <a
              href={
                recipeName.length === 0
                  ? 'https://unsplash.com/'
                  : 'https://unsplash.com/s/photos/' +
                    recipeName.split(' ').join('-')
              }
            >
              Get Pic
            </a>
            <br />
            recipeLink
            <input
              value={recipeLink}
              required
              onChange={(e) => setrecipeLink(e.currentTarget.value)}
            />{' '}
            <br />
            <input type="submit" value="Upload" className="UploadButton" />
            <br /> <br />
          </form>
        </div>
        <div>
          <form onSubmit={handleSubmitIng} className="ingForm">
            <Autocomplete
              input={newIngredient}
              setInput={setNewIngredient}
              suggestions={suggestions}
              setSuggestions={setSuggestions}
              ingArray={props.allIngFromDB}
              top={'0'}
              left={'0'}
              width={'164px'}
              padding={'0px'}
              borderTop={'1px solid black'}
              borderRadius={'0px'}
              position={'relative'}
            />
            <input type="submit" value="add Ingriedient" />
          </form>
          {ingredients.map((ing) => {
            return (
              <div className="newIng" key={ing.id}>
                <p>{ing.name}</p>
                <div className="buttonContainer">
                  <div>
                    isMain?
                    <button
                      className="isMain"
                      onClick={() => handleType(ing.id)}
                    >
                      {ing.mainIng === true ? 'X' : <p />}
                    </button>
                  </div>
                  <button
                    className="delete"
                    onClick={() => handleDeleteIng(ing.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <h1>Delete Recipe</h1>
      <section className="delete">
        {props.foodDataBase.map((recipe) => {
          return (
            <p>
              id:{recipe.id}
              <br /> name:
              {recipe.name}
              <button onClick={() => handleDelete(recipe.id)}>Delete</button>
            </p>
          );
        })}
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const user = await getUserBySessionToken(token);
  const { getRecipesForIndex } = await import('../util/database');
  const foodDataBase = await getRecipesForIndex();
  const { getIngredients } = await import('../util/database');
  const allIngFromDB = await getIngredients();

  if (!(await isSessionTokenValid(token)) || user.userRoleId !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {
      user: user,
      foodDataBase: foodDataBase,
      allIngFromDB: allIngFromDB,
    },
  };
}
