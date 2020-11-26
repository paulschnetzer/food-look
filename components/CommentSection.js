import React, { useState } from 'react';
import { css } from '@emotion/core';
import { colors } from '../util/colors';
import Link from 'next/link';
const commentSection = (x) => css`
  display: grid;
  place-items: center;
  width: 100%;
  color: ${colors.almostblack};
  margin-bottom: 50px;
  h1 {
    margin: 30px 0 -40px 0;
  }

  section {
    width: 80%;
    border-top: 2px solid ${colors.almostblack};
  }
  textarea {
    width: 100%;
    border-radius: 20px;
    padding: 20px;
    resize: none;
  }
  form {
    display: flex;
    align-items: flex-end;
    flex-direction: column;
    width: 80vw;
    margin: 50px 0px;
    input {
      background-color: ${colors.orange};
      border: none;
      border-radius: 15px;
      width: fit-content;
      padding: 10px 30px;
      font-size: 110%;
      font-family: Lato;
      letter-spacing: 4px;
      font-weight: 600;
      color: ${colors.almostwhite};
      margin: 10px 0px;
    }
  }
  .alternativeDiv {
    display: grid;
    place-items: center;
    margin: 100px 0px;
    button {
      background-color: ${colors.orange};
      border: none;
      border-radius: 15px;
      width: fit-content;
      padding: 10px 20px;
      font-size: 110%;
      font-family: Lato;
      letter-spacing: 4px;
      font-weight: 600;
      color: ${colors.almostwhite};
      cursor: pointer;
      transition: 0.2s;
      transition-timing-function: ease-out;
      :hover {
        background-color: ${colors.darkorange};
        transform: translate(0, 1px);
      }
      a {
        width: 100%;
        height: 100%;
      }
      img {
        height: 30px;
        width: 30px;
        margin: 0 10px -6px 0;
      }
    }
  }
`;
const oldComments = (x) => css`
  color: ${colors.almostblack};
  border: 1px solid black;
  display: flex;
  flex-direction: column;

  margin-top: 30px;
  background-color: ${colors.darkwhite};
  width: 80vw;
  border-radius: 20px;

  p {
    display: inline-block;
  }
  .userInfo {
    display: flex;
    justify-content: space-between;
    align-items: center;

    text-align: center;
    p {
      margin: 10px 20px;
    }

    .date {
      font-size: 70%;
      font-style: italic;
      opacity: 80%;
    }
    .name {
      font-size: 90%;
      font-weight: bold;
      opacity: 90%;
      color: ${colors.darkorange};
    }
  }
  .userComment {
    background-color: ${colors.almostwhite};
    border-radius: 0 0 20px 20px;
    font-size: 80%;
    p {
      margin: 15px 20px;
    }
  }
`;
const date = new Date().toLocaleDateString('UTC', {
  day: 'numeric',
  year: 'numeric',
  month: 'numeric',
});
export default function CommentSection(props) {
  const [comment, setComment] = useState([]);

  async function handleUpload(e) {
    e.preventDefault();

    const response = await fetch('/api/commentSection', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recipeId: parseInt(props.id),
        userId: props.user.id,
        date: date,
        comment: comment,
      }),
    });
    const { success } = await response.json();
    console.log(success);
    setComment([]);
    props.setUserComments([
      ...props.userComments,
      {
        upload_date: date,
        user_name: props.user.userName,
        comment: comment,
      },
    ]);
  }

  return (
    <div css={commentSection()}>
      <section>
        <div>
          <h1>{props.userComments.length} Comments</h1>
        </div>
        {props.loggedIn ? (
          <div className="newComment">
            <form onSubmit={handleUpload}>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.currentTarget.value)}
                rows="5"
                cols="33"
                placeholder="Your Comment..."
                required
              />
              <input type="submit" value="Send" />
            </form>
          </div>
        ) : (
          <div className="alternativeDiv">
            <Link href="./register">
              <a>
                <button>
                  <img src="pencil.svg" alt="" />
                  Write Comment
                </button>
              </a>
            </Link>
          </div>
        )}

        {props.userComments.map((userComment) => {
          return (
            <div css={oldComments}>
              <div className="userInfo">
                <p className="name">{userComment.user_name}</p>
                <p className="date">{userComment.upload_date}</p>
              </div>
              <div className="userComment">
                <p>{userComment.comment}</p>
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
