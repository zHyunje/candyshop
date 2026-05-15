import useReveal from '@/hooks/useReveal'

import Wave from '@/assets/wave.svg'
import HeroImg from '@/assets/hero.svg'
import HeroMob from '@/assets/hero_mobile.png'

import { FaTruck, FaStar } from 'react-icons/fa'

const clients = [
  { name: 'Ana Paula', comment: 'Brigadeiros incríveis! 😍' },
  { name: 'João Silva', comment: 'Os doces salvaram minha festa!!' },
  { name: 'Carla M.', comment: 'Entrega super rápida!' },
  { name: 'Pedro H.', comment: 'Todo mundo amou os doces, obrigado!' },
  { name: 'Fernanda L.', comment: 'Já é a 3ª encomenda kk' },
  { name: 'Lucas R.', comment: 'Qualidade absurda! ⭐⭐⭐⭐⭐' },
]

const Hero = () => {
  const { ref, revealed } = useReveal()

  return (
    <section id="hero" ref={ref} className="snap-start relative h-screen max-mobile:h-dvh!">
      <img src={Wave} alt="Wave" className="w-full object-cover absolute top-0 left-0 rotate-y-180" />

      <div
        className={`
          absolute top-40 left-20 z-10 flex flex-col gap-4 w-[41.66666666666667%] 
          transition-all duration-700
          ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'}

          max-mobile:w-[94%] max-mobile:left-1/2 max-mobile:-translate-x-1/2 max-mobile:top-26 max-mobile:h-50
        `}
      >
        <h1 className="font-candy text-6xl max-mobile:text-3xl leading-tight">Doces feitos com amor 🍬</h1>
        <p className="text-lg max-mobile:text-[16px] opacity-70 max-w-sm">
          Cada docinho feito com muito amor e carinho, pra deixar seu dia mais gostoso e feliz :D
        </p>

        <button
          className="
            max-mobile:absolute max-mobile:bottom-0 max-mobile:py-2 max-mobile:px-6 max-mobile:text-sm
            
            bg-(--active-navbar) rounded-full px-8 py-3 font-bold w-fit
            hover:shadow-[inset_165px_0_0_rgba(255,255,255,0.4)] transition-shadow duration-300
          "
        >
          Ver produtos
        </button>

        <div
          className={`
            relative top-20 max-mobile:top-70
            w-full overflow-hidden
            transition-all duration-700 delay-600
            ${revealed ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <div className="flex gap-4 animate-marquee w-max">
            {[...clients, ...clients].map((c, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm flex items-center gap-2 whitespace-nowrap"
              >
                <div className="w-6 h-6 rounded-full bg-(--primary) flex items-center justify-center text-xs font-bold">
                  {c.name[0]}
                </div>
                <span className="text-sm font-bold">{c.name}</span>
                <span className="text-sm opacity-70">{c.comment}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute top-1/2 right-20 max-mobile:hidden -translate-y-1/2 z-10">
        <img
          src={HeroImg}
          alt="Hero"
          className={`
            w-140 h-140
            transition-all duration-700 delay-300
            ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        />
      </div>

      <img
        src={HeroMob}
        alt="Hero"
        className={`
          absolute top-55 right-0
          w-70 h-70 mobile:hidden
          transition-all duration-700 delay-300
          ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
        `}
      />

      {/* badges flutuando */}
      <div
        className={`absolute bottom-40 right-20 z-20 flex flex-col gap-3
          transition-all duration-700 delay-500
          ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}

          max-mobile:right-6 max-mobile:bottom-40
        `}
      >
        <div
          className="
            animate-bounce-slow bg-white rounded-full px-4 py-2 shadow-md text-sm font-bold
            max-mobile:py-1 max-mobile:px-2 max-mobile:text-xs flex items-center gap-2 justify-center
          "
        >
          <FaTruck />
          Entrega rápida
        </div>
        <div
          className="
            animate-float bg-white rounded-full px-4 py-2 shadow-md text-sm font-bold
            max-mobile:py-1 max-mobile:px-2 max-mobile:text-xs flex items-center justify-center gap-2
          "
        >
          <FaStar />
          4.9 estrelas
        </div>
      </div>

      {/* scroll indicator */}
      <div
        className={`
          absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2
          transition-all duration-700 delay-700
          ${revealed ? 'opacity-100' : 'opacity-0'}

          max-mobile:bottom-4
        `}
      >
        <span className="text-xs opacity-50">role para ver mais</span>
        <div className="w-5 h-8 border-2 border-current rounded-full flex items-start justify-center p-1 opacity-50">
          <div className="w-1 h-2 bg-current rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}

export default Hero
