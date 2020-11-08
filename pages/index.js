import { css } from '@emotion/core';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import RenderRecipes from '../components/RenderRecipes';
import nextCookies from 'next-cookies';
import { colors } from '../util/colors';
import { isSessionTokenValid } from '../util/auth';
import { getUserBySessionToken } from '../util/DataBaseUser';
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
  div {
    margin-bottom: 100px;
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
  console.log(props.foodDataBase);
  return (
    <Layout
      userIngArray={userIngArray}
      setUserIngArray={setUserIngArray}
      loggedIn={props.loggedIn}
      admin={props.admin}
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
  const { getRecipesForIndex } = await import('../util/DataBaseIndexQuery');
  const foodDataBase = await getRecipesForIndex();
  const { session: token } = nextCookies(context);
  let admin = await getUserBySessionToken(token);
  const loggedIn = await isSessionTokenValid(token);
  if (admin === undefined || admin.userRoleId !== 1) {
    admin = false;
  } else {
    admin = true;
  }
  console.log(admin);
  return {
    props: {
      foodDataBase: foodDataBase,
      loggedIn: loggedIn,
      admin: admin,
    },
  };
}
