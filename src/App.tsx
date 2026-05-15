import { useCartHydrated, useCartStore } from '@/store/cartStore'
import '@/global.css'

// Sections
import Hero from '@/sections/Hero'
import Navbar from '@/components/Navbar'
import Products from '@/sections/Products'
import Toaster from '@/components/Toaster'
import About from './sections/About'
import Contact from './sections/Contact'

function App() {
  const hydrated = useCartHydrated()

  const isCartOpen = useCartStore((s) => s.isCartOpen)
  const toggleCart = useCartStore((s) => s.toggleCart)

  if (!hydrated) return null

  return (
    <div
      className="bg-white text-[#121212] h-screen overflow-y-scroll snap-y snap-mandatory no-scrollbar"
      onClick={() => isCartOpen && toggleCart()}
    >
      <Toaster />

      {/* navbar */}
      <Navbar />

      {/* sections */}
      <Hero />
      <Products />
      <About />
      <Contact />
    </div>
  )
}

export default App
