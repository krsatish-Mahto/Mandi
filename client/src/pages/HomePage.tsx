import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FilterBar from '../components/Listings/FilterBar';
import ListingCard from '../components/Listings/ListingCard';
import { getStoredListings } from '../data/mockData';
import type { Village } from '../types';

interface HomePageProps {
  searchQuery?: string;
  activeVillage?: Village | null;
}

export default function HomePage({ searchQuery = '', activeVillage = null }: HomePageProps) {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedDistance, setSelectedDistance] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [localSearch, setLocalSearch] = useState('');

  const listings = useMemo(() => getStoredListings(), []);

  // Filter and sort listings
  const filteredListings = useMemo(() => {
    return listings.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }

      // Distance filter
      if (selectedDistance !== 'all') {
        const maxDist = parseFloat(selectedDistance);
        if (item.distance > maxDist) return false;
      }

      // Listing Type filter (sell / buy)
      if (selectedType !== 'all' && item.listing_type !== selectedType) {
        return false;
      }

      // Search keyword filter
      const q = (searchQuery || localSearch).trim().toLowerCase();
      if (q) {
        const matchTitle = item.title?.toLowerCase().includes(q);
        const matchDesc = item.description?.toLowerCase().includes(q);
        const matchVillage = item.village?.toLowerCase().includes(q);
        const matchCategory = item.category?.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchVillage && !matchCategory) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'nearest') {
        return (a.distance || 0) - (b.distance || 0);
      }
      if (sortBy === 'price_asc') {
        return (a.price || 0) - (b.price || 0);
      }
      if (sortBy === 'price_desc') {
        return (b.price || 0) - (a.price || 0);
      }
      // 'recent' by default
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });
  }, [listings, selectedCategory, selectedDistance, selectedType, sortBy, searchQuery, localSearch]);

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedDistance('all');
    setSelectedType('all');
    setSortBy('recent');
    setLocalSearch('');
  };

  return (
    <div className="pb-16">

      {/* Hero Banner with Village Info */}
      <div className="bg-gradient-to-r from-green-900 via-primary to-green-800 text-white py-6 sm:py-8 shadow-inner">
        <div className="container-primary">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1 text-green-200 text-xs font-semibold uppercase tracking-wider">
                <span>📍 Nearby Cluster</span>
                <span>•</span>
                <span>{activeVillage ? activeVillage.name : 'Rampur, Sonpur & Belur'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Buy & Sell Direct in Your Village
              </h1>
              <p className="text-xs sm:text-sm text-green-100/90 mt-1 max-w-xl">
                Fresh crops, desi cow milk & ghee, tractors for hire, seeds and fertilizers from trusted farmers.
              </p>
            </div>

            {/* Quick Post Ad CTA */}
            <div className="flex items-center gap-3">
              <Link
                to="/create-listing"
                className="bg-white text-primary hover:bg-green-50 font-bold px-5 py-2.5 rounded-full text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2"
              >
                <span className="text-lg leading-none">+</span>
                <span>Post Free Listing (विज्ञापन डालें)</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Filter Bar */}
      <FilterBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        selectedDistance={selectedDistance}
        onSelectDistance={setSelectedDistance}
        selectedType={selectedType}
        onSelectType={setSelectedType}
        sortBy={sortBy}
        onSortChange={setSortBy}
      />

      {/* Main Listings Grid Section */}
      <div className="container-primary pt-6 sm:pt-8">

        {/* Header Results Count & Active Filters */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">
              {selectedCategory !== 'all'
                ? `${selectedCategory.toUpperCase()} Produce`
                : 'All Fresh Listings'}
            </h2>
            <span className="text-xs font-semibold bg-green-100 text-primary px-2.5 py-0.5 rounded-full">
              {filteredListings.length} {filteredListings.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {(selectedCategory !== 'all' || selectedDistance !== 'all' || selectedType !== 'all') && (
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Reset Filters (फ़िल्टर साफ़ करें)
            </button>
          )}
        </div>

        {/* Listings Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {filteredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-12 text-center max-w-lg mx-auto my-8">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🌾
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              No Listings Found in this Filter
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 mb-6">
              Try expanding your village distance radius or exploring all categories.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={resetFilters}
                className="btn-primary text-xs sm:text-sm py-2 px-4 rounded-full"
              >
                Reset All Filters
              </button>
              <Link
                to="/create-listing"
                className="btn-secondary text-xs sm:text-sm py-2 px-4 rounded-full"
              >
                + Post This Item First
              </Link>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
