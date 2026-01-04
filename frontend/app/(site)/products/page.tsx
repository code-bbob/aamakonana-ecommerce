'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { ProductCard } from '@/components/ProductCard';
import { ChevronLeft, ChevronRight, X, Search } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8000/shop';

interface Product {
  product_id: string;
  name: string;
  price: number;
  old_price?: number;
  category_name: string;
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

// Categories for the filter sidebar
const CATEGORIES = ['All', 'Moms', 'Babies', 'Gifts'];

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Search state
  const [searchSuggestions, setSearchSuggestions] = useState<Product[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Derived state from URL
  const currentPage = Number(searchParams.get('page')) || 1;
  const currentCategory = searchParams.get('category') || 'All';
  const currentSearch = searchParams.get('search') || '';
  const currentSort = searchParams.get('ordering') || '';
  const minPrice = Number(searchParams.get('min_price')) || 0;
  const maxPrice = Number(searchParams.get('max_price')) || 100000;
  const minRating = Number(searchParams.get('min_rating')) || 0;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set('page', currentPage.toString());
        
        if (currentCategory && currentCategory !== 'All') {
          // Map helper: the API likely expects "category" query param.
          // Note: Check if API expects ID or Name. Usually name works if API supports it, 
          // or we might need slug. Assuming Name based on user context.
          params.set('category', currentCategory);
        }

        if (currentSearch) {
          params.set('search', currentSearch);
        }

        if (currentSort) {
          params.set('ordering', currentSort);
        }

        if (minPrice > 0) {
          params.set('min_price', minPrice.toString());
        }

        if (maxPrice < 100000) {
          params.set('max_price', maxPrice.toString());
        }

        if (minRating > 0) {
          params.set('min_rating', minRating.toString());
        }

        const response = await fetch(`${API_BASE_URL}/api/?${params.toString()}`);
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
  }, [currentPage, currentCategory, currentSearch, currentSort, minPrice, maxPrice, minRating]);

  // URL Helper
  const updateParams = (newParams: Record<string, string | number | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newParams).forEach(([key, value]) => {
      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });
    // Reset page on filter change if not strictly changing page
    if (!newParams.page) {
       params.set('page', '1');
    }
    router.push(`/products?${params.toString()}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // The search is already in URL via input change? No, typical pattern is update on submit.
    // But here we want controlled input derived from URL for "truth", 
    // or local state pushed to URL on submit.
    // Let's use local state for input and push to URL on submit.
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('search-input') as HTMLInputElement;
    updateParams({ search: input.value });
    setShowSuggestions(false);
  };

  const handleSearchInput = (value: string) => {
    // Just update suggestions here, don't update URL yet
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    
    if (!value.trim()) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    setSearchLoading(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/search/?search=${encodeURIComponent(value.trim())}`);
        if (response.ok) {
           const data = await response.json();
           setSearchSuggestions(data.results.slice(0, 6)); // Assuming same response shape
           setShowSuggestions(true);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setSearchLoading(false);
      }
    }, 300);
  };

  const getPaginationNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPages = 7; 

    if (totalPages <= maxPages) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(totalPages - 1, currentPage + 2);

      if (startPage > 2) pages.push('...');
      for (let i = startPage; i <= endPage; i++) pages.push(i);
      if (endPage < totalPages - 1) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  const activeFilterCount = [
    minPrice > 0 || maxPrice < 100000 ? 1 : 0,
    minRating > 0 ? 1 : 0,
    currentCategory !== 'All' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  return (
    <main className="min-h-screen bg-white">
      {/* Banner / Breadcrumb */}
      <div className="border-b border-gray-200">
          <div 
            className="flex relative w-full p-8 items-center overflow-hidden h-48 bg-cover bg-top bg-right"
            style={{ backgroundImage: "url('/images/banner3.png')" }}
          >
            <nav className="flex items-center gap-2 font-bold text-sm text-gray-800 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
              <Link href="/" className="hover:text-black transition-colors">Home</Link>
              <span>/</span>
              <span className="text-black">Shop</span>
              <span>/</span>
              <span className="text-black">{currentCategory}</span>  
            </nav>
          </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-12">
          {/* Filters Sidebar */}
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

            <div className="p-6 md:p-0 mt-8 space-y-8 md:sticky md:top-24">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-6">Filter by</h3>
                <div className="space-y-6 text-sm">
                  {/* Category Filter */}
                  <div>
                    <label className="block font-medium text-gray-900 mb-4">Categories</label>
                    <div className="space-y-3">
                      {CATEGORIES.map((cat) => (
                        <label key={cat} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={currentCategory === cat || (currentCategory === '' && cat === 'All')}
                            onChange={() => updateParams({ category: cat === 'All' ? null : cat })}
                            className="w-4 h-4 rounded border-gray-300 cursor-pointer accent-black"
                          />
                          <span className={`${currentCategory === cat || (currentCategory === '' && cat === 'All') ? 'font-semibold text-black' : 'text-gray-600'} hover:text-black transition-colors`}>
                            {cat}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Filter */}
                  <div className="pt-6 border-t border-gray-200">
                    <label className="block font-medium text-gray-900 mb-4">Price</label>
                    <input
                      type="range"
                      min="0"
                      max="100000"
                      step="1000"
                      value={minPrice} 
                      onChange={(e) => updateParams({ min_price: e.target.value })}
                      className="w-full h-1 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                     {/* Simplified to single slider for min price for UX or range if dual slider logic exists. 
                         Reverting to original logic approx: [min, max] */}
                     <div className="text-xs text-gray-600 mt-2">
                       Min: Rs. {minPrice.toLocaleString()} - Max: Rs. {maxPrice.toLocaleString()}
                     </div>
                  </div>

                   {/* Rating Filter */}
                   <div className="pt-6 border-t border-gray-200">
                    <label className="block font-medium text-gray-900 mb-4">Rating</label>
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
                            checked={minRating === option.value}
                            onChange={() => updateParams({ min_rating: option.value || null })}
                            className="w-4 h-4 cursor-pointer accent-black"
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
                  onClick={() => router.push('/products')}
                  className="w-full pt-6 border-t border-gray-200 text-left text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 page-load-fade-in mt-8">
            <div className='text-2xl flex items-center font-semibold'>Shop <span><ChevronRight/></span> {currentCategory}</div>

            {/* Search Bar */}
            <div className="mt-6 mb-8 relative z-20">
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  name="search-input"
                  type="text"
                  placeholder="Search products..."
                  defaultValue={currentSearch}
                  onChange={(e) => handleSearchInput(e.target.value)}
                  onFocus={() => showSuggestions && setShowSuggestions(true)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </form>

              {/* Suggestions */}
              {showSuggestions && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-40 max-h-96 overflow-y-auto">
                   {searchLoading ? (
                    <div className="p-4 text-center text-gray-500">Searching...</div>
                  ) : searchSuggestions.length > 0 ? (
                    <div>
                      {searchSuggestions.map((product) => (
                        <Link
                          key={product.product_id}
                          href={`/products/${product.product_id}`}
                          className="w-full flex items-center gap-3 p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0 text-left"
                          onClick={() => setShowSuggestions(false)}
                        >
                          <Image
                            src={product.images[0]?.image || '/images/placeholder.png'}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-cover rounded"
                          />
                           <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                            <p className="text-xs text-gray-500">Rs. {product.price}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">No suggestions</div>
                  )}
                </div>
              )}
            </div>

            {/* Sort & active count */}
             <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-8 gap-4 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="md:hidden text-sm font-medium text-gray-900"
                >
                  Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                </button>
                <span className="hidden sm:inline text-sm text-gray-600">
                  Showing results of {products.length} items
                </span>
              </div>

               <div>
                <select
                  value={currentSort}
                  onChange={(e) => updateParams({ ordering: e.target.value })}
                  className="text-sm font-medium text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer"
                >
                  <option value="">Default Sorting</option>
                  <option value="price">Price: Low to High</option>
                  <option value="-price">Price: High to Low</option>
                </select>
              </div>
             </div>

             {/* Product Grid */}
              {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-8">
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
                <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 mb-16 mt-8">
                  {products.map((product) => (
                    <ProductCard key={product.product_id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                <div className="flex items-center pb-10 justify-center gap-4 pt-12 border-t border-gray-200">
                  <button
                    onClick={() => updateParams({ page: Math.max(1, currentPage - 1) })}
                    disabled={currentPage === 1}
                    className="p-2 hover:bg-gray-100 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft size={20} className="text-gray-900" />
                  </button>

                  <div className="flex items-center gap-2">
                    {getPaginationNumbers().map((pageNum, idx) => 
                       pageNum === '...' ? (
                        <span key={`el-${idx}`} className="text-gray-600 px-2">...</span>
                       ) : (
                        <button
                          key={pageNum}
                          onClick={() => updateParams({ page: pageNum as number })}
                          className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                            currentPage === pageNum ? 'bg-black text-white' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          }`}
                        >
                          {pageNum}
                        </button>
                       )
                    )}
                  </div>

                   <button
                    onClick={() => updateParams({ page: Math.min(totalPages, currentPage + 1) })}
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
                 <button onClick={() => router.push('/products')} className="text-sm font-medium text-gray-900 hover:text-gray-600 underline">
                   Clear all filters
                 </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
