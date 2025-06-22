// import { useState } from "react";
// import useAuthStore from "../../store/useAuthStore";
// import {
//   Eye,
//   EyeOff,
//   Loader2,
//   Lock,
//   Mail,
//   User,
//   Image as ImageIcon,
//   MapPin,
//   Phone,
//   Calendar,
//   VenusAndMars,
//   MessageSquare,
// } from "lucide-react";
// import { Link, useNavigate } from "react-router-dom";
// import AuthImagePattern from "../Login/AuthImagePattern";
// import toast from "react-hot-toast";

// const SignUpPage = () => {
//   const [step, setStep] = useState(1); // Langkah saat ini
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     nama: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     alamat: "",
//     photo: null,
//     hp: "",
//     jenis_kelamin: "",
//     tempat_lahir: "",
//     tanggal_lahir: "",
//   });

//   const { signup, isSigningUp } = useAuthStore();
//   const navigate = useNavigate();

//   // Validasi setiap langkah
//   const validateStep = () => {
//     switch (step) {
//       case 1:
//   if (!formData.nama.trim()) return toast.error("Nama lengkap wajib diisi");
//   if (!formData.email.trim()) return toast.error("Email wajib diisi");
//   if (!/\S+@\S+\.\S+/.test(formData.email))
//     return toast.error("Format email tidak valid");
//   if (!formData.password) return toast.error("Password wajib diisi");
//   if (formData.password.length < 6)
//     return toast.error("Password minimal 6 karakter");
//   if (formData.password !== formData.confirmPassword)
//     return toast.error("Password dan konfirmasi password tidak sama"); // Validasi konfirmasi password
//   break;
//       case 2:
//         if (!formData.photo) return toast.error("Foto profil wajib diisi");
//         if (!formData.hp.trim())
//           return toast.error("Nomor telepon wajib diisi");
//         if (!formData.tempat_lahir.trim())
//           return toast.error("Tempat lahir wajib diisi");
//         if (!formData.tanggal_lahir)
//           return toast.error("Tanggal lahir wajib diisi");
//         break;
//       case 3:
//         if (!formData.jenis_kelamin)
//           return toast.error("Jenis kelamin wajib diisi");
//         if (!formData.alamat.trim()) return toast.error("Alamat wajib diisi");
//         break;
//       default:
//         break;
//     }
//     return true;
//   };

//   // Navigasi ke langkah berikutnya
//   const handleNextStep = () => {
//     const isValid = validateStep();
//     if (isValid) setStep(step + 1);
//   };

//   // Navigasi ke langkah sebelumnya
//   const handlePrevStep = () => {
//     setStep(step - 1);
//   };

//   // Handle submit form
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const isValid = validateStep();
//     if (isValid) {
//       const formDataToSend = new FormData();
//       Object.keys(formData).forEach((key) => {
//         formDataToSend.append(key, formData[key]);
//       });
//       // Panggil fungsi signup
//       await signup(formDataToSend);

//       // Simpan email di localStorage sebelum signup
//       localStorage.setItem("email", formData.email);

//       window.location.href = "/otp";
//       toast.success("Pendaftaran berhasil");
//     }
//   };

