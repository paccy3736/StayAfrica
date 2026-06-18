import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchCard from '../components/SearchCard'
import PropertyCard from '../components/PropertyCard'
import properties from '../data/properties.json'

const propertyTypes = ['All', 'Hotels', 'Apartments', 'Resorts', 'Villas']

const trendingDestinations = [
  { name: 'Zanzibar', country: 'Tanzania', image: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=600&q=80', count: 120 },
  { name: 'Cape Town', country: 'South Africa', image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=600&q=80', count: 98 },
  { name: 'Kigali', country: 'Rwanda', image: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=600&q=80', count: 54 },
  { name: 'Marrakech', country: 'Morocco', image: 'https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80', count: 87 },
  { name: 'Nairobi', country: 'Kenya', image: 'https://images.unsplash.com/photo-1611348586756-c7a73f9e9ad5?w=600&q=80', count: 63 },
  { name: 'Seychelles', country: 'Seychelles', image: 'https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=600&q=80', count: 41 },
]

const deals = [
  { title: 'Early Bird Deal', desc: 'Book 30 days in advance and save up to 25%', color: 'bg-blue-600', icon: '🐦' },
  { title: 'Weekend Getaway', desc: 'Exclusive rates on Friday–Sunday stays', color: 'bg-emerald-600', icon: '🏖️' },
  { title: 'Long Stay Discount', desc: 'Stay 7+ nights and get 15% off', color: 'bg-purple-600', icon: '🌙' },
]

export default function HomePage() {
  const [activeType, setActiveType] = useState('All')

  const filteredProperties = properties.filter((p) => {
    if (activeType === 'All') return true
    return p.type === activeType.slice(0, -1) // "Hotels" -> "Hotel"
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-[#003580] text-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1600&q=80')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 pt-14 pb-24 md:pt-20 md:pb-32">
          <h1 className="text-3xl md:text-5xl font-black mb-3 leading-tight">
            Find your perfect stay
            <br />
            <span className="text-[#febb02]">across Africa</span>
          </h1>
          <p className="text-blue-100 text-lg mb-2 max-w-lg">
            Discover hotels, resorts, villas and apartments from Cape Town to Cairo.
          </p>
        </div>

        {/* Search card overlapping hero */}
        <div className="relative max-w-5xl mx-auto px-4 -mb-8 md:-mb-10 z-10">
          <SearchCard />
        </div>
      </section>

      {/* Spacer for overlap */}
      <div className="h-12 md:h-14 bg-gray-50" />

      {/* Property Type Tabs */}
      <section className="max-w-7xl mx-auto px-4 pt-4 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {propertyTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap border transition-all duration-200 ${
                activeType === type
                  ? 'bg-[#003580] text-white border-[#003580]'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-[#003580] hover:text-[#003580]'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Featured properties grid */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black text-gray-900 mb-6">
          {activeType === 'All' ? 'Featured Properties' : activeType}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
        {filteredProperties.length === 0 && (
          <p className="text-gray-500 text-center py-12">No properties found for this type.</p>
        )}
      </section>

      {/* Trending Destinations */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black text-gray-900 mb-2">Trending Destinations</h2>
        <p className="text-gray-500 mb-6">Most searched places right now</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {trendingDestinations.map((dest) => (
            <Link
              key={dest.name}
              to={`/search?destination=${dest.name}`}
              className="group relative rounded-xl overflow-hidden h-36 shadow-sm hover:shadow-lg transition-shadow"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-bold text-sm">{dest.name}</p>
                <p className="text-white/80 text-xs">{dest.count} properties</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Deals / Offers */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-black text-gray-900 mb-6">Exclusive Deals</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {deals.map((deal) => (
            <div key={deal.title} className={`${deal.color} rounded-xl p-6 text-white flex items-start gap-4`}>
              <span className="text-3xl">{deal.icon}</span>
              <div>
                <h3 className="font-bold text-lg mb-1">{deal.title}</h3>
                <p className="text-white/80 text-sm">{deal.desc}</p>
                <button className="mt-3 px-4 py-1.5 bg-white/20 hover:bg-white/30 rounded-full text-sm font-semibold transition-colors">
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
