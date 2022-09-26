import Head from 'next/head'
import Link from 'next/link'
import React, { useContext } from 'react'
import Image from 'next/image'
import Footer from './Footer'
import { Store } from '../utils/Store'



const Layout = ({ children, title }) => {

    const{state, dispatch} = useContext(Store);
    const {cart} = state;

   
    return (

        <>

            <Head>
                <title>{title?title+'-Farm Freshz':'farmfreshz.com Fresh veggies ,fruits, dairy products and many more'}</title>
                <meta name="description" content="farmfreshz.com FRESH FRUITS , VEGETABLE ,DAIRY PRODUCTS many more to come.  We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact. Only purpose of farmfresh.com is welfare of farmers and serving our community" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='flex min-h-screen flex-col justify-between '>
            <div className=" flex flex-col md:flex-row  md:justify-start bg-green-400 shadow-md shadow-blue-300  sticky top-0 z-10  justify-between">
                <div className="logo ml-1 my-0  flex ">
                    <Image className="rounded-full" src="/logo1.jpg" alt="farmfreshz.com" height={50} width={50} />
                    <div className="font-semibold px-1 py-1 mt-1 text-blue-800  text-xl md:text-2xl lg:text-2xl">farmfreshz.com</div>

                </div>

                {/* item list */}

                <div className="nav flex md:mx-20 lg:mx-20 mx-2 ">
                    <ul className="flex p-1 items-center  space-x-4 md:space-x-8 lg:space-x-8 font-semibold md:text-x1  cursor-pointer hover">
                        <Link href={'/'}><li><a className="active:text-blue-300  hover:shadow-lg  rounded-md hover:bg-green-800">Veggies</a></li></Link>
                        <Link href={'/herbs'}><li><a className="active:text-blue-300  rounded-md hover:bg-green-600" >Herbs</a></li></Link>
                        <Link href={'/fruits'}><li><a className="active:text-blue-300 rounded-md hover:bg-green-600">Fruits</a ></li></Link>
                        <Link href={'/exoticveg'}><li><a className="active:text-blue-300 rounded-md hover:bg-green-600">Exotic</a></li></Link>
                        
                        

                    </ul>
                </div>


                {/* Login  and cart*/}


                <div className=" flex cart absolute right-0 top-0   mx-2">

                    <Link
                        href={'/login'}>
                        <a className='mx-2 my-auto'>Cart{cart.cartItems.length > 0 && (
                            <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white'>
                                {cart.cartItems.reduce((a,c) => a + c.quantity , 0 )}
                            </span>
                        
                        )}
                        </a>
                    </Link>

                    <Link
                        href={'/login'}>
                        <a><button className="bg-slate-200 px-2  hover:bg-blue-400 my-3 text-blue-800 font-medium mt-3 lg:mt-3 md:mt-3 rounded-md ">Login</button></a>
                    </Link>





                </div>



            </div>
                <main className='container m-auto mt-2 px-2' > {children}</main>
                <Footer/>

                
            </div>

            


        </>
    )
}

export default Layout
