import useReveal from '@/hooks/useReveal'

import Wpp from '@/assets/icons/whatsapp.png'
import Fac from '@/assets/icons/facebook.png'
import Ins from '@/assets/icons/instagram.png'
import Env from '@/assets/icons/envelope.png'
import Rel from '@/assets/icons/relogio.png'
import End from '@/assets/icons/endereco.png'
import { useState } from 'react'
import useTilt from '@/hooks/useTilt'

const infos = [
  { icon: End, label: 'Endereço', text: 'Rua dos Doces, 50 - São Paulo, SP' },
  { icon: Wpp, label: 'WhatsApp', text: '(11) 94002-8922' },
  { icon: Env, label: 'E-mail', text: 'alo@candyshop.com.br' },
  { icon: Rel, label: 'Horário', text: 'Ter-Sáb, 9h às 18h' },
]

const social = [
  { icon: Wpp, label: '(11) 94002-8922' },
  { icon: Ins, label: '/candy_shop' },
  { icon: Fac, label: '/cdy_shop' },
]

const Contact = () => {
  const { ref, revealed } = useReveal(0.65)
  const tilt = useTilt(6)
  const [message, setMessage] = useState<string>('')

  return (
    <section ref={ref} id="contact" className="snap-start relative min-h-screen overflow-hidden">
      <div className="absolute bottom-0 left-0 w-full h-120 max-mobile:h-60 bg-[linear-gradient(160deg,#ff7a95_0%,#ffb3c1_60%,#ffd6e0_100%)] [clip-path:ellipse(70%_100%_at_50%_100%)]" />

      <div className="relative w-screen h-screen z-1 p-12 max-mobile:p-4 flex flex-col max-mobile:overflow-y-scroll no-scrollbar">
        <div className="max-mobile:flex max-mobile:items-center max-mobile:mt-6 max-mobile:justify-between">
          <h1
            style={{ '-webkit-text-stroke': '0' } as React.CSSProperties}
            className={`
            custom-text tracking-widest relative w-fit mt-6 
            transition-all duration-500 

            max-mobile:text-3xl! max-mobile:mt-0

            ${revealed ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
          `}
          >
            Contato
          </h1>
          <div className="mobile:hidden flex items-center">
            {social.map((item, i) => {
              const isLast = social[social.length - 1] === item
              return (
                <div
                  key={item.label}
                  className={`
                      relative flex items-center rounded-lg h-12 hover:[&>.text]:max-w-50 
                      hover:[&>.text]:ml-2 hover:[&>.text]:px-4 hover:[&>.text]:border 
                      hover:[&>.text]:border-[rgba(200,80,100,0.1)] 
                      ${!isLast && 'mr-2'} transition-all duration-500
                    `}
                  style={{
                    opacity: revealed ? 1 : 0,
                    transform: revealed ? 'translateX(0)' : 'translateX(-24px)',
                    transitionDelay: revealed ? `${550 + i * 120}ms` : '0ms',
                  }}
                >
                  <div
                    className="grid place-items-center cursor-pointer rounded-lg max-mobile:w-10 max-mobile:h-10"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(213,100,119,0.18) 0%, rgba(186,59,93,0.08) 50%, rgba(184,138,146,0.13) 100%)',
                      border: '1px solid rgba(200,80,100,0.25)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 16px -4px rgba(180,60,80,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                  >
                    <img src={item.icon} alt="a" className="w-full h-full" />
                  </div>
                  <div
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(180,60,80,0.12) 0%, rgba(140,30,60,0.06) 50%, rgba(180,60,80,0.10) 100%)',
                      borderColor: 'rgba(200,80,100,0.1)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      boxShadow: '0 8px 16px -4px rgba(180,60,80,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                    className="text max-w-0 font-serif font-bold text-sm h-full grid place-items-center rounded-lg overflow-hidden whitespace-nowrap pointer-events-none transition-all duration-300 text-(--text-secondary)"
                  >
                    <span className="brightness-90">{item.label}</span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div
          className="
            flex mt-6 
            max-mobile:flex-col max-mobile:mt-2
          "
        >
          <div className="flex-1 pr-85 max-mobile:pr-0">
            <h1
              className={`
                text-5xl font-bold text-(--text-secondary) font-serif
                transition-all duration-600 delay-150 

                max-mobile:text-[28px]

                ${revealed ? 'opacity-100' : 'opacity-0'}
              `}
            >
              Fale com a gente
            </h1>
            <h3
              className={`
                text-xl text-zinc-900/70 mt-6
                transition-all duration-600 delay-300

                max-mobile:text-base! max-mobile:mt-0

                ${revealed ? 'opacity-100' : 'opacity-0'}
              `}
            >
              Tem uma dúvida, quer fazer um pedido especial ou só mandar um oi? A gente adora receber
              mensagens!
            </h3>

            <ul className="mt-12 max-mobile:mt-8">
              {infos.map((item, i) => {
                const isLast = infos[infos.length - 1] === item
                return (
                  <li
                    key={item.label}
                    className={`flex flex-row items-center ${isLast ? '' : 'mb-4'} transition-all duration-500`}
                    style={{
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateX(0)' : 'translateX(-24px)',
                      transitionDelay: revealed ? `${150 + i * 100}ms` : '0ms',
                    }}
                  >
                    <div
                      className="w-12 h-12 mr-4 rounded-lg grid place-items-center max-mobile:w-10 max-mobile:h-10 max-mobile:mr-2"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(180,60,80,0.18) 0%, rgba(140,30,60,0.08) 50%, rgba(180,60,80,0.13) 100%)',
                        border: '1px solid rgba(200,80,100,0.25)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow:
                          '0 8px 16px -4px rgba(180,60,80,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                      }}
                    >
                      <img src={item.icon} alt="a" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-lg max-mobile:text-sm text-zinc-900/60 uppercase">
                        {item.label}
                      </span>
                      <span className="text-(--text-secondary) max-mobile:text-xs font-bold brightness-90">
                        {item.text}
                      </span>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="flex items-center mt-6 max-mobile:hidden">
              {social.map((item, i) => {
                const isLast = social[social.length - 1] === item
                return (
                  <div
                    key={item.label}
                    className={`relative flex items-center rounded-lg h-12 hover:[&>.text]:max-w-50 hover:[&>.text]:ml-2 hover:[&>.text]:px-4 hover:[&>.text]:border hover:[&>.text]:border-[rgba(200,80,100,0.1)] ${!isLast && 'mr-4'} transition-all duration-500`}
                    style={{
                      opacity: revealed ? 1 : 0,
                      transform: revealed ? 'translateX(0)' : 'translateX(-24px)',
                      transitionDelay: revealed ? `${550 + i * 120}ms` : '0ms',
                    }}
                  >
                    <div
                      className="h-12 w-12 grid place-items-center cursor-pointer rounded-lg"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(213,100,119,0.18) 0%, rgba(186,59,93,0.08) 50%, rgba(184,138,146,0.13) 100%)',
                        border: '1px solid rgba(200,80,100,0.25)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow:
                          '0 8px 16px -4px rgba(180,60,80,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                      }}
                    >
                      <img src={item.icon} alt="a" className="w-full h-full" />
                    </div>
                    <div
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(180,60,80,0.12) 0%, rgba(140,30,60,0.06) 50%, rgba(180,60,80,0.10) 100%)',
                        borderColor: 'rgba(200,80,100,0.1)',
                        backdropFilter: 'blur(16px)',
                        WebkitBackdropFilter: 'blur(16px)',
                        boxShadow:
                          '0 8px 16px -4px rgba(180,60,80,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
                      }}
                      className="text max-w-0 font-serif font-bold text-sm h-full grid place-items-center rounded-lg overflow-hidden whitespace-nowrap pointer-events-none transition-all duration-300 text-(--text-secondary)"
                    >
                      <span className="brightness-90">{item.label}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="w-[33%] max-mobile:w-full flex flex-col gap-4 [&_div]:rounded-lg max-mobile:mt-8">
            <div
              ref={tilt.ref}
              onMouseMove={tilt.onMouseMove}
              onMouseLeave={tilt.onMouseLeave}
              className={`
                h-full
                relative rounded-2xl p-5 overflow-hidden border z-10 transition-all duration-500
                ${revealed ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}
              `}
              style={{
                background:
                  'linear-gradient(135deg, rgba(180,60,80,0.18) 0%, rgba(140,30,60,0.08) 50%, rgba(180,60,80,0.13) 100%)',
                border: '1px solid rgba(200,80,100,0.25)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 16px -4px rgba(180,60,80,0.15), inset 0 1px 0 rgba(255,255,255,0.15)',
              }}
            >
              <h1 className="text-2xl font-bold text-(--text-secondary) font-serif max-mobile:text-center max-mobile:text-xl">
                Manda uma mensagem!
              </h1>

              <form
                action=""
                className={`
                    relative grid grid-cols-2 items-start gap-2 mt-4
                    [&_input,&_textarea,&_select]:bg-[rgba(0,0,0,0.2)] [&_input,&_textarea,&_select]:rounded-md
                    [&_input,&_textarea,&_select]:p-2 [&_input,&_textarea,&_select]:outline-0 [&_input]:w-full
                    [&_input,&_textarea,&_select]:placeholder-(--text-secondary)/40 [&_input,&_textarea,&_select]:placeholder:brightness-55

                    max-mobile:mt-2 max-mobile:[&_input,&_textarea,&_select]:text-sm
                  `}
              >
                <div>
                  <label htmlFor="" className="text-(--text-secondary) font-bold text-xs">
                    Nome
                  </label>
                  <input type="text" maxLength={26} placeholder="seu nome" />
                </div>
                <div>
                  <label htmlFor="" className="text-(--text-secondary) font-bold text-xs">
                    Telefone
                  </label>
                  <input type="text" maxLength={15} placeholder="(11) 90000-0000" />
                </div>
                <div className="col-span-2 -mt-2">
                  <label htmlFor="" className="text-(--text-secondary) font-bold text-xs">
                    E-mail
                  </label>
                  <input type="text" maxLength={50} placeholder="seu@email.com" />
                </div>
                <div className="col-span-2 -mt-2 mb-2">
                  <label htmlFor="" className="text-(--text-secondary) font-bold text-xs">
                    Assunto
                  </label>
                  <select className="w-full text-(--text-thirdary)/90">
                    <option>Fazer um pedido</option>
                    <option>Pedido personalizado</option>
                    <option>Dúvida sobre entrega</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div className="col-span-2 -mt-2 relative">
                  <div className="text-(--text-secondary) font-bold text-xs flex justify-between">
                    <label htmlFor="">Mensagem</label>
                    <span className="opacity-65">{message.length}/200</span>
                  </div>
                  <textarea
                    name=""
                    id=""
                    maxLength={200}
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.currentTarget.value)}
                    className="w-full resize-none text-(--text-thirdary)"
                    placeholder="conta o que você precisa..."
                  />
                </div>

                <button
                  className="
                    col-span-2 bg-(--text-secondary)/20 text-(--text-thirdary) py-2 mt-2 rounded-md capitalize
                    border border-(--text-secondary) 
                    hover:bg-(--text-secondary) hover:text-(--primary) hover:border-(--primary)
                    transition-all
                  "
                >
                  enviar mensagem
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
