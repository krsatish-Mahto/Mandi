import { Link, useNavigate } from 'react-router-dom';
import { formatPrice, getTimeAgo } from '../../utils/helpers';
import type { Listing } from '../../types';

interface ListingCardProps {
  listing?: Listing;
}

export default function ListingCard({ listing }: ListingCardProps) {
  const navigate = useNavigate();

  if (!listing) return null;

  const isBuying = listing.listing_type === 'buy';

  return (
    <div className="card group overflow-hidden flex flex-col bg-white hover:border-primary/40 transition-all duration-200">

      {/* Image & Badges */}
      <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
        <Link to={`/listings/${listing.id}`}>
          <img
            src={listing.images?.[0] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80'}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </Link>

        {/* Sell / Buy Pill Overlay */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span
            className={`px-2.5 py-1 text-[11px] font-bold rounded-full uppercase tracking-wider shadow-sm ${
              isBuying ? 'bg-amber-600 text-white' : 'bg-primary text-white'
            }`}
          >
            {isBuying ? 'Want to Buy (खरीदना है)' : 'For Sale (बेचना है)'}
          </span>
          {listing.price_negotiable && (
            <span className="bg-dark/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 rounded-full">
              Negotiable
            </span>
          )}
        </div>

        {/* Distance Badge */}
        <div className="absolute bottom-2.5 left-2.5 bg-black/75 backdrop-blur-xs text-white text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
          <span>📍</span>
          <span>{listing.village} • {listing.distance} km</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">

        <div>
          {/* Price Header */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-bold text-primary">
                {formatPrice(listing.price)}
              </span>
              <span className="text-xs text-gray-500 font-medium">
                / {listing.price_unit || listing.unit || 'unit'}
              </span>
            </div>
            {listing.quantity && (
              <span className="text-xs bg-gray-100 text-gray-700 font-medium px-2 py-0.5 rounded-md">
                Qty: {listing.quantity} {listing.unit}
              </span>
            )}
          </div>

          {/* Title */}
          <Link to={`/listings/${listing.id}`}>
            <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 leading-snug mb-2">
              {listing.title}
            </h3>
          </Link>
        </div>

        {/* Seller Info & Time footer */}
        <div className="pt-3 border-t border-gray-100 flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <img
              src={listing.seller?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=80&auto=format&fit=crop&q=80'}
              alt={listing.seller?.name || 'Seller'}
              className="w-6 h-6 rounded-full object-cover border border-gray-200"
            />
            <div className="text-[11px] leading-tight">
              <p className="font-semibold text-gray-800 truncate max-w-[100px]">
                {listing.seller?.name || 'Local Farmer'}
              </p>
              <p className="text-gray-400 text-[10px]">
                {getTimeAgo(listing.created_at)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/listings/${listing.id}#chat`);
            }}
            className="text-xs font-semibold text-primary hover:bg-green-50 px-2.5 py-1 rounded-md transition-colors"
          >
            Chat / Call →
          </button>
        </div>

      </div>

    </div>
  );
}
