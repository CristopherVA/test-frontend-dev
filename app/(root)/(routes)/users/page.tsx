"use client"
import React, { useEffect, useState } from 'react'
import UserTable from './components/user-table';
import useValidateToken from '@/hooks/useValidateToken';
import { getUsers } from '@/lib/request';
import toast from 'react-hot-toast';
import { redirect } from 'next/navigation';

const UsersPage = () => {

    const [userData, setUserData] = useState([]);
    const session = useValidateToken();

    useEffect(() => {
        toast.promise(
            getUsers(session?.token as string)
                .then(resp => {
                    setUserData(resp || [])
                })
                .catch(err => {
                    if (err?.errors) {
                        toast.error(err?.errors?.message)
                        return;
                    }
                }),
            {
                loading: 'Getting data...',
                success: <b>Data loaded successfuly!</b>,
                error: <b>Could not get data.</b>,
            }
        )
    }, [])

    if (!session?.token) redirect("/sign-in")

    return (
        <div className='w-full grid place-content-center'>
            <UserTable dataUser={userData || []} />
        </div>
    )
}

export default UsersPage