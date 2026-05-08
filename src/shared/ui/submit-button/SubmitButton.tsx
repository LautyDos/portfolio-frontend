type SubmitButtonProps = {
  loading: boolean
  label: string
  loadingLabel?: string
}

export function SubmitButton({ loading, label, loadingLabel = 'guardando...' }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="self-start bg-accent text-black font-mono font-semibold px-4 py-2 rounded hover:opacity-90 disabled:opacity-50 transition-opacity"
    >
      {loading ? loadingLabel : `$ ${label}`}
    </button>
  )
}
