import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  // Shared wishlist state — accessible by any component via useWishlist()
  const [wishlist, setWishlist] = useState([])

  function toggleWishlist(property) {
    const alreadySaved = wishlist.some((p) => p.id === property.id)
    if (alreadySaved) {
      setWishlist((prev) => prev.filter((p) => p.id !== property.id))
    } else {
      setWishlist((prev) => [...prev, property])
    }
  }

  function isSaved(id) {
    return wishlist.some((p) => p.id === id)
  }

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isSaved }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext)
}
