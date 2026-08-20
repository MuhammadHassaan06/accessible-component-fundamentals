import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'

export type TabDefinition = {
  label: string
  content: ReactNode
}

type TabsProps = {
  tabs: TabDefinition[]
}

function Tabs({ tabs }: TabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const tabsId = useId()

  if (tabs.length === 0) return null

  function focusTab(index: number) {
    const nextIndex = (index + tabs.length) % tabs.length
    setActiveIndex(nextIndex)
    tabRefs.current[nextIndex]?.focus()
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    const currentIndex = Number(event.currentTarget.dataset.index)

    switch (event.key) {
      case 'ArrowRight':
        event.preventDefault()
        focusTab(currentIndex + 1)
        break
      case 'ArrowLeft':
        event.preventDefault()
        focusTab(currentIndex - 1)
        break
      case 'Home':
        event.preventDefault()
        focusTab(0)
        break
      case 'End':
        event.preventDefault()
        focusTab(tabs.length - 1)
        break
    }
  }

  return (
    <div className="tabs">
      <div className="tabs-list" role="tablist" aria-label="Component details">
        {tabs.map((tab, index) => {
          const tabId = `${tabsId}-tab-${index}`
          const panelId = `${tabsId}-panel-${index}`

          return (
            <button
              key={tabId}
              ref={(element) => {
                tabRefs.current[index] = element
              }}
              id={tabId}
              className="tab"
              type="button"
              role="tab"
              aria-selected={activeIndex === index}
              aria-controls={panelId}
              tabIndex={activeIndex === index ? 0 : -1}
              data-index={index}
              onClick={() => setActiveIndex(index)}
              onKeyDown={handleTabKeyDown}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {tabs.map((tab, index) => {
        const tabId = `${tabsId}-tab-${index}`
        const panelId = `${tabsId}-panel-${index}`

        return (
          <div
            key={panelId}
            id={panelId}
            className="tab-panel"
            role="tabpanel"
            aria-labelledby={tabId}
            tabIndex={index === activeIndex ? 0 : -1}
            hidden={index !== activeIndex}
          >
            {tab.content}
          </div>
        )
      })}
    </div>
  )
}

export default Tabs