//   // Handle perubahan file foto
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, photo: file });
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-blue-50 to-purple-50">
//       {/* Left Side - Form */}
//       <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
//         <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
//           {/* Logo */}
//           <div className="text-center mb-8">
//             <div className="flex flex-col items-center gap-2">
//               <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
//                 <MessageSquare className="w-7 h-7 text-blue-600" />
//               </div>
//               <h1 className="text-3xl font-bold mt-4 text-gray-900">
//                 Buat Akun
//               </h1>
//               <p className="text-gray-500">Langkah {step} dari 3</p>
//             </div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Langkah 1: Informasi Dasar */}
//             {step === 1 && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Nama Lengkap
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <User className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       placeholder="John Doe"
//                       value={formData.nama}
//                       onChange={(e) =>
//                         setFormData({ ...formData, nama: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="email"
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       placeholder="you@example.com"
//                       value={formData.email}
//                       onChange={(e) =>
//                         setFormData({ ...formData, email: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//                       placeholder="••••••••"
//                       value={formData.password}
//                       onChange={(e) =>
//                         setFormData({ ...formData, password: e.target.value })
//                       }
//                     />
//                     <button
//                       type="button"
//                       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                       ) : (
//                         <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//                       )}
//                     </button>
//                   </div>
//                 </div>
//                 <div>
//   <label className="block text-sm font-medium text-gray-700 mb-2">
//     Konfirmasi Password
//   </label>
//   <div className="relative">
//     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//       <Lock className="h-5 w-5 text-gray-400" />
//     </div>
//     <input
//       type={showPassword ? "text" : "password"}
//       className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
//       placeholder="••••••••"
//       value={formData.confirmPassword}
//       onChange={(e) =>
//         setFormData({ ...formData, confirmPassword: e.target.value })
//       }
//     />
//     <button
//       type="button"
//       className="absolute inset-y-0 right-0 pr-3 flex items-center"
//       onClick={() => setShowPassword(!showPassword)}
//     >
//       {showPassword ? (
//         <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//       ) : (
//         <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
//       )}
//     </button>
//   </div>
// </div>
//               </>
//             )}
//             {step < 3 ? (
//   <button
//     type="button"
//     className={`bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition-all ${
//       formData.password !== formData.confirmPassword ? "opacity-50 cursor-not-allowed" : ""
//     }`}
//     onClick={handleNextStep}
//     disabled={formData.password !== formData.confirmPassword} // Nonaktifkan tombol jika password tidak sama
//   >
//     Selanjutnya
//   </button>
// ) : (
//   <button
//     type="submit"
//     className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
//     disabled={isSigningUp}
//   >
//     {isSigningUp ? "Membuat Akun..." : "Buat Akun"}
//   </button>
// )}

//             {/* Langkah 2: Informasi Profil */}
//             {step === 2 && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Foto Profil
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <ImageIcon className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="file"
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       accept="image/*"
//                       onChange={handleFileChange}
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Nomor Telepon
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Phone className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       placeholder="+62 123 4567 8901"
//                       value={formData.hp}
//                       onChange={(e) =>
//                         setFormData({ ...formData, hp: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Tempat Lahir
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <MapPin className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       placeholder="Jakarta"
//                       value={formData.tempat_lahir}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           tempat_lahir: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Tanggal Lahir
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Calendar className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="date"
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       value={formData.tanggal_lahir}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           tanggal_lahir: e.target.value,
//                         })
//                       }
//                     />
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Langkah 3: Informasi Tambahan */}
//             {step === 3 && (
//               <>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Jenis Kelamin
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <VenusAndMars className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <select
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       value={formData.jenis_kelamin}
//                       onChange={(e) =>
//                         setFormData({
//                           ...formData,
//                           jenis_kelamin: e.target.value,
//                         })
//                       }
//                     >
//                       <option value="">Pilih Jenis Kelamin</option>
//                       <option value="laki-laki">Laki-laki</option>
//                       <option value="perempuan">Perempuan</option>
//                     </select>
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">
//                     Alamat
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <MapPin className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       type="text"
//                       className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
//                       placeholder="Jl. Contoh No. 123"
//                       value={formData.alamat}
//                       onChange={(e) =>
//                         setFormData({ ...formData, alamat: e.target.value })
//                       }
//                     />
//                   </div>
//                 </div>
//               </>
//             )}

