import React from 'react'
import {coffeeTypes} from "../util/foodDataBase"
import { css } from '@emotion/core'
import {colors} from "../util/colors"


const reder= css`
text-align:center;
border-radius:20px;
box-shadow: 9px 9px 16px rgb(163,177,198,0.6), -9px -9px 16px  rgba(255,255,255, 0.5);
img{
  border-radius:20px;
  width:280px;
  border-radius:20px 20px 0 0 ;
}
`

export default function RenderAPI() {
  return coffeeTypes.map((ing) => {
    return (
      <div key={ing.id} css={reder}>
        <div>
          <img src={ing.image} alt="bild"/>
          {console.log(ing.image)}
          <p>{ing.name}</p>
        </div>
               </div>
    );
  });
}
