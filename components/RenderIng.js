/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import { css } from '@emotion/core';
import { colors } from '../util/colors';

const renderIng = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  div {
    margin: 20px 0 0 20px;
    border-radius: 10px;
    box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
    padding: 8px 15px 10px 20px;
    background-color: ${colors.almostwhite};
    vertical-align: center;
    p {
      display: inline;
      font-size: 80%;
    }

    svg {
      width: 20px;
      height: 20px;
      margin: 0px 0px -5px 10px;
      transition: 0.5s;
      :hover {
        fill: red;
        transform: rotate(180deg);
      }
    }
  }
`;

export default function RenderIng(props) {
  function handleDelte(id) {
    const newUserIngArray = [...props.userIngArray];
    const arraydelete = newUserIngArray.filter(
      (deletedIng) => deletedIng.id !== id,
    );

    props.setUserIngArray(arraydelete);
  }
  return props.userIngArray.map((ing) => {
    return (
      <div css={renderIng} key={ing.id}>
        <div>
          <p>{ing.ing}</p>

          <svg
            height="512pt"
            viewBox="0 0 512 512"
            width="512pt"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => handleDelte(ing.id)}
          >
            <path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0" />
            <path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0" />
            <path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0" />
          </svg>
        </div>
      </div>
    );
  });
}
