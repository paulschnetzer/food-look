import nextCookies from 'next-cookies';

import Head from 'next/head';
import { isSessionTokenValid } from '../util/auth';
// import Header from '../components/Header';
import { getUserBySessionToken } from '../util/DataBaseUser';
import React, { useState } from 'react';
let number = 0;
export default function Profile(props) {
  const [recipeName, setrecipeName] = useState('');
  const [recipeImg, setrecipeImg] = useState('');
  const [recipeLink, setrecipeLink] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');

  function handleSubmitIng(e) {
    e.preventDefault();
    setIngredients([
      ...ingredients,
      { name: newIngredient, id: number++, mainIng: true },
    ]);
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
    const newRecipy = [recipeName, recipeImg, recipeLink, ingredients];
    console.log(newRecipy);
    const response = await fetch('/api/adminpage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRecipy),
    });
    const { success } = await response.json();
    console.log(success);
  }

  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>

      <h1>Profile</h1>

      <h2>Username</h2>
      <p>{props.user.userRoleId === 1 ? 'Admin' : 'No Admin'}</p>
      <form onSubmit={handleUpload}>
        recipeName
        <input
          value={recipeName}
          onChange={(e) => setrecipeName(e.currentTarget.value)}
        />
        <br />
        recipeImg
        <input
          value={recipeImg}
          onChange={(e) => setrecipeImg(e.currentTarget.value)}
        />{' '}
        <br />
        recipeLink
        <input
          value={recipeLink}
          onChange={(e) => setrecipeLink(e.currentTarget.value)}
        />{' '}
        {/* ingredientType
        <input
          type="checkbox"
          name="hello"
          checked={isMainIngredients}
          onChange={() => {
            setIsMainIngredients(!isMainIngredients);
          }}
        /> */}
        <input type="submit" value="ADD" />
        <br /> <br />
      </form>
      <form onSubmit={handleSubmitIng}>
        <input
          type="text"
          placeholder="Add an ingredient"
          value={newIngredient}
          onChange={(e) => setNewIngredient(e.target.value)}
          required
        />
        <input type="submit" value="ADD Ingriedient" />
        {console.log(ingredients)}
      </form>
      {ingredients.map((ing) => {
        return (
          <p key={ing.id}>
            {ing.name}
            <button onClick={() => handleType(ing.id)}>
              {ing.mainIng === true ? 'Main' : 'notMain'}
            </button>
          </p>
        );
      })}
    </>
  );
}

export async function getServerSideProps(context) {
  const { session: token } = nextCookies(context);
  const user = await getUserBySessionToken(token);

  if (!(await isSessionTokenValid(token)) || user.userRoleId !== 1) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return { props: { user } };
}
