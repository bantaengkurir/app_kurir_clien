// import { useChatStore } from "../store/useChatStore";
// import { useEffect, useRef } from "react";
// import ChatHeader from "./ChatHeader";
// import MessageInput from "./MessageInput";
// import MessageSkeleton from "./skeletons/MessageSkeleton";
// import { useAuthStore } from "../store/useAuthStore";
// import { formatMessageTime } from "../lib/utils";

// const ChatContainer = () => {
//   const {
//     messages,
//     getMessages,
//     isMessagesLoading,
//     selectedUser,
//     subscribeToMessages,
//     unsubscribeFromMessages,
//   } = useChatStore();
//   const { authUser } = useAuthStore();
//   const messageEndRef = useRef(null);

//   useEffect(() => {
//     getMessages(selectedUser.id);

//     subscribeToMessages();

//     return () => unsubscribeFromMessages();
//   }, [selectedUser.id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

//   useEffect(() => {
//     if (messageEndRef.current && messages) {
//       messageEndRef.current.scrollIntoView({ behavior: "smooth" });
//     }
//   }, [messages]);




//   if (isMessagesLoading) {
//     return (
//       <div className="flex-1 flex flex-col overflow-auto">
//         <ChatHeader />
//         <MessageSkeleton />
//         <MessageInput />
//       </div>
//     );
//   }


//     // Ambil cookie user_data
// const cookies = document.cookie;

// // Cari cookie dengan nama "user_data"
// const userDataCookie = cookies
//   .split("; ") // Pisahkan setiap cookie
//   .find((row) => row.startsWith("user_data=")) // Temukan cookie user_data
//   ?.split("=")[1]; // Ambil nilainya

//   return (
//     <div className="flex-1 flex flex-col overflow-auto">
//       <ChatHeader />

//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
          
//           <div
//             key={message.id}
//             className={`chat ${message.sender_id === JSON.parse(decodeURIComponent(userDataCookie)).id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             {/* <div>{ini sender}</div> */}
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.sender_id === authUser.id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.message && <p>{message.message}</p>}
//             </div>
//           </div>
//         ))}
//       </div>

//       <MessageInput />
//     </div>
//   );
// };
// export default ChatContainer;

import  useChatStore  from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import  useAuthStore  from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
     // Ambil theme dari store
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  const {theme, themeChat} = localStorage.getItem("chat-theme")

  console.log("authUser", authUser)
  useEffect(() => {
    getMessages(selectedUser.id);

    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [selectedUser.id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className={`flex-1 flex flex-col overflow-auto`} data-theme={theme}>
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  // const cookies = document.cookie;

// // Cari cookie dengan nama "user_data"
// const userDataCookie = cookies
//   .split("; ") // Pisahkan setiap cookie
//   .find((row) => row.startsWith("user_data=")) // Temukan cookie user_data
//   ?.split("=")[1]; // Ambil nilainya

  return (
    <div className={`flex-1 flex flex-col overflow-auto`} data-theme={theme}>
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`chat ${
              message.sender_id === authUser?.id
                ? "chat-end" // Terapkan tema pada chat-end
                : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.sender_id === authUser.id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
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
            // className="chat-bubble flex flex-col"
            className={` ${
              message.sender_id === authUser.id
                ? 
                `chat-bubble flex flex-col bg-blue-500 ${themeChat}`
                // "chat-bubble flex flex-col bg-blue-500" // Terapkan tema pada chat-end
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
