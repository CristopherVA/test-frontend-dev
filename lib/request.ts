"use server"
import axios, { AxiosError } from "axios";
import { BASE_URL } from "@/config";
import { LoginInterface, RegisterInterface } from "@/interface";

console.log(BASE_URL)

export const registerUser = async (data: RegisterInterface) => {
    try {
        const { data: resp } = await axios.post(`${BASE_URL}/users`, {
            "firstname": data.firstname.trim(),
            "lastname": data.lastname.trim(),
            "email": data.email.trim(),
            "password": data.password.trim(),
            "verify_password": data.confirmPassword.trim(),
            "default_company": data.company.trim()
        })
        return resp
    } catch (error: Error | AxiosError | any) {
        console.log("ERROR REGISTER USER", error)
        return error?.response?.data
    }
}

export const signIn = async (data: LoginInterface) => {
    try {
        const { data: resp } = await axios.post(`${BASE_URL}/auth`, {
            "email": data.email.trim(),
            "password": data.password.trim()
        })
        return resp;
    } catch (error: Error | AxiosError | any) {
        console.log("ERROR LOGIN", error)
        return error?.response?.data
    }
}

export const getUsers = async (token: string) => {
    if (!token) return
    try {
        const { data } = await axios.get(`${BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return data;
    } catch (error: Error | AxiosError | any) {
        console.log("ERROR LOGIN", error)
        return false
    }
}
