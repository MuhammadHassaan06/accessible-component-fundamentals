import { useId, useState, type ReactNode } from 'react'

type DisclosureProps = {
  children: ReactNode
  label: string
}

function Disclosure({ children, label }: DisclosureProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const panelId = useId()

  return (
    <div className="disclosure">
      <button
        type="button"
        aria-expanded={isExpanded}
        aria-controls={panelId}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {label}
      </button>
      <div id={panelId} className="disclosure-panel" hidden={!isExpanded}>
        {children}
      </div>
    </div>
  )
}

export default Disclosure