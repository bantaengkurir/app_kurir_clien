// // src/components/OrderHistories.js
// import { useEffect } from 'react';
// import useProductStore from '../../store/useProductStore'; // Sesuaikan path ke store
// import { Card } from 'react-bootstrap';
// import { id } from 'date-fns/locale';

// const OrderHistories = ({ orderId, safeFormatDate }) => {
//     const { histories, fetchHistoriesById } = useProductStore();

//     // Ambil data histories saat komponen di-mount atau orderId berubah
//     useEffect(() => {
// 		if (orderId) {
// 		  fetchHistoriesById(orderId);
// 		} else {
// 		  console.error("Order ID belum tersedia");
// 		}
// 	  }, [orderId]); // Jalankan ulang saat orderId berubah

//     if (!orderId) {
//         return <p>Order ID tidak valid.</p>;
//     }

//     if (histories.length === 0) {
//         return <p>Tidak ada riwayat pesanan.</p>;
//     }
    

//     return (
//         <Card className="timeline-card">
// 		<Card.Header className="bg-info text-white">
// 		  Riwayat Status
// 		</Card.Header>
// 		<Card.Body>
// 		  {histories.order_history.map((item, idx) => (
// 			<div key={idx} className="timeline-item">
// 			  <div className="timeline-marker"></div>
// 			  <div className="timeline-content">
// 				<h6 className="mb-1">{item.status}</h6>
// 				<small className="text-muted">
//                 <p><strong>Tanggal:</strong> {safeFormatDate(item.created_at, 'EEEE, d MMMM yyyy HH:mm', id)}</p>
				
// 				</small>
// 				<p className="mb-0 text-muted">Kterangan : {item.note}</p>
// 			  </div>
// 			</div>
// 		  ))}
// 		</Card.Body>
// 	  </Card>
//     );
// };

// export default OrderHistories;

import { useEffect } from 'react';
import useProductStore from '../../store/useProductStore';
import { id } from 'date-fns/locale';

const OrderHistories = ({ orderId, safeFormatDate }) => {
    const { histories, fetchHistoriesById } = useProductStore();

    useEffect(() => {
        if (orderId) {
            fetchHistoriesById(orderId);
        } else {
            console.error("Order ID belum tersedia");
        }
    }, [orderId, fetchHistoriesById]);

    if (!orderId) {
        return (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                            Order ID tidak valid.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (!histories?.order_history || histories?.order_history?.length === 0) {
        return (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
                <svg className="w-12 h-12 mx-auto text-blue-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Tidak ada riwayat pesanan
                </h3>
                <p className="text-gray-600">
                    Belum ada riwayat status untuk pesanan ini
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-4 text-white">
                <h3 className="text-lg font-semibold flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Riwayat Status Pesanan
                </h3>
            </div>
            
            <div className="p-6">
                <div className="relative">
                    {/* Garis timeline */}
                    <div className="absolute left-5 top-0 h-full w-0.5 bg-blue-100"></div>
                    
                    <div className="space-y-6">
                        {histories?.order_history?.map((item, idx) => (
                            <div key={idx} className="relative pl-10">
                                {/* Bulatan timeline */}
                                <div className={`absolute left-0 top-1 h-4 w-4 rounded-full border-4 ${
                                    idx === 0 
                                        ? 'border-blue-600 bg-white' // Status terbaru
                                        : 'border-gray-300 bg-white'
                                }`}></div>
                                
                                {/* Card riwayat */}
                                <div className={`p-4 rounded-lg shadow-sm ${
                                    idx === 0 
                                        ? 'bg-blue-50 border border-blue-100' 
                                        : 'bg-white border border-gray-100'
                                }`}>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className={`font-medium ${
                                                idx === 0 ? 'text-blue-700' : 'text-gray-700'
                                            }`}>
                                                {item.status}
                                            </h4>
                                            <p className="text-sm text-gray-500 mt-1">
                                                {safeFormatDate(item.created_at, 'EEEE, d MMMM yyyy HH:mm', id)}
                                            </p>
                                        </div>
                                        {idx === 0 && (
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                Terkini
                                            </span>
                                        )}
                                    </div>
                                    
                                    {item.note && (
                                        <p className="mt-2 text-sm text-gray-600">
                                            <span className="font-medium">Keterangan:</span> {item.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderHistories;