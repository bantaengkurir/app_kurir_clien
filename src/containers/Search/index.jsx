import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaShoppingBag, FaArrowLeft } from 'react-icons/fa';
import Navbar from '../../components/Navbar';

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(location.search).get('q') || '';
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fungsi untuk mensimulasikan pengambilan data produk
  useEffect(() => {
    // Simulasi delay pengambilan data
    const fetchSearchResults = async () => {
      setIsLoading(true);
      
      // Simulasi: Ambil produk dari localStorage atau state global
      // Di aplikasi nyata, ini akan mengambil dari API/Store
      const storedProducts = localStorage.getItem('products');
      const productItems = storedProducts ? JSON.parse(storedProducts) : [];
      
      // Filter produk berdasarkan query
      const results = productItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase()) ||
        (item.seller && item.seller.name.toLowerCase().includes(query.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsLoading(false);
    };

    fetchSearchResults();
  }, [query]);

  const ProductCard = ({ product }) => {
    return (
      <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow h-full flex flex-col border border-gray-100">
        <div className="relative pt-[100%]">
          <button 
            onClick={() => navigate(`/product-detail/${product.id}/detail`)} 
            className="absolute inset-0 w-full h-full"
          >
            <img 
              src={product.image_url || 'https://via.placeholder.com/300'}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/300';
              }}
            />
          </button>
        </div>
        <div className="p-2 flex-grow flex flex-col">
          <h3 className="font-semibold text-sm mb-1 line-clamp-2 h-10 leading-tight">{product.name}</h3>
          <p className="text-gray-800 font-bold text-sm mb-1">Rp{product.price.toLocaleString()}</p>
          
          <div className="flex items-center mb-1">
            <span className="flex items-center text-yellow-500 mr-1">
              <FaStar className="text-xs" />
            </span>
            <span className="text-xs font-medium text-gray-700">
              {/* {product?.rating?.toFixed(1) || '0.0'} */}
            </span>
            <span className="mx-1 text-gray-300">•</span>
            <span className="text-xs text-gray-500">{product.total_sold || 0} terjual</span>
          </div>
          
          <div className="text-xs text-gray-500 mb-2 truncate">{product.seller?.name || ''}</div>
          
          <button 
            onClick={() => navigate(`/product-detail/${product.id}/detail`)}
            className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs py-1.5 rounded-full flex items-center justify-center transition-colors"
          >
            <FaShoppingBag className="mr-1 text-[10px]" />
            <span>Pesan</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-3 py-4 mt-16">
        <div className="flex items-center mb-4">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-700 hover:text-orange-500 mr-2"
          >
            <FaArrowLeft className="mr-1" /> Kembali
          </button>
          <h1 className="text-lg font-bold">Hasil Pencarian: {query}</h1>
        </div>
        
        {isLoading ? (
          <div className="text-center py-8">
            <p>Mencari produk...</p>
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Tidak ada produk yang ditemukan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-3">
            {searchResults.map(product => (
              <ProductCard key={`search-${product.id}`} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;