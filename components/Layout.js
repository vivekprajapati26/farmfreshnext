import Head from 'next/head'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Footer from './Footer'
import { Store } from '../utils/Store'
import { RiShoppingCartFill } from 'react-icons/ri';
import { ToastContainer } from 'react-toastify';
import { Menu } from '@headlessui/react'
import { signOut, useSession } from 'next-auth/react'
import 'react-toastify/dist/ReactToastify.css'
import DropdownLink from './DropdownLink'
import Cookies from 'js-cookie'



const Layout = ({ children, title }) => {

    const { status, data: session } = useSession();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const [cartItemsCount, setCartItemsCount] = useState(0);

    useEffect(() => {


        setCartItemsCount(cart.cartItems.reduce((a, c) => a + c.quantity, 0))
    }, []);
    const logoutClickHandler = () => {
        Cookies.remove('cart');
        dispatch({ type: 'CART_RESET' });
        signOut({ callbackUrl: '/login' });
    }

    return (

        <>

            <Head>
                <title>{title ? title + '-Farm Freshz' : 'farmfreshz.com Fresh veggies ,fruits, dairy products and many more'}</title>
                <meta name="description" content="farmfreshz.com FRESH FRUITS , VEGETABLE ,DAIRY PRODUCTS many more to come.  We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact. Only purpose of farmfresh.com is welfare of farmers and serving our community 'NO FARMER NO FOOD'" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            < ToastContainer
                position="bottom-center"
                autoClose={200}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                limit={1}
            />
            <div className='flex min-h-screen flex-col justify-between '>
                <div className=" flex flex-col md:flex-row  md:justify-start bg-green-500 shadow-md shadow-blue-300  sticky top-0 z-10  justify-between">
                    <div className="logo ml-1 my-0  flex ">
                        <Image className="rounded-full" src="/logo1.jpg" alt="farmfreshz.com" height={50} width={50} />
                        <div className="font-semibold px-1 py-1 mt-1 text-blue-800  text-xl md:text-2xl lg:text-2xl">farmfreshz.com</div>

                    </div>

                    {/* item list */}

                    <div className="nav flex md:mx-20 lg:mx-20 mx-2 ">
                        <ul className="flex p-1 items-center  space-x-4 md:space-x-8 lg:space-x-8 font-semibold md:text-x1  cursor-pointer hover">
                            <Link href={'/'}><li><a className="active:text-blue-300   rounded-md hover:bg-blue-300">Veggies</a></li></Link>
                            <Link href={'/herbs'}><li><a className="active:text-blue-300  rounded-md hover:bg-blue-300" >Herbs</a></li></Link>
                            <Link href={'/fruits'}><li><a className="active:text-blue-300 rounded-md hover:bg-blue-300">Fruits</a ></li></Link>
                            <Link href={'/exoticveg'}><li><a className="active:text-blue-300 rounded-md hover:bg-blue-300">Exotic</a></li></Link>



                        </ul>
                    </div>


                    {/* Login  and cart*/}


                    <div className=" flex cart absolute right-0 top-0   mx-2">

                        <Link
                            href={'/cart'}> 
                            <a className='mx-2 my-auto flex'><RiShoppingCartFill className='text-2xl text-blue-900' />{cartItemsCount > 0 && (
                                <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                                    {cartItemsCount}
                                </span>

                            )}
                            </a>
                        </Link>

                        {status === 'loading' ? (
                            'Loading'
                        ) :
                            session?.user ? (<Menu as="div" className='relative inline-block'>
                                <Menu.Button className="bg-slate-200 px-2  hover:bg-blue-400 my-3 text-blue-800 font-medium mt-3 lg:mt-3 md:mt-3 rounded-md ">
                                    {session.user.name}

                                    <Menu.Items className='absolute right-0 w-56 origin-top-right rounded-lg border-b-green-400 shadow-lg bg-blue-200'>
                                        <Menu.Item>
                                            <DropdownLink className='dropdown-link' href='/profile'>Profile</DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <DropdownLink className='dropdown-link' href='/order-history'>Order History</DropdownLink>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <a className='dropdown-link' href='#'
                                                onClick={logoutClickHandler}>Logout
                                            </a>
                                        </Menu.Item>


                                    </Menu.Items>
                                </Menu.Button>

                            </Menu>
                            ) :

                                (<Link href='/login'>
                                    <a><button className="bg-slate-200 px-2  hover:bg-blue-400 my-3 text-blue-800 font-medium mt-3 lg:mt-3 md:mt-3 rounded-md ">Login</button></a>
                                </Link>
                                )}





                    </div>



                </div>
                <main className='container m-auto mt-2 px-2' > {children}</main>
                <Footer />


            </div>




        </>
    )
}

export default Layout
