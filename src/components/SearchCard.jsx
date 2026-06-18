import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function SearchCard({ compact = false }) {
  const navigate = useNavigate()
  const [destination, setDestination] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState(2)

  function handleSearch(e) {
    e.preventDefault()
    const params = new URLSearchParams({
      destination,
      checkIn,
      checkOut,
      guests,
    })
    navigate(`/search?${params.toString()}`)
  }

  const inputClass =
    'w-full bg-white border-2 border-[#febb02] rounded-md px-3 py-2.5 text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#febb02]'
  const labelClass = 'block text-xs font-semibold text-gray-600 mb-1'

  return (
    <form
      onSubmit={handleSearch}
      className={`bg-[#febb02] rounded-xl p-4 shadow-2xl ${compact ? '' : 'md:p-5'}`}
    >
      <div className={`grid gap-3 ${compact ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'}`}>
        {/* Destination */}
        <div className={compact ? '' : 'sm:col-span-2 lg:col-span-1'}>
          <label className={labelClass}>Destination</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">📍</span>
            <input
              type="text"
              placeholder="Where are you going?"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={`${inputClass} pl-8`}
            />
          </div>
        </div>

        {/* Check-in */}
        <div>
          <label className={labelClass}>Check-in</label>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Check-out */}
        <div>
          <label className={labelClass}>Check-out</label>
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Guests + Search */}
        <div className="flex flex-col">
          <label className={labelClass}>Guests</label>
          <div className="flex gap-2">
            <input
              type="number"
              min={1}
              max={20}
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className={`${inputClass} w-20`}
            />
            <button
              type="submit"
              className="flex-1 bg-[#003580] hover:bg-[#00224f] text-white font-bold rounded-md px-4 py-2.5 text-sm transition-colors whitespace-nowrap"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
