import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout from '../components/Layout';
import { Store } from '../utils/Store';
import {MdNextPlan  } from 'react-icons/md';

export default function PaymentScreen() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error('Payment method is required');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                paymentMethod: selectedPaymentMethod,
            })
        );

        router.push('/placeorder');
    };
    useEffect(() => {
        if (!shippingAddress.address) {
            return router.push('/shipping');
        }
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address]);

    return (
        <Layout title="Payment Method">
            <CheckoutWizard activeStep={2} />
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h1 className="mb-4 text-2xl text-green-800 font-serif">Payment Method</h1>
                {['CashOnDelivery or UPI On Delivery'].map((payment) => (
                    <div key={payment} className=" font-sans text-green-600 text-lg font-semibold mb-4">
                        <input
                            name="paymentMethod"
                            className="p-2 text-green-400 outline-none focus:ring-0 "
                            id={payment}
                            type="radio"
                            checked={selectedPaymentMethod === payment}
                            onChange={() => setSelectedPaymentMethod(payment)}
                        />

                        <label className="p-2" htmlFor={payment}>
                            {payment}
                        </label>
                    </div>
                ))}
                <div className="mb-4 flex justify-between">

                    <button
                        type='button'
                        onClick={() => router.push('/shipping')}
                        className=" flex justify-center   bg-slate-200 hover:bg-slate-300 active:bg-slate-400 text-slate-900 font-semibold py-1 px-4 border-b-4 border-slate-400 hover:border-slate-500 rounded-lg">
                        Back
                    </button>

                    <button
                       
                        className=" flex justify-center    bg-green-500 hover:bg-green-300 active:bg-green-500 text-blue-900 font-semibold py-1 px-4 border-b-4 border-emerald-600 hover:border-emrald-800 rounded-lg">
                        Next  &nbsp;<MdNextPlan className='mt-1' />
                    </button>
                </div>
            </form>
        </Layout>
    );
}

PaymentScreen.auth = true;