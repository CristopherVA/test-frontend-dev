"use client"
import React from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LoginInterface } from '@/interface'
import { signIn } from '@/lib/request'
import { redirect, useRouter } from 'next/navigation';
import useValidateToken from '@/hooks/useValidateToken';

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

    const router = useRouter();
    const session = useValidateToken();


    const onSubmit: SubmitHandler<LoginInterface> = async (data) => {
        console.log(data);

        try {
            const resp = await signIn(data)
            console.log({ resp });

            if (resp?.errors) {
                toast.error(resp?.errors?.message)
                return;
            }

            sessionStorage.setItem("session", JSON.stringify(resp))

            toast.success("Sign In sucessfuly")
            
            router.push("/")
            reset()

        } catch (error) {
            console.error({ error })
        }
    }

    if (session?.token) redirect("/")

    return (
        <div className=''>
            <h1 className='text-xl font-bold'>Welcome to Login</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 my-6'>
                <div className=' grid grid-cols-1  gap-4 '>
                    <div >
                        <label>Email</label>
                        <input
                            type="text"
                            className='bg-white text-black w-full py-2 px-4 rounded-md'
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
                            className='w-full bg-white text-black py-2 px-4 rounded-md' placeholder='Type password'
                            {...register("password", { required: true, min: 8 })}
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-500 ">Password is required</p>
                        )}
                    </div>

                    <button type='submit' className='mt-2 px-4 py-2 w-full bg-blue-500 rounded-md text-lg font-bold'>Login</button>
                </div>

            </form>
            <p>Dont have a account?
                <Link href="/sign-up" className='mr-2 hover:underline'> Register</Link>
            </p>
        </div>
    )
}

export default SignInPage
