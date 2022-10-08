/* eslint-disable @next/next/no-img-element */
import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router';
import axios from 'axios'
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Store } from '../../utils/Store';
import { HiShoppingBag } from 'react-icons/hi';
import { MdKeyboardBackspace } from 'react-icons/md';
import db from '../../utils/db';
import Product from '../../modles/Product';



export default function ProductScreen(props) {
  const { product } = props;
  const { state, dispatch } = useContext(Store);
  const router = useRouter();

  if (!product) {

    return <Layout title='Product not found     farmfreshz.com FRESH FRUITS , VEGETABLE ,DAIRY PRODUCTS many more to come.  We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact. Only purpose of farmfresh.com is welfare of farmers and serving our community'>
      <div className='text-red-600 font-mono font-bold text-2xl text-center mt-20 '>Product not found !!! </div>
    </Layout>
  }

  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    if (data.countInStock < quantity) {
      return toast.error('Sorry. Product is out of stock');
    }

    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    router.push('/cart');
  };
  return <Layout title={product.name}>



    <div className="text-gray-800 body-font overflow-hidden">
    <Link href="/"><span><MdKeyboardBackspace className ='font-bold text-2xl text-green-800'/></span></Link>
      <div className="container px-5 py-24 mx-auto">
        
        <div className="lg:w-4/5 mx-auto flex flex-wrap ">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={product.image} />
          < div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">

            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.name}</h1>
            <h2 className="text-sm title-font text-gray-800 tracking-widest">{product.subname}</h2>
            <ul className=' mt-5 font-base'>
              <li>



              </li>

              <li>Category: {product.category}</li>
              <li>Price per kg : ₹{product.priceperunit}</li>
              <li>Minimum  deliverable quantity:{product.dqty}</li>


              <li className='mt-6'>{product.description}</li>
            </ul>

            <div className="flex">
              <div className='font-medium text-2xl'>Price </div>
              <span className="font-medium text-2xl text-gray-900">&nbsp;₹ {product.price}</span>
              <button onClick={addToCartHandler} className=" flex justify-center  ml-auto   bg-green-500 hover:bg-green-300 active:bg-green-500 text-blue-900 font-semibold py-1 px-4 border-b-4 border-emerald-600 hover:border-emrald-800 rounded-lg">
                <HiShoppingBag className='mt-1 mr-1 text-lg font-semibold' /> Add to cart
              </button>

            </div>

            
            <div>Status:  {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>




          </div>

        </div>
      </div>
    </div>


  </Layout>


}

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}
