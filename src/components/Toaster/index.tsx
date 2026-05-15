import { useToastStore } from '@/hooks/useToast'

const Toaster = () => {
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  const handleRemove = (id: string) => {
    useToastStore.setState({
      toasts: useToastStore.getState().toasts.map((t) => (t.id === id ? { ...t, exiting: true } : t)),
    })
    setTimeout(() => removeToast(id), 400)
  }

  return (
    <div className="fixed bottom-6 right-6 z-999 flex flex-col gap-2 items-end">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => handleRemove(toast.id)}
          className={`
            bg-(--active-navbar) text-white px-4 py-2 rounded-md shadow-lg cursor-pointer
            flex items-center gap-2 transition-all duration-300
            ${toast.exiting ? '-translate-y-4 opacity-0' : 'translate-x-0 opacity-100'}
          `}
          style={{
            animation: toast.exiting ? undefined : 'slideIn 0.3s ease-out',
          }}
        >
          <div className="flex flex-col">
            <span className="text-xs opacity-60">{toast.title}</span>
            <span>{toast.message}</span>
          </div>
          {toast.count > 1 && (
            <span className="bg-white text-(--active-navbar) text-xs font-bold px-1.5 py-0.5 rounded-full">
              x{toast.count}
            </span>
          )}
        </div>
      ))}

      <style>{`
        @keyframes slideIn {
          from { transform: translateX(120%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  )
}

export default Toaster
