import { css } from '@emotion/core';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import RenderRecipes from '../components/RenderRecipes';
import nextCookies from 'next-cookies';
import { colors } from '../util/colors';
import { isSessionTokenValid } from '../util/auth';
import {
  getUserBySessionToken,
  getIngredients,
  getMainIngredients,
} from '../util/database';
import {
  findMatchingObjectBasedOnIng,
  transformTheIngArray,
  deletesDublications,
} from '../util/helperFunctions';

const grid = css`
  background-color: ${colors.almostwhite};
  margin: 50px 0 50px 350px;
  width: calc(100% - 400px);
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  @media (max-width: 800px) {
    width: 100%;
    margin: 50px 0;
  }
  div {
    width: 300px;
    height: 380px;
    margin-bottom: 50px;
  }
`;

export default function Home(props) {
  const [userIngArray, setUserIngArray] = useState([]);
  const easierUserIngArray = transformTheIngArray(userIngArray);
  const matchingIngObj = findMatchingObjectBasedOnIng(
    props.foodDataBase,
    easierUserIngArray,
  );
  const dbIngArray = props.allIngFromDB.map((ing) => ing.name);
  const dbMainIngArray = deletesDublications(props.mainIng);

  return (
    <Layout
      userIngArray={userIngArray}
      setUserIngArray={setUserIngArray}
      loggedIn={props.loggedIn}
      admin={props.admin}
      dbIngArray={dbIngArray}
      dbMainIngArray={dbMainIngArray}
    >
      <div css={grid}>
        <RenderRecipes
          matchingIngObj={matchingIngObj}
          easierUserIngArray={easierUserIngArray}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getRecipesForIndex } = await import('../util/database');
  const foodDataBase = await getRecipesForIndex();
  const { session: token } = nextCookies(context);
  let admin = await getUserBySessionToken(token);
  const allIngFromDB = await getIngredients();
  const mainIng = await getMainIngredients();
  const loggedIn = await isSessionTokenValid(token);
  if (admin === undefined || admin.userRoleId !== 1) {
    admin = false;
  } else {
    admin = true;
  }

  return {
    props: {
      foodDataBase: foodDataBase,
      loggedIn: loggedIn,
      admin: admin,
      allIngFromDB: allIngFromDB,
      mainIng: mainIng,
    },
  };
}
