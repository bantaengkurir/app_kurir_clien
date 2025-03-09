import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useChatStore from "../../store/useChatStore";
import MessageInput from "../../components/MessageInput";
import MessageSkeleton from "../../components/skeletons/MessageSkeleton";
import useAuthStore from "../../store/useAuthStore";
import { formatMessageTime } from "../../lib/utils";
import { X } from "lucide-react";
import "./style.css";

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

  console.log(" ini selected user", selectedUser)
  
  const { id } = useParams();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const navigate = useNavigate();

  console.log("selected user id",selectedUser.id)

  // Handle message subscription
  useEffect(() => {
    if (selectedUser?.id) {
      getMessages(selectedUser.id);
      subscribeToMessages();

      return () => unsubscribeFromMessages();
    }
  }, [selectedUser?.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleCloseChat = () => {
    navigate(-1);
    setSelectedUser(null);
  };

  if (!selectedUser) {
    return (
      <div className="flex justify-center items-center h-full">
        <p>Pilih penjual untuk memulai obrolan</p>
      </div>
    );
  }

  if (isMessagesLoading) {
    return <MessageSkeleton />;
  }

  return (
    <div className="flex flex-col h-full" data-theme="light">
      {/* Chat Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={selectedUser.seller_profile_image || "/avatar.png"}
            alt={selectedUser.seller_name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{selectedUser.seller_name}</h3>
            <p className="text-sm text-gray-500">{selectedUser.seller_address}</p>
          </div>
        </div>
        <button onClick={handleCloseChat}>
          <X className="text-gray-500" />
        </button>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.sender_id === authUser.id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full border">
                <img
                  src={
                    message.sender_id === authUser.id
                      ? authUser.profile_image
                      : selectedUser.profile_image
                  }
                  alt="Profile"
                />
              </div>
            </div>
            
            <div className="chat-bubble bg-base-200">
              {message.text}
              <div className="text-xs opacity-50 mt-1">
                {formatMessageTime(message.createdAt)}
              </div>
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      {/* Input Area */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;