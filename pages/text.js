import Head from 'next/head';
import Layout from '../../components/Layout';
import { users as foodDataBase } from '../util/foodDataBase';

export default function ProductPage(props) {
  const food = foodDataBase.find((currentRecipe) => {
    if (currentRecipe.id === props.id) {
      return true;
    }

    return false;
  });

  return (
    <Layout>
      <Head>
        <title>Single User</title>
      </Head>
      user id: {props.id}
      <br />
      user firstName: {food.firstName}
      <br />
      user lastName: {food.lastName}
      <br />
    </Layout>
  );
}

// This is run by Next.js BEFORE the component
// above is run, and passes in the props
export function getServerSideProps(context) {
  // context = {
  //   query: { id: '1' },
  //   params: { id: '1' },
  // }
  return {
    props: { id: context.query.id },
  };
}
