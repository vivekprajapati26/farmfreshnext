import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react'
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import { TiDelete } from 'react-icons/ti';
import { BsBagCheckFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';
import { toast } from 'react-toastify';


 function CartScreen() {
    const router = useRouter();

    const { state, dispatch } = useContext(Store);

    const {

        cart: { cartItems },
    } = state;

    const removeItemHandler = (item) => {
        dispatch({ type: 'CART_REMOVE_ITEM', payload: item });
    };


    const updateCartHandler = async (item, qty) =>{
        const quantity = Number(qty);
        const {data} = await axios.get(`/api/products/${item._id}`)
        if(data.countInStock< quantity){
            return toast.error('Product is out of stock')
        }
        dispatch({type:'CART_ADD_ITEM', payload: {...item, quantity }});
        toast.success('Product updated in cart')
    };
    return (
        <Layout title='Shopping Cart farmfreshz.com FRESH FRUITS , VEGETABLE ,DAIRY PRODUCTS many more to come.  We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact. Only purpose of farmfresh.com is welfare of farmers and serving our community "NO FARMER NO FOOD" '>
            <h1 className='mb-4 text-3xl text-green-700 font-medium font-mono text-center'> Shopping Cart</h1>
            {
                cartItems.length === 0 ?
                    (<div className='text-red-600 font m-auto font-medium text-center text-xl'>
                        Cart is empty. <Link href='/'> Go Shopping !!!</Link>
                    </div>) :
                    (
                        <div className='grid md:grid-cols-4 md:gap-2'>
                            <div className='overflow-x-auto md:col-span-3'>
                                <table className='min-w-full'>
                                    <thead className='border-b border-b-cyan-200'>
                                        <tr>

                                            <th className=' text-left'>Item</th>
                                            <th className='text-center'>Quantity</th>
                                            <th className=' text-center'>Price(₹) </th>
                                            <th className='  pr-2 '>Delete</th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {cartItems.map((item) => (
                                            <tr key={item.slug} className='border-b border-b-cyan-200'>

                                                <td>
                                                    <Link href={`/product/${item.slug}`}>
                                                        <a className='flex items-center text-lg font-semibold text-green-900'>
                                                            <Image
                                                                src={item.image}
                                                                alt={item.name}
                                                                width={80}
                                                                height={70}></Image>
                                                            &nbsp;&nbsp;&nbsp;
                                                            {item.name}
                                                            &nbsp;&nbsp;&nbsp;
                                                            {item.dqty}



                                                        </a>
                                                    </Link>
                                                </td>
                                                <td className='p-2 text-center  '>
                                                    <select value = {item.quantity}
                                                     onChange={(e)=> updateCartHandler(item, e.target.value)
                                                    }
                                                    >

                                                    {
                                                        [...Array(item.countInStock).keys()].map((x) =>(
                                                            <option key ={x+1} value ={x+1}>
                                                                {x+1}
                                                                 </option>
                                                        ))
                                                    }
                                                    </select>
                                                </td>
                                                <td className='p-2 text-center '>{item.price} </td>
                                                <td className='pl-2 text-center'> <button onClick={() => removeItemHandler(item)} className='text-4xl pl-6'><TiDelete className='text-red-600 ' /></button></td>


                                            </tr>


                                        ))}



                                    </tbody>

                                </table>
                            </div>

                            <div className='card  p-8 mt-2 '>
                                <ul>
                                    <li>
                                        <div className=' text-xl font-semibold text-green-800 pb-3'>
                                            Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)})
                                            {' '}
                                            : ₹{cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                                        </div>
                                    </li>

                                    <li>
                                        <button  
                                        onClick={()=> router.push('login?redirect=/shipping')}
                                        className=" flex justify-center w-full   bg-green-500 hover:bg-green-300 active:bg-green-500 text-blue-900 font-semibold py-1 px-4 border-b-4 border-emerald-600 hover:border-emrald-800 rounded-lg">
                                         Checkout &nbsp;<BsBagCheckFill className= 'mt-1'/>
                                        </button>
                                    </li>

                                </ul>

                            </div>
                        </div>
                    )
            }

        </Layout>
    )
}

export default dynamic(()=> Promise.resolve(CartScreen), {ssr:false})