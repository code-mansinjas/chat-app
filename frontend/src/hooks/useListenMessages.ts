import { useEffect } from 'react'
import { useSocketContext } from '../context/SocketContext'
import useConversation from '../zustand/useConversation'

const useListenMessages = () => {
    const { socket } = useSocketContext()
    const { messages, setMessages } = useConversation()

    useEffect(()=>{
        function fun(){
            socket?.on("newMessage",(newMessage)=>{
                newMessage.shouldShake = true
                setMessages([...messages,newMessage])
            })
            return () => socket?.off("newMessage")
        }
        fun()
    },[socket, messages, setMessages])
}

export default useListenMessages