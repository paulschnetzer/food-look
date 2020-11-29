/* eslint-disable jsx-a11y/no-static-element-interactions */
import { colors } from '../util/colors';
import { css } from '@emotion/core';
import Link from 'next/link';
import { useWindowWidth } from '@react-hook/window-size';
import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import { useRouter } from 'next/router';
const header = (router) => css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: ${colors.almostwhite};
  a[href='/'] {
    display: ${router.pathname === '/' ? 'none' : 'visible'};
  }
  a[href='/login'] {
    display: ${router.pathname === '/login' ? 'none' : 'visible'};
  }
  a[href='/register'] {
    display: ${router.pathname === '/register' ? 'none' : 'visible'};
  }
  a[href='/about'] {
    display: ${router.pathname === '/about' ? 'none' : 'visible'};
  }
  a[href='/profile'] {
    display: ${router.pathname === '/profile' ? 'none' : 'visible'};
  }
  a[href='/contact'] {
    display: ${router.pathname === '/contact' ? 'none' : 'visible'};
  }

  .toggleButton {
    height: 50px;
    width: 50px;
    position: fixed;
    right: 25px;
    top: 25px;
    display: none;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${colors.almostwhite};
    border-radius: 50%;
    cursor: pointer;
    div {
      background-color: black;
      height: 4px;
      width: 30px;
      margin: 2px;
      border-radius: 20%;
    }
    @media (max-width: 1000px) {
      display: flex;
      z-index: 20;
    }
  }

  p {
    margin: 0;
    font-size: 90%;
    letter-spacing: 0.2rem;
  }
`;

const navbar = css`
  display: flex;
  width: 100%;
  padding: 0 5% 0 0;
  justify-content: flex-end;
  height: 10vh;
  align-items: center;
  @media (max-width: 1000px) {
    position: fixed;
    top: 0;
    flex-direction: column;
    height: auto;
    padding: 0;
    width: 100%;
    background-color: ${colors.orange};
    color: ${colors.almostwhite};
    z-index: 2;
    a {
      /* display: none; */
      height: 70px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
    }
    img {
      display: none;
    }
  }
  .animation {
    border-bottom: 2px solid ${colors.almostwhite};
    padding-bottom: 4px;
    transition: 0.4s;
    margin: 4px 0 0 4vw;
    @media (max-width: 1000px) {
      border-bottom: none;
      margin: 0;
      padding: 0;
    }
    :hover {
      border-bottom: 2px solid ${colors.almostblack};
      padding-bottom: 4px;
      @media (max-width: 1000px) {
        border-bottom: none;
        padding-bottom: 0;
        background-color: ${colors.darkorange};
      }
    }
  }
  .noanimation {
    border-bottom: 2px solid ${colors.almostwhite};
    padding-bottom: 4px;
    transition: 0.4s;
    margin: 4px 0 0 4vw;
    color: grey;
    cursor: default;
    @media (max-width: 1000px) {
      border-bottom: none;
      margin: 0;
      padding: 0;
    }
  }
  .login {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    height: 80%;
    border-radius: 20px;
    background-color: ${colors.orange};
    color: ${colors.almostwhite};
    transition: 0.2s;
    transition-timing-function: ease-out;
    margin: 4px 0 0 4vw;
    a {
      color: red;
    }
    @media (max-width: 1000px) {
      background-color: transparent;
      height: 70px;
      margin: 0;
      padding: 0;
      border-radius: 0;
      width: 100vw;

      justify-content: center;
    }

    img {
      height: 30px;
      margin-left: 10px;
    }
    :hover {
      background-color: ${colors.darkorange};
      transform: translate(0, 1px);
      @media (max-width: 1000px) {
        transform: translate(0, 0px);
      }
    }
  }
`;

function LinkLogin(props) {
  return (
    <Link href={`${props.redirectPage}`}>
      <a>
        <div className="login">
          <p>{props.loginstatus}</p>

          <img src="user.svg" alt="Logo" />
        </div>
      </a>
    </Link>
  );
}
function LinkSavedRecipes(props) {
  return (
    <Link href={`${props.redirectPage}`}>
      <a className={props.animation} data-cy={'header-saved-recipes-link'}>
        <p>SAVED RECIPES</p>
      </a>
    </Link>
  );
}
export default function Header(props) {
  const router = useRouter();
  const [dropDownNav, setDropDownNav] = useState(false);
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  const adminPassed = props.admin;
  const displayWidth = useWindowWidth();
  if (displayWidth >= 1000 && dropDownNav === false) {
    setDropDownNav(true);
  }
  function handleDropDownNav(e) {
    setDropDownNav(!dropDownNav);
  }

  return (
    <header css={header(router)}>
      <div href="#" className="toggleButton" onClick={handleDropDownNav}>
        <div />
        <div />
        <div />
      </div>
      <CSSTransition
        in={dropDownNav}
        timeout={300}
        classNames="dropDown"
        unmountOnExit
      >
        <div css={navbar} className="navBar">
          <Link href="/">
            <a className="animation" data-cy={'header-home-link'}>
              <p>HOME</p>
            </a>
          </Link>
          <Link href="/about">
            <a className="animation" data-cy={'header-about-link'}>
              <p>ABOUT US</p>
            </a>
          </Link>
          <Link href="/contact">
            <a className="animation">
              <p>CONTACT</p>
            </a>
          </Link>

          {!loggedInPassed ? null : props.loggedIn ? (
            <LinkSavedRecipes
              animation={'animation'}
              redirectPage={'/profile'}
            />
          ) : (
            <LinkSavedRecipes
              animation={'animation'}
              redirectPage={'/register'}
            />
          )}
          {adminPassed ? (
            <Link href="/adminpage">
              <a className="animation" data-cy={'header-admin-link'}>
                <p>ADMIN</p>
              </a>
            </Link>
          ) : null}

          {!loggedInPassed ? null : props.loggedIn ? (
            <LinkLogin
              loginstatus={'LOGOUT'}
              redirectPage={'/logout'}
              data-cy={'header-logout-link'}
            />
          ) : (
            <LinkLogin
              loginstatus={'LOGIN'}
              redirectPage={'/login'}
              data-cy={'header-login-link'}
            />
          )}
        </div>
      </CSSTransition>
    </header>
  );
}
