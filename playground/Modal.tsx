import {
  useEffect,
  useId,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  'object',
  'embed',
  '[contenteditable]',
  '[tabindex]:not([tabindex="-1"])',
].join(', ')

type ModalProps = {
  children: ReactNode
  title: string
}

function Modal({ children, title }: ModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const titleId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const openerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!isOpen) {
      openerRef.current?.focus()
      return
    }

    const dialog = dialogRef.current
    if (!dialog) return
    const dialogElement = dialog

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      FOCUSABLE_SELECTOR,
    )
    const firstFocusableElement = focusableElements[0]
    firstFocusableElement?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setIsOpen(false)
        return
      }

      if (event.key !== 'Tab') return

      const currentFocusableElements = dialogElement.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR,
      )
      const firstElement = currentFocusableElements[0]
      const lastElement =
        currentFocusableElements[currentFocusableElements.length - 1]

      if (!firstElement || !lastElement) {
        event.preventDefault()
        dialogElement.focus()
        return
      }

      if (!dialogElement.contains(document.activeElement)) {
        event.preventDefault()
        ;(event.shiftKey ? lastElement : firstElement).focus()
      } else if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen])

  function openModal(event: MouseEvent<HTMLButtonElement>) {
    openerRef.current = event.currentTarget
    setIsOpen(true)
  }

  return (
    <>
      <button ref={openerRef} type="button" onClick={openModal}>
        Open Modal
      </button>

      {isOpen && (
        <div className="modal-backdrop">
          <div
            ref={dialogRef}
            className="modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
          >
            <h2 id={titleId}>{title}</h2>
            <div>{children}</div>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Modal