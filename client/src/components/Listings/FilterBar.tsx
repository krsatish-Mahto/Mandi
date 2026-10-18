import { CATEGORIES } from '../../data/mockData';

interface FilterBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedDistance: string;
  onSelectDistance: (distance: string) => void;
  selectedType: string;
  onSelectType: (type: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export default function FilterBar({
  selectedCategory,
  onSelectCategory,
  selectedDistance,
  onSelectDistance,
  selectedType,
  onSelectType,
  sortBy,
  onSortChange,
}: FilterBarProps) {
  const distances = [
    { value: 'all', label: 'All Villages' },
    { value: '2', label: 'Within 2 km' },
    { value: '5', label: 'Within 5 km' },
    { value: '10', label: 'Within 10 km' },
  ];

  return (
    <div className="bg-white border-b border-gray-200 py-3 sticky top-16 sm:top-20 z-30 shadow-xs">
      <div className="container-primary space-y-3">

        {/* Category Horizontal Scrollable Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-primary text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Controls Row: Distance + Type + Sort */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-1 border-t border-gray-100 text-xs">

          {/* Distance Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-gray-400 font-medium mr-1 hidden sm:inline">Radius:</span>
            {distances.map((d) => (
              <button
                key={d.value}
                type="button"
                onClick={() => onSelectDistance(d.value)}
                className={`px-2.5 py-1 rounded-md font-medium transition-colors cursor-pointer ${
                  selectedDistance === d.value
                    ? 'bg-green-100 text-primary font-bold border border-green-300'
                    : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {/* Type Toggle & Sort Dropdown */}
          <div className="flex items-center gap-2 ml-auto">

            {/* Listing Type Toggle */}
            <div className="flex bg-gray-100 p-0.5 rounded-lg border border-gray-200">
              <button
                type="button"
                onClick={() => onSelectType('all')}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedType === 'all' ? 'bg-white text-dark shadow-xs' : 'text-gray-500'
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => onSelectType('sell')}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedType === 'sell' ? 'bg-primary text-white shadow-xs' : 'text-gray-500'
                }`}
              >
                Selling
              </button>
              <button
                type="button"
                onClick={() => onSelectType('buy')}
                className={`px-2 py-1 rounded-md text-[11px] font-semibold transition-all ${
                  selectedType === 'buy' ? 'bg-amber-600 text-white shadow-xs' : 'text-gray-500'
                }`}
              >
                Buying
              </button>
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs py-1 px-2.5 rounded-lg focus:outline-none focus:border-primary cursor-pointer"
            >
              <option value="recent">⏱️ Most Recent</option>
              <option value="nearest">📍 Nearest Village</option>
              <option value="price_asc">₹ Price: Low to High</option>
              <option value="price_desc">₹ Price: High to Low</option>
            </select>

          </div>

        </div>

      </div>
    </div>
  );
}
