import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import useAuthStore from "./useAuthStore";
import axios from "axios"

const useChatStore = create((set, get) => ({
    messages: [],
    users: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    fetchUser: async(userId) => {
        try {
            const res = await axiosInstance.get(`/chats/${userId}`);
            return res.data;
        } catch (error) {
            toast.error(error.response.data.message || "Failed to fetch user");
            return null;
        }
    },

    setSelectedUser: (user) => {
        set({ selectedUser: user });
    },

    getUsers: async() => {
        set({ isUsersLoading: true });
        try {
            const res = await axiosInstance.get("/chats/users");
            set({ users: res.data });

            console.log("ini respon", res.data)
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isUsersLoading: false });
        }
    },

    getMessages: async(userId) => {
        set({ isMessagesLoading: true });
        try {
            const res = await axiosInstance.get(`/chats/${userId}`);
            set({ messages: res.data });
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },
    sendMessage: async(messageData) => {
        const { selectedUser, messages } = get();
        try {
            const res = await axiosInstance.post(`/chats/send/${selectedUser.id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        // socket.on("newMessage", (newMessage) => {
        //     const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser.id;
        //     if (!isMessageSentFromSelectedUser) return;

        //     set({
        //         messages: [...get().messages, newMessage],
        //     });
        // });
        socket.on("newMessage", (newMessage) => {
            const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser.id;
            if (!isMessageSentFromSelectedUser) return;
            set((state) => ({
                messages: [...state.messages, newMessage]
            }));
        });
    },

    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        if (socket) {
            socket.off("newMessage");
        } else {
            console.error("Socket is not connected. Unable to unsubscribe from messages.");
        }
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));

export default useChatStore;