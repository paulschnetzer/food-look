import { css } from '@emotion/core';
import React, { useState } from 'react';
import Layout from '../components/Layout';
import RenderRecipes from '../components/RenderRecipes';
import { colors } from '../util/colors';
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
  return (
    <Layout userIngArray={userIngArray} setUserIngArray={setUserIngArray}>
      <div css={grid}>
        <RenderRecipes
          matchingIngObj={matchingIngObj}
          simlifiedArray={simlifiedArray}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const { getRecipesForIndex } = await import('../util/DataBaseIndexQuery');
  const foodDataBase = await getRecipesForIndex();

  return {
    props: {
      foodDataBase: foodDataBase,
    },
  };
}
