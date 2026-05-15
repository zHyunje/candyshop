import { formatPrice, useCartStore } from '@/store/cartStore'
import { useShallow } from 'zustand/shallow'
import Tooltip from '../Tooltip'

import Wave from '@/assets/cart_wave.svg'
import useWindow from '@/hooks/useWindow'

const Cart = ({ isOpen, isOnTop }: { isOpen: boolean; isOnTop: boolean }) => {
  const w = useWindow()
  const { cart, addToCart, removeFromCart, clearCart, toggleCart } = useCartStore(
    useShallow((s) => ({
      cart: s.cart,
      addToCart: s.addToCart,
      removeFromCart: s.removeFromCart,
      clearCart: s.clearCart,
      toggleCart: s.toggleCart,
    })),
  )

  const isMobile = w < 600
  const fullscreen = isOnTop || isMobile

  return (
    <div
      className={`
        z-50 right-0 w-80 overflow-hidden
        bg-white transition-all duration-300 shadow-[0_4px_8px_rgba(0,0,0,0.4)]
        flex flex-col
        ${
          isOnTop
            ? 'fixed top-0 max-mobile:-right-1 max-mobile:h-dvh h-screen rounded-l-md'
            : 'absolute top-full max-h-120 rounded-md'
        }
        ${
          fullscreen
            ? isOpen
              ? 'opacity-100 pointer-events-auto translate-x-0'
              : 'opacity-0 pointer-events-none translate-x-full'
            : isOpen
              ? 'opacity-100 pointer-events-auto translate-y-2'
              : 'opacity-0 pointer-events-none -translate-y-4'
        }
      `}
      onClick={(e) => e.stopPropagation()}
    >
      <img src={Wave} alt="Cart Wave" className="w-full h-full object-cover absolute top-0 left-0 -z-1" />

      {/* header */}
      <div className="flex items-center justify-between p-4 pb-2">
        <span
          style={{ '--navbar-text-size': '1.5rem' } as React.CSSProperties}
          className="rainbow-text no-border text-2xl relative top-0.75"
        >
          Carrinho
        </span>
        <div className="flex flex-col items-end">
          {isOnTop && (
            <Tooltip text="fechar carrinho" pos="left">
              <button
                onClick={toggleCart}
                className="font-candy text-lg text-(--navbar-close) hover:brightness-90"
              >
                X
              </button>
            </Tooltip>
          )}

          <div>
            {cart.length > 0 && (
              <span className="mr-2">{cart.length > 1 ? `${cart.length} itens` : `${cart.length} item`}</span>
            )}
            <Tooltip text="limpar carrinho" pos="bottom-right">
              <button
                onClick={clearCart}
                className={`
                    text-sm opacity-70 hover:opacity-100 transition-opacity duration-300
                    ${cart.length === 0 && 'pointer-events-none opacity-30!'}
                  `}
                disabled={cart.length === 0}
              >
                Limpar
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-(--primaryDarken)" />

      {/* lista */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4">
        <div className="flex flex-col gap-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between odd:bg-zinc-900/20 even:bg-zinc-900/10 p-2 rounded-md"
              >
                <div className="flex items-center">
                  <img src={item.image} alt="" className="w-10 h-10 rounded-md object-cover" />
                  <div className="flex flex-col w-38 overflow-hidden ml-2">
                    <span className="overflow-hidden text-sm text-ellipsis whitespace-nowrap w-full">
                      {item.name}
                    </span>
                    <span className="text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
                <div className="w-17 text-center flex items-center justify-end h-5 [&_button]:relative [&_button]:rounded-md [&_button]:bg-zinc-900/30 [&_button]:w-full [&_button]:h-full">
                  <button onClick={() => removeFromCart(item.id)}>
                    <div className="center top-2.25!">-</div>
                  </button>
                  <span className="mx-2 text-xs">
                    {item.quantity <= 9 ? '0' + item.quantity : item.quantity}
                  </span>
                  <button onClick={() => addToCart(item)}>
                    <div className="center top-2.25!">+</div>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div
              className={`
                text-center text-sm my-6 opacity-70
                ${isOnTop && 'absolute top-1/2 left-1/2 -translate-1/2'}
              `}
            >
              Nenhum item no carrinho
            </div>
          )}
        </div>
      </div>

      <div className="w-full h-px bg-(--primaryDarken)" />

      {/* footer */}
      <div
        className={`
          px-4 flex flex-col gap-2
          ${isOnTop ? 'py-4' : 'py-2'}
          ${cart.length > 0 && 'shadow-[0_-4px_10px_rgba(0,0,0,.2)]'}
        `}
      >
        <div className="flex justify-between">
          <span>Total</span>
          <span>{formatPrice(cart.reduce((total, item) => total + item.price * item.quantity, 0))}</span>
        </div>

        <button
          className="
            bg-(--primary) rounded-md py-2 text-sm font-bold transition-shadow duration-300
            hover:shadow-[inset_290px_0_0_rgba(255,255,255,0.2)]
          "
        >
          Finalizar compra
        </button>
      </div>
    </div>
  )
}

export default Cart
