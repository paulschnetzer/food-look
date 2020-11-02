import Header from '../components/Header';
import Link from 'next/link';
import React from 'react';
//import { foodDataBase } from '../util/foodDataBase';
import { css } from '@emotion/core';
import { colors } from '../util/colors';

const container1 = css`
  display: grid;
  grid-template-columns: 35% 5% 40%;
  grid-template-rows: 25% 5% 60% 5% 1fr;
  margin-bottom: 190px;

  justify-content: center;
  h1 {
    padding: 0;
    grid-column: 1 / 4;
    grid-row: 1 / 1;
    text-decoration: underline;
    display: inline;
    text-transform: uppercase;
    font-size: 300%;
    font-weight: lighter;
    letter-spacing: 4px;
    word-spacing: 6px;
  }
  .picture {
    grid-column: 1 / 3;
    grid-row: 3 / 4;
    background-color: ${colors.almostwhite};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    z-index: 55;
    border-radius: 20px;
  }
  .textbox {
    grid-column: 2 / 4;
    grid-row: 2 / 6;
    width: 100%;
    background-color: #fff1bf;
    background-color: #f68920;
    color: ${colors.almostwhite};
    padding: 5% 5% 5% 20%;
    border-radius: 20px;
    h2:first-child {
      display: inline;
      font-size: 100%;
      font-weight: 400;
      letter-spacing: 3px;
      word-spacing: 5px;
      line-height: 180%;
      opacity: 90%;
      border-bottom: none;
    }
    h2 {
      display: inline;
      text-transform: uppercase;
      font-size: 130%;
      font-weight: 500;
      border-bottom: 2px solid ${colors.almostwhite};
      letter-spacing: 3px;
      word-spacing: 5px;
    }
    p {
      opacity: 80%;
      font-size: 90%;
    }
    ol {
      padding: 10px 0;
    }
    li {
      opacity: 90%;
      font-size: 90%;

      line-height: 150%;
      letter-spacing: 1.5px;
      word-spacing: 2px;
      margin-left: 20px;

      :first-letter {
        text-transform: uppercase;
      }
      img {
        height: 20px;
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
        <p>
          Sure if you have {props.food.spices.join(', ')} laying around this
          would add some more flavor to it but its not essetial.
        </p>
      </p>
    </div>
  );
}

export default function ProductPage(props) {
  const food = foodDataBase.find((currentRecipe) => {
    if (currentRecipe.id === props.id) {
      return true;
    }
    return false;
  });
  return (
    <>
      <Header />{' '}
      <div css={container1}>
        <div
          style={{
            backgroundImage: 'url(' + food.image + ')',
          }}
          className="picture"
        />
        <div className="textbox">
          <h2>
            Enjoy no trouble
            <br />
            <h2> {food.name}</h2>
          </h2>

          <p>
            If we are honest with our selfs this recipe only need{' '}
            <b>{food.ing.length}</b> real ingredients:
          </p>
          <ol css={opacitiy}>
            {food.ing.map((ing) => {
              return <li>{ing}</li>;
            })}
          </ol>
          {food.spices.length !== 0 ? <Spices food={food} /> : null}

          <p>
            You can use this{' '}
            {
              <Link href={food.link}>
                <a>recepy</a>
              </Link>
            }{' '}
            as giadance but reber, only {food.ing.length} ingredients are really
            neccercary &#128521;{' '}
          </p>
        </div>
        <h1>{food.name}</h1>
      </div>
    </>
  );
}

export function getServerSideProps(context) {
  return {
    props: { id: context.query.dynamicPage },
  };
}
