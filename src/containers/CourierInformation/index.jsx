import { useEffect, useState } from "react";
import { Camera, Mail, MessageCircle, MessageCircleMore, Phone, User } from "lucide-react";
import useProductStore from "../../store/useProductStore";
import useChatStore from "../../store/useChatStore"; // Import useChatStore
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../store/useAuthStore";
import Navbar from "../../components/Navbar";

const ProfilePage = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers, authUser, connectSocket } = useAuthStore(); // Ambil connectSocket dari store
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  console.log("Online Users:", onlineUsers);
  console.log("All Users:", users);


  useEffect(() => {
    getUsers();

    // Buat ulang koneksi socket jika authUser ada
    if (authUser) {
      connectSocket();
    }
  }, [getUsers, authUser, connectSocket]);

  const { fetchCouriers, couriers } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (isUsersLoading) return;
    fetchCouriers(id);
  }, [id, fetchCouriers, isUsersLoading]);

  console.log("couriers", couriers);

  // Fungsi untuk menangani klik tombol
  const handleClick = () => {
    if (couriers) {
      
      setSelectedUser(couriers); // Set selectedUser dengan data couriers yang sesuai
      navigate(`/chat/${couriers.id}`); // Navigasi ke halaman chat
    }
  };

  return (
    <>
    <Navbar />
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-2">Courier profile information</p>
          </div>

          {/* avatar upload section */}
          {couriers && (
            <>
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    src={couriers.profile_image}
                    alt="Profile"
                    className="size-32 rounded-full object-cover border-4"
                  />
                  <button onClick={handleClick}>
                    <label className="absolute bottom-0 right-0 bg-dark hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200">
                      <MessageCircleMore className="w-100 h-50 text-base-200" />
                      <h5></h5>
                    </label>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Name
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{couriers.name}</p>
                </div>

                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{couriers.email}</p>
                </div>
                <div className="space-y-1.5">
                  <div className="text-sm text-zinc-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </div>
                  <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{couriers.phone_number}</p>
                </div>
              </div>

              <div className="mt-6 bg-base-300 rounded-xl p-6">
                <h2 className="text-lg font-medium mb-4">Account Information</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                    <span>Member Since</span>
                    <span>member</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span>Account Status</span>
                    {
                      couriers.status === "online" ? (
                        <span className="text-green-500">{couriers.status}</span>
                      ) : (
                        <span className="text-red-500">{couriers.status}</span>
                      )
                    }
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfilePage;