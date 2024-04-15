import { SessionInterface } from "@/interface"

export const addSession = (session: SessionInterface) => {
    window.sessionStorage.setItem("session", JSON.stringify(session))
}

export const getSession = () => {
    const session: SessionInterface = JSON?.parse(window.sessionStorage.getItem("session" || "") || "{}")
    return session
}