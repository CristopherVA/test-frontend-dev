"use client"
import React from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { RegisterInterface } from '@/interface';
import { registerUser } from '@/lib/request';
import { redirect, useRouter } from 'next/navigation';
import useValidateToken from '@/hooks/useValidateToken';



const SignInPage = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<RegisterInterface>({
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: "",
            confirmPassword: "",
            company: ""
        }
    })

    const router = useRouter();
    const session = useValidateToken();
    console.log({ session })


    const onSubmit: SubmitHandler<RegisterInterface> = async (data) => {
        try {
            const resp = await registerUser(data)
            if (resp?.errors?.data?.length > 0) {
                toast.error(resp?.errors?.data[0]?.password[0])
                return;
            }

            if (resp?.errors) {
                toast.error(resp?.errors?.message)
                return;
            }

            sessionStorage.setItem("session", JSON.stringify(resp))
            router.push('/')
            reset()

        } catch (error) {
            console.error({ error })
        }
    }

    if (session?.token) redirect("/")

    return (
        <div>
            <h1 className='text-2xl font-bold text-center'>Register</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-2 my-6'>
                <div className=' grid grid-cols-1  md:grid-cols-2 gap-4 '>
                    <div >
                        <label>First Name</label>
                        <input
                            type="text"
                            className='bg-white text-black w-full py-2 px-4 rounded-md'
                            placeholder='Type email'
                            {...register("firstname", { required: true, maxLength: 30 })}
                        />
                        {errors.firstname?.type === "required" && (
                            <p className="text-red-500 ">First name is required</p>
                        )}
                    </div>

                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            className='bg-white text-black w-full py-2 px-4 rounded-md'
                            placeholder='Type password'
                            {...register("lastname", { required: true })}
                        />
                        {errors.lastname?.type === "required" && (
                            <p className="text-red-500 ">Last name is required</p>
                        )}
                    </div>

                    <div className='md:col-span-2'>
                        <label>Email</label>
                        <input
                            type="email"
                            className='bg-white text-black w-full py-2 px-4 rounded-md'
                            placeholder='Type password'
                            {...register("email", { required: true })}
                        />
                        {errors.email?.type === "required" && (
                            <p className="text-red-500 ">Email is required</p>
                        )}
                    </div>
                    <div>
                        <label>Password</label>
                        <input

                            type="password"
                            className='bg-white text-black w-full py-2 px-4 rounded-md'
                            placeholder='Type password'
                            {...register("password", { required: true, min: 8 })}
                        />
                        {errors.password?.type === "required" && (
                            <p className="text-red-500 ">Password is required</p>
                        )}

                        {errors.password?.type === "min" && (
                            <p className="text-red-500 ">Password must be 8 characters</p>
                        )}
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            className='bg-white text-black w-full py-2 px-4 rounded-md'
                            placeholder='Type password'
                            {...register("confirmPassword", { required: true, min: 8 })}
                        />
                        {errors.confirmPassword?.type === "required" && (
                            <p className="text-red-500 ">Confirm Password is required</p>
                        )}

                        {errors.confirmPassword?.type === "min" && (
                            <p className="text-red-500 ">Confirm Password must be 8 characters</p>
                        )}
                    </div>
                    <div className='md:col-span-2'>
                        <label>Company</label>
                        <input
                            type="text"
                            className='bg-white text-black w-full py-2 px-4 rounded-md'
                            placeholder='Type password'
                            {...register("company", { required: true, maxLength: 30 })}
                        />
                        {errors.company?.type === "required" && (
                            <p className="text-red-500 ">Company is required</p>
                        )}
                    </div>
                </div>

                <button
                    type='submit'
                    className='mt-2 px-4 py-2 w-full bg-blue-500 rounded-md text-lg font-bold'
                >
                    Register
                </button>

            </form>
            <p className='text-center'>Your have an account?
                <Link href="/sign-in" className='hover:underline'> Login</Link>
            </p>
        </div>
    )
}

export default SignInPage
