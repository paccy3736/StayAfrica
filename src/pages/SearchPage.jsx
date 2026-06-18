import { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchCard from '../components/SearchCard'
import PropertyCard from '../components/PropertyCard'
import properties from '../data/properties.json'

const propertyTypes = ['Hotel', 'Apartment', 'Resort', 'Villa']
const amenityOptions = ['Free WiFi', 'Pool', 'Breakfast included', 'Parking', 'Gym', 'Spa']

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const destination = searchParams.get('destination') || ''

  const [sortBy, setSortBy] = useState('recommended')
  const [selectedTypes, setSelectedTypes] = useState([])
  const [selectedAmenities, setSelectedAmenities] = useState([])
  const [maxPrice, setMaxPrice] = useState(500)
  const [filtersOpen, setFiltersOpen] = useState(false)

  function toggleFilter(value, list, setList) {
    setList((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const filtered = useMemo(() => {
    let results = properties

    if (destination) {
      results = results.filter((p) =>
        p.location.toLowerCase().includes(destination.toLowerCase()) ||
        p.name.toLowerCase().includes(destination.toLowerCase())
      )
    }
    if (selectedTypes.length > 0) {
      results = results.filter((p) => selectedTypes.includes(p.type))
    }
    if (selectedAmenities.length > 0) {
      results = results.filter((p) =>
        selectedAmenities.every((a) => p.amenities.includes(a))
      )
    }
    results = results.filter((p) => p.pricePerNight <= maxPrice)

    if (sortBy === 'price-asc') results = [...results].sort((a, b) => a.pricePerNight - b.pricePerNight)
    if (sortBy === 'price-desc') results = [...results].sort((a, b) => b.pricePerNight - a.pricePerNight)
    if (sortBy === 'rating') results = [...results].sort((a, b) => b.rating - a.rating)

    return results
  }, [destination, selectedTypes, selectedAmenities, maxPrice, sortBy])

  const FilterPanel = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-6">
      {/* Price */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Max price / night</h3>
        <input
          type="range"
          min={50}
          max={500}
          step={10}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#003580]"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-1">
          <span>$50</span>
          <span className="font-semibold text-[#003580]">${maxPrice}</span>
          <span>$500+</span>
        </div>
      </div>

      {/* Property type */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Property type</h3>
        <div className="space-y-2">
          {propertyTypes.map((type) => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleFilter(type, selectedTypes, setSelectedTypes)}
                className="w-4 h-4 accent-[#003580]"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Amenities */}
      <div>
        <h3 className="font-bold text-gray-900 mb-3">Amenities</h3>
        <div className="space-y-2">
          {amenityOptions.map((amenity) => (
            <label key={amenity} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity)}
                onChange={() => toggleFilter(amenity, selectedAmenities, setSelectedAmenities)}
                className="w-4 h-4 accent-[#003580]"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={() => { setSelectedTypes([]); setSelectedAmenities([]); setMaxPrice(500) }}
        className="w-full py-2 text-sm text-[#003580] border border-[#003580] rounded-lg hover:bg-blue-50 transition-colors font-semibold"
      >
        Clear filters
      </button>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Search bar */}
      <div className="bg-[#003580] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <SearchCard compact />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Results header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl font-black text-gray-900">
              {destination ? `Results for "${destination}"` : 'All Properties'}
            </h1>
            <p className="text-gray-500 text-sm">{filtered.length} properties found</p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm font-semibold text-gray-700 hover:border-[#003580] transition-colors"
            >
              🔧 Filters
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003580]"
            >
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Desktop filter sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <FilterPanel />
          </aside>

          {/* Results */}
          <div className="flex-1">
            {/* Mobile filter panel */}
            {filtersOpen && (
              <div className="lg:hidden mb-4">
                <FilterPanel />
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-5xl mb-4">🔍</p>
                <p className="text-xl font-bold text-gray-800 mb-2">No results found</p>
                <p className="text-gray-500">Try adjusting your filters or search a different destination.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
