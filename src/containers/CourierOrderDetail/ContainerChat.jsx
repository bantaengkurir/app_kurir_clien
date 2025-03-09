import { MessageCircleMore, MessageSquareMore } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import useChatStore from "../../store/useChatStore";
import useOrderCourierStore from "../../store/useOrderCourierStore";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/useAuthStore";
import useProductStore from "../../store/useProductStore";

const ContainerChat = ({ item }) => {
//   const { setSelectedUser } = useChatStore();
//   const {fetchSeller, sellers} = useOrderCourierStore();
  const {id} = useParams();

  const navigate = useNavigate();

  const { getUsers, users,setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser, connectSocket } = useAuthStore(); // Ambil connectSocket dari store

  console.log("Online Users:", onlineUsers);
  console.log("All Users:", users);


  useEffect(() => {
    getUsers();

    // Buat ulang koneksi socket jika authUser ada
    if (authUser) {
      connectSocket();
    }
  }, [getUsers, authUser, connectSocket]);

  const { fetchSeller, sellers } = useOrderCourierStore();
//   const { id } = useParams();
//   const navigate = useNavigate();
  useEffect(() => {
    if (isUsersLoading) return;
    fetchSeller(id);
  }, [id, fetchSeller, isUsersLoading]);

  console.log("ini sellers", sellers)


  const handleClick = () => {
    if (item) {
      setSelectedUser(sellers);
      navigate(`/chat/${item.seller_id}`);
    }
  };

  return (
    <button 
      onClick={handleClick}
      className="btn btn-ghost btn-sm"
    >
      <MessageSquareMore size={32} />
    </button>
  );
};

export default ContainerChat;