"use client"
import React from 'react'
import Link from 'next/link'
import useValidateToken from '@/hooks/useValidateToken'
import { useRouter } from 'next/navigation'


const Header = () => {
    const router = useRouter();
    const session = useValidateToken();

    const handleLogout = () => {
        sessionStorage.removeItem("session");
        router.refresh();
    }

    return (
        <div className='bg-blue-500 text-white sticky top-0 flex justify-between px-4 py-4'>
            <p className='font-extrabold text-xl'>TF</p >

            <div className='space-x-3'>
                <Link href="/users" className='text-md font-bold'>List User</Link>
                {!session?.token
                    ? (
                        <>
                            <Link href={"/sign-in"} className='text-md font-bold'>Sign In</Link>
                            <Link href={"/sign-up"} className='text-md font-bold'>Sign Up</Link>
                        </>
                    )
                    : (
                        <button
                            className='text-md font-bold'
                            onClick={() => handleLogout()}
                        >Logout</button>
                    )
                }
            </div>
        </div>
    )
}

export default Header
