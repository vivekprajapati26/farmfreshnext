import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { getError } from '../utils/error';
import { Store } from '../utils/Store';

export default function PlaceOrderScreen() {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { cartItems, shippingAddress, paymentMethod } = cart;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  ); // 123.4567 => 123.46

  const shippingPrice = itemsPrice > 499 ? 0 : 50;
  const taxPrice = 0;
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  const router = useRouter();
  useEffect(() => {
    if (!paymentMethod) {
      router.push('/payment');
    }
  }, [paymentMethod, router]);

  const [loading, setLoading] = useState(false);

  const placeOrderHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post('/api/orders', {
        orderItems: cartItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
      });
      setLoading(false);
      dispatch({ type: 'CART_CLEAR_ITEMS' });
      Cookies.set(
        'cart',
        JSON.stringify({
          ...cart,
          cartItems: [],
        })
      );
      router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      toast.error(getError(err));
    }
  };

  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-2xl font-mono text-green-800 font-semibold">Place Order</h1>
      {cartItems.length === 0 ? (
        <div className='text-2xl'>
          Cart is empty.   <span  className='text-red-600 text-2xl' ><Link href="/"> Go shopping!!!!</Link></span> 
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <div className="card  p-5 bg-slate-200">
              <h2 className="mb-2 text-lg font-semibold">Shipping Address</h2>
              <div className='font-meium'>
                {shippingAddress.fullname}&nbsp;&nbsp; {shippingAddress.bname}&nbsp;&nbsp;&nbsp;
                {shippingAddress.phone} &nbsp;&nbsp;&nbsp;{shippingAddress.address}
                {shippingAddress.pincode}
              </div>
              <div className=' mt-2 text-red-600'>
                <Link href="/shipping ">Edit</Link>
              </div>
            </div>
            <div className="card  bg-slate-200 p-5">
              <h2 className="mb-2 text-lg font-semibold">Payment Method</h2>
              <div>{paymentMethod}</div>
              <div className=' mt-2 text-red-600' >
                <Link href="/payment">Edit</Link>
              </div>
            </div>
            <div className="card overflow-x-auto p-5  bg-slate-200  ">
              <h2 className="mb-2 text-lg font-semibold">Order Items</h2>
              <table className="min-w-full">
                <thead className="border-b">
                  <tr>
                    <th className="px-5 text-left">Item</th>
                    <th className="    p-5 text-right">Quantity</th>
                    <th className="  p-5 text-right">Price</th>
                    <th className="p-5 text-right">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className='flex justify-between'>
                        <Link href={`/product/${item.slug}`}>
                          <a >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={60}
                              height={60}
                            ></Image>
                            &nbsp;
                            {item.name}
                          </a>
                        </Link>
                      </td>
                      <td className=" p-5 text-right">{item.quantity}</td>
                      <td className="p-5 text-right">₹{item.price}</td>
                      <td className="p-5 text-right">
                        ₹{item.quantity * item.price}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className=' mt-2 text-red-600' >
                <Link href="/cart">Edit</Link>
              </div>
            </div>
          </div>
          <div>
            <div className="card  bg-slate-200 p-5">
              <h2 className="mb-2 font-semibold text-lg">Order Summary</h2>
              <ul>
                <li>
                  <div className="mb-4 flex justify-between">
                    <div>Items</div>
                    <div>₹{itemsPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Tax</div>
                    <div>₹ 0 </div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div>Shipping</div>
                    <div>₹{shippingPrice}</div>
                  </div>
                </li>
                <li>
                  <div className="mb-2 flex justify-between">
                    <div className='font-bold text-lg text-green-800'>Total</div>
                    <div className='font-bold text-lg text-green-800'>₹ {totalPrice}</div>
                  </div>
                </li>
                <li>

                  <button
                      disabled={loading}
                        onClick={placeOrderHandler}
                    className=" flex justify-center w-full   bg-green-500 hover:bg-green-300 active:bg-green-500 text-blue-900 font-semibold py-1 px-4 border-b-4 border-emerald-600 hover:border-emrald-800 rounded-lg">
                    {loading ? 'Loading...' : 'Place Order'}
                  </button>
                  
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

PlaceOrderScreen.auth = true;