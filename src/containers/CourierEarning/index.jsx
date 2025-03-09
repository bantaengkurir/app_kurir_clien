// // import React, { useEffect, useMemo, useState } from "react";
// // import { Container, Table, Button, Alert, Form, Row, Col } from "react-bootstrap";
// // import { format, parseISO } from "date-fns";
// // import useOrderCourierStore from "../../store/useOrderCourierStore"; // Sesuaikan dengan path yang benar
// // import "./style.css"; // File CSS untuk styling tambahan

// // const CourierEarning = () => {
// //   const {
// //     courierEarnings,
// //     fetchCourierEarning,
// //   } = useOrderCourierStore();

// //   const [selectedDate, setSelectedDate] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const getTodayDate = () => {
// //     const today = new Date();
// //     return format(today, "yyyy-MM-dd");
// //   };

// //   useEffect(() => {
// //     const today = getTodayDate();
// //     setSelectedDate(today);
// //   }, []);

// // useEffect(() => {
// //   const fetchData = async () => {
// //     if (selectedDate) {
// //       setIsLoading(true);
// //       setError(null);

// //       try {
// //         console.log("Fetching data for date:", selectedDate); // Debugging
// //         await fetchCourierEarning(selectedDate);
// //       } catch (error) {
// //         setError("Gagal memuat data. Silakan coba lagi.");
// //       } finally {
// //         setIsLoading(false);
// //       }
// //     }
// //   };

// //   fetchData();
// // }, [selectedDate, fetchCourierEarning]);

// //   const totalEarnings = useMemo(() => {
// //     return courierEarnings.reduce(
// //       (total, earning) => total + parseFloat(earning.courier_earning || 0),
// //       0
// //     );
// //   }, [courierEarnings]);

// //   return (
// //     <Container className="py-4">
// //       <h2 className="mb-4 text-center text-primary fw-bold">Penghasilan Kurir</h2>

// //       {/* Filter Tanggal */}
// //       <Row className="mb-4 justify-content-center">
// //         <Col md={4}>
// //           <Form.Group controlId="selectedDate">
// //             <Form.Label className="fw-bold">Pilih Tanggal</Form.Label>
// //             <Form.Control
// //               type="date"
// //               value={selectedDate}
// //               onChange={(e) => setSelectedDate(e.target.value)}
// //               className="shadow-sm"
// //             />
// //           </Form.Group>
// //         </Col>
// //       </Row>

// //       {/* Loading dan Error */}
// //       {isLoading && <Alert variant="info">Memuat data...</Alert>}
// //       {error && <Alert variant="danger">{error}</Alert>}

// //       {/* Table */}
// //       {courierEarnings.length > 0 ? (
// //         <>
// //           <Table striped bordered hover responsive className="shadow-lg">
// //             <thead className="bg-primary text-white">
// //               <tr>
// //                 <th>#</th>
// //                 <th>Tanggal</th>
// //                 <th>Order ID</th>
// //                 <th>Jumlah Pesanan</th>
// //                 <th>Penghasilan</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {courierEarnings.map((earning, index) => (
// //                 <tr key={earning.id} className="hover-effect">
// //                   <td>{index + 1}</td>
// //                   <td>{format(parseISO(earning.earning_date), "dd MMMM yyyy HH:mm")}</td>
// //                   <td>{earning.order_id}</td>
// //                   <td>Rp{earning.amount.toLocaleString()}</td>
// //                   <td className="text-success fw-bold">
// //                     +Rp{earning.courier_earning.toLocaleString()}
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>

// //             {/* Total Pendapatan dan Tombol Setor */}
// //             <tfoot className="bg-light">
// //               <tr>
// //                 <td colSpan={4} className="text-end fw-bold">
// //                   <h5 className="mb-0">Total Pendapatan</h5>
// //                 </td>
// //                 <td colSpan={2}>
// //                   <h4 className="mb-0 text-success fw-bold">
// //                     Rp{totalEarnings.toLocaleString()}
// //                   </h4>
// //                 </td>
// //               </tr>
// //               <tr>
// //                 <td colSpan={6} className="text-center">
// //                   <Button
// //                     variant="primary"
// //                     size="lg"
// //                     disabled={totalEarnings === 0}
// //                     onClick={() => {
// //                       alert(`Mengajukan pembayaran sebesar Rp${totalEarnings.toLocaleString()}`);
// //                     }}
// //                     className="fw-bold shadow-sm"
// //                   >
// //                     Ajukan Pembayaran
// //                   </Button>
// //                 </td>
// //               </tr>
// //             </tfoot>
// //           </Table>
// //         </>
// //       ) : (
// //         <Alert variant="info" className="text-center shadow-sm">
// //           Tidak ada data penghasilan yang tersedia.
// //         </Alert>
// //       )}
// //     </Container>
// //   );
// // };

// // export default CourierEarning;

// import React, { useEffect, useMemo, useState } from "react";
// import { Container, Table, Button, Alert, Form, Row, Col } from "react-bootstrap";
// import { format, parseISO } from "date-fns";
// import useOrderCourierStore from "../../store/useOrderCourierStore";
// import axios from "axios";
// import "./style.css";

// const CourierEarning = () => {
//   const { courierEarnings, fetchCourierEarning, createMidtrans } = useOrderCourierStore();

//   const [selectedDate, setSelectedDate] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const getTodayDate = () => {
//     const today = new Date();
//     return format(today, "yyyy-MM-dd");
//   };

//   useEffect(() => {
//     const today = getTodayDate();
//     setSelectedDate(today);
//   }, []);

//   useEffect(() => {
//     const fetchData = async () => {
//       if (selectedDate) {
//         setIsLoading(true);
//         setError(null);

//         try {
//           console.log("Fetching data for date:", selectedDate); // Debugging
//           await fetchCourierEarning(selectedDate);
//         } catch (error) {
//           setError("Gagal memuat data. Silakan coba lagi.");
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };

//     fetchData();
//   }, [selectedDate, fetchCourierEarning]);

//   const totalEarnings = useMemo(() => {
//     return courierEarnings.reduce(
//       (total, earning) => total + parseFloat(earning.courier_earning || 0),
//       0
//     );
//   }, [courierEarnings]);

//   const handlePayment = async () => {
//     try {
//       // Ambil order_id dari data earning
//       const orderId = courierEarnings[0].order_id;
  
//       // Data yang akan dikirim ke backend untuk membuat transaksi Midtrans
//       const transactionData = {
//         totalEarnings: totalEarnings, // Akses langsung tanpa tanda kurung
//         orderId: orderId,
//       };
  
//       // Panggil action createMidtrans dari store
//       await createMidtrans(transactionData);
//     } catch (error) {
//       console.error("Gagal membuat transaksi:", error);
//     }
//   };

//   return (
//     <Container className="py-4">
//       <h2 className="mb-4 text-center text-primary fw-bold">Penghasilan Kurir</h2>

//       {/* Filter Tanggal */}
//       <Row className="mb-4 justify-content-center">
//         <Col md={4}>
//           <Form.Group controlId="selectedDate">
//             <Form.Label className="fw-bold">Pilih Tanggal</Form.Label>
//             <Form.Control
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               className="shadow-sm"
//             />
//           </Form.Group>
//         </Col>
//       </Row>

//       {/* Loading dan Error */}
//       {isLoading && <Alert variant="info">Memuat data...</Alert>}
//       {error && <Alert variant="danger">{error}</Alert>}

//       {/* Table */}
//       {courierEarnings.length > 0 ? (
//         <>
//           <Table striped bordered hover responsive className="shadow-lg">
//             <thead className="bg-primary text-white">
//               <tr>
//                 <th>#</th>
//                 <th>Tanggal</th>
//                 <th>Order ID</th>
//                 <th>Jumlah Pesanan</th>
//                 <th>Penghasilan</th>
//               </tr>
//             </thead>
//             <tbody>
//               {courierEarnings.map((earning, index) => (
//                 <tr key={earning.id} className="hover-effect">
//                   <td>{index + 1}</td>
//                   <td>{format(parseISO(earning.earning_date), "dd MMMM yyyy HH:mm")}</td>
//                   <td>{earning.order_id}</td>
//                   <td>Rp{earning.amount.toLocaleString()}</td>
//                   <td className="text-success fw-bold">
//                     +Rp{earning.courier_earning.toLocaleString()}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>

//             {/* Total Pendapatan dan Tombol Setor */}
//             <tfoot className="bg-light">
//               <tr>
//                 <td colSpan={4} className="text-end fw-bold">
//                   <h5 className="mb-0">Total Pendapatan</h5>
//                 </td>
//                 <td colSpan={2}>
//                   <h4 className="mb-0 text-success fw-bold">
//                     Rp{totalEarnings.toLocaleString()}
//                   </h4>
//                 </td>
//               </tr>
//               <tr>
//                 <td colSpan={6} className="text-center">
//                   <Button
//                     variant="primary"
//                     size="lg"
//                     disabled={totalEarnings === 0 || isLoading}
//                     onClick={handlePayment}
//                     className="fw-bold shadow-sm"
//                   >
//                     Ajukan Pembayaran
//                   </Button>
//                 </td>
//               </tr>
//             </tfoot>
//           </Table>
//         </>
//       ) : (
//         <Alert variant="info" className="text-center shadow-sm">
//           Tidak ada data penghasilan yang tersedia.
//         </Alert>
//       )}
//     </Container>
//   );
// };

