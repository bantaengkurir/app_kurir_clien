// // import Navbar from "./components/Navbar";

// // import HomePage from "./pages/HomePage";
// // import SignUpPage from "./pages/SignUpPage";
// // import LoginPage from "./pages/LoginPage";
// // import SettingsPage from "./pages/SettingsPage";
// // import ProfilePage from "./pages/ProfilePage";

// // import { Routes, Route, Navigate } from "react-router-dom";
// // import { useAuthStore } from "./store/useAuthStore";
// import { useThemeStore } from "./store/useThemeStore";
// import Routers from "./routes";
// // import { useEffect } from "react";

// // import { Loader } from "lucide-react";
// import { Toaster } from "react-hot-toast";

// const App = () => {
//   // const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
//   const { theme } = useThemeStore();

//   // console.log({ onlineUsers });

//   // useEffect(() => {
//   //   checkAuth();
//   // }, [checkAuth]);

//   // console.log({ authUser });

//   // if (isCheckingAuth && !authUser)
//   //   return (
//   //     <div className="flex items-center justify-center h-screen">
//   //       <Loader className="size-10 animate-spin" />
//   //     </div>
//   //   );
//   // import $ from 'jquery';
//   // window.$ = window.jQuery = $;
  
//   return (
//     <div data-theme={theme}>
//       {/* <Navbar /> */}
//       <Routers />

//       {/* <Routes>
//         <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
//         <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
//         <Route path="/login" element={
//           // !authUser ? 
//           <LoginPage /> 
//           // : <Navigate to="/" />
//           } />
//         <Route path="/settings" element={<SettingsPage />} />
//         <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
//       </Routes>*/}

//       <Toaster /> 
//     </div>
//   );
// };
// export default App;

import { useEffect } from "react";
import useProductStore  from "./store/useProductStore";
import  {useThemeStore}  from "./store/useThemeStore";
import Routers from "./routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { theme } = useThemeStore();
  const { initSocket, disconnectSocket, isConnected } = useProductStore();

  useEffect(() => {
    // Inisialisasi socket ketika komponen mount
    initSocket();

    // Membersihkan socket ketika komponen unmount
    return () => {
      disconnectSocket();
    };
  }, [initSocket, disconnectSocket]);

  // Optional: Tampilkan status koneksi
  useEffect(() => {
    console.log("Connection status:", isConnected ? "Connected" : "Disconnected");
  }, [isConnected]);

  return (
    <div data-theme={theme}>
      <Routers />
      <Toaster />
      
      {/* Optional: Tampilkan indikator status koneksi */}
      <div className="connection-status">
        {isConnected ? "🟢 Online" : "🔴 Offline"}
      </div>
    </div>
  );
};

export default App;
