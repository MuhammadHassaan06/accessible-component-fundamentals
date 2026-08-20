# Accessibility Review

## 1. Modal Dialog

The Modal has the expected `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` relationship. It moves focus into the dialog, traps forward and reverse Tab navigation across multiple focusable elements, closes on Escape, restores focus to the opener, and removes its document keyboard listener when closed.

Two actual gaps were found:

- The closed-state effect focuses the opener on the component's initial mount, not only after a modal close. This can unexpectedly move a user's focus when the page first loads.
- The background is visually covered and Tab is trapped, but the rest of the application is not made inert while the dialog is open. Pointer, programmatic, or assistive-technology interaction with outside content is therefore not fully prevented by the implementation.

## 2. Tabs

Tabs use `role="tablist"`, `role="tab"`, and `role="tabpanel"`. Each tab has `aria-selected` and `aria-controls`; each panel has `aria-labelledby`; IDs are generated with `useId()` and remain associated. ArrowRight, ArrowLeft, Home, and End update selection and focus, with wrapping for arrow navigation. Roving `tabIndex` keeps only the active tab in the normal tab sequence, and the active panel is available as the next Tab destination. Visible focus is preserved.

No clear accessibility defect was found in the current Tabs source for the requested behavior.

## 3. Disclosure

Disclosure uses a native button with a clear label, `aria-expanded`, and `aria-controls`. The controlled panel receives a stable `useId()` ID and uses the native `hidden` state when collapsed. Native button behavior provides Enter and Space activation, and the existing focus-visible styling remains available.

No clear accessibility defect was found in the current Disclosure source for the requested behavior.

## 4. Concrete AI-Generated Accessibility Gaps

### Gap 1: Modal moves focus on initial mount

- **Component:** Modal Dialog
- **Problem:** The `useEffect` branch for `!isOpen` always calls `openerRef.current?.focus()`.
- **Why it matters:** Mounting a component should not unexpectedly steal focus from a user who is already navigating the page.
- **Expected behavior:** Focus should return to the opener only when an open modal transitions to closed.
- **Current behavior:** The opener is focused on initial render as well as after closing.
- **How it should be fixed:** Track whether the modal was previously open, and restore focus only after that open state transitions to `false`.

### Gap 2: Modal background is not truly inert

- **Component:** Modal Dialog
- **Problem:** The dialog sets `aria-modal="true"` and traps document Tab events, but it does not apply an inert boundary or otherwise disable the rest of the application while open.
- **Why it matters:** A modal dialog must prevent interaction with background content. `aria-modal` communicates the modal state to assistive technology; it does not itself make arbitrary DOM content inert.
- **Expected behavior:** Background content should be unavailable to keyboard, pointer, programmatic, and assistive-technology interaction while the dialog is open.
- **Current behavior:** The overlay covers the page visually and Tab is redirected, but outside content remains in the DOM without an inert mechanism.
- **How it should be fixed:** Place the application content and modal in separate containers and apply the native `inert` property or an equivalent carefully managed inert strategy to the background while the modal is open.

## 5. What I Learned

Visually working components can still be inaccessible because accessibility depends on focus ownership, interaction boundaries, and state relationships that are not always visible. Correct roles and labels are necessary, but they must be paired with behavior that prevents focus loss, background interaction, and unexpected focus movement.