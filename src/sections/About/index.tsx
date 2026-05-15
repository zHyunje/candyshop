import useReveal from '@/hooks/useReveal'

// icons
import Hands from '@/assets/icons/handMade.png'
import Ingredients from '@/assets/icons/ingredients.png'
import Deliver from '@/assets/icons/deliver.png'
import Orders from '@/assets/icons/orders.png'

// layers
import L1 from '@/assets/layers_about/l1.svg'
import L2 from '@/assets/layers_about/l2.svg'
import L3 from '@/assets/layers_about/l3.svg'
import L4 from '@/assets/layers_about/l4.svg'
import L5 from '@/assets/layers_about/l5.svg'
import useTilt from '@/hooks/useTilt'
import useWindow from '@/hooks/useWindow'

const cards = [
  {
    icon: Hands,
    title: 'Feito à mão',
    desc: 'Receitas artesanais sem conservantes, do jeitinho que a vovó fazia.',
  },
  {
    icon: Ingredients,
    title: 'Ingredientes selecionados',
    desc: 'Chocolates e matérias-primas de alta qualidade para um sabor único.',
  },
  {
    icon: Deliver,
    title: 'Entrega rápida',
    desc: 'Seus doces chegam fresquinhos e na hora certa, onde você estiver.',
  },
  {
    icon: Orders,
    title: 'Pedidos especiais',
    desc: 'Personalizamos tudo pra sua festa, casamento ou data especial.',
  },
]

const depoimentos = [
  { name: 'Ana Paula', comment: 'Os melhores brigadeiros que já comi na vida!' },
  { name: 'João Silva', comment: 'Os doces salvaram minha festa!!' },
  { name: 'Carla M.', comment: 'Entrega super rápida e embalagem linda!' },
  { name: 'Pedro H.', comment: 'Todo mundo amou os doces, obrigado!' },
  { name: 'Fernanda L.', comment: 'Já é a 3ª encomenda kk, viciada!' },
  { name: 'Lucas R.', comment: 'Qualidade absurda! ⭐⭐⭐⭐⭐' },
  { name: 'Mariana T.', comment: 'Brigadeiro de Nutella? Perfeito demais!' },
  { name: 'Rafael B.', comment: 'Chegou fresquinho e no horário!' },
  { name: 'Juliana K.', comment: 'Fiz pedido pra casamento, amei!' },
  { name: 'Thiago N.', comment: 'Melhor presente que dei pra minha mãe!' },
]

