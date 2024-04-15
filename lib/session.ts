import { SessionInterface } from "@/interface"

export const addSession = (session: SessionInterface) => {
    sessionStorage.setItem("session", JSON.stringify(session))
}

export const getSession = () => {
    const session: SessionInterface = JSON?.parse(sessionStorage.getItem("session") || "{}")
    return session
}