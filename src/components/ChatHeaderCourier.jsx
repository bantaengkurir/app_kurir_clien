import { X } from "lucide-react";
import  useAuthStore from "../store/useAuthStore";
import  useChatStore from "../store/useChatStore";
import { useNavigate } from "react-router-dom";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const navigate= useNavigate();

  console.log("selectedUser", selectedUser)
  const handleLogOut = () => {
    selectedUser(null);
    navigate("/orderhistories");
  }
  
  console.log("selectedUser", selectedUser)
  console.log("onlineUsers", onlineUsers) 

  return (
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
  );
};
export default ChatHeader;
