import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, MailCheck } from "lucide-react";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore"; // Import useAuthStore

const OTPPage = () => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]); // Array untuk menyimpan setiap digit OTP
  const [isLoading, setIsLoading] = useState(false); // State untuk loading
  const [message, setMessage] = useState(""); // Pesan dari response API
  const inputRefs = useRef([]); // Ref untuk setiap input OTP
  const navigate = useNavigate();
  const { verify, resendEmail } = useAuthStore(); // Gunakan fungsi verify dari useAuthStore

  // Fungsi untuk memvalidasi OTP
  const validateOTP = () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP code.");
      return false;
    }
    return true;
  };

  // Fungsi untuk menangani perubahan input OTP
  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Pindah ke input berikutnya jika nilai diisi
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Fungsi untuk menangani submit OTP
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateOTP();
    if (isValid) {
      setIsLoading(true);
      try {
        const email = localStorage.getItem("email"); // Ambil email dari localStorage
        if (!email) {
          toast.error("Email not found. Please restart the registration process.");
          return;
        }

        const verificationCode = otp.join("");

        // Kirim data ke backend
        await verify({ email, verification_code: verificationCode });

		

        // Setelah verifikasi berhasil, tampilkan pesan dan redirect
        setMessage("Email successfully verified!");
        // window.location.href = '/lo?in'
        toast.success("Email successfully verified!");
		localStorage.removeItem('email');
        navigate("/login"); // Redirect ke dashboard setelah verifikasi berhasil
        window.location.reload();
      } catch (error) {
        toast.error(error.message || "Failed to verify OTP");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendEmail = async(e) => {
	e.preventDefault();


	try {
		const email = localStorage.getItem("email"); // Ambil email dari localStorage
        if (!email) {
          toast.error("Email not found. Please restart the registration process.");
          return;
        }
        console.log("email", email)
		await resendEmail({email})
	} catch (error) {
		console.error(error)
	}
  }

  // Fokus ke input pertama saat komponen dimount
  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center">
              <MailCheck className="w-7 h-7 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mt-4 text-gray-900">Verify OTP</h1>
            <p className="text-gray-500">Enter the 6-digit code sent to your email</p>
          </div>
        </div>

        {/* Form OTP */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                ref={(el) => (inputRefs.current[index] = el)}
                className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-black py-3 rounded-lg font-semibold hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin" />
                Verifying...
              </div>
            ) : (
              "Verify OTP"
            )}
          </button>
        </form>

        {/* Pesan dari Response API */}
        {message && (
          <div className="mt-6 text-center text-green-600">
            <p>{message}</p>
          </div>
        )}

        {/* Link untuk mengirim ulang OTP */}
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              className="text-blue-600 hover:text-blue-700 font-semibold"
              onClick={handleResendEmail}
            >
              Resend OTP
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTPPage;