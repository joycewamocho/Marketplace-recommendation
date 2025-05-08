import { ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product, onClick }) {
  // Generate a random rating between 3.5 and 5.0
  const rating = (3.5 + Math.random() * 1.5).toFixed(1);
  
  // Generate random number of reviews between 5 and 120
  const reviews = Math.floor(5 + Math.random() * 115);

  return (
    <div
      onClick={onClick}
      className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-indigo-100 hover:-translate-y-1 flex flex-col h-full"
    >
      {/* Mock image placeholder */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 h-40 mb-4 rounded-lg flex items-center justify-center">
        <div className="text-indigo-300 font-medium text-sm">{product['Product Category']}</div>
      </div>
      
      {/* Product details */}
      <div className="flex-grow">
        <div className="flex items-center justify-between mb-2">
          <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-md text-xs font-medium">
            {product['Product Category']}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-yellow-400" />
            <span className="text-xs font-medium text-gray-600">{rating} ({reviews})</span>
          </div>
        </div>
        
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">{product['Product Name']}</h2>
        
        <div className="mt-auto pt-4 flex items-center justify-between">
          <p className="text-indigo-600 font-bold text-lg">${product['Price']}</p>
          <button className="p-2 rounded-full bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition-colors">
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}