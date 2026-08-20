import './App.css'
import Disclosure from '../playground/Disclosure'
import Modal from '../playground/Modal'
import Tabs from '../playground/Tabs'

function App() {
  return (
    <main className="playground-shell">
      <p className="eyebrow">Accessibility assignment</p>
      <h1>Accessible Component Fundamentals</h1>
      <p className="intro">
        A playground for building accessible React components from scratch.
      </p>
      <section className="demo-panel" aria-labelledby="modal-demo-heading">
        <h2 id="modal-demo-heading">Modal Dialog</h2>
        <p>
          Open the dialog to test focus movement, keyboard navigation, and
          focus restoration.
        </p>
        <Modal title="A focused conversation">
          <p>
            This content is inside the modal. Try Tab and Shift+Tab to move
            through all of its controls.
          </p>
          <label>
            Your name
            <input type="text" name="name" />
          </label>
        </Modal>
      </section>
      <section className="demo-panel" aria-labelledby="tabs-demo-heading">
        <h2 id="tabs-demo-heading">Tabs</h2>
        <p>Use the arrow keys to explore each panel and its content.</p>
        <Tabs
          tabs={[
            {
              label: 'Overview',
              content: (
                <>
                  <h3>Build with intention</h3>
                  <p>
                    This playground focuses on the keyboard and screen reader
                    details that make common interface patterns usable.
                  </p>
                </>
              ),
            },
            {
              label: 'Features',
              content: (
                <>
                  <h3>Accessible by default</h3>
                  <p>
                    Each example is built with semantic HTML, clear focus
                    states, and predictable keyboard interaction.
                  </p>
                </>
              ),
            },
            {
              label: 'Settings',
              content: (
                <>
                  <h3>Practice preferences</h3>
                  <p>
                    Try every interaction with a keyboard before moving on to
                    the next component in the assignment.
                  </p>
                </>
              ),
            },
          ]}
        />
      </section>
      <section className="demo-panel" aria-labelledby="disclosure-demo-heading">
        <h2 id="disclosure-demo-heading">Disclosure</h2>
        <p>Expand the panel to reveal more information about this exercise.</p>
        <Disclosure label="About the accessibility practice">
          <p>
            Accessible interfaces give people more than one way to complete a
            task. They support keyboard navigation, understandable structure,
            and clear changes of state.
          </p>
          <p>
            This disclosure keeps its trigger available at all times while its
            additional content can be shown or hidden on demand.
          </p>
        </Disclosure>
      </section>
    </main>
  )
}

export default App
