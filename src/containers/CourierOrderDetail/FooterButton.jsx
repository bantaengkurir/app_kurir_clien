import { MessageSquareMore } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import useOrderCourierStore from '../../store/useOrderCourierStore';
import useAuthStore from '../../store/useAuthStore';
import useChatStore from '../../store/useChatStore';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ModalResto from './Modal/ModalResto';
import ModalCompleted from './Modal/ModalCompleted';
// import { MessageSquareMore } from 'react-bootstrap-icons'; // Pastikan Anda mengimpor ikon yang diperlukan

const FooterButtons = ({courierOrderById}) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
	console.log("order by id", courierOrderById)
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
    fetchSeller(courierOrderById.customer?.id);
  }, [courierOrderById.customer?.id, fetchSeller, isUsersLoading]);

  console.log("ini sellers", courierOrderById)
  const updateOrderStatus = useOrderCourierStore((state) => state.updateOrderStatus);
  if (!courierOrderById) return null;

// const handleUpdate = async () => {
//   try {
//     // Data yang akan dikirim ke backend
//     const newStatus = {
//       status: 'process', // Update status order menjadi 'process'
//       note: 'Kurir sudah tiba di Resto', // Catatan untuk history
//       availability: 'unready', // Update availability kurir menjadi 'unready'
//     };

//     // Panggil fungsi updateOrderStatus dari store
//     await updateOrderStatus(courierOrderById.order_id, newStatus);

//     toast.success("pesanan berhasil diupdate")
//     window.location.reload();
//   } catch (error) {
//     console.error("Gagal memperbarui status pesanan:", error);
//   }
// };
const handleDelivery = async () => {
  try {
    // Data yang akan dikirim ke backend
    const newStatus = {
      status: 'process', // Update status order menjadi 'process'
      note: 'Kurir sedang mengantarkan pesanan anda', // Catatan untuk history
      availability: 'unready', // Update availability kurir menjadi 'unready'
    };

    // Panggil fungsi updateOrderStatus dari store
    await updateOrderStatus(courierOrderById.order_id, newStatus);

    toast.success("pesanan berhasil diupdate")
    window.location.reload();
  } catch (error) {
    console.error("Gagal memperbarui status pesanan:", error);
  }
};
const handleFinish = async () => {
  try {
    // Data yang akan dikirim ke backend
    const newStatus = {
      status: 'process', // Update status order menjadi 'process'
      note: 'Kurir sedang mengantarkan pesanan anda', // Catatan untuk history
      availability: 'unready', // Update availability kurir menjadi 'unready'
    };

    // Panggil fungsi updateOrderStatus dari store
    await updateOrderStatus(courierOrderById.order_id, newStatus);

    toast.success("pesanan berhasil diupdate")
    window.location.reload();
  } catch (error) {
    console.error("Gagal memperbarui status pesanan:", error);
  }
};




  const handleClick = () => {
    if (courierOrderById) {
      setSelectedUser(sellers);
      navigate(`/chat/${courierOrderById.customer?.id}`);
    }
  };
  return (

    <Container className='d-flex justify-content-center'>
      <div className='fixed-bottom d-flex justify-content-center gap-3 p-3 bg-white shadow-sm'>
        <button onClick={handleClick} className='d-flex btn btn-outline-success  w-25 d-flex align-items-center justify-content-center'>
          <MessageSquareMore size={20} />
          <span className='mb-0'>Hubungi Customer</span>
        </button>
        <ModalResto 
        courierOrderById={courierOrderById}
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)} />

        <ModalCompleted
        courierOrderById={courierOrderById}
        isOpen={showModal}
        onClose={() => setShowModal(false)} />
        {
          courierOrderById.order_history[0]?.note == "Lakukan pembayaran setelah barang diterima" && (
            <Button onClick={() => setShowConfirmationModal(true)} className='w-25 d-flex align-items-center justify-content-center'>
              Tiba di Resto
            </Button>
          )
        }
        {
          courierOrderById.order_history[0]?.note == "Kurir sudah tiba di Resto" && (
            <Button onClick={handleDelivery} className='w-25 d-flex align-items-center justify-content-center'>
              Antar Pesanan
            </Button>
          )
        }
        {
          courierOrderById.order_history[0]?.note == "Kurir sedang mengantarkan pesanan anda" && (
            <Button onClick={() => setShowModal(true)} className='w-25 d-flex align-items-center justify-content-center'>
              Pesanan sudah diantar
            </Button>
          )
        }
      </div>
    </Container>
  );
};

export default FooterButtons;