import { useEffect, useState } from 'react'
import useConversation from '../zustand/useConversation'
import { GlobalResponseInterface } from '../interfaces/common'
import { useAuthContext } from '../context/AuthContext'

const useGetMessages = () => {
    const [ loading, SetLoading ] = useState(false)
    const { messages, setMessages, selectedConversation } = useConversation()
    const { authUser } = useAuthContext()

    useEffect(()=>{
        const getMessages = async () => {
            SetLoading(true)
            try{
                let result = await fetch(`api/message/get/${selectedConversation?._id}`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${authUser?.token}` }
                })
                const data: GlobalResponseInterface = await result.json()
                if (!data?.success) {
                    setMessages([])
                    throw new Error(data?.error || data?.message)
                }
                setMessages(data?.data?.messages)
            }catch(err: any){
                // toast.error(err?.message)
            }finally{
                SetLoading(false)
            }   
        }
        if(selectedConversation?._id) getMessages()

        return () => setMessages([])
    },[selectedConversation?._id])

    return { loading, messages }
}

export default useGetMessages