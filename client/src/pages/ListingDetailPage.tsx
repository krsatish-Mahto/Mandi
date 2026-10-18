import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  getListingById,
  getCommentsForListing,
  addCommentToListing,
  getStoredListings,
} from '../data/mockData';
import { formatPrice, getTimeAgo } from '../utils/helpers';
import { useAuth } from '../hooks/useAuth';
import ListingCard from '../components/Listings/ListingCard';
import type { Comment, Listing } from '../types';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [listing, setListing] = useState<Listing | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const item = getListingById(id);
    if (item) {
      setListing(item);
      setSelectedImage(0);
      setComments(getCommentsForListing(id));
    }
  }, [id]);

  if (!listing) {
    return (
      <div className="container-primary py-16 text-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl border border-gray-200">
          <span className="text-4xl mb-3 block">🌾</span>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Listing Not Found</h2>
          <p className="text-sm text-gray-500 mb-6">
            This produce ad might have been sold or removed by the farmer.
          </p>
          <Link to="/" className="btn-primary inline-block">
            ← Back to Mandi Feed
          </Link>
        </div>
      </div>
    );
  }

  const handleAddComment = (e: FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setCommentSubmitting(true);
    setTimeout(() => {
      const added = addCommentToListing(listing.id, newComment, user);
      setComments([added, ...comments]);
      setNewComment('');
      setCommentSubmitting(false);
    }, 400);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Related items
  const allListings = getStoredListings();
  const relatedListings = allListings
    .filter((l) => l.id !== listing.id && (l.category === listing.category || l.village === listing.village))
    .slice(0, 3);

  const isBuying = listing.listing_type === 'buy';

  return (
    <div className="bg-gray-50 py-6 sm:py-10 pb-24 sm:pb-16">
      <div className="container-primary">

        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-500 mb-4 overflow-x-auto whitespace-nowrap">
          <Link to="/" className="hover:text-primary">Mandi Home</Link>
          <span>/</span>
          <Link to={`/?category=${listing.category}`} className="hover:text-primary capitalize">
            {listing.category}
          </Link>
          <span>/</span>
          <span className="text-gray-800 font-semibold truncate max-w-xs">{listing.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">

          {/* Left Column: Gallery & Description */}
          <div className="lg:col-span-8 space-y-6">

            {/* Gallery Card */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-xs">
              {/* Main Image */}
              <div className="relative aspect-16/10 sm:aspect-16/9 bg-gray-100 overflow-hidden">
                <img
                  src={listing.images?.[selectedImage] || 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1000&auto=format&fit=crop&q=80'}
                  alt={listing.title}
                  className="w-full h-full object-cover"
                />

                {/* Sell / Buy Tag */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span
                    className={`px-3 py-1.5 text-xs font-bold rounded-full uppercase tracking-wider shadow-md ${
                      isBuying ? 'bg-amber-600 text-white' : 'bg-primary text-white'
                    }`}
                  >
                    {isBuying ? 'Want to Buy' : 'For Sale'}
                  </span>
                  {listing.price_negotiable && (
                    <span className="bg-black/80 backdrop-blur-xs text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                      🤝 Price Negotiable
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs hover:bg-white text-gray-800 p-2.5 rounded-full shadow-md transition-all text-sm font-semibold flex items-center gap-1.5"
                  title="Share this listing"
                >
                  <span>🔗</span>
                  <span className="text-xs">{copiedLink ? 'Copied!' : 'Share'}</span>
                </button>
              </div>

              {/* Thumbnail Strip */}
              {listing.images?.length > 1 && (
                <div className="p-3 bg-gray-50 flex items-center gap-2 border-t border-gray-100">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImage(idx)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                        selectedImage === idx ? 'border-primary shadow-sm scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details & Specs */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2">
                  <span>🌾 {listing.category}</span>
                  <span>•</span>
                  <span>📍 {listing.village} ({listing.distance} km away)</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {listing.title}
                </h1>
                <p className="text-xs text-gray-400 mt-1">
                  Posted {getTimeAgo(listing.created_at)} • {listing.views || 45} villagers viewed this
                </p>
              </div>

              {/* Price & Quantity Banner (Mobile / Desktop) */}
              <div className="bg-green-50/80 border border-green-200 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-gray-500 font-semibold block uppercase">Price</span>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-primary">
                      {formatPrice(listing.price)}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      / {listing.price_unit || listing.unit || 'unit'}
                    </span>
                  </div>
                </div>

                {listing.quantity && (
                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-semibold block uppercase">Available Quantity</span>
                    <span className="text-lg font-bold text-gray-800">
                      {listing.quantity} {listing.unit}
                    </span>
                  </div>
                )}
              </div>

              {/* Specs Grid */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-3">Key Details</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-[11px] text-gray-500">Village</p>
                    <p className="text-sm font-bold text-gray-800">{listing.village}</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-[11px] text-gray-500">Distance</p>
                    <p className="text-sm font-bold text-primary">{listing.distance} km away</p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-[11px] text-gray-500">Negotiable</p>
                    <p className="text-sm font-bold text-gray-800">
                      {listing.price_negotiable ? 'Yes (बातचीत संभव)' : 'Fixed Rate'}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                    <p className="text-[11px] text-gray-500">Ad Type</p>
                    <p className="text-sm font-bold text-gray-800 capitalize">
                      {isBuying ? 'Buyer Request' : 'Direct Producer'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-base font-bold text-gray-900 mb-2">Description (विवरण)</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

            </div>

            {/* Comments & Public Q&A Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Public Questions & Inquiries ({comments.length})
                  </h3>
                  <p className="text-xs text-gray-500">
                    Ask questions about pickup, quantity discount, or inspection
                  </p>
                </div>
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-3">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Ask a question about this listing (e.g. Is price negotiable for bulk pickup?)"
                  rows={2}
                  className="w-full px-4 py-3 text-sm border border-gray-300 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                  required
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={commentSubmitting}
                    className="btn-primary text-xs sm:text-sm py-2 px-5 rounded-full"
                  >
                    {commentSubmitting ? 'Posting...' : 'Post Public Question (सवाल पूछें)'}
                  </button>
                </div>
              </form>

              {/* Comments Thread */}
              <div className="space-y-4 pt-2">
                {comments.length > 0 ? (
                  comments.map((c) => (
                    <div key={c.id} className="bg-gray-50 p-4 rounded-xl border border-gray-100 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={c.user?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=60&auto=format&fit=crop&q=80'}
                            alt={c.user?.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs font-bold text-gray-800">{c.user?.name}</span>
                          <span className="text-[10px] text-gray-400">({c.user?.village || 'Local'})</span>
                        </div>
                        <span className="text-[10px] text-gray-400">{getTimeAgo(c.created_at)}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 pl-8">{c.text}</p>

                      {/* Seller Reply if present */}
                      {c.reply && (
                        <div className="ml-8 mt-2 bg-green-50/70 border-l-2 border-primary p-3 rounded-r-lg">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-primary mb-1">
                            <span>🧑‍🌾 {listing.seller?.name || 'Seller'} (Seller Response):</span>
                          </div>
                          <p className="text-xs text-gray-700">{c.reply}</p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-gray-400 text-center py-4">
                    No questions yet. Be the first to ask!
                  </p>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Seller Trust Card & Quick Actions */}
          <div className="lg:col-span-4 space-y-6">

            {/* Seller Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs sticky top-24 space-y-5">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                Seller Information
              </h3>

              <div className="flex items-center gap-4">
                <img
                  src={listing.seller?.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80'}
                  alt={listing.seller?.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-base font-bold text-gray-900">{listing.seller?.name}</h4>
                    {listing.seller?.verified && (
                      <span className="text-primary text-sm" title="Verified Village Producer">✓</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{listing.seller?.village} • {listing.seller?.role}</p>
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-bold mt-1">
                    <span>★ {listing.seller?.rating || 4.9}</span>
                    <span className="text-gray-400 font-normal">({listing.seller?.reviewsCount || 12} trades)</span>
                  </div>
                </div>
              </div>

              {listing.seller?.bio && (
                <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed">
                  "{listing.seller?.bio}"
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => navigate(`/chat?user=${listing.seller?.id || 'u1'}&listing=${listing.id}`)}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-3.5 text-sm rounded-xl shadow-md hover:shadow-lg"
                >
                  <span className="text-lg">💬</span>
                  <span>Direct Chat with Seller (चैट करें)</span>
                </button>

                <a
                  href={`tel:${listing.seller?.phone || '+919876543210'}`}
                  className="w-full btn-secondary flex items-center justify-center gap-2 py-3 text-sm rounded-xl text-center"
                >
                  <span className="text-base">📞</span>
                  <span>Call {listing.seller?.phone || '+91 98765...'}</span>
                </a>
              </div>

              {/* Trust Guarantee Note */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-[11px] text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Direct in-person physical inspection welcome</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Cash on pickup or UPI directly to farmer</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>Zero brokerage & Zero platform fees</span>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Related Produce Section */}
        {relatedListings.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              More Produce From Nearby Villages
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedListings.map((rel) => (
                <ListingCard key={rel.id} listing={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
