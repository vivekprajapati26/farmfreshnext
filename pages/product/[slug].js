import React, { useContext } from 'react'
import Layout from '../../components/Layout'
import { useRouter } from 'next/router';
import data from '../../utils/data';
import Link from 'next/link';
import Image from 'next/image';
import { Store } from '../../utils/Store';



export default function ProductScreen() {
  const {state,dispatch} = useContext(Store);

  const { query } = useRouter();
  const { slug } = query;
  const product = data.products.find(x => x.slug === slug);
  if (!product) {

    return <div>
      Product not found
    </div>
  }

  const addToCartHandler =() =>{
    const existItem = state.cart.cartItems.find((x) => x.slug ===slug);
    const quantity =existItem ? existItem.quantity + 1: 1;

    dispatch({type:'CART_ADD_ITEM', payload: {...product, quantity}})

  };

  return <Layout title={product.name} >
    <div className='py-2'>
      <Link href="/">back to products</Link>

      <div className=" p-4 grid md: grid-cols-4 md:gap-2">

        <div className='md:col-span-2 shadow-2xl shadow-green-300 p-2 rounded-lg '>
          <Image src={product.image}
            alt={product.name}
            width={640}
            height={640}
            layout='responsive'

          />

        </div>
        <div>

          <ul className='mx-6 font-base'>
            <li>
              <h1 className='text-blue-900 text-2xl font-bold mb-4 '>{product.name}</h1>


            </li>

            <li>Category: {product.category}</li>
            <li>Price per kg : ₹{product.priceperkg}</li>
            <li>Minimum  deliverable quantity:{product.dqty}</li>


            <li className='mt-6'>{product.description}</li>
          </ul>
        </div>
        <div>
          <div className='card p-4 '>
            <div className='mb-2 flex justify-between'>
              <div className='font-semibold text-lg'>Price </div>
              <div className='text-green-700 font-semibold text-lg' >₹ {product.price}</div>
            </div>
            <div className = 'mb-2 flex justify-between font-base'>
              <div>Status</div>
             <div>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</div>

            </div>
            <button  onClick ={addToCartHandler} className= "   w-full  bg-green-300 hover:bg-green-400 active:bg-green-500 text-green-900 font-semibold py-1 px-4 border-b-4 border-emerald-500 hover:border-emrald-600 rounded-xl">
              Add to cart
            </button>




          </div>
        </div>

      </div>

    </div>
  </Layout>

}


