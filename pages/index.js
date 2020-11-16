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
} from '../util/DataBase';
import {
  findMatchingObjectBasedOnIng,
  transformTheIngArray,
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
  const simlifiedArray = transformTheIngArray(userIngArray);
  const matchingIngObj = findMatchingObjectBasedOnIng(
    props.foodDataBase,
    simlifiedArray,
  );
  const ingArray = props.allIng.map((ing) => ing.name);
  const uniq = {};
  const mainIngArray = props.mainIng.filter(
    (ing) => !uniq[ing.name] && (uniq[ing.name] = true),
  );

  return (
    <Layout
      userIngArray={userIngArray}
      setUserIngArray={setUserIngArray}
      loggedIn={props.loggedIn}
      admin={props.admin}
      ingArray={ingArray}
      mainIngArray={mainIngArray}
    >
      <div css={grid}>
        <RenderRecipes
          matchingIngObj={matchingIngObj}
          simlifiedArray={simlifiedArray}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { getRecipesForIndex } = await import('../util/DataBase');
  const foodDataBase = await getRecipesForIndex();
  const { session: token } = nextCookies(context);
  let admin = await getUserBySessionToken(token);
  const allIng = await getIngredients();
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
      allIng: allIng,
      mainIng: mainIng,
    },
  };
}
