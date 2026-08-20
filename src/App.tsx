import './App.css'
import Modal from '../playground/Modal'

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
    </main>
  )
}

export default App
