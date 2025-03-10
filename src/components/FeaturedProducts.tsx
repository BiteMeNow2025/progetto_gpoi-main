import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const itemsPerPage = 4; // Number of products per page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Slice the products array based on the current page and items per page
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle the pagination logic (next and previous)
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-16 px-6 mb-20 md:mb-0">
      <h2 className="text-3xl font-bold text-white mb-8">Prodotti consigliati</h2>

      {/* Carousel for Featured Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="bg-zinc-800 rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-[1.02]"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-white font-bold mb-2">{product.name}</h3>
              <p className="text-gray-400 text-sm mb-4">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-amber-500 font-bold">${product.price}</span>
                <button
                  className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-600 transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98]"
                >
                  Aggiungi al Carrello
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-zinc-700 text-white py-2 px-4 rounded-lg hover:bg-zinc-600 disabled:opacity-50 transition-all duration-300"
        >
          Precedente
        </button>
        <span className="text-white">
          Pagina {currentPage} di {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-zinc-700 text-white py-2 px-4 rounded-lg hover:bg-zinc-600 disabled:opacity-50 transition-all duration-300"
        >
          Successivo
        </button>
      </div>
    </div>
  );
};

export default FeaturedProducts;
