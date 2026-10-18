import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES, VILLAGES, saveListing, INITIAL_USERS } from '../data/mockData';
import { useAuth } from '../hooks/useAuth';
import type { ListingType } from '../types';

interface CreateListingFormData {
  listing_type: ListingType;
  category: string;
  title: string;
  price: string;
  price_unit: string;
  price_negotiable: boolean;
  quantity: string;
  unit: string;
  village: string;
  distance: number;
  description: string;
}

export default function CreateListingPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState<CreateListingFormData>({
    listing_type: 'sell',
    category: 'grains',
    title: '',
    price: '',
    price_unit: 'quintal',
    price_negotiable: true,
    quantity: '',
    unit: 'Quintal',
    village: user?.village || 'Rampur',
    distance: 1.5,
    description: '',
  });

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImageUrls = files.map((file) => URL.createObjectURL(file));
      setImages((prev) => [...prev, ...newImageUrls].slice(0, 5)); // max 5
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim()) {
      setError('Please enter a listing title');
      return;
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError('Please enter a valid price');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Default placeholder image if none uploaded
      const finalImages = images.length > 0 ? images : [
        'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80',
      ];

      const newListing = saveListing({
        ...formData,
        price: parseFloat(formData.price),
        quantity: formData.quantity ? parseFloat(formData.quantity) : null,
        images: finalImages,
        seller: user || INITIAL_USERS[0],
      });

      navigate(`/listings/${newListing.id}`);
    }, 800);
  };

  return (
    <div className="bg-gray-50 py-8 sm:py-12 pb-24 sm:pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-3xl mb-2 block">🌾</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Post Free Ad on Mandi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Connect directly with buyers & farmers in your village and nearby clusters.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 shadow-xs space-y-6">

          {/* 1. Listing Type Toggle */}
          <div>
            <label className="form-label font-bold">What do you want to do?</label>
            <div className="grid grid-cols-2 gap-4">
              <label
                className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.listing_type === 'sell'
                    ? 'border-primary bg-green-50 text-primary font-bold shadow-xs'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="listing_type"
                  value="sell"
                  checked={formData.listing_type === 'sell'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-xl">💰</span>
                <span>I Want to SELL (बेचना है)</span>
              </label>

              <label
                className={`flex items-center justify-center gap-2 p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  formData.listing_type === 'buy'
                    ? 'border-amber-600 bg-amber-50 text-amber-800 font-bold shadow-xs'
                    : 'border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="listing_type"
                  value="buy"
                  checked={formData.listing_type === 'buy'}
                  onChange={handleChange}
                  className="sr-only"
                />
                <span className="text-xl">🛒</span>
                <span>I Want to BUY (खरीदना है)</span>
              </label>
            </div>
          </div>

          {/* 2. Category */}
          <div>
            <label className="form-label font-bold">Select Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="input-field bg-white"
            >
              {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                <option key={c.id} value={c.id}>
                  {c.icon} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* 3. Title */}
          <div>
            <label className="form-label font-bold">Ad Title / शीर्षक</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Fresh Sharbati Wheat 40 Quintal, Desi Gir Cow, John Deere Tractor"
              className="input-field"
              required
            />
          </div>

          {/* 4. Price & Quantity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="form-label font-bold">Price (₹ INR)</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-500 font-bold">₹</span>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="2400"
                  className="input-field pl-8 font-bold"
                  required
                />
              </div>
            </div>

            <div>
              <label className="form-label font-bold">Per Unit (प्रति इकाई)</label>
              <select
                name="price_unit"
                value={formData.price_unit}
                onChange={handleChange}
                className="input-field bg-white"
              >
                <option value="quintal">Per Quintal (क्विंटल)</option>
                <option value="kg">Per kg (किलो)</option>
                <option value="litre">Per Litre (लीटर)</option>
                <option value="piece">Per Piece / Head (पीस/नग)</option>
                <option value="hour">Per Hour (प्रति घंटा)</option>
                <option value="acre">Per Acre (प्रति एकड़)</option>
                <option value="bag (50kg)">Per Bag 50kg (बोरी)</option>
                <option value="animal">Per Animal (प्रति पशु)</option>
              </select>
            </div>
          </div>

          {/* 5. Quantity & Negotiable */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div>
              <label className="form-label">Available Quantity (कुल मात्रा)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  placeholder="e.g. 50"
                  className="input-field"
                />
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  className="input-field bg-white w-32"
                >
                  <option value="Quintal">Quintal</option>
                  <option value="kg">kg</option>
                  <option value="Litre">Litre</option>
                  <option value="Pieces">Pieces</option>
                  <option value="Bags">Bags</option>
                  <option value="Tractor">Tractor</option>
                </select>
              </div>
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-2 cursor-pointer p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  name="price_negotiable"
                  checked={formData.price_negotiable}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary rounded-md focus:ring-primary"
                />
                <span className="text-xs font-semibold text-gray-800">
                  🤝 Price Negotiable (बातचीत संभव है)
                </span>
              </label>
            </div>
          </div>

          {/* 6. Village Location */}
          <div>
            <label className="form-label font-bold">Your Village / Location</label>
            <select
              name="village"
              value={formData.village}
              onChange={handleChange}
              className="input-field bg-white"
            >
              {VILLAGES.map((v) => (
                <option key={v.id} value={v.name}>
                  {v.name} ({v.distance} km from center)
                </option>
              ))}
            </select>
          </div>

          {/* 7. Image Upload & Previews */}
          <div>
            <label className="form-label font-bold">Photos / तस्वीरें (Max 5)</label>

            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
              {images.map((img, idx) => (
                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden border border-gray-200 group">
                  <img src={img} alt={`Upload ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md"
                  >
                    ✕
                  </button>
                </div>
              ))}

              {images.length < 5 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-gray-300 hover:border-primary flex flex-col items-center justify-center cursor-pointer bg-gray-50 hover:bg-green-50/50 transition-colors text-center p-2">
                  <span className="text-2xl text-gray-400">📸</span>
                  <span className="text-[10px] text-gray-500 font-semibold mt-1">+ Add Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="sr-only"
                  />
                </label>
              )}
            </div>
            <p className="text-[11px] text-gray-400">
              Clear photos of crops, livestock, or tractor attract 3x more local inquiries.
            </p>
          </div>

          {/* 8. Description */}
          <div>
            <label className="form-label font-bold">Description / विवरण</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Mention quality, moisture content, breed details, exact pickup location, tractor attachments included..."
              className="input-field"
            />
          </div>

          {error && <p className="form-error text-center">{error}</p>}

          {/* Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 text-base font-bold rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="spinner w-5 h-5 border-2"></span>
                <span>Publishing Listing to Mandi...</span>
              </>
            ) : (
              <span>Publish Listing (विज्ञापन प्रकाशित करें) →</span>
            )}
          </button>

        </form>

      </div>
    </div>
  );
}
