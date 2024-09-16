import { useState } from 'react'
import { GlobalResponseInterface, UserSignInInterface } from '../interfaces/common'
import { useAuthContext } from '../context/AuthContext'
import toast from 'react-hot-toast'
import useGetLoggedUser from './useGetLoggedUser'

const useSignUp = () => {
    const [loading, SetLoading] = useState(false)
    const { SetAuthUser } = useAuthContext()

    const signUp = async ({ confirmPassword, gender, password, username }: UserSignInInterface) => {
        const result = InputValidate({ confirmPassword, gender, password, username })
        if (!result) return

        SetLoading(true);

        try {
            let result = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ confirmPassword, gender, password, username }),

            })
            const data: GlobalResponseInterface = await result.json()
            if (!data?.success) {
                throw new Error(data?.error || data?.message)
            }
            if (!data?.token) return toast.custom("Token not available")
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

    return { loading, signUp }
}

const InputValidate = ({
    username = "",
    password = "",
    confirmPassword = "",
    gender = "",
}: UserSignInInterface) => {
    if (!(username.trim() && password.trim() && confirmPassword.trim() && gender.trim())) {
        toast.error("Please fill all the values")
        return false
    }

    if (password !== confirmPassword) {
        toast.error("Password and Confirm Password Not Matched")
        return false
    }

    return true
}

export default useSignUp