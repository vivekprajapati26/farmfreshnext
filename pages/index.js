import { useContext } from 'react';
import Layout from '../components/Layout'
import ProductItem from '../components/ProductItem'
import Product from '../modles/Product';
import axios from 'axios'
import db from '../utils/db';
import { Store } from '../utils/Store';
import { toast } from 'react-toastify';



export default function Home({ products }) {

  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const addToCartHandler = async (product) => {
    const existItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      toast.error('Product is out of stock');
      return;
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });

    toast.success('Product added to cart');


  };


  return (

    <Layout >
      <div className='px-4  container mx-auto'>
        <div className="flex flex-wrap mx-2 my-4 ">

          {products.map((product) => (


            <ProductItem product={product} key={product.slug} addToCartHandler={addToCartHandler}></ProductItem>


          ))}




        </div>
      </div>


    </Layout>

  )
}

export async function getServerSideProps() {

  await db.connect();
  const products = await Product.find({ category: { $in: ['Vegetables'] } }).lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };


}