const About = () => {
  const { ref, revealed } = useReveal(0.65)
  const w = useWindow()

  const layers = [L5, L4, L3, L2, L1]
  const waveClasses = ['wave-1', 'wave-2', 'wave-3', 'wave-4', 'wave-5']

  return (
    <section ref={ref} id="about" className="snap-start relative min-h-screen overflow-hidden">
      <div className="absolute top-0 left-0 w-full pointer-events-none">
        {layers.map((Layer, i) => (
          <img
            key={i}
            src={Layer}
            className={`
              absolute left-0 w-full ${waveClasses[i]} scale-[1.2]
              ${i === 0 ? '-top-12' : 'top-0'} max-mobile:scale-[6]
              transition-all duration-700 ease-out
              ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-12'}
            `}
            style={{ transitionDelay: `${i * 150}ms` }}
          />
        ))}
      </div>

      {/* content */}
      <div className="relative w-screen h-screen z-1 p-12 max-mobile:p-4 flex flex-col justify-between">
        <div>
          <h1
            style={{ '-webkit-text-stroke': '0' } as React.CSSProperties}
            className={`
            custom-text tracking-wider relative w-fit mt-6
            transition-all duration-500 max-mobile:text-3xl! max-mobile:mt-8
            ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
          >
            Nossa história
          </h1>

          <div className="flex flex-row gap-12 mt-8 max-mobile:gap-4">
            <div className="flex-1 overflow-hidden relative">
              <h1
                className={`
                text-5xl font-bold text-white font-serif
                transition-all duration-600 delay-150
                ${revealed ? 'opacity-100' : 'opacity-0'}

                max-mobile:text-2xl
              `}
              >
                Feitos com amor, entregues com carinho
              </h1>
              <h3
                className={`
                text-xl text-white mt-6 
                
                max-mobile:text-sm max-mobile:mt-2
                
                transition-all duration-600 delay-300
                ${revealed ? 'opacity-100' : 'opacity-0'}
              `}
              >
                Somos uma doceria artesanal apaixonada por transformar momentos simples em memórias doces.
                Cada brigadeiro, cada bolo, cada docinho é feito à mão com ingredientes selecionados.
              </h3>

              {/* depoimentos */}
              {w > 600 && (
                <div className="flex-1 overflow-hidden absolute bottom-0">
                  <div
                    className="flex gap-4 max-mobile:gap-2 animate-marquee w-max"
                    style={{ animationDuration: '90s' }}
                  >
                    {[...depoimentos, ...depoimentos].map((d, i) => (
                      <div
                        key={i}
                        className="
                        flex items-center gap-3 whitespace-nowrap rounded-full px-4 py-2

                        max-mobile:gap-1 max-mobile:px-2 max-mobile:py-1
                      "
                        style={{
                          background: 'linear-gradient(135deg, rgba(180,60,80,0.12), rgba(180,60,80,0.05))',
                          border: '1px solid rgba(200,80,100,0.2)',
                          backdropFilter: 'blur(12px)',
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ background: 'rgba(180,60,80,0.4)' }}
                        >
                          {d.name[0]}
                        </div>
                        <span className="text-sm max-mobile:text-xs font-bold" style={{ color: '#7a1a30' }}>
                          {d.name}
                        </span>
                        <span className="text-sm max-mobile:text-xs" style={{ color: '#9a3a50' }}>
                          "{d.comment}"
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="w-[28%] max-mobile:w-[34%] flex flex-col gap-6 max-mobile:gap-2 mt-4">
              {[
                { num: '+2k', label: 'clientes felizes' },
                { num: '4.9★', label: 'avaliação média' },
                { num: '5 anos', label: 'de muito amor' },
              ].map((s) => (
                <div key={s.label} className="border-l-2 border-white/60 pl-4">
                  <p className="text-4xl font-bold text-white font-serif max-mobile:text-2xl">{s.num}</p>
                  <p className="text-white/70 text-sm mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        {w < 600 && (
          <div className="flex-1 my-10 z-1">
            <div
              className="flex gap-4 max-mobile:gap-2 animate-marquee w-max"
              style={{ animationDuration: '90s' }}
            >
              {[...depoimentos, ...depoimentos].map((d, i) => (
                <div
                  key={i}
                  className="
                        flex items-center gap-3 whitespace-nowrap rounded-full px-4 py-2

                        max-mobile:gap-1 max-mobile:px-2 max-mobile:py-1
                      "
                  style={{
                    background: 'linear-gradient(135deg, rgba(180,60,80,0.12), rgba(180,60,80,0.05))',
                    border: '1px solid rgba(200,80,100,0.2)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                    style={{ background: 'rgba(180,60,80,0.4)' }}
                  >
                    {d.name[0]}
                  </div>
                  <span className="text-sm max-mobile:text-xs font-bold" style={{ color: '#7a1a30' }}>
                    {d.name}
                  </span>
                  <span className="text-sm max-mobile:text-xs" style={{ color: '#9a3a50' }}>
                    "{d.comment}"
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <h1
          className={`
            text-2xl font-bold text-zinc-900 font-serif col-span-4
            transition-all duration-500 delay-400

            mobile:hidden
            ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
        >
          Nossa identidade
        </h1>
        <div className="grid grid-cols-4 gap-4 mb-10 max-mobile:flex max-mobile:overflow-x-scroll no-scrollbar">
          <h1
            className={`
              text-2xl font-bold text-zinc-900 font-serif col-span-4
              transition-all duration-500 delay-400

              max-mobile:hidden

              ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
            `}
          >
            Nossa identidade
          </h1>
          {cards.map((c, i) => {
            const tilt = useTilt(30)
            return (
              <div
                key={c.title}
                ref={tilt.ref}
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                className={`
                relative rounded-2xl p-5 overflow-hidden border z-10
                transition-all duration-500 ease-out

                max-mobile:shrink-0 max-mobile:p-4 max-mobile:w-75

                ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}
              `}
                style={{
                  background:
                    'linear-gradient(135deg, rgba(180,60,80,0.18) 0%, rgba(140,30,60,0.08) 50%, rgba(180,60,80,0.13) 100%)',
                  border: '1px solid rgba(200,80,100,0.25)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  boxShadow: '0 8px 16px -4px rgba(180,60,80,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                  transitionDelay: revealed ? `${500 + i * 100}ms` : '0ms',
                }}
              >
                {/* reflexo de vidro */}
                <div
                  className="absolute top-0 left-0 w-1/2 h-1/2 rounded-tl-2xl pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 70%)',
                  }}
                />

                <img src={c.icon} className="w-16 h-16 absolute right-4 top-1/2 -translate-y-1/2" />
                <h3 className="font-bold mt-2 mb-1 relative z-1" style={{ color: '#7a1a30' }}>
                  {c.title}
                </h3>
                <p className="text-sm relative z-1 w-[calc(100%-70px)]" style={{ color: '#9a3a50' }}>
                  {c.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
