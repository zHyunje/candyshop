import { useEffect, useState } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Product = {
  id: string
  name: string
  price: number
  image: string
}

type CartItem = Product & {
  quantity: number
}

type CartStore = {
  cart: CartItem[]

  isCartOpen: boolean
  toggleCart: () => void
  closeCart: () => void

  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  clearCart: () => void
}

const cache = new Map<number, string>()

export const formatPrice = (value: number) => {
  if (cache.has(value)) return cache.get(value)!
  const formatted = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  cache.set(value, formatted)
  return formatted
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      cart: [],

      isCartOpen: false,
      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      closeCart: () => set({ isCartOpen: false }),

      // adicionar item ao carrinho
      addToCart: (product) =>
        set((state) => {
          const exists = state.cart.find((item) => item.id === product.id)

          if (exists) {
            return {
              cart: state.cart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            }
          }

          return {
            cart: [
              ...state.cart,
              {
                ...product,
                quantity: 1,
              },
            ],
          }
        }),

      // remover item do carrinho
      removeFromCart: (productId) =>
        set((state) => ({
          cart: state.cart
            .map((item) =>
              item.id === productId
                ? item.quantity > 1
                  ? { ...item, quantity: item.quantity - 1 }
                  : null
                : item,
            )
            .filter((item) => item !== null),
        })),

      // limpar carrinho por completo
      clearCart: () => set({ cart: [] }),
    }),
    { name: 'cart' },
  ),
)

export const useCartHydrated = () => {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // onFinishHydration retorna unsubscribe
    const unsubHydrate = useCartStore.persist.onFinishHydration(() => {
      setHydrated(true)
    })

    // já pode estar hidratado antes do efeito rodar
    setHydrated(useCartStore.persist.hasHydrated())

    return () => {
      unsubHydrate()
    }
  }, [])

  return hydrated
}
