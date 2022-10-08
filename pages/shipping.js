import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../components/CheckoutWizard'
import Layout from '../components/Layout'
import {MdNextPlan  } from 'react-icons/md';
import { Store } from '../utils/Store';

import Cookies from 'js-cookie';
import  { useRouter } from 'next/router';


export default function ShippingScreen() {

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  

  } = useForm();

  const {state, dispatch }= useContext(Store);
  const {cart } = state;
  const {shippingAddress } = cart ;
  const router = useRouter();

  useEffect(() => {
    
  
    setValue('fullname' , shippingAddress.fullname);
    setValue('bname' , shippingAddress.bname);
    setValue('address' , shippingAddress.address);
    setValue('pincode' , shippingAddress.pincode);
    setValue('phone' , shippingAddress.phone);

  }, [setValue, shippingAddress]);


  const submitHandler = ({bname ,fullname ,address, pincode, phone  }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload:{bname, fullname ,address, pincode, phone  }
    });
    Cookies.set( 'cart', JSON.stringify({...cart,
    shippingAddress:{ bname, fullname ,address, pincode, phone}, 
   
  })

  );
  router.push('/payment')

  };

  return (
    <Layout title='Shipping Address - farmfreshz.com   FRESH FRUITS , VEGETABLE ,DAIRY PRODUCTS many more to come.  We are a group of more than 2000 + farmers serving our customers daily. We deliver our fresh produce to our customers immediately after harvest , so that quality and freshness remain intact. Only purpose of farmfresh.com is welfare of farmers and serving our community '>



      <CheckoutWizard activeStep={1} />
      <form
        className='mx-auto max-w-screen-md '
        onSubmit={handleSubmit(submitHandler)}
      >

        <h1 className=' mb-4 text-3xl text-green-700 font-medium font-mono text-center'>Shipping Address</h1>

        <div className='mb-4 '>
          < label className='font-semibold' htmlFor='bname '>Bussiness Name</label>
          <input
            className='w-full p-1 border-green-600 border rounded-md'
            id='bname'
            autoFocus
            {...register('bname', {
              required: 'Please enter Cafe/Hotel/Dark store/Resturant/Bussiness name',
            })} />
          {errors.bname && (
            <div className='text-red-500'>{errors.bname.message}</div>
          )}
        </div>

        {/* Name */}

        <div className='mb-4 '>
          < label className='font-semibold' htmlFor='fullname'> Name</label>
          <input
            className='w-full p-1 border-green-600 border rounded-md'
            id='fullname'
            autoFocus
            {...register('fullname', {
              required: 'Please enter your name',
            })} />
          {errors.fullname && (
            <div className='text-red-500'>{errors.fullname.message}</div>
          )}
        </div>


         {/* Name */}

         <div className='mb-4 '>
          < label className='font-semibold' htmlFor='address'> Address</label>
          <input
            className='w-full p-1 border-green-600 border rounded-md'
            id='address'
            autoFocus
            {...register('address', {
              required: 'Please enter your address',
              minLength: {value: 3 , message : 'Address is more than 2 char'}
            })} />
          {errors.address && (
            <div className='text-red-500'>{errors.address.message}</div>
          )}
        </div>


        {/* Pincode */}


        <div className='mb-4 '>
          < label className='font-semibold' htmlFor='pincode'>Pincode</label>
          <input
            className='w-full p-1 border-green-600 border rounded-md'
            id='pincode'
            autoFocus
            {...register('pincode', {
              required: 'Please enter your pincode',

            })} />
          {errors.pincode && (
            <div className='text-red-500'>{errors.pincode.message}</div>
          )}
        </div>

        {/* Phone number*/}


        <div className='mb-4 '>
          < label className='font-semibold' htmlFor='phone'>Mobile Number</label>
          <input
            className='w-full p-1 border-green-600 border rounded-md'
            id='phone'
            autoFocus
            {...register('phone', {
              required: 'Please enter your Mobile Number',

            })} />
          {errors.phone && (
            <div className='text-red-500'>{errors.phone.message}</div>
          )}
        </div>

        <div className=' flex justify-center'>

          <button
            
            className=" flex justify-center w-1/3    bg-green-500 hover:bg-green-300 active:bg-green-500 text-blue-900 font-semibold py-1 px-4 border-b-4 border-emerald-600 hover:border-emrald-800 rounded-lg">
            Checkout &nbsp;<MdNextPlan className='mt-1' />
          </button>
        </div>


      </form>

    </Layout>
  )
}

ShippingScreen.auth = true;
