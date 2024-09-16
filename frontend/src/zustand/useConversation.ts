import { create } from "zustand";
import { ConversationInterface } from "../interfaces/common";

// Define the shape of the state
interface ConversationState {
  selectedConversation: ConversationInterface | null;
  messages: { message: string, senderId: string, receiverId: string, createdAt: string, _id: string }[]; // You can replace 'any' with a specific type for your messages
  setSelectedConversation: (selectedConversation: ConversationInterface | null) => void;
  setMessages: (messages: { message: string, senderId: string, receiverId: string, createdAt: string, _id: string }[]) => void; // You can replace 'any[]' with a specific type for your messages
}

const useConversation = create<ConversationState>((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
