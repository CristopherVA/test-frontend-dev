"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginInterface, SessionInterface } from '@/interface'
import { signIn } from '@/lib/request'
import { redirect, useRouter } from 'next/navigation';
import { addSession, getSession } from '@/lib/session';

const SignInPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<LoginInterface>({
        defaultValues: {
            email: "",
            password: ""
        }
    })
    const [enabled, setEnabled] = useState(false)
    const router = useRouter();
    const session = getSession()

    if (session?.token) redirect("/users")

    const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
        setEnabled(true)
        try {
            const resp = await signIn(data)

            if (resp?.errors) {
                toast.error(resp?.errors?.message)
                return;
            }

            addSession(resp)

            toast.success("Sign In sucessfuly")

            reset()
            setEnabled(false)
            redirect("/users")
        } catch (error) {
            console.error({ error })
            setEnabled(false)
        }
    }


    return (
        <div className=''>
            <h1 className='text-2xl text-center font-bold'>Welcome to Login TF</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 my-6'>
                <div className=' grid grid-cols-1  gap-4 '>
                    <div >
                        <label>Email</label>
                        <input
                            type="text"
                            className='bg-white border border-black  text-black w-full py-2 px-4 rounded-md'
                            placeholder='Type email'
                            {...register("email", { required: true, maxLength: 30 })}
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-500 ">First name is required</p>
                        )}
                    </div>

                    <div>
                        <label>Password</label>
                        <input
                            type="password"
                            className='w-full bg-white border border-black  text-black py-2 px-4 rounded-md' placeholder='Type password'
                            {...register("password", { required: true, min: 8 })}
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-500 ">Password is required</p>
                        )}
                    </div>

                    <button disabled={enabled} type='submit'
                        className='mt-2 disabled:hover:bg-black/45 disabled:text-gray-600 px-4 py-2 w-full  text-white bg-black hover:bg-black/45 transition-all duration-100 ease-in  rounded-md text-lg font-bold'>
                        Login
                    </button>
                </div>

            </form>
            <p className='text-center'>Dont have a account?
                <Link href="/sign-up" className='mr-2 hover:underline'> Register</Link>
            </p>
        </div>
    )
}

export default SignInPage
