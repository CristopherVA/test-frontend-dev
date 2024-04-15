"use client"
import { useEffect, useState } from 'react'
import { SessionInterface } from '@/interface'

const useValidateToken = () => {
    const [session, setSession] = useState<SessionInterface>()
    
    useEffect(() => {
        const dataSession = JSON?.parse(sessionStorage?.getItem("session") || "")
        setSession(dataSession)
    }, [])

    return session
}

export default useValidateToken