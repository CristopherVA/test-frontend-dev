"use client"
import React, { useEffect, useState } from 'react'
import UserTable from './components/user-table';
import { getUsers } from '@/lib/request';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/session';

const UsersPage = () => {

    const [userData, setUserData] = useState([]);
    const session = getSession();

    useEffect(() => {

        if (!session?.token) redirect("/sign-in")

        getUsers(session?.token as string)
            .then(resp => {
                setUserData(resp || [])
            })
            .catch(err => {
                if (err?.errors) {
                    toast.error(err?.errors?.message)
                    return;
                }
            })

    }, [session?.token])

    return (
        <div className='w-full grid place-content-center'>
            <UserTable dataUser={userData || []} />
        </div>
    )
}

export default UsersPage