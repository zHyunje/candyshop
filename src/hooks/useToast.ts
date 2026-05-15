import { create } from 'zustand'

type Toast = {
  id: string
  title: string
  message: string
  count: number
  exiting: boolean
}

type ToastStore = {
  toasts: Toast[]
  addToast: (title: string, message: string) => void
  removeToast: (id: string) => void
}

export const useToastStore = create<ToastStore>((set, get) => ({
  toasts: [],

  addToast: (title: string, message: string) => {
    const { toasts } = get()
    const existing = toasts.find((t) => t.message === message)

    // stacka se já existe
    if (existing) {
      set({
        toasts: toasts.map((t) => (t.message === message ? { ...t, count: t.count + 1 } : t)),
      })
      return
    }

    const id = crypto.randomUUID()
    let newToasts = [...toasts, { id, title, message, count: 1, exiting: false }]

    // se passou de 5, remove o mais antigo
    if (newToasts.length > 5) {
      newToasts = newToasts.slice(1)
    }

    set({ toasts: newToasts })

    setTimeout(() => {
      // marca como saindo primeiro
      set({
        toasts: get().toasts.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
      })
      // remove depois da animação terminar
      setTimeout(() => get().removeToast(id), 400)
    }, 3000)
  },

  removeToast: (id: string) => {
    set({ toasts: get().toasts.filter((t) => t.id !== id) })
  },
}))
