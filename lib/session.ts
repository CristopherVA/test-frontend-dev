import { SessionInterface } from "@/interface"

export const addSession = (session: SessionInterface) => {
    if (typeof window !== 'undefined') {
        // do your stuff with sessionStorage
        window.sessionStorage.setItem("session", JSON.stringify(session))
    }
}

export const getSession = () => {
    if (typeof window !== 'undefined') {
        // do your stuff with sessionStorage
        const session: SessionInterface = JSON?.parse(window.sessionStorage.getItem("session" || "") || "{}")
        return session
    }
}