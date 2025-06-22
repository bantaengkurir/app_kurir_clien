import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import useProductStore from "../../store/useProductStore";
import { useNavigate } from "react-router-dom";
import { Checkbox } from "../../components/ui/checkbox";


const Cart = () => {
  const {
    cartItems,
    fetchCarts,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    selectedCart,
    toggleCartSelection,
    // toggleSellerSelection,
    clearSelectedCart
  } = useProductStore();
  

// Mendapatkan semua data produk yang dipilih
// const selectedProducts = selectedCart;

// Contoh menampilkan data
// console.log("Selected Items:", selectedProducts.map(item => ({
//   id: item.id,
//   name: item.product.name,
//   price: item.product.price,
//   quantity: item.quantity
// })));
  
  const [expandedSellers, setExpandedSellers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  console.log("ini cartItems", cartItems);

  // Group items by seller
  const groupedItems = cartItems?.reduce((acc, item) => {
    const sellerId = item.variant?.product?.seller_id;
    if (!acc[sellerId]) {
      acc[sellerId] = {
        sellerName: item.variant?.product?.seller?.name,
        items: [],
        subtotal: 0,
      };
    }
    acc[sellerId].items.push(item);
    acc[sellerId].subtotal += item.variant?.price * item.quantity;
    return acc;
  }, {});

  // // Hitung total
  // const selectedSubtotal = Object.values(groupedItems)?.reduce((sum, seller) => {
  //   const sellerTotal = seller.items
  //     .filter(item => selectedCart.includes(item))
  //     .reduce((s, item) => s + (item.variant?.price * item.quantity), 0);
  //   return sum + sellerTotal;
  // }, 0);

  
  
  // ! in i diperbaharui dari atas
  const selectedSubtotal = Object.values(groupedItems)?.reduce((sum, seller) => {
    const sellerTotal = seller.items
        .filter(item => selectedCart.some(cartItem => cartItem.id === item.id))
        .reduce((s, item) => {
            const selectedItem = selectedCart.find(cartItem => cartItem.id === item.id);
            return s + (item.variant?.price * (selectedItem?.quantity || item.quantity));
        }, 0);
    return sum + sellerTotal;
}, 0);

const toggleSellerSelection = (sellerId) => {
    // Pastikan sellerId dikirim sebagai number
    useProductStore.getState().toggleSellerSelection(Number(sellerId));
  };

  const total = selectedSubtotal;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4 mt-12">
        <h1 className="text-2xl font-bold mb-6">Keranjang Saya <span className="text-orange-700"> ({cartItems.length})</span></h1>
        
        {Object.entries(groupedItems).map(([sellerId, seller]) => (
          <div key={sellerId} className="bg-white rounded-lg shadow-md mb-6 p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {/* <Checkbox
                  checked={seller.items.every(item => 
                    selectedCart.includes(item.id)
                  )}
                  onCheckedChange={() => toggleSellerSelection(sellerId)}
                /> */}
<Checkbox
  checked={seller.items.every(item => 
    selectedCart.some(selected => selected.id === item.id)
  )}
  onCheckedChange={() => toggleSellerSelection(sellerId)}
/>


                <span className="font-semibold">{seller.sellerName}</span>
              </div>
              <button 
                onClick={() => setExpandedSellers(prev => ({
                  ...prev,
                  [sellerId]: !prev[sellerId]
                }))}
                className="text-orange-700 hover:text-orange-900"
              >
                {expandedSellers[sellerId] ? 'Sembunyikan' : 'Lihat Detail'}
              </button>
            </div>

            {expandedSellers[sellerId] && seller.items.map(item => (
              <div key={item.id} className="flex items-center gap-4 mb-4 p-2 border-b">
               
{/* <Checkbox
  checked={selectedCart.includes(item.id)}
  onCheckedChange={() => toggleCartSelection(item.id)}
/> */}

<Checkbox
  checked={selectedCart.some(cartItem => cartItem.id === item.id)}
  onCheckedChange={() => toggleCartSelection(item)}
/>



{/* <Checkbox
  checked={seller.items.every(item => 
    selectedCart.includes(item.id)
  )}
  onCheckedChange={() => toggleSellerSelection(sellerId)}
/> */}
                <button onClick={() => navigate(`/product-detail/${item.variant?.product?.id}/detail`)} className="flex-shrink-0">
                <img
                  src={item.variant.img_url}
                  className="w-16 h-16 object-cover rounded"
                  alt={item.variant.name}
                />
                </button>
                <div className="flex-1">
                  <h3 className="font-medium">{item.variant?.name}</h3>
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-orange-700 font-bold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      }).format(item.variant.price)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => decrementCartItemQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() => incrementCartItemQuantity(item.id)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeCartItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Hapus
                </button>
              </div>
            ))}

            <div className="mt-4 p-4 bg-gray-50 rounded">
              <div className="flex justify-between items-center mb-2">
                {/* <span> Nantikan Gratis Ongkir Kami</span> */}
                <span className="text-green-500">
  Tambah Rp{new Intl.NumberFormat("id-ID").format(
    Math.max(0, 150000 - seller.subtotal)
  )} untuk gratis ongkir
</span>
              </div>
              <div className="flex gap-2">
                <div className="bg-blue-100 text-orange-700 px-2 py-1 rounded text-sm">
                  Voucher Rp0
                </div>
                <div className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
                  Gratis Ongkir
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Checkout Summary */}
        <div className="bg-white rounded-lg shadow-md p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Total Belanja</h2>
            <div className="text-right">
              <p className="text-gray-600">
                Total Item: {selectedCart.length}
              </p>
              <p className="text-2xl font-bold text-orange-700">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(total)}
              </p>
            </div>
          </div>
          
          <button
            onClick={() => navigate("/checkout")}
            className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-700 transition"
            disabled={selectedCart.length === 0}
          >
            Checkout ({selectedCart.length})
          </button>
        </div>
      </div>
      <footer className="bg-gray-800 text-white py-4 text-xs">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Food Delivery App. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Cart;