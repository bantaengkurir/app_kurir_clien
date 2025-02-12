// src/App.js
import { useState, useEffect } from 'react';
import CourierLocationHandler from './HandlerLocationCourier';
import useProductStore from '../../store/useProductStore';

function Courier() {
//   const [user, setUser] = useState(null);

  const userData = useProductStore(state => state.userData);

  console.log("user data:", userData.id);

//   // Contoh fungsi login
//   const mockLogin = () => {
//     // Ganti dengan data user sesungguhnya
    
//       id: userData.id,
//       role: userData.role,
//       name: userData.name,
    
//   };

//   // Contoh fungsi logout
//   const mockLogout = () => {
//     setUser(null);
//   };

  return (
    <div className="App">
      {userData && (
        <>
          <h2>Halo, {userData.role}</h2>
          <button >Logout</button>
          
          {/* Komponen penanganan lokasi */}
          {userData.role === 'courier' && (
            <CourierLocationHandler userId={userData.id} role={userData.role} />
          )}
        </>
      )
	  }
    </div>
  );
}

export default Courier;