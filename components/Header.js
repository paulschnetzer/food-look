import { colors } from '../util/colors';
import { css } from '@emotion/core';
import Link from 'next/link';
import Popup from 'reactjs-popup';

const header = css`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 10vh;
  width: 100%;
  background-color: ${colors.almostwhite};
  z-index: 33;
  opacity: 10;
  color: ${colors.almostblack};
  padding: 0 5% 0 0;
  p {
    margin: 0;
    font-size: 90%;
    letter-spacing: 0.2rem;
  }
`;

const navbar = css`
  display: flex;
  width: 100%;
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
  .noanimation {
    border-bottom: 2px solid ${colors.almostwhite};
    padding-bottom: 4px;
    transition: 0.4s;
    margin: 4px 0 0 4vw;
    color: grey;
    cursor: default;
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
function LinkLogin(props) {
  return (
    <div>
      <Link href={`${props.redirectPage}`}>
        <a>
          <div className="login">
            <p>{props.loginstatus}</p>

            <img src="user.svg" alt="Logo" />
          </div>
        </a>
      </Link>
    </div>
  );
}
function LinkSavedRecipes(props) {
  return (
    <Link href={`${props.redirectPage}`}>
      <a className={props.animation}>
        <p>SAVED RECIPES</p>
      </a>
    </Link>
  );
}
const Tooltip = () => (
  <Popup
    trigger={() => (
      <a className="noanimation">
        <p>SAVED RECIPES</p>
      </a>
    )}
    position="bottom"
    closeOnDocumentClick
  >
    <div
      style={{
        margin: '-10px 0 0 -12px',
        width: '180px',
        textAlign: 'center',
        background: `${colors.darkorange}`,
        borderRadius: '0 0 25px 25px',
        color: `${colors.almostwhite}`,
        padding: '10px 10px 15px 10px ',
        opacity: '90%',
      }}
    >
      Login required
    </div>
  </Popup>
);
export default function Header(props) {
  const loggedInPassed = typeof props.loggedIn !== 'undefined';
  const adminPassed = props.admin;

  return (
    <header css={header}>
      <div css={navbar}>
        <Link href="/">
          <a className="animation">
            <p>ABOUT US</p>
          </a>
        </Link>

        {!loggedInPassed ? null : props.loggedIn ? (
          <LinkSavedRecipes animation={'animation'} redirectPage={'/profile'} />
        ) : (
          <Tooltip />
        )}
        {adminPassed ? (
          <Link href="/adminpage">
            <a className="animation">
              <p>ADMIN</p>
            </a>
          </Link>
        ) : null}

        {!loggedInPassed ? null : props.loggedIn ? (
          <LinkLogin loginstatus={'LOGOUT'} redirectPage={'/logout'} />
        ) : (
          <LinkLogin loginstatus={'LOGIN'} redirectPage={'/login'} />
        )}
      </div>
    </header>
  );
}
