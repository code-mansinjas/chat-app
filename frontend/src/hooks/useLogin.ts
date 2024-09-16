import { useState } from 'react'
import { GlobalResponseInterface, UserloginInterface } from '../interfaces/common'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import useGetLoggedUser from './useGetLoggedUser'

const useLogin = () => {
    const [loading, SetLoading] = useState(false)
    const { SetAuthUser } = useAuthContext()

    const login = async ({ password, username }: UserloginInterface) => {
        const result = InputValidate({ password, username })
        if (!result) return

        SetLoading(true);

        try {
            let result = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password, username }),

            })
            const data: GlobalResponseInterface = await result.json()
            if (!data?.success) {
                throw new Error(data?.error || data?.message)
            }
            if(!data?.token) return toast.custom("Token not available")
            localStorage.setItem("chat-app-user", data?.token)
            const loggedUser = await useGetLoggedUser(data.token)
            SetAuthUser({ ...loggedUser.data, token: data?.token, isVerified: loggedUser.success })
        } catch (err: any) {
            toast.error(err?.message)
            console.error(err)
        } finally {
            SetLoading(false)
        }
    }

    return { loading, login }
}

const InputValidate = ({
    username = "",
    password = ""
}: UserloginInterface) => {
    if (!(username.trim() && password.trim())) {
        toast.error("Please fill all the values")
        return false
    }
    return true
}

export default useLogin