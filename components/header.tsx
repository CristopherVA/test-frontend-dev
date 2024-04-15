"use client"
import React from 'react'
import Link from 'next/link'
import { redirect, useRouter } from 'next/navigation'
import { getSession } from '@/lib/session'


const Header = () => {
    const router = useRouter();
    const session = getSession();

    const handleLogout = () => {
        sessionStorage.removeItem("session");
        router.push("/")
        router.refresh();
    }

    return (
        <div className='bg-black text-white sticky top-0 flex justify-between px-4 py-4'>
            <Link href="/" className='font-extrabold text-xl'>TF</Link >

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
