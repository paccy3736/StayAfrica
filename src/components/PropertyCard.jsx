import { Link } from 'react-router-dom'

function StarRating({ rating }) {
  return (
    <span className="inline-flex items-center gap-1 bg-[#003580] text-white text-xs font-bold px-2 py-0.5 rounded">
      ★ {rating}
    </span>
  )
}

export default function PropertyCard({ property }) {
  const { id, name, location, pricePerNight, rating, reviewCount, images, amenities, type } = property

  return (
    <Link
      to={`/property/${id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={images[0]}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <span className="absolute top-3 left-3 bg-white text-[#003580] text-xs font-semibold px-2 py-0.5 rounded-full shadow">
          {type}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-bold text-gray-900 text-base leading-snug group-hover:text-[#003580] transition-colors">
            {name}
          </h3>
          <StarRating rating={rating} />
        </div>

        <p className="text-sm text-gray-500 mb-2 flex items-center gap-1">
          <span>📍</span> {location}
        </p>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {amenities.slice(0, 3).map((a) => (
            <span key={a} className="text-xs bg-blue-50 text-[#003580] px-2 py-0.5 rounded-full border border-blue-100">
              {a}
            </span>
          ))}
        </div>

        {/* Price + reviews */}
        <div className="flex items-end justify-between border-t border-gray-100 pt-3">
          <div>
            <span className="text-xs text-gray-500">from</span>
            <div className="text-xl font-black text-gray-900">
              ${pricePerNight}
              <span className="text-sm font-normal text-gray-500"> / night</span>
            </div>
          </div>
          <span className="text-xs text-gray-400">{reviewCount} reviews</span>
        </div>
      </div>
    </Link>
  )
}
