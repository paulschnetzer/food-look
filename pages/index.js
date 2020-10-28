import { css } from '@emotion/core'
import {coffeeTypes} from "../util/foodDataBase"
import Layout from "../components/Layout"
import RenderAPI from "../components/RenderAPI"
import { colors } from '../util/colors';
const sidebar = css`
background-color:${colors.almostwhite};
margin: 50px 0 50px 400px ;
width: calc(100% - 400px);

display:flex;
flex-direction:row;
flex-wrap: wrap;
justify-content: space-evenly;

div{
  margin-bottom: 100px;
  height: 380px;
}
`;


export default function Home() {

  return(
<Layout>

<div css={sidebar}>
<RenderAPI/>

</div>
</Layout>

  )
}
