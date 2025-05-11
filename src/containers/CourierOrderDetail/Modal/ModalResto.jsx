import { useRef, useState } from "react";
import { Button, Card } from "react-bootstrap";
import toast from "react-hot-toast";
import useOrderCourierStore from "../../../store/useOrderCourierStore";
import { CameraIcon, X } from "lucide-react";

const ModalResto = ({ isOpen, onClose, courierOrderById }) => {
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error("No file selected");
      return;
    }
  
    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
  
    // Validasi ukuran file (contoh: maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }
  
    // Set preview gambar
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const updateOrderStatus = useOrderCourierStore((state) => state.updateOrderStatus);

  const handleUpdate = async (e) => {
    e.preventDefault();
  
    if (!fileInputRef.current || !fileInputRef.current.files[0]) {
      toast.error("Please select an image file");
      return;
    }
  
    const file = fileInputRef.current.files[0];
  
    try {
      // Buat FormData untuk mengirim file
      const formData = new FormData();
      formData.append("status", "process");
      formData.append("note", "Kurir sudah tiba di Resto");
      formData.append("availability", "unready");
      formData.append("purchase_receipt_photo", file); // Kirim file gambar
  
      // Panggil fungsi updateOrderStatus dengan FormData
      await updateOrderStatus(courierOrderById.order_id, formData);
  
      toast.success("Order status updated successfully");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      onClose(); // Tutup modal setelah berhasil
      window.location.reload();
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    }
  };

  if (!courierOrderById) return null;

  return (
    <div className={`modal-1-overlay ${isOpen ? "open" : ""}`}>
      <div className="modal-1-modal">
        <Card.Header>
          <Card.Title className="text-center mb-3">Konfirmasi Posisi Anda</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            Apakah Anda sudah sampai di Resto dan siap mengambil pesanan untuk diantarkan ke{" "}
            <strong>Customer</strong>?
          </p>
          {imagePreview && (
            <div className="mb-3 d-flex align-items-center justify-content-center gap-2">
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-50 h-50 content-center object-cover rounded-lg border border-zinc-700"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center"
                  style={{ top: -20 }}
                  type="button"
                >
                  <X className="size-3" />
                </button>
              </div>
            </div>
          )}
          <form onSubmit={handleUpdate} className="flex items-center gap-2">
            <div className="d-flex mb-3 w-100 justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleImageChange}
              />
              <button
                type="button"
                className={`hidden p-0 mb-1 btn btn-circle ${
                  imagePreview ? "text-emerald-500" : "text-zinc-400"
                }`}
                onClick={() => fileInputRef.current?.click()}
              >
                <CameraIcon size={50} />
                button
              </button>
            </div>
            <div className="d-flex justify-content-center gap-2">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <button type="submit" className="btn btn-success" 
              disabled={!imagePreview}
              >
                Tiba di resto
              </button>
            </div>
          </form>
        </Card.Body>
      </div>
    </div>
  );
};

export default ModalResto;