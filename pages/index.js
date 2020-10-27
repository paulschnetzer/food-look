import { css } from '@emotion/core'
import {coffeeTypes} from "../util/foodDataBase"
import Layout from "../components/Layout"
import RenderAPI from "../components/RenderAPI"
const sidebar = css`
margin: 50px 50px 50px 400px ;
width: calc(100% - 400px);

display:flex;
flex-direction:row;
flex-wrap: wrap;
div{
  display:inline;
  margin:50px;
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
