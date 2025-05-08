'use client';
import { useState } from 'react';
import Head from 'next/head';
import ProductCard from './components/ProductCard';
import { Search, ShoppingBag, Loader2, Mail } from 'lucide-react';

export default function Home() {
  const [browsed, setBrowsed] = useState('');
  const [category, setCategory] = useState('');
  const [message, setMessage] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getRecommendations = async () => {
    if (!browsed.trim()) {
      setMessage('Please enter at least one product');
      return;
    }
    
    setIsLoading(true);
    setMessage('');
    
    try {
      const browsedProducts = browsed.split(',').map(item => item.trim());
      const response = await fetch('http://localhost:5000/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          browsed_products: browsedProducts,
          category: category.trim() || null,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setMessage(data.message || '');
      setRecommendations(data.recommendations || []);
    } catch (error) {
      console.error('Error:', error);
      setMessage('An error occurred: ' + error.message);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const logClick = async (product) => {
    try {
      await fetch('http://localhost:5000/log_click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product }),
      });
    } catch (error) {
      console.error('Error logging click:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50">
      <Head>
        <title>Smart Shop | Personalized Recommendations</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingBag className="h-8 w-8 text-indigo-600" />
            <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Smart Shop
            </h1>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition cursor-pointer border-b-2 border-transparent hover:border-indigo-600 pb-1">
                Home
              </li>
              <li className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition cursor-pointer border-b-2 border-transparent hover:border-indigo-600 pb-1">
                Categories
              </li>
              <li className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition cursor-pointer border-b-2 border-transparent hover:border-indigo-600 pb-1">
                About
              </li>
            </ul>
          </nav>
          {/* Mobile menu button would go here */}
          <div className="block md:hidden">
            <button className="text-gray-700 hover:text-indigo-600 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Hero section */}
        <section className="mb-12 text-center pt-6 pb-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Discover <span className="text-indigo-600">Personalized</span> Product Recommendations
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Tell us what products you've browsed, and we'll suggest items tailored just for you.
            </p>
          </div>
        </section>

        {/* Search form */}
        <section className="max-w-2xl mx-auto mb-16">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-indigo-100 transform transition-all hover:shadow-xl">
            <div className="space-y-6">
              <div className="relative">
                <label htmlFor="browsed" className="block text-sm font-medium text-gray-700 mb-2">
                  Products You've Browsed
                </label>
                <div className="relative">
                  <input
                    id="browsed"
                    type="text"
                    value={browsed}
                    onChange={(e) => setBrowsed(e.target.value)}
                    placeholder="e.g., Smartphone, Laptop, Headphones"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-800"
                    required
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-indigo-400" />
                  </div>
                </div>
                <p className="mt-1 text-xs text-gray-500">Separate multiple products with commas</p>
              </div>
              
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Category (Optional)
                </label>
                <input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Electronics, Home & Garden"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-gray-800"
                />
              </div>
              
              <button
                onClick={getRecommendations}
                disabled={isLoading}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:opacity-70 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
              >
                {isLoading ? (
                  <><Loader2 className="animate-spin h-5 w-5 mr-2" /> Finding Recommendations...</>
                ) : (
                  'Get Recommendations'
                )}
              </button>
            </div>
          </div>
        </section>

        {/* Results section */}
        <section>
          {message && (
            <div className={`mb-8 p-4 rounded-lg ${message.includes('error') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-indigo-50 text-indigo-700 border border-indigo-200'}`}>
              {message}
            </div>
          )}
          
          {recommendations.length > 0 && (
            <div className="mb-16">
              <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center md:text-left">
                <span className="inline-block pb-2 border-b-2 border-indigo-500">Recommended for You</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {recommendations.map((rec, index) => (
                  <ProductCard
                    key={index}
                    product={rec}
                    onClick={() => logClick(rec['Product Name'])}
                  />
                ))}
              </div>
            </div>
          )}
          
          {!isLoading && recommendations.length === 0 && !message.includes('error') && (
            <div className="text-center py-16">
              <div className="max-w-md mx-auto p-8 bg-white rounded-xl shadow-md border border-indigo-100">
                <Search className="h-12 w-12 text-indigo-300 mx-auto mb-4" />
                <p className="text-gray-500">Enter your browsing history above to get personalized recommendations</p>
              </div>
            </div>
          )}
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 to-purple-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-indigo-300" />
                <h3 className="text-xl font-semibold">Smart Shop</h3>
              </div>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Personalized shopping recommendations powered by AI. Discover products you'll love based on your browsing habits.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-indigo-700 pb-2">Quick Links</h3>
              <ul className="space-y-2 text-indigo-200 text-sm">
                <li className="hover:text-white transition cursor-pointer">Terms of Service</li>
                <li className="hover:text-white transition cursor-pointer">Privacy Policy</li>
                <li className="hover:text-white transition cursor-pointer">FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 border-b border-indigo-700 pb-2">Newsletter</h3>
              <p className="text-indigo-200 text-sm mb-4">
                Subscribe for updates and exclusive offers
              </p>
              <div className="flex flex-col sm:flex-row">
                <div className="relative flex-grow mb-2 sm:mb-0">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full px-4 py-2 text-gray-800 rounded-lg sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
                  />
                  <Mail className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg sm:rounded-l-none transition transform hover:-translate-y-0.5">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-indigo-800 mt-8 pt-8 text-center text-indigo-300 text-sm">
            &copy; {new Date().getFullYear()} Smart Shop. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}