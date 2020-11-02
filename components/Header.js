import { colors } from '../util/colors';
import { css } from '@emotion/core';
import Link from 'next/link';

const header = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10vh;
  width: 100%;
  background-color: ${colors.almostwhite};
  color: ${colors.almostblack};
  padding: 0 10% 0 0;
  p {
    margin: 0;
    font-size: 90%;
    letter-spacing: 0.2rem;
  }
`;

const navbar = css`
  display: flex;
  width: 45%;
  justify-content: flex-end;
  align-items: center;
  .animation {
    border-bottom: 2px solid ${colors.almostwhite};
    padding-bottom: 4px;
    transition: 0.4s;
    margin: 4px 0 0 4vw;
    :hover {
      border-bottom: 2px solid ${colors.almostblack};
      padding-bottom: 4px;
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

    img {
      height: 30px;
      margin-left: 10px;
    }
    :hover {
      background-color: ${colors.darkorange};
      transform: translate(0, 1px);
    }
  }
`;

export default function Header() {
  return (
    <header css={header}>
      <div css={navbar}>
        <Link href="/">
          <a className="animation">
            <p>ABOUT US</p>
          </a>
        </Link>
        <Link href="/">
          <a className="animation">
            <p>CONTACT</p>
          </a>
        </Link>
        <Link href="/">
          <a className="nope">
            <div className="login">
              <p>LOGIN</p>

              <img src="user.svg" alt="Logo" />
            </div>
          </a>
        </Link>
      </div>
    </header>
  );
}