//             {/* Tombol Navigasi */}
//             <div className="flex justify-between">
//               {step > 1 && (
//                 <button
//                   type="button"
//                   className="bg-gray-100 text-black py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
//                   onClick={handlePrevStep}
//                 >
//                   Kembali
//                 </button>
//               )}
//               {step < 3 ? (
//                 <button
//                   type="button"
//                   className="bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
//                   onClick={handleNextStep}
//                 >
//                   Selanjutnya
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="bg-blue-600 text-black py-2 px-4 rounded-lg hover:bg-blue-700 transition-all"
//                   disabled={isSigningUp}
//                 >
//                   {isSigningUp ? "Membuat Akun..." : "Buat Akun"}
//                 </button>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Right Side - Image/Pattern */}
//       <div className="flex-1 hidden lg:flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600">
//         <AuthImagePattern
//           title={"Selamat Datang!"}
//           subtitle={
//             "Buat akun untuk bergabung dengan komunitas kami dan mulai berbagi."
//           }
//         />
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;
import { useState } from "react";
import useAuthStore from "../store/useAuthStore";
import {
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
  Image as ImageIcon,
  MapPin,
  Phone,
  Calendar,
  // VenusAndMars,
  MessageSquare,
  Cake,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import axios from "axios";
import { FaBolt, FaMapMarkerAlt, FaMoneyBillWave, FaMotorcycle } from "react-icons/fa";

const SignUpPage = () => {
  const [step, setStep] = useState(1); // Langkah saat ini
  const [showPassword, setShowPassword] = useState(false);  
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "", // Tambahkan state untuk konfirmasi password
    address: "",
    profile_image: null,
    phone_number: "",
    gender: "",
    latitude: null,
    longitude: null,
  });

  const { signup, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  // Validasi setiap langkah
  const validateStep = () => {
    switch (step) {
      case 1:
        if (!formData.name.trim()) return toast.error("Nama lengkap wajib diisi");
        // if (!formData.role)
        //   return toast.error("Jenis pengguna wajib diisi");
        if (!formData.email.trim()) return toast.error("Email wajib diisi");
        if (!/\S+@\S+\.\S+/.test(formData.email))
          return toast.error("Format email tidak valid");
        if (!formData.password) return toast.error("Password wajib diisi");
        if (formData.password.length < 6)
          return toast.error("Password minimal 6 karakter");
        if (formData.password !== formData.confirmPassword)
          return toast.error("Password dan konfirmasi password tidak sama"); // Validasi konfirmasi password
        break;
      case 2:
        if (!formData.profile_image) return toast.error("Foto profil wajib diisi");
        if (!formData.phone_number.trim())
          return toast.error("Nomor telepon wajib diisi");
        if (!formData.address.trim())
          return toast.error("Tempat lahir wajib diisi");
        // if (!formData.tanggal_lahir)
        //   return toast.error("Tanggal lahir wajib diisi");
        break;
      case 3:
        if (!formData.gender)
          return toast.error("Jenis kelamin wajib diisi");
        if (!formData.address.trim()) return toast.error("Alamat wajib diisi");
        break;
      default:
        break;
    }
    return true;
  };

  // Navigasi ke langkah berikutnya
  const handleNextStep = () => {
    const isValid = validateStep();
    if (isValid) setStep(step + 1);
  };

  // Navigasi ke langkah sebelumnya
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // const getLocation = async () => {
  //   try {
  //     if (!navigator.geolocation) {
  //       toast.error("Browser Anda tidak mendukung geolokasi");
  //       return;
  //     }
  
  //     setLoading(true);
      
  //     // Menggunakan Geolocation API browser
  //     const position = await new Promise((resolve, reject) => {
  //       navigator.geolocation.getCurrentPosition(resolve, reject);
  //     });
  
  //     const newLat = position.coords.latitude;
  //     const newLng = position.coords.longitude;
      
  //     const response = await axios.get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?latlng=${newLat},${newLng}&key=AIzaSyAHrXsRceoW9TLDOuasfOds5-F7CF1tlqs`
  //     );
      
  //     let addr = '';
  //     if (response.data.results.length > 0) {
  //       addr = response.data.results[0].formatted_address;
  //     }
  
  //     setFormData(prev => ({
  //       ...prev,
  //       latitude: newLat,
  //       longitude: newLng,
  //       address: addr
  //     }));
      
  //     setAddress(addr);
  //     setLoading(false);
  //     toast.success("Lokasi berhasil didapatkan");
  //   } catch (error) {
  //     setLoading(false);
  //     if (error.code === error.PERMISSION_DENIED) {
  //       toast.error("Izin lokasi ditolak. Harap izinkan akses lokasi.");
  //     } else {
  //       toast.error("Gagal mendapatkan lokasi");
  //     }
  //     console.error("Error getting location:", error);
  //   }
  // };
  // Handle submit form
  const getLocation = async () => {
    try {
      if (!navigator.geolocation) {
        toast.error("Browser Anda tidak mendukung geolokasi");
        return;
      }
  
      setLoading(true);
      
      // Menggunakan Geolocation API browser
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        });
      });
  
      const newLat = position.coords.latitude;
      const newLng = position.coords.longitude;
      
      // Gunakan API geocoding yang lebih reliable jika Google Maps tidak bekerja
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newLat}&lon=${newLng}`
      );
      
      let addr = '';
      if (response.data && response.data.display_name) {
        addr = response.data.display_name;
      } else {
        // Fallback jika tidak mendapatkan alamat
        addr = `Lat: ${newLat.toFixed(6)}, Lng: ${newLng.toFixed(6)}`;
      }
  
      setFormData(prev => ({
        ...prev,
        latitude: newLat,
        longitude: newLng,
        address: addr
      }));
      
      setLoading(false);
      toast.success("Lokasi berhasil didapatkan");
    } catch (error) {
      setLoading(false);
      if (error.code === error.PERMISSION_DENIED) {
        toast.error("Izin lokasi ditolak. Harap izinkan akses lokasi.");
      } else if (error.code === error.TIMEOUT) {
        toast.error("Waktu permintaan lokasi habis");
      } else {
        toast.error("Gagal mendapatkan lokasi");
        console.error("Error getting location:", error);
        
        // Set default address jika geocoding gagal
        setFormData(prev => ({
          ...prev,
          address: "Alamat tidak dapat ditentukan"
        }));
      }
    }
  };
  
  
  
  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const isValid = validateStep();
  //   if (isValid) {
  //     const formDataToSend = new FormData();
  //     Object.keys(formData).forEach((key) => {
  //       formDataToSend.append(key, formData[key]);
  //     });

      

  //     // Panggil fungsi signup
  //     await signup(formDataToSend);

  //     // Simpan email di localStorage sebelum signup
  //     localStorage.setItem("email", formData.email);

  //     navigate("/otp");
  //     // window.location.href = "/otp";
  //     // toast.success("Pendaftaran berhasil");
  //   }
  // };

const handleSubmit = async (e) => {
  e.preventDefault();

  const isValid = validateStep();
  if (!isValid) return; // Berhenti jika validasi gagal

  try {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Tunggu hasil signup dan tangkap return value-nya
    const result = await signup(formDataToSend);

    // Hanya navigasi jika signup berhasil
    if (result?.success) {
      localStorage.setItem("email", formData.email);
      window.location.replace("/otp");
    }
    
  } catch (error) {
    console.error("Signup error:", error);
    // Tidak perlu navigate, biarkan user tetap di halaman
  }
};
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_image: file });
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-r from-blue-50 to-purple-50">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2">
              <div className="w-20 h-20 rounded-xl bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-all duration-300 shadow-lg hover:shadow-orange-200/50">
                <Cake className="w-8 h-8 text-orange-400" />
              </div>
              <h1 className="text-3xl font-bold mt-4 text-gray-800">Buat <span className="text-orange-400">Akun</span></h1>
              <p className="text-gray-500">Langkah {step} dari 3</p>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6">
            {/* Langkah 1: Informasi Dasar */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nama Lengkap
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) =>
                        setFormData({ ...formData, password: e.target.value })
                      }
                    />
                    
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                  {/* Petunjuk password */}
                  {/* <div className="mt-2">
                    <p className="text-xs text-gray-500">
                      Password minimal berisi 8 karakter yang terdiri dari 1 huruf kapital, huruf kecil, 1 simbol, dan 1 angka.
                    </p>
                  </div> */}
                  {formData.password && (
  <div className="mt-2 transition-all duration-300 ease-in-out">
    <p className="text-xs text-gray-500 mb-2">Password harus memenuhi:</p>
    <ul className="space-y-1 text-xs text-gray-500">
      <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-500' : ''}`}>
        {formData.password.length >= 8 ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        Minimal 8 karakter
      </li>
      <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-500' : ''}`}>
        {/[A-Z]/.test(formData.password) ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        Mengandung huruf kapital
      </li>
      <li className={`flex items-center ${/[a-z]/.test(formData.password) ? 'text-green-500' : ''}`}>
        {/[a-z]/.test(formData.password) ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        Mengandung huruf kecil
      </li>
      <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-500' : ''}`}>
        {/[0-9]/.test(formData.password) ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        Mengandung angka
      </li>
      <li className={`flex items-center ${/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? 'text-green-500' : ''}`}>
        {/[!@#$%^&*(),.?":{}|<>]/.test(formData.password) ? (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        Mengandung simbol
      </li>
    </ul>
  </div>
)}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Konfirmasi Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) =>
                        setFormData({ ...formData, confirmPassword: e.target.value })
                      }
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Langkah 2: Informasi Profil */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Foto Profil
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="file"
                      className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nomor Telepon
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      placeholder="+62 123 4567 8901"
                      value={formData.phone_number}
                      onChange={(e) =>
                        setFormData({ ...formData, phone_number: e.target.value })
                      }
                    />
                  </div>
                </div>
                <div>
  <button
    type="button"
    onClick={getLocation}
    disabled={loading}
    className={`w-full bg-orange-400 text-white py-3 rounded-lg hover:bg-orange-500 transition-all ${
      loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
  >
    {loading ? (
      <span className="flex items-center justify-center">
        <Loader2 className="animate-spin mr-2" />
        Mendapatkan lokasi...
      </span>
    ) : (
      "Dapatkan Lokasi Saya"
    )}
  </button>
  {formData.latitude && formData.longitude && (
    <div className="mt-4 p-3 bg-gray-100 rounded-lg">
      <p className="text-sm text-gray-600">
        Lokasi berhasil didapatkan:
        <br />
        Latitude: {formData.latitude.toFixed(6)}
        <br />
        Longitude: {formData.longitude.toFixed(6)}
        <br />
        Alamat: {formData.address || "Sedang memuat alamat..."}
      </p>
    </div>
  )}
</div>
{/* <div>
<button
  type="button"
  onClick={getLocation}
  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all"
>
  Dapatkan Lokasi Saya
</button>
{formData.latitude && formData.longitude && (
  <div className="mt-4 p-3 bg-gray-100 rounded-lg">
    <p className="text-sm text-gray-600">
      Lokasi berhasil didapatkan:
      <br />
      Latitude: {formData.latitude.toFixed(6)}
      <br />
      Longitude: {formData.longitude.toFixed(6)}
      <br />
      Alamat : {address}
    </p>
  </div>
)}
</div> */}
              </>
            )}

            {/* Langkah 3: Informasi Tambahan */}
            {step === 3 && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Jenis Kelamin
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {/* <VenusAndMars className="h-5 w-5 text-gray-400" /> */}
                    </div>
                    <select
                      className="w-full pl-10 pr-4 py-3 border border-orange-500 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                      value={formData.gender}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option className="bg-orange-300" value="">Pilih Jenis Kelamin</option>
                      <option className="bg-orange-300" value="male">Laki-laki</option>
                      <option className="bg-orange-300" value="famale">Perempuan</option>
                    </select>
                  </div>
                </div>
              </>
            )}

            {/* Tombol Navigasi */}
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  type="button"
                  className="bg-gray-100 text-orange-700 font-bold py-2 px-4 rounded-lg hover:bg-gray-200 transition-all"
                  onClick={handlePrevStep}
                >
                  Kembali
                </button>
              )}
              {step < 3 ? (
                <button
  type="button"
  className={`bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all ${
    !(formData.password.length >= 8 && 
      /[A-Z]/.test(formData.password) && 
      /[a-z]/.test(formData.password) && 
      /[0-9]/.test(formData.password) && 
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) &&
      formData.password === formData.confirmPassword) ? "opacity-50 cursor-not-allowed" : ""
  }`}
  onClick={handleNextStep}
  disabled={
    !(formData.password.length >= 8 && 
      /[A-Z]/.test(formData.password) && 
      /[a-z]/.test(formData.password) && 
      /[0-9]/.test(formData.password) && 
      /[!@#$%^&*(),.?":{}|<>]/.test(formData.password) &&
      formData.password === formData.confirmPassword)
  }
>
  Selanjutnya
</button>
                
              ) : (
                <button
                  type="button"
                  className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition-all"
                  onClick={handleSubmit}
                  disabled={isSigningUp}
                >
                  {isSigningUp ? "Membuat Akun..." : "Buat Akun"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Delivery Hero Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gradient-to-br from-orange-300 to-orange-500 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-orange-300/20 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-orange-600/30 to-transparent z-0"></div>
        
        {/* Floating cakes */}
        <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/5 w-12 h-12 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg animate-float-medium"></div>
        <div className="absolute bottom-1/4 right-1/3 w-10 h-10 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 shadow-lg animate-float-fast"></div>

        {/* Content */}
        <div className="w-full max-w-md bg-white/10 backdrop-blur-md rounded-2xl shadow-2xl p-8 z-10 border border-white/20">
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto shadow-lg backdrop-blur-sm border border-white/20">
              <FaMotorcycle className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mt-6">Express Delivery</h2>
            <p className="text-orange-100 mt-2">Direct connection with our professional couriers</p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20">
                <FaBolt className="text-white text-xl" />
              </div>
              <span className="font-semibold text-white text-sm">FAST</span>
              <span className="text-orange-100 text-xs">Under 30 mins</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20">
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <span className="font-semibold text-white text-sm">PRECISE</span>
              <span className="text-orange-100 text-xs">Accurate delivery</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm border border-white/20">
                <FaMoneyBillWave className="text-white text-xl" />
              </div>
              <span className="font-semibold text-white text-sm">ECONOMICAL</span>
              <span className="text-orange-100 text-xs">Best prices</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-orange-100 italic">
              "Your favorite desserts delivered while they're still fresh!"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
