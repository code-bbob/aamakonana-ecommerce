'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/components/ProductCard';
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/shop';

interface Product {
  product_id: string;
  name: string;
  price: number;
  old_price?: number;
  category: string;
  images: Array<{ image: string }>;
  ratings?: {
    stats: {
      avg_rating: number;
      total_ratings: number;
    };
  };
}

interface ProductsResponse {
  links: {
    next: string | null;
    previous: string | null;
  };
  count: number;
  total_pages: number;
  current_page: number;
  results: Product[];
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout>();

  const [filters, setFilters] = useState({
    priceRange: [0, 100000],
    rating: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage.toString(),
        });

        if (sortBy) {
          params.append('ordering', sortBy);
        }

        if (filters.priceRange[0] > 0) {
          params.append('min_price', filters.priceRange[0].toString());
        }

        if (filters.priceRange[1] < 100000) {
          params.append('max_price', filters.priceRange[1].toString());
        }

        if (filters.rating > 0) {
          params.append('min_rating', filters.rating.toString());
        }


        const response = await fetch(`${API_BASE_URL}/api/?${params}`);
        if (response.ok) {
          const data: ProductsResponse = await response.json();
          setProducts(data.results);
          setTotalPages(data.total_pages);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, sortBy, filters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!query.trim()) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setSearchLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const params = new URLSearchParams({
          search: query.trim(),
        });

