import React from 'react';

import { css } from '@emotion/core';
import { colors } from '../util/colors';
import Link from 'next/link';

const reder = css`
  text-align: center;
  border-radius: 20px;
  box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
    -9px -9px 16px rgba(255, 255, 255, 0.5);
  margin-left: 2vw;
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
`;
export default function RenderAPI(props) {
  return props.matchingIngObj.map((ing) => {
    return (
      <Link href={'/' + ing.id}>
        <a>
          <div key={ing.id} css={reder}>
            <div
              className="imgcontainer"
              style={{
                backgroundImage: 'url(' + ing.image + ')',
              }}
            />
            <p>{ing.name}</p>
          </div>
        </a>
      </Link>
    );
  });
}
