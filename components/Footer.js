import { css } from '@emotion/core';
import { colors } from '../util/colors';
import Link from 'next/link';
import { useRouter } from 'next/router';
const footer = (router) => css`
  background-color: ${router.pathname === '/profile'
    ? '#f0f0f0'
    : 'transparent'};
  height: 160px;
  width: 100%;
  color: ${colors.almostblack};
  display: flex;
  justify-content: center;
  padding-left: ${router.pathname === '/' ? '350px' : '0px'};
  @media (max-width: 1000px) {
    padding-left: 0;
  }
  section {
    width: 90%;
    height: 100%;
    border: 2px solid ${colors.almostblack};
    border-bottom: 0;
    border-radius: 20px 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${colors.almostwhite};
  }

  p {
    font-size: 60%;
    font-weight: 600;
    text-align: center;
    line-height: 20px;
    margin: 10px 0 0 0;
  }
  .iconbar {
    display: flex;
    width: 40vw;
    justify-content: space-between;
    @media (max-width: 750px) {
      width: 100%;
    }

    img {
      height: 50px;
      transition: 0.1s;
      :hover {
        transform: scale(1.1);
      }
    }
  }
`;

export default function Footer() {
  const router = useRouter();
  return (
    <footer css={footer(router)}>
      <section>
        <div>
          <div className="iconbar">
            <div>
              <Link href={'https://github.com/paulschnetzer'}>
                <a data-cy={'footer-github-link'}>
                  <img
                    src="github.svg"
                    alt="Girl in a jacket"
                    width="50"
                    height="50"
                  />
                </a>
              </Link>
            </div>
            <div>
              <Link
                href={'https://www.linkedin.com/in/paul-schnetzer-8a8b87198/'}
              >
                <a data-cy={'footer-linkedin-link'}>
                  <img
                    src="linkedin.svg"
                    alt="Girl in a jacket"
                    width="50"
                    height="50"
                  />
                </a>
              </Link>
            </div>
            <div>
              <Link
                href={
                  'https://mail.google.com/mail/?view=cm&source=mailto&to=paulschnetzer98@gmail.com'
                }
              >
                <a data-cy={'footer-email-link'}>
                  <img
                    src="email.svg"
                    alt="Girl in a jacket"
                    width="50"
                    height="50"
                  />
                </a>
              </Link>
            </div>
          </div>
          <div>
            <p>
              Copyright 2020 <br />
              All rights reserved. Powered by Paul Schnetzer
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