        const response = await fetch(`${API_BASE_URL}/api/search/?${params}`);
        if (response.ok) {
          const data: ProductsResponse = await response.json();
          setSearchSuggestions(data.results.slice(0, 6)); // Limit to 6 suggestions
          setShowSuggestions(true);
        }
      } catch (error) {
        console.error('Error fetching search suggestions:', error);
      } finally {
        setSearchLoading(false);
      }
    }, 300); // 300ms delay
  };

  const handleSuggestionClick = (product: Product) => {
    setSearchQuery('');
    setShowSuggestions(false);
    window.location.href = `/products/${product.product_id}`;
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPages = 7; // Maximum pages to show

    if (totalPages <= maxPages) {
      // Show all pages if total is less than or equal to max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      // Calculate start and end of middle section
      let startPage = Math.max(2, currentPage - 2);
      let endPage = Math.min(totalPages - 1, currentPage + 2);

      // Add ellipsis before middle section
      if (startPage > 2) {
        pages.push('...');
      }

      // Add middle pages
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      // Add ellipsis after middle section
      if (endPage < totalPages - 1) {
        pages.push('...');
      }

      // Always show last page
      pages.push(totalPages);
    }

    return pages;
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      rating: 0,
    });
    setCurrentPage(1);
  };

  const activeFilterCount = [
    filters.priceRange[0] > 0 || filters.priceRange[1] < 100000 ? 1 : 0,
    filters.rating > 0 ? 1 : 0,
  ].reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-200">
        <div className=" ">
          <div className="flex ">
        <div
          className=" relative w-full p-8 items-center overflow-hidden h-48 bg-cover bg-top bg-right "
          data-alt="A serene photo of a mother gently holding her baby."
          style={{ backgroundImage: "url('images/banner3.png')" }}
        >

              <nav className="flex items-center gap-2 font-bold text-sm text-gray-600">
                <Link href="/" className="hover:text-gray-900 transition-colors">Home</Link>
                <span>/</span>
                <span className="text-gray-900">Shop</span>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="flex gap-12">
          <aside
            className={`${
              mobileFiltersOpen ? 'block' : 'hidden'
            } md:block fixed md:relative inset-0 md:inset-auto bg-white md:bg-transparent z-30 md:z-0 md:w-64 overflow-y-auto max-h-screen md:max-h-none`}
          >
            {mobileFiltersOpen && (
              <div className="flex items-center justify-between p-6 md:hidden border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>
            )}

            <div className="p-6 md:p-0 mt-8 space-y-8 md:sticky md:top-10">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">
                  Filter by
                </h3>
                <div className="space-y-6 text-sm">
                  <div>
                    <label className="block font-medium text-gray-900 mb-4">
                      Categories
                    </label>
                    <div className="space-y-3">
                      {['All', 'T-Shirts', 'Hoodies', 'Jackets', 'Accessories'].map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            className="w-4 h-4 rounded border-gray-300 cursor-pointer"
                          />
                          <span className="text-gray-600 hover:text-gray-900 transition-colors">
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <label className="block font-medium text-gray-900 mb-4">
                      Price
                    </label>
                    <div className="space-y-3">
                      <div>
                        <input
                          type="range"
                          min="0"
                          max="100000"
                          step="1000"
                          value={filters.priceRange[0]}
                          onChange={(e) =>
                            setFilters({
                              ...filters,
                              priceRange: [parseInt(e.target.value), filters.priceRange[1]],
                            })
                          }
                          className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
                        />
                        <div className="text-xs text-gray-600 mt-2">
                          Rs. {filters.priceRange[0].toLocaleString()} - Rs. {filters.priceRange[1].toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <label className="block font-medium text-gray-900 mb-4">
                      Rating
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 0, label: 'All' },
                        { value: 4, label: '4★ & up' },
                        { value: 3, label: '3★ & up' },
                      ].map((option) => (
                        <label key={option.value} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value={option.value}
                            checked={filters.rating === option.value}
                            onChange={(e) =>
                              setFilters({ ...filters, rating: parseInt(e.target.value) })
                            }
                            className="w-4 h-4 cursor-pointer"
                          />
                          <span className="text-gray-600 hover:text-gray-900 transition-colors">
                            {option.label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {activeFilterCount > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="w-full pt-6 border-t border-gray-200 text-left text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear all ({activeFilterCount})
                </button>
              )}

              {mobileFiltersOpen && (
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="md:hidden w-full py-3 bg-black text-white rounded text-sm font-medium hover:bg-gray-900 transition-colors"
                >
                  Apply
                </button>
              )}
            </div>
          </aside>
          

          <div className="flex-1">
            <h1 className='mt-4 text-2xl font-semibold'>Shop</h1>
            
            {/* Search Bar with Suggestions */}
            <div className="mt-6 mb-8 relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchQuery && setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>

              {/* Search Suggestions Dropdown */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-40 max-h-96 overflow-y-auto">
                  {searchLoading ? (
                    <div className="p-4 text-center text-gray-500">Searching...</div>
                  ) : searchSuggestions.length > 0 ? (
                    <div>
                      {searchSuggestions.map((product) => (
                        <button
                          key={product.product_id}
                          onClick={() => handleSuggestionClick(product)}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                        >
                          <img
                            src={product.images[0]?.image || '/images/placeholder.png'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">Rs. {product.price}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      No products found matching "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="md:hidden text-sm font-medium text-gray-900"
                >
                  Filter by
                  {activeFilterCount > 0 && (
                    <span className="ml-2 inline-block w-5 h-5 bg-black text-white text-xs rounded-full flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>
                <span className="hidden sm:inline text-sm text-gray-600">
                  Showing results of {products.length} items
                </span>
              </div>

              <div>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="text-sm font-medium text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  <option value="">Default Sorting</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-square bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16">
                  {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                  ))}
                </div>

                <div className="flex items-center pb-10 justify-center gap-4 pt-12 border-t border-gray-200">
                  <button
                    onClick={handlePreviousPage}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-900" />
                  </button>

                  <div className="flex items-center gap-2">
                    {getPaginationNumbers().map((pageNum, idx) => {
                      if (pageNum === '...') {
                        return (
                          <span key={`ellipsis-${idx}`} className="text-gray-600 px-2">
                            ...
                          </span>
                        );
                      }
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum as number)}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                            currentPage === pageNum
                              ? 'bg-black text-white'
                              : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronRight size={20} className="text-gray-900" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-600 mb-6">No products match your filters</p>
                <button
                  onClick={handleResetFilters}
                  className="text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
