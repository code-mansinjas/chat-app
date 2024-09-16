import { useEffect, useState } from "react"
import { ConversationInterface, GlobalResponseInterface } from "../interfaces/common"
import toast from "react-hot-toast"
import { useAuthContext } from "../context/AuthContext"

const useGetConversation = () => {
    const [loading, SetLoading] = useState(false)
    const [conversations, setConversation] = useState<Array<ConversationInterface>>([])
    const { authUser } = useAuthContext()

    useEffect(() => {
        const getConversation = async () => {
            SetLoading(true)
            try {
                let result = await fetch("/api/user/except-logged", {
                    method: "GET",
                    headers: { "Content-Type": "application/json",'Authorization': `Bearer ${authUser?.token}` }

                })
                const data: GlobalResponseInterface = await result.json()
                if (!data?.success) {
                    throw new Error(data?.error || data?.message)
                }
                setConversation(data?.data)
            } catch (err: any) {
                toast.error(err?.message)
                console.error(err)
            } finally {
                SetLoading(false)   
            }
        }
        getConversation()
    }, [])

    return { loading, conversations }
}

export default useGetConversation