import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import properties from '../data/properties.json'

function amenityIcon(name) {
  const icons = {
    'Free WiFi': '📶', Pool: '🏊', 'Breakfast included': '🥐', Spa: '💆',
    Gym: '🏋️', Restaurant: '🍽️', Kitchen: '🍳', 'Sea View': '🌊',
    Parking: '🚗', 'Air Conditioning': '❄️', 'Private Beach': '🏖️',
    'All Inclusive': '🌟', 'Water Sports': '🤿', 'Business Center': '💼',
    'Airport Shuttle': '✈️', 'Private Pool': '🏊', 'Chef Service': '👨‍🍳',
    Security: '🔒', Garden: '🌿', 'Rooftop Terrace': '🏙️', Hammam: '🛁',
    'Airport Transfer': '🚕', 'Nile View': '🌊', Laundry: '👕',
    '24h Reception': '🕐', 'Conference Room': '📊', 'Room Service': '🛎️',
    'Infinity Pool': '♾️', 'Diving Center': '🤿',
  }
  return icons[name] || '✓'
}

const sampleReviews = [
  { name: 'Amara O.', rating: 5, date: 'March 2025', text: 'Absolutely stunning property. The staff were incredibly welcoming and the views were breathtaking. Would definitely stay again!' },
  { name: 'David K.', rating: 4, date: 'February 2025', text: 'Great location and comfortable rooms. Breakfast was excellent. Only minor issue was slow WiFi in the evenings, but otherwise a wonderful stay.' },
  { name: 'Sophie M.', rating: 5, date: 'January 2025', text: 'Exceeded all expectations. The room was spotless, the service impeccable, and the amenities first-class. Perfect for a romantic getaway.' },
]

export default function PropertyPage() {
  const { id } = useParams()
  const property = properties.find((p) => p.id === id)

  const [activeImage, setActiveImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <p className="text-6xl mb-4">🏨</p>
          <h1 className="text-2xl font-bold text-gray-900 mb-3">Property not found</h1>
          <Link to="/" className="text-[#003580] hover:underline font-semibold">← Back to home</Link>
        </div>
      </div>
    )
  }

  // Rough nights calculation
  const nights =
    checkIn && checkOut
      ? Math.max(1, Math.round((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)))
      : 1

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-4 flex items-center gap-2">
          <Link to="/" className="hover:text-[#003580]">Home</Link>
          <span>/</span>
          <Link to="/search" className="hover:text-[#003580]">Search</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">{property.name}</span>
        </nav>

        {/* Title row */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">{property.name}</h1>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-gray-500 text-sm">📍 {property.location}</span>
              <span className="inline-flex items-center gap-1 bg-[#003580] text-white text-xs font-bold px-2 py-1 rounded">
                ★ {property.rating}
              </span>
              <span className="text-sm text-gray-500">{property.reviewCount} reviews</span>
              <span className="text-sm bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">{property.type}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-black text-gray-900">${property.pricePerNight}</p>
            <p className="text-gray-500 text-sm">per night</p>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8">
          <div className="relative rounded-xl overflow-hidden h-72 md:h-96 cursor-pointer" onClick={() => setLightboxOpen(true)}>
            <img
              src={property.images[activeImage]}
              alt={property.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-3 py-1.5 rounded-full">
              📷 {activeImage + 1} / {property.images.length} — click to enlarge
            </div>
          </div>
          <div className="flex gap-3 mt-3">
            {property.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === i ? 'border-[#003580] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <button className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300" onClick={() => setLightboxOpen(false)}>✕</button>
            <button
              className="absolute left-4 text-white text-4xl hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev - 1 + property.images.length) % property.images.length) }}
            >‹</button>
            <img
              src={property.images[activeImage]}
              alt={property.name}
              className="max-w-full max-h-full rounded-xl object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-4 text-white text-4xl hover:text-gray-300"
              onClick={(e) => { e.stopPropagation(); setActiveImage((prev) => (prev + 1) % property.images.length) }}
            >›</button>
          </div>
        )}

        {/* Main content + booking widget */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: details */}
          <div className="flex-1 space-y-8">
            {/* Description */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-3">About this property</h2>
              <p className="text-gray-600 leading-relaxed">{property.description}</p>
            </section>

            {/* Amenities */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center gap-2 text-gray-700 text-sm">
                    <span className="text-lg">{amenityIcon(amenity)}</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Room types */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Available Rooms</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 text-left">
                      <th className="px-4 py-3 font-semibold text-gray-700 rounded-tl-lg">Room type</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Capacity</th>
                      <th className="px-4 py-3 font-semibold text-gray-700">Price / night</th>
                      <th className="px-4 py-3 font-semibold text-gray-700 rounded-tr-lg"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {property.roomTypes.map((room, i) => (
                      <tr key={i} className="border-t border-gray-100 hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-3 font-medium text-gray-900">{room.name}</td>
                        <td className="px-4 py-3 text-gray-600">👥 {room.capacity} guests</td>
                        <td className="px-4 py-3 font-bold text-gray-900">${room.price}</td>
                        <td className="px-4 py-3">
                          <button className="px-4 py-1.5 bg-[#003580] hover:bg-[#00224f] text-white text-xs font-bold rounded-lg transition-colors">
                            Reserve
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Reviews */}
            <section className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-5">
                <h2 className="text-xl font-bold text-gray-900">Guest Reviews</h2>
                <span className="bg-[#003580] text-white text-sm font-bold px-3 py-1 rounded-lg">
                  ★ {property.rating}
                </span>
                <span className="text-gray-500 text-sm">{property.reviewCount} reviews</span>
              </div>
              <div className="space-y-4">
                {sampleReviews.map((review, i) => (
                  <div key={i} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-[#003580] text-white flex items-center justify-center text-sm font-bold">
                          {review.name[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 text-sm">{review.name}</p>
                          <p className="text-gray-400 text-xs">{review.date}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, s) => (
                          <span key={s} className={s < review.rating ? 'text-[#febb02]' : 'text-gray-200'}>★</span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Booking widget */}
          <aside className="lg:w-80 shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6 lg:sticky lg:top-24 shadow-sm">
              <div className="mb-4">
                <span className="text-3xl font-black text-gray-900">${property.pricePerNight}</span>
                <span className="text-gray-500 text-sm"> / night</span>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Check-in</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003580]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Check-out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003580]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">Guests</label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full border-2 border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-[#003580]"
                  />
                </div>
              </div>

              {checkIn && checkOut && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4 text-sm space-y-1">
                  <div className="flex justify-between text-gray-600">
                    <span>${property.pricePerNight} × {nights} nights</span>
                    <span>${property.pricePerNight * nights}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Taxes & fees</span>
                    <span>${Math.round(property.pricePerNight * nights * 0.12)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
                    <span>Total</span>
                    <span>${Math.round(property.pricePerNight * nights * 1.12)}</span>
                  </div>
                </div>
              )}

              <button className="w-full py-3 bg-[#003580] hover:bg-[#00224f] text-white font-bold rounded-xl text-sm transition-colors">
                Reserve Now
              </button>
              <p className="text-center text-gray-400 text-xs mt-2">You won't be charged yet</p>

              {/* Rating summary */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-center gap-2 text-sm text-gray-500">
                <span className="text-[#febb02] font-bold text-base">★ {property.rating}</span>
                <span>·</span>
                <span>{property.reviewCount} reviews</span>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <Footer />
    </div>
  )
}
