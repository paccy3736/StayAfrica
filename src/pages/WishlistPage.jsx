import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PropertyCard from '../components/PropertyCard'
import { useWishlist } from '../context/WishlistContext'

export default function WishlistPage() {
  const { wishlist } = useWishlist()

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <span className="text-red-500">♥</span> My Saved Properties
          </h1>
          <p className="text-gray-500 mt-1">
            {wishlist.length === 0
              ? 'You have no saved properties yet'
              : `${wishlist.length} ${wishlist.length === 1 ? 'property' : 'properties'} saved`}
          </p>
        </div>

        {wishlist.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
            <p className="text-6xl mb-4">♡</p>
            <h2 className="text-xl font-bold text-gray-800 mb-2">Nothing saved yet</h2>
            <p className="text-gray-500 mb-6">
              Click the <span className="text-red-400 font-bold">♥</span> heart on any property card to save it here.
            </p>
            <Link
              to="/"
              className="inline-block px-6 py-3 bg-[#003580] hover:bg-[#00224f] text-white font-bold rounded-xl transition-colors"
            >
              Browse Properties
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {wishlist.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                to="/search"
                className="inline-block px-6 py-3 border-2 border-[#003580] text-[#003580] hover:bg-[#003580] hover:text-white font-bold rounded-xl transition-colors"
              >
                Find More Properties
              </Link>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  )
}
