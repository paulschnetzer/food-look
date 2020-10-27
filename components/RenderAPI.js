import React from 'react'
import {coffeeTypes} from "../util/foodDataBase"
export default function RenderAPI() {

  return coffeeTypes.map((ing) => {
    return (
      <div key={ing.id}>
        <div>
          <img src={ing.image} alt="bild"/>
          {console.log(ing.image)}
          <p>{ing.name}</p>
        </div>

      </div>
    );
  });
}
