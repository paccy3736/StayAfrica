import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useWishlist } from '../context/WishlistContext'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { wishlist } = useWishlist()

  return (
    <header className="bg-[#003580] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-white rounded-md px-2 py-1">
            <span className="text-[#003580] font-black text-xl tracking-tight">Stay</span>
            <span className="text-[#febb02] font-black text-xl">Africa</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLink to="/" className="px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
            Home
          </NavLink>
          <NavLink to="/search" className="px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
            Find Hotels
          </NavLink>
          <NavLink to="/wishlist" className="relative px-3 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors flex items-center gap-1">
            ♥ Saved
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#febb02] text-[#003580] text-xs font-black w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </NavLink>
        </nav>

        {/* Auth buttons */}
        <div className="hidden md:flex items-center gap-2">
          <Link to="/login" className="px-4 py-1.5 rounded-full border border-white text-sm font-semibold hover:bg-white hover:text-[#003580] transition-colors">
            Sign in
          </Link>
          <Link to="/signup" className="px-4 py-1.5 rounded-full bg-[#febb02] text-[#003580] text-sm font-semibold hover:bg-[#e5a800] transition-colors">
            Register
          </Link>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-white/20 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white mb-1"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#003580] border-t border-white/20 px-4 py-3 flex flex-col gap-2">
          <NavLink to="/" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium hover:text-[#febb02] transition-colors">
            Home
          </NavLink>
          <NavLink to="/search" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium hover:text-[#febb02] transition-colors">
            Find Hotels
          </NavLink>
          <NavLink to="/wishlist" onClick={() => setMenuOpen(false)} className="py-2 text-sm font-medium hover:text-[#febb02] transition-colors flex items-center gap-2">
            ♥ Saved
            {wishlist.length > 0 && (
              <span className="bg-[#febb02] text-[#003580] text-xs font-black px-1.5 py-0.5 rounded-full">
                {wishlist.length}
              </span>
            )}
          </NavLink>
          <div className="flex gap-2 pt-2 border-t border-white/20">
            <Link to="/login" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 rounded-full border border-white text-sm font-semibold hover:bg-white hover:text-[#003580] transition-colors">
              Sign in
            </Link>
            <Link to="/signup" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 rounded-full bg-[#febb02] text-[#003580] text-sm font-semibold hover:bg-[#e5a800] transition-colors">
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
