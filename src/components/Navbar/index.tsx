import { useCartStore } from '@/store/cartStore'
import { useEffect, useRef, useState } from 'react'
import Cart from '../Cart'
import Tooltip from '../Tooltip'
import { useNavigationStore } from '@/store/useNavigationStore'
import useWindow from '@/hooks/useWindow'

import { HiOutlineShoppingBag, HiPhone } from 'react-icons/hi2'
import { MdGroups } from 'react-icons/md'

import Wave from '@/assets/wave.svg'

const Navbar = () => {
  const w = useWindow()
  const cart = useCartStore((s) => s.cart)
  const isCartOpen = useCartStore((s) => s.isCartOpen)
  const toggleCart = useCartStore((s) => s.toggleCart)
  const closeCart = useCartStore((s) => s.closeCart)

  const setActiveSection = useNavigationStore((s) => s.setActiveSection)
  const activeSection = useNavigationStore((s) => s.activeSection)

  const [isHero, setIsHero] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [showHandle, setShowHandle] = useState(false)
  const [dragY, setDragY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const isDragging = useRef(false)
  const startY = useRef(0)
  const dragYRef = useRef(0)
  const navRef = useRef<HTMLElement>(null)

  const [mobileMenu, setMobileMenu] = useState<boolean>(false)

  const [indicatorStyle, setIndicatorStyle] = useState<React.CSSProperties>({
    opacity: 0,
  })

  const itemRefs = useRef<Record<string, HTMLLIElement | null>>({})

  const moveIndicator = (el: HTMLLIElement | null) => {
    if (!el) return

    const isLastItem = el === itemRefs.current[ulArr[ulArr.length - 1].id]

    setIndicatorStyle({
      width: `${el.offsetWidth + 10}px`,
      transform: `translateX(${el.offsetLeft - 5.5 + (isLastItem ? 1.5 : 0)}px)`,
      opacity: w <= 600 ? 0 : 1,
    })
  }

  const resetIndicator = () => {
    if (isHero) {
      setIndicatorStyle({
        opacity: 0,
      })

      return
    }

    if (activeSection) {
      moveIndicator(itemRefs.current[activeSection])
    } else {
      setIndicatorStyle({
        opacity: 0,
      })
    }
  }

  useEffect(() => {
    setMobileMenu(false)
  }, [activeSection])

  useEffect(() => {
    if (isHero) {
      setIndicatorStyle({ opacity: 0 })
      return
    }

    if (activeSection) {
      moveIndicator(itemRefs.current[activeSection])
    }
  }, [activeSection, isHero, w])

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries.find((entry) => entry.isIntersecting)

        if (!visibleSection) return

        const onHero = visibleSection.target === sections[0]

        setActiveSection(visibleSection.target.id)
        setIsHero(onHero)
        setIsVisible(onHero)
        setShowHandle(!onHero)
        setDragY(0)
        closeCart()
      },
      {
        threshold: 0.6,
      },
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true
    setDragging(true)
    startY.current = 'touches' in e ? e.touches[0].clientY : e.clientY
    const wasVisible = isVisible

    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return
      const currentY = 'touches' in e ? e.touches[0].clientY : e.clientY
      const delta = currentY - startY.current
      const navHeight = navRef.current?.offsetHeight ?? 60

      if (wasVisible) {
        const clamped = Math.max(-navHeight, Math.min(0, delta))
        dragYRef.current = clamped
        setDragY(clamped)
      } else {
        const clamped = Math.max(0, Math.min(delta, navHeight))
        dragYRef.current = clamped
        setDragY(clamped)
      }
    }

    const onEnd = () => {
      isDragging.current = false
      setDragging(false)
      const navHeight = navRef.current?.offsetHeight ?? 60

      if (wasVisible && dragYRef.current < -(navHeight * 0.7)) {
        setIsVisible(false)
      } else if (!wasVisible && dragYRef.current > navHeight * 0.7) {
        setIsVisible(true)
      }

      setDragY(0)
      dragYRef.current = 0
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onEnd)
      window.removeEventListener('touchmove', onMove)
      window.removeEventListener('touchend', onEnd)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onEnd)
    window.addEventListener('touchmove', onMove)
    window.addEventListener('touchend', onEnd)
  }

  const ulArr = [
    { id: 'products', text: 'Produtos' },
    { id: 'about', text: 'Quem Somos' },
    { id: 'contact', text: 'Contato' },
  ]

  const navHeight = navRef.current?.offsetHeight ?? 60
  const dragProgress = isVisible ? 1 + dragY / navHeight : dragY / navHeight

  const titleOpacity = Math.min(1, Math.max(0, dragProgress))

  const handleSection = (id: string) => {
    const section = document.getElementById(id)

    if (!section) return

    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <nav
      ref={navRef}
      style={{
        transform: isVisible ? `translateY(${dragY}px)` : `translateY(calc(-100% + ${dragY}px))`,
      }}
      className={`
        fixed z-50 flex items-center justify-between px-10
        ${dragging ? '' : 'transition-all duration-300'}
        ${
          isHero
            ? 'w-full left-0 top-0 bg-(--primary) '
            : 'w-1/2 left-1/2 -translate-x-1/2 top-4 bg-(--active-navbar) shadow-[0_4px_8px_rgba(0,0,0,0.2)] rounded-md max-mobile:w-[calc(100%-20px)]'
        }

        max-mobile:px-4 max-mobile:bg-(--primary)
      `}
    >
      <h1
        style={
          {
            '--navbar-text-size': !isHero && '1.75rem',
            opacity: dragging ? titleOpacity : isVisible ? 1 : 0,
            transform: dragging
              ? `translateY(${(1 - titleOpacity) * -8}px)`
              : isVisible
                ? 'translateY(0)'
                : 'translateY(-8px)',
          } as React.CSSProperties
        }
        className={`
          rainbow-text transition-all duration-300
          ${!isHero && 'relative top-0.75 cursor-pointer! max-mobile:-top-1.5'}
          ${dragging ? 'transition-none' : ''}  

          max-mobile:text-[32px]! max-mobile:pt-4
        `}
        onClick={() => handleSection('hero')}
      >
        CandyShop
      </h1>

      {w <= 600 && (
        <>
          <div
            className={`
              relative w-8 h-6
              [&_div]:w-full [&_div]:h-1 [&_div]:bg-white [&_div]:rounded-full
              [&_div]:transition-all [&_div]:absolute [&_div]:left-0

              [&_div:nth-child(1)]:top-0
              [&_div:nth-child(2)]:top-1/2 [&_div:nth-child(2)]:-translate-y-1/2
              [&_div:nth-child(3)]:bottom-0

              ${mobileMenu && '[&_div:nth-child(2)]:left-6 [&_div:nth-child(2)]:opacity-0'}
              ${mobileMenu && '[&_div:nth-child(3)]:bottom-1/2 [&_div:nth-child(3)]:translate-y-1/2 [&_div:nth-child(3)]:rotate-z-45'}
              ${mobileMenu && '[&_div:nth-child(1)]:top-1/2 [&_div:nth-child(1)]:-translate-y-1/2 [&_div:nth-child(1)]:-rotate-z-45'}
            `}
            onClick={() => setMobileMenu((prev) => !prev)}
          >
            <div />
            <div />
            <div />
          </div>

          {/* menu */}
          <div
            style={{ pointerEvents: mobileMenu ? 'all' : 'none' }}
            className={`
              absolute left-1/2 -translate-x-1/2 top-10 opacity-0 w-40/41 transition-all bg-white py-4
              rounded-md shadow-[0_4px_10px_-4px_rgba(0,0,0,.4)] overflow-hidden
              ${mobileMenu ? 'top-full opacity-100' : 'delay-350'}
              ${!isHero && 'w-full'}
            `}
          >
            <img
              src={Wave}
              alt="Wave"
              className="w-full h-4/4 object-cover absolute top-0 left-0 rotate-y-180"
            />
            <ul>
              {ulArr.map((item, i) => (
                <li
                  key={item.id}
                  ref={(el) => {
                    itemRefs.current[item.id] = el
                  }}
                  onMouseEnter={(e) => moveIndicator(e.currentTarget)}
                  onClick={() => handleSection(item.id)}
                  className={`
                    relative -left-40 z-10 px-2 flex items-center gap-2 py-1
                    transition-all duration-500 ease-in-outout whitespace-nowrap
                    ${activeSection === item.id ? 'font-bold opacity-100' : 'opacity-80 hover:opacity-100'}
                    ${mobileMenu && 'left-0'}
                  `}
                  style={{
                    transitionDelay: `${i * 100}ms`,
                  }}
                >
                  {item.text === 'Produtos' && <HiOutlineShoppingBag />}
                  {item.text === 'Quem Somos' && <MdGroups />}
                  {item.text === 'Contato' && <HiPhone />}
                  {item.text}
                </li>
              ))}
            </ul>
            <button
              onClick={(e) => {
                e.stopPropagation()
                toggleCart()
              }}
              className={`
              relative flex items-center bg-(--primary) brightness-105 hover:brightness-110 ml-auto mr-3.5
              transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap px-4 py-1 rounded-md
              ${cart.length > 0 ? 'opacity-100 max-w-40 delay-400' : 'opacity-0 max-w-0 pointer-events-none delay-0'}
              ${dragging ? 'transition-none' : ''}
            `}
            >
              <HiOutlineShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="text-md ml-2">
                  {cart.length > 1
                    ? `${cart.length > 9 ? '+9' : `${cart.length}`} itens`
                    : `${cart.length} item`}
                </span>
              )}
            </button>
          </div>
        </>
      )}

      <div
        className={`
          relative z-50 flex items-center [&_ul]:flex [&_ul]:items-center py-6 [&_ul]:gap-2
          ${!isHero && 'py-4!'}

          max-mobile:hidden!
        `}
      >
        <ul onMouseLeave={resetIndicator} className="relative flex items-center justify-between w-70">
          <div
            style={indicatorStyle}
            className="
              absolute top-1/2 left-0 -translate-y-1/2
              h-8 rounded-sm bg-(--primary) brightness-105 transition-all duration-300 pointer-events-none -z-1
            "
          />

          {ulArr.map((item) => (
            <li
              key={item.id}
              ref={(el) => {
                itemRefs.current[item.id] = el
              }}
              onMouseEnter={(e) => moveIndicator(e.currentTarget)}
              onClick={() => handleSection(item.id)}
              className={`
                relative z-10 px-2 cursor-pointer
                transition-opacity duration-300 whitespace-nowrap
                ${activeSection === item.id ? 'font-bold opacity-100' : 'opacity-80 hover:opacity-100'}
              `}
            >
              {item.text}
            </li>
          ))}
        </ul>
        <div
          style={{
            opacity: dragging ? titleOpacity : isVisible ? 1 : 0,
          }}
          className={`
              w-0.5 h-6 bg-(--primaryDarken) transition-all duration-500 ease-in-out 
              ${cart.length > 0 ? 'opacity-100 mx-6 max-w-1 delay-0' : 'opacity-0 mx-0 max-w-0 pointer-events-none delay-400'}
              ${dragging ? 'transition-none' : ''}

              max-mobile:hidden
            `}
        />
        <Tooltip text="Abrir carrinho" pos="bottom">
          <button
            onClick={(e) => {
              e.stopPropagation()
              toggleCart()
            }}
            style={{ opacity: dragging ? titleOpacity : isVisible ? 1 : 0 }}
            className={`
              relative flex items-center bg-(--primary) brightness-105 hover:brightness-110 
              transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap px-4 py-1 rounded-md
              ${cart.length > 0 ? 'opacity-100 max-w-40 delay-400' : 'opacity-0 max-w-0 pointer-events-none delay-0'}
              ${dragging ? 'transition-none' : ''}

              max-mobile:hidden
            `}
          >
            <HiOutlineShoppingBag size={20} />
            {cart.length > 0 && (
              <span className="text-md ml-2">
                {cart.length > 1
                  ? `${cart.length > 9 ? '+9' : `${cart.length}`} itens`
                  : `${cart.length} item`}
              </span>
            )}
          </button>
        </Tooltip>
      </div>

      <Cart isOpen={isCartOpen} isOnTop={isHero || w < 600} />

      {showHandle && (
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onClick={() => {
            if (dragYRef.current === 0) setIsVisible((v) => !v)
            setMobileMenu(false)
          }}
          className={`
              absolute top-full left-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing
              bg-(--primary) rounded-b-full flex flex-col items-center gap-0.5
              shadow-[0_4px_8px_rgba(0,0,0,0.2)] select-none transition-all duration-300
            `}
        >
          {/* <span className="text-xs opacity-60">{isVisible ? 'esconder' : handleText}</span> */}
          <Tooltip text={isVisible ? 'Esconder barra' : 'Mostrar barra'} pos="bottom">
            <div className="px-6 py-1">
              <div className="w-8 h-0.5 bg-(--navbar-close) rounded-full" />
            </div>
          </Tooltip>
        </div>
      )}
    </nav>
  )
}

export default Navbar
