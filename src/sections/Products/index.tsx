import { useEffect, useRef, useState } from 'react'
import { productsByCategory } from '@/data/products'
import { formatPrice, useCartStore, type Product } from '@/store/cartStore'
import { useToastStore } from '@/hooks/useToast'
import useReveal from '@/hooks/useReveal'

import All from '@/assets/doces/todos.png'

import { FiMinus, FiPlus } from 'react-icons/fi'

// layers
import L1 from '@/assets/layers/l1.svg'
import L2 from '@/assets/layers/l2.svg'
import L3 from '@/assets/layers/l3.svg'
import L4 from '@/assets/layers/l4.svg'
import L5 from '@/assets/layers/l5.svg'

const ProductCard = ({ product, index, cart, toggleProduct }: any) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100 + index * 80)
    return () => clearTimeout(t)
  }, [])

  const cartItem = cart.find((c: any) => c.id === product.id)
  const quantity = cartItem?.quantity ?? 0

  return (
    <div
      className={`
        transition-all duration-500 ease-out
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        relative w-60 shrink-0 p-2 rounded-xl
        bg-[linear-gradient(to_top,#FFB6C1,#f2f2f2)] hover:-translate-y-2
        hover:before:opacity-100 before:transition-all before:duration-200
        flex flex-col justify-between h-85
        before:content-[''] before:absolute before:left-1/2 before:-translate-x-1/2
        before:-bottom-2 before:w-full before:h-4 before:rounded-full
        before:bg-black/20 before:blur-sm before:-z-2 before:opacity-0

        max-mobile:w-50 max-mobile:h-75
      `}
    >
      <div>
        <img
          src={product.image}
          alt={product.name + '_image'}
          className="w-full h-30 object-cover rounded-xl max-mobile:h-25"
        />

        <div className="flex flex-col items-center mt-4">
          <h3
            className="mb-2 custom-text brightness-70 tracking-wider max-mobile:text-[14px]!"
            style={{ fontSize: '18px' }}
          >
            {product.name}
          </h3>
          <h5 className="text-sm text-justify max-mobile:text-xs">{product.description}</h5>
        </div>
      </div>

      <div>
        <p className="w-full flex items-center justify-between max-mobile:text-sm">
          por apenas{' '}
          <span
            className="
              text-sm px-2 py-1 rounded-md font-bold text-(--text-secondary)
              bg-[linear-gradient(to_bottom_right,#ff97a7,#fff)]

              max-mobile:px-1 max-mobile:text-xs
            "
          >
            {formatPrice(product.price)}
          </span>
        </p>
        {quantity > 0 ? (
          <div
            className="
              bg-white/50 w-full mt-2 rounded-md p-2 flex items-center justify-evenly
              [&_button]:bg-white [&_button]:flex-1 [&_button]:rounded-md [&_button]:py-1
              [&_button]:transition-all [&_button]:duration-200
              [&_button:hover]:shadow-[inset_0_-25px_0_0_#ffadad] [&_button]:font-bold

              max-mobile:p-1
            "
          >
            <button onClick={() => toggleProduct(product, 'remove')}>
              <FiMinus className="mx-auto" />
            </button>
            <span className="mx-8">{quantity}</span>
            <button onClick={() => toggleProduct(product, 'add')}>
              <FiPlus className="mx-auto" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => toggleProduct(product, 'add')}
            className="
              bg-white w-full mt-2 rounded-md py-1
              transition-all duration-200
              hover:shadow-[inset_0_-35px_0_0_#ffadad] font-bold

              max-mobile:text-sm
            "
          >
            Comprar
          </button>
        )}
      </div>
    </div>
  )
}

const Products = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const cart = useCartStore((s: any) => s.cart)
  const addToCart = useCartStore((s: any) => s.addToCart)
  const removeFromCart = useCartStore((s: any) => s.removeFromCart)

  const { ref, revealed } = useReveal(0.65)
  const layers = [L5, L4, L3, L2, L1]
  const waveClasses = ['wave-1', 'wave-2', 'wave-3', 'wave-4', 'wave-5']
  const [cardsRevealed, setCardsRevealed] = useState(false)
  const [labelVisible, setLabelVisible] = useState(true)

  const handleCategoryChange = (category: string | null) => {
    setLabelVisible(false)
    setTimeout(() => {
      setActiveCategory(category)
      setLabelVisible(true)
    }, 200) // tempo da saída
  }

  // roda quando entra na tela
  const revealedRef = useRef(false)

  useEffect(() => {
    if (!revealed) return
    revealedRef.current = false
    setCardsRevealed(false)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        revealedRef.current = true
        setCardsRevealed(true)
      })
    })
  }, [activeCategory, revealed])

  const { addToast } = useToastStore()

  const [query, setQuery] = useState<string>('')

  const filteredItems = productsByCategory.map((category) => ({
    ...category,
    products: category.products.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())),
  }))

  const toggleProduct = (p: Product, type: 'add' | 'remove') => {
    if (type === 'add') {
      addToCart(p)
      addToast('Produto adicionado!', p.name)
    } else {
      removeFromCart(p.id)
      addToast('Produto removido!', p.name)
    }
  }

  const currentProducts =
    activeCategory === null
      ? filteredItems.flatMap((c) => c.products)
      : (filteredItems.find((c) => c.title === activeCategory)?.products ?? [])

  return (
    <section ref={ref} id="products" className="snap-start relative min-h-screen overflow-hidden">
      {/* <input placeholder="buscar produto" value={query} onChange={(e) => setQuery(e.currentTarget.value)} /> */}
      {/* waves empilhadas */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none">
        {layers.map((Layer, i) => (
          <img
            key={i}
            src={Layer}
            className={`
              absolute left-0 w-full ${waveClasses[i]} scale-[1.2]
              ${i === 0 ? '-bottom-12' : 'bottom-0'}
              transition-all duration-700 ease-out max-mobile:scale-[4]
              ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
            style={{ transitionDelay: `${i * 150}ms` }}
          />
        ))}
      </div>

      {/* content */}
      <div className="relative w-screen h-screen z-1 p-12 max-mobile:p-4 max-mobile:pt-8 max-mobile:mt-4">
        <h1
          style={{ '-webkit-text-stroke': '0' } as React.CSSProperties}
          className="custom-text brightness-90 tracking-wide relative w-fit max-mobile:text-3xl! max-mobile:mb-6"
        >
          Produtos
          <div className="absolute bottom-0 left-0 w-1/2 h-0.5 rounded-full bg-(--text-primary)" />
        </h1>

        {/* category buttons */}
        <div className="mt-4 flex flex-row items-center justify-between no-scrollbar max-mobile:overflow-x-auto max-mobile:gap-4 max-mobile:py-12 max-mobile:-my-12">
          <div
            onClick={() => handleCategoryChange(null)}
            className={`
              ${activeCategory === null && 'active'}
              relative
              cursor-pointer w-28 h-28
              grid place-items-center
              rounded-xl [&_img]:rounded-xl
              bg-[linear-gradient(to_top_left,#FFB6C1,#f2f2f2)]
              
              max-mobile:shrink-0 max-mobile:w-16 max-mobile:h-16

              before:content-['']
              before:absolute
              before:left-1/2
              before:-translate-x-1/2
              before:-bottom-2
              before:w-full
              before:h-4
              before:rounded-full
              before:bg-black/20
              before:blur-sm
              before:-z-1

              hover:[&>span]:opacity-100 hover:[&>span]:top-[calc(100%+10px)]
              [&.active>span]:opacity-100 [&.active>span]:top-[calc(100%+10px)]
              active:[&>span]:opacity-100 active:[&>span]:top-[calc(100%+20px)]

              hover:[&>img]:scale-105 hover:[&>img]:rotate-z-4 active:[&>img]:scale-95
            `}
          >
            <img
              src={All}
              alt={'todos_image'}
              className="
                absolute top-1/2 left-1/2 -translate-1/2 transition-all
                w-[calc(100%-20px)] h-[calc(100%-20px)]
              "
            />
            <span
              className="
                absolute top-[calc(100%-30px)] opacity-0 -z-1 text-center whitespace-nowrap font-bold
                transition-all px-4 py-1 shadow-[0_8px_15px_-6px_rgba(0,0,0,0.4)] rounded-md text-sm
                bg-[linear-gradient(to_bottom,#FFB6C1_55%,#f2f2f2)]
              "
            >
              Todos
            </span>
          </div>
          {filteredItems.map((c, i) => (
            <div
              onClick={() => handleCategoryChange(activeCategory === c.title ? null : c.title)}
              style={{ transitionDelay: `${Math.min(i * 60, 300)}ms` }}
              className={`
                ${activeCategory === c.title && 'active'}
                transition-all duration-500
                ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
                relative
                cursor-pointer w-28 h-28
                grid place-items-center
                rounded-xl [&_img]:rounded-xl
                bg-[linear-gradient(to_top_left,#FFB6C1,#f2f2f2)]

                max-mobile:shrink-0 max-mobile:w-16 max-mobile:h-16

                before:content-['']
                before:absolute
                before:left-1/2
                before:-translate-x-1/2
                before:-bottom-2
                before:w-full
                before:h-4
                before:rounded-full
                before:bg-black/20
                before:blur-sm
                before:-z-1

                hover:[&>span]:opacity-100 hover:[&>span]:top-[calc(100%+10px)]
                [&.active>span]:opacity-100 [&.active>span]:top-[calc(100%+10px)]
                active:[&>span]:opacity-100 active:[&>span]:top-[calc(100%+20px)]

                hover:[&>img]:scale-105 hover:[&>img]:rotate-z-4 active:[&>img]:scale-95
              `}
            >
              <img
                src={c.image}
                alt={c.title + '_image'}
                className="
                  absolute top-1/2 left-1/2 -translate-1/2 transition-all
                  w-[calc(100%-20px)] h-[calc(100%-20px)]
                "
              />
              <span
                className="
                  absolute top-[calc(100%-30px)] opacity-0 -z-1 text-center whitespace-nowrap font-bold
                  transition-all px-4 py-1 shadow-[0_8px_15px_-6px_rgba(0,0,0,0.4)] rounded-md text-sm
                  bg-[linear-gradient(to_bottom,#FFB6C1_55%,#f2f2f2)]

                  max-mobile:shadow-[0_6px_8px_-6px_rgba(0,0,0,0.4)] max-mobile:px-2 max-mobile:text-xs
                "
              >
                {c.title}
              </span>
            </div>
          ))}
        </div>

        {/* items */}
        <h1
          className={`
            mt-16 mb-8 font-black max-w-screen text-2xl transition-all duration-500 max-mobile:mt-24
            ${labelVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
        >
          {activeCategory || 'Todos'} ({currentProducts.length})
        </h1>
        <div
          key={activeCategory}
          className="
            flex flex-row overflow-x-auto overflow-y-visible gap-8 max-mobile:gap-4 no-scrollbar pb-6 py-4 -mt-8
          "
        >
          {currentProducts.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i}
              cart={cart}
              toggleProduct={toggleProduct}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