// export default CourierEarning;



import React, { useEffect, useMemo, useState } from "react";
import { Container, Table, Button, Alert, Form, Row, Col } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import useOrderCourierStore from "../../store/useOrderCourierStore";
import "./style.css";

const CourierEarning = () => {
  const {
    courierEarnings,
    fetchCourierEarning,
    createMidtrans,
    totalEarnings,
    isPaymentLoading,
    error: storeError,
  } = useOrderCourierStore();

  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState(null);

  useEffect(() => {
    const today = format(new Date(), "yyyy-MM-dd");
    setSelectedDate(today);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        setLocalError(null);
        await fetchCourierEarning(selectedDate);
      } catch (error) {
        setLocalError(error.message || "Gagal memuat data. Silakan coba lagi.");
      } finally {
        setIsLoading(false);
      }
    };
    
    if (selectedDate) loadData();
  }, [selectedDate, fetchCourierEarning]);

  const handlePayment = async () => {
    try {
      if (courierEarnings.length === 0) {
        throw new Error("Tidak ada data penghasilan untuk diajukan");
      }
      
      await createMidtrans({
        totalEarnings: totalEarnings,
        orderId: courierEarnings.map(earning => earning.order_id),
        date: selectedDate
      });
    } catch (error) {
      setLocalError(error.message);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4 text-center text-primary fw-bold">Penghasilan Kurir</h2>

      {/* Filter Tanggal */}
      <Row className="mb-4 justify-content-center">
        <Col md={4}>
          <Form.Group controlId="selectedDate">
            <Form.Label className="fw-bold">Pilih Tanggal</Form.Label>
            <Form.Control
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={format(new Date(), "yyyy-MM-dd")}
              className="shadow-sm"
            />
          </Form.Group>
        </Col>
      </Row>

      {/* Feedback Status */}
      {isLoading && <Alert variant="info">Memuat data...</Alert>}
      {localError && <Alert variant="danger">{localError}</Alert>}
      {storeError && <Alert variant="danger">{storeError}</Alert>}

      {/* Tabel Data */}
      {courierEarnings.length > 0 ? (
        <>
          <Table striped bordered hover responsive className="shadow-lg">
             <thead className="bg-primary text-white">
               <tr>
                 <th>#</th>
                 <th>Tanggal</th>
                 <th>Order ID</th>
                 <th>Jumlah Pesanan</th>
                 <th>Penghasilan</th>
               </tr>
             </thead>
             <tbody>
               {courierEarnings.map((earning, index) => (
                <tr key={earning.id} className="hover-effect">
                  <td>{index + 1}</td>
                  <td>{format(parseISO(earning.earning_date), "dd MMMM yyyy HH:mm")}</td>
                  <td>{earning.order_id}</td>
                  <td>Rp{earning.amount.toLocaleString()}</td>
                  <td className="text-success fw-bold">
                    +Rp{earning.courier_earning.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot className="bg-light">
              <tr>
                <td colSpan={4} className="text-end fw-bold">
                  <h5 className="mb-0">Total Pendapatan</h5>
                </td>
                <td colSpan={2}>
                  <h4 className="mb-0 text-success fw-bold">
                    Rp{totalEarnings.toLocaleString()}
                  </h4>
                </td>
              </tr>
              <tr>
                <td colSpan={6} className="text-center">
                  <Button
                    variant="primary"
                    size="lg"
                    disabled={totalEarnings === 0 || isPaymentLoading}
                    onClick={handlePayment}
                    className="fw-bold shadow-sm"
                  >
                    {isPaymentLoading ? "Memproses..." : "Ajukan Pembayaran"}
                  </Button>
                </td>
              </tr>
            </tfoot>
          </Table>
        </>
      ) : (
        !isLoading && (
          <Alert variant="info" className="text-center shadow-sm">
            Tidak ada data penghasilan yang tersedia untuk tanggal ini.
          </Alert>
        )
      )}
    </Container>
  );
};

export default CourierEarning;