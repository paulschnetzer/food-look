// import {colors} from "../util/colors"
import { css } from '@emotion/core';
// import Link from 'next/link';
import React, { useState } from 'react';
import { colors } from '../util/colors';
// import Link from 'next/link';
import RenderIng from './RenderIng';

const sidebar = css`
  position: fixed;
  background-color: ${colors.almostwhite};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  left: 0;
  height: 100%;
  overflow-y: auto;
  width: 350px;
  box-shadow: -18px 0px 15px 10px rgba(0, 0, 0, 0.39);
  margin-right: 350px;
  padding: 0 0 50px 0;
  img {
    width: 250px;
    margin: 0 0 0 50px;
    border-radius: 0 0 10px 10px;
    align-self: flex-start;
  }
  form {
    display: flex;
    margin: 10vh 0 30px 0;
  }
  input[type='text'] {
    border: none;
    border-radius: 10px 0 0 10px;
    font-family: 'Lato';
    box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6),
      -9px -9px 16px rgba(255, 255, 255, 0.5);
    outline: 0;
    padding: 15px 10px;
    margin: 0 0 0 20px;
    width: 250px;
    background-color: ${colors.almostwhite};
    :focus {
      background-color: ${colors.lightorange};
      color: ${colors.almostblack};

      ::placeholder {
        color: transparent;
      }
    }
    ::-webkit-input-placeholder {
      color: ${colors.almostblack};
      font-family: Lato;
      font-weight: bold;
      letter-spacing: 0.1rem;
      word-spacing: 0.15rem;
    }
    ::-moz-placeholder {
      color: ${colors.almostblack};
      color: ${colors.almostblack};
      font-family: Lato;
      font-weight: bold;
      letter-spacing: 0.1rem;
      word-spacing: 0.15rem;
    }
    :-ms-input-placeholder {
      color: ${colors.almostblack};
      color: ${colors.almostblack};
      font-family: Lato;
      font-weight: bold;
      letter-spacing: 0.1rem;
      word-spacing: 0.15rem;
    }
    :-moz-placeholder {
      color: ${colors.almostblack};
      color: ${colors.almostblack};
      font-family: Lato;
      font-weight: bold;
      letter-spacing: 0.1rem;
      word-spacing: 0.15rem;
    }
  }
  input[type='submit'] {
    border: none;
    border-radius: 0 15px 15px 0px;
    padding: 0 15px;
    color: ${colors.almostwhite};
    background-color: ${colors.darkorange};
    box-shadow: 9px 9px 16px rgb(163, 177, 198, 0.6);
    transition-timing-function: ease-out;
    transition: 0.2s;
    :hover {
      background-color: ${colors.orange};
      transform: translate(0, 1px);
    }
  }
  .renderItems {
    display: flex;
    max-width: 350px;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .positionfixed {
    position: sticky;
  }
`;
//##############################################################################################################//
let number = 0;
export default function Sidebar(props) {
  // const [userIngArray, setUserIngArray]=useState([])
  const [newUserIng, setNewUserIng] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const ingExists = props.userIngArray.some(
      (item) => item.name === newUserIng,
    );
    if (!ingExists) {
      props.setUserIngArray([
        ...props.userIngArray,
        { ing: newUserIng, id: number++ },
      ]);
      setNewUserIng('');
    }
  }

  return (
    <div css={sidebar}>
      <img src="logo.svg" alt="Logo" />
      <div className="positionfixed">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add an ingredient"
            value={newUserIng}
            onChange={(e) => setNewUserIng(e.target.value)}
            required
          />
          <input type="submit" value="ADD" />
        </form>
        <div className="renderItems">
          <RenderIng
            userIngArray={props.userIngArray}
            setUserIngArray={props.setUserIngArray}
          />
        </div>
      </div>
    </div>
  );
}
