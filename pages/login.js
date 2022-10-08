/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import React, { useEffect } from 'react' 
import Layout from '../components/Layout'
import { useForm } from 'react-hook-form'
import {signIn, useSession} from 'next-auth/react'
import { getError } from '../utils/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'




export default function LoginScreen() {


  const {data: session} = useSession();

  const router = useRouter();
  const { redirect}= router.query;
  useEffect(() => {
    
  if(session?.user){
    router.push(redirect||'/');
  }
  
  }, [router, session , redirect]);

  const {
    handleSubmit, 
    register,  
    formState: { errors } ,
  } = useForm();

  const submitHandler = async ({email, password}) =>{
    try {
      const result = await signIn('credentials', {
        redirect: false , 
        email,
        password,
      });
      if(result.error){
        toast.error(result.error);
      }
      
    } catch (err) {
      toast.error(getError(err));

    }

  };
  return (
    <>

      <Layout  title = 'LOGIN - farmfreshz.com Fresh veggies ,fruits, dairy products and many more'>
        <div className="  bg-gray-200  container py-4 px-1 ">
        
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800">
            <div className="xl:w-10/12">
              <div className="block bg-white shadow-lg rounded-lg">
                <div className="lg:flex lg:flex-wrap g-0">
                  <div className="lg:w-6/12 px-4 md:px-0">
                    <div className="md:p-12 md:mx-6">

                      <div className="text-center">
                        <img
                          className="mx-auto lg:w-48 md:w-48 w-28"
                          src="/logo1.jpg"
                          alt="logo"
                        />
                        <h4 className="text-xl font-semibold mt-1 mb-6 pb-1">Your friendly farmers at your doorstep</h4>
                      </div>
                      <form onSubmit = {handleSubmit(submitHandler)}>
                        <p className="mb-2 text-center  font-bold text-2xl text-green-900 ">Please login to your account</p>
                        <p className="mb-2 text-center">or</p>
                        <Link href={`/register?redirect=${redirect || '/'}`}><div className="mb-2 text-center text-red-600 active:bg-green-200 font-semibold cursor-pointer"><button className="bg-transparent hover:bg-green-400 text-blue-600 font-semibold hover:text-white py-2 px-4  w-60 border border-blue-400 hover:border-transparent rounded"> SignUp/ Create An Account</button></div></Link>
                        <div className="mb-4">
                          <input
                          {...register('email',{required:'Please enter email',
                            pattern: { value : /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-]+$/i, message:
                          'Please enter a valid email address'} 
                          })}
                              autoFocus
                            type="email"
                        
                            name="email"
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="email"
                            placeholder="Email"
                          />
                          {errors.email && <div className='text-red-500 '> {errors.email.message} </div>}
                        </div>
                        <div className="mb-4">
                          <input
                            type="password"
                            {...register('password', {
                              required : 'Please enter Password',
                              minLength:{value: 5 , message:'Password is more than 5 char'},
                            })}
                            autoFocus
                            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            id="password"
                            name="password"
                            placeholder="Password"
                          />
                          {errors.password && <div className='text-red-500 '> {errors.password.message} </div>}
                        </div>
                        <div className="text-center flex flex-col justify-center items-center pt-1 mb-12 pb-1">
                          <button type="submit"
                            className="inline-block px-6 py-2.5 text-blue-700
                            font-semibold text-sm leading-tight uppercase rounded bg-green-500 hover:bg-green-300 active:bg-green-50 w-72 mb-3 border-b-4 border-emerald-600 hover:border-emrald-800  ">Login </button>
                          {/* <Link className="text-green-900 active:bg-red-400  font-semibold cursor-pointer" href='/forgot'>Forgot password?</Link> */}
                        </div>
                        <div className="flex items-center justify-between pb-6">


                        </div>
                      </form>
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none"
                    style={{
                      background: " linear-gradient(to right,#00ff99, #66ffcc ,#66ff99 , #0099cc)"
                    }}

                  >
                    <div className="text-gray-700 px-4 py-6 md:p-12 md:mx-6">
                      <h4 className="text-xl font-semibold mb-6">We are more than just a company</h4>
                      <p className="text-sm font-semibold text-gray-600">
                      We are a group of more than 2000 + farmers serving our customers daily. We deliver  fresh produce to our customers immediately after harvest , so that quality and freshness remain intact. Only purpose of farmfreshz.com is welfare of farmers and serving our community  </p>

                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>

    </>
  )
}
  

