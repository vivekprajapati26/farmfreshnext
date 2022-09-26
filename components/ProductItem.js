/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React from 'react'

const ProductItem = ({product}) => {
  return (


    <>
      {/* product item */}


      <div className=' lg:w-1/5 md:w-1/4 p-4 w-1/2  shadow-inner shadow-blue-300 rounded-lg'>
        <Link href={`/product/${product.slug}`}>
          <a className="block relative  h-32 lg:h-40 md:h-40  rounded overflow-hidden">
          <img alt={product.name} className="my-auto w-full h-full block  rounded-3xl" src={product.image}/>
          </a>

        </Link>
        <div className="mt-1 text-center " >
          <h2 className="text-gray-500 font-semibold text-xls tracking-widest title-font mb-0">{product.name}</h2>
          <div className="W-3/4   flex justify-center text-lg font-semibold text-red-600 items-center  m-0.5  shadow-blue-">
            <span className="mx-1 text-xl">₹{product.price}/{product.dqty}</span>
            <div className=" flex items-center mx-2">

            </div>
          </div>

          <button className="   w-full  bg-green-300 hover:bg-green-400 active:bg-green-500 text-green-900 font-semibold py-1 px-4 border-b-4 border-emerald-500 hover:border-emrald-600 rounded-xl">
            Add to cart</button>
        </div>
      </div>


    </>
  )
}

export default ProductItem
