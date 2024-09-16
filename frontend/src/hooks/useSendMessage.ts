import { useState } from 'react'
import useConversation from '../zustand/useConversation'
import toast from 'react-hot-toast'
import { GlobalResponseInterface } from '../interfaces/common'
import { useAuthContext } from '../context/AuthContext'

const useSendMessage = () => {
    const [loading, SetLoading] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const { authUser } = useAuthContext()

    const SendMessage = async (message: string) => {
        SetLoading(true)
        try {
            let result = await fetch(`api/message/send/${selectedConversation?._id}`, {
                method: "POST",
                headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${authUser?.token}` },
                body: JSON.stringify({ message })
            })
            const data: GlobalResponseInterface = await result.json()
            if (!data?.success) {
                throw new Error(data?.error || data?.message)
            }
            setMessages([...messages, data?.data])
        } catch (err: any) {
            toast.error(err?.message)
        } finally {
            SetLoading(false)
        }
    }

    return { loading, SendMessage }
}

export default useSendMessage