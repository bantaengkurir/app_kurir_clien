import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useChatStore from "../../store/useChatStore";
import ChatHeader from "../../components/ChatHeaderCourier";
import MessageInput from "../../components/MessageInput";
import MessageSkeleton from "../../components/skeletons/MessageSkeleton";
import useAuthStore from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";
import useProductStore from "../../store/useProductStore";
import "./style.css";
import { X } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
    setSelectedUser,
  } = useChatStore();
  const { fetchCouriers, couriers } = useProductStore();
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  // const { theme, themeChat } = localStorage.getItem("chat-theme");
  const navigate = useNavigate();



  const handleLogOut = () => {
	navigate(-1);
	setSelectedUser(null);

	
  }


  useEffect(() => {
	fetchCouriers(id);
	  }, [id, fetchCouriers]);	  

  // Fetch couriers data and set selectedUser
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const couriersData = await couriers; // Tunggu hasil fetchCouriers
          console.log("Data couriers yang diterima:", couriersData); // Debug data couriers
          setSelectedUser(couriersData); // Set selectedUser dengan data yang diterima
        }
      } catch (error) {
        console.error("Gagal mengambil atau mengatur data kurir:", error);
      }
    };

    fetchData();
  }, [id, fetchCouriers, setSelectedUser]);

  console.log("ini adalah selected user chat", selectedUser)

  // Fetch messages and subscribe to new messages
  useEffect(() => {
    if (selectedUser?.id) {
      getMessages(selectedUser.id);
      subscribeToMessages();

      return () => {
        unsubscribeFromMessages();
      };
    }
  }, [selectedUser?.id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  // Scroll to the bottom when messages change
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if(selectedUser === null) {
	return (
<div className="loader-container">
    <div className="spinner"></div>
  </div>
	)}

  if (isMessagesLoading) {
    return (
      <div className={`flex-1 flex flex-col overflow-auto`} >
        <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profile_image || "/avatar.png"} alt={selectedUser.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {selectedUser.status}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={handleLogOut}>
          <X />
        </button>
      </div>
    </div>
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }



  return (
    <div
      ref={chatContainerRef}
      className={`flex-1 flex flex-col overflow-auto`}
      // data-theme={theme}
    >
      <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profile_image || "/avatar.png"} alt={selectedUser.name} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.name}</h3>
            <p className="text-sm text-base-content/70">
              {selectedUser.status}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={handleLogOut}>
          <X />
        </button>
      </div>
    </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.sender_id === authUser?.id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender_id === authUser.id
                      ? authUser.profile_image || "/avatar.png"
                      : selectedUser?.profile_image || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div
              className={` ${
                message.sender_id === authUser.id
                  ? "chat-bubble flex flex-col bg-blue-500"
                  : "chat-bubble bg-neutral-500 bg-opacity-100 flex flex-col"
              }`}
            >
              {message.img_url && (
                <img
                  src={message.img_url}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;