import React from 'react';

import { css } from '@emotion/core';
import { colors } from '../util/colors';
import Link from 'next/link';

const render = css`
  display: flex;
  flex-direction: column;
  text-align: center;
  border-radius: 20px;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  margin-left: 2vw;
  transition: 0.3s;
  :hover {
    transform: scale(1.02);
  }

  img {
    border-radius: 20px;
    max-height: 280px;
    border-radius: 20px 20px 0 0;
  }
  .imgcontainer {
    height: 300px;
    width: 300px;
    background-color: ${colors.almostwhite};
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    border-radius: 20px 20px 0 0;
    margin: 0;
  }
  .imgcontainer p {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.almostwhite};
    border-radius: 50%;
    margin: -10px 0 0 -10px;
    box-shadow: -6px -4px 15px -5px rgba(0, 0, 0, 0.07);
    padding-bottom: 4px;
    width: 50px;
    height: 50px;
    text-align: center;
    vertical-align: center;
    font-size: 80%;
    font-weight: bold;
  }
`;
export default function RenderRecipes(props) {
  return props.matchingIngObj.map((ing) => {
    return (
      <Link href={'/' + ing.id}>
        <a data-cy={'index-render-recipes-link' + ing.id}>
          <div key={ing.id} css={render}>
            <div
              className="imgcontainer"
              style={{
                backgroundImage: 'url(' + ing.image + ')',
              }}
            >
              <p>{props.simlifiedArray.length + '/' + ing.ing.length}</p>
            </div>
            <p>{ing.name}</p>
          </div>
        </a>
      </Link>
    );
  });
}
