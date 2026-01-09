'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface ProductImage {
  image: string;
  color: number | null;
}

interface Product {
  product_id: string;
  name: string;
  price: number;
  old_price?: number;
  category_name: string;
  images: ProductImage[];
  ratings?: {
    stats: {
      avg_rating: number;
      total_ratings: number;
    };
  };
  deal?: boolean;
  trending?: boolean;
  featured?: boolean;
}

interface RecommendationsData {
  same_category: Product[];
  complementary: Product[];
  trending: Product[];
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/shop';

export const ProductRecommendations = ({ productId }: { productId: string }) => {
  const [recommendations, setRecommendations] = useState<RecommendationsData>({
    same_category: [],
    complementary: [],
    trending: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/api/recommendations/?product_id=${productId}`
        );
        if (response.ok) {
          const data = await response.json();
          setRecommendations(data);
        }
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchRecommendations();
    }
  }, [productId]);



  const ProductCard = ({ product }: { product: Product }) => {
    const discount = product.old_price
      ? Math.round(((product.old_price - product.price) / product.old_price) * 100)
      : 0;

    return (
      <Link href={`/products/${product.product_id}`}>
        <div className="flex-shrink-0 w-64 group cursor-pointer h-full">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col ">
            {/* Image Container */}
            <div className="relative w-full aspect-square bg-white rounded-t-2xl overflow-hidden mb-3">
              {product.images && product.images.length > 0 ? (
                <Image
                  src={product.images[0].image}
                  alt={product.name}
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="w-full h-full bg-gray-50 flex items-center justify-center text-gray-200">
                  <span className="text-4xl font-bold">?</span>
                </div>
              )}

              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-[10px] font-bold shadow-sm">
                  -{discount}%
                </div>
              )}

              {/* Featured/Category Label */}
              {product.featured && (
                <div className="absolute top-2 left-2 bg-amber-100 text-amber-800 px-2 py-1 rounded text-[10px] font-bold">
                  Featured
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex flex-col px-5 flex-grow py-3">
              {/* Product Name */}
              <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-2 min-h-10 leading-snug">
                {product.name}
              </h3>

              {/* Price Section */}
              <div className="mt-auto space-y-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-red-600">NPR {product.price.toLocaleString()}</span>
                  {product.old_price && (
                    <span className="text-xs text-gray-400 line-through">
                      NPR {product.old_price.toLocaleString()}
                    </span>
                  )}
                </div>

                {/* Rating Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-amber-400 text-amber-400" />
                    <span className="text-xs font-medium text-gray-600">
                      {product.ratings?.stats?.avg_rating || 0}
                    </span>
                  </div>
                  {/* Optional: Add to cart button or simple arrow if needed, 
                      but keeping it clean as per screenshot implies just data */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const RecommendationSection = ({
    title,
    products,
    sectionKey,
  }: {
    title: string;
    products: Product[];
    sectionKey: string;
  }) => {
    if (!products || products.length === 0) {
      return null;
    }

    const handleScroll = (direction: 'left' | 'right') => {
      const container = document.getElementById(`scroll-${sectionKey}`);
      if (!container) return;

      const scrollAmount = 280;
      const currentScroll = container.scrollLeft;
      const newPosition = direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount;

      container.scrollTo({
        left: newPosition,
        behavior: 'smooth',
      });
    };

    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">{title}</h2>
        <div className="relative">
          {/* Scroll Container */}
          <div
            id={`scroll-${sectionKey}`}
            className="flex gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {products.map((product) => (
              <ProductCard key={product.product_id} product={product} />
            ))}
          </div>

          {/* Navigation Buttons */}
          {products.length > 3 && (
            <>
              <button
                onClick={() => handleScroll('left')}
                className="absolute -left-6 top-1/3 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
                aria-label="Scroll left"
              >
                <ChevronLeft size={24} className="text-gray-800" />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className="absolute -right-6 top-1/3 -translate-y-1/2 z-10 bg-white rounded-full p-3 shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all"
                aria-label="Scroll right"
              >
                <ChevronRight size={24} className="text-gray-800" />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  if (loading) {
    return null;
  }

  const hasAnyRecommendations =
    (recommendations.same_category && recommendations.same_category.length > 0) ||
    (recommendations.complementary && recommendations.complementary.length > 0) ||
    (recommendations.trending && recommendations.trending.length > 0);

  if (!hasAnyRecommendations) {
    return null;
  }

  return (
    <div className="space-y-6">
      {recommendations.same_category && recommendations.same_category.length > 0 && (
        <RecommendationSection
          title="Similar Products"
          products={recommendations.same_category}
          sectionKey="same_category"
        />
      )}

      {recommendations.complementary && recommendations.complementary.length > 0 && (
        <RecommendationSection
          title="You May Also Like"
          products={recommendations.complementary}
          sectionKey="complementary"
        />
      )}

      {recommendations.trending && recommendations.trending.length > 0 && (
        <RecommendationSection
          title="Trending Now"
          products={recommendations.trending}
          sectionKey="trending"
        />
      )}
    </div>
  );
};
