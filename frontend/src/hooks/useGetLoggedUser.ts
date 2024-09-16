
import { GlobalResponseInterface } from '../interfaces/common'
import toast from 'react-hot-toast'

const useGetLoggedUser = async (token: string) => {
    try {
        let result = await fetch("/api/user/logged", {
            method: "GET",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
        })
        const data: GlobalResponseInterface = await result.json()
        if (!data?.success) {
            throw new Error(data?.error || data?.message)
        }
        return { success: true, data: data?.data}
    } catch (err: any) {
        toast.error(err?.message)
        console.error(err)
        return { success: false, data: null}
    }
}

export default useGetLoggedUser