# Unit Testing Guide

This project uses `vitest` + `@testing-library/svelte` for unit tests.

## Principles

- Unit tests must be deterministic and fast.
- Unit tests must not require a live Q-SYS core.
- Mock QRWC integrations at the module boundary (`src/lib/qrwc.ts` import site), not by opening network connections.
- Test user-visible behavior first (text, roles, interactions), then internal wiring when useful.

## Where to Place Tests

- Keep test files next to the component/module:
  - `src/lib/pages/FooPage.svelte`
  - `src/lib/pages/FooPage.svelte.test.ts`
- The current Vitest include pattern is `src/**/*.{test,spec}.{js,ts}`.

## Standard Test Imports

Use this baseline import set for Svelte component tests:

```ts
import { render, screen, within } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
```

## Mocking `qrwc-svelte` (No Live Core)

Most components import `qrwcSvelte` from `src/lib/qrwc.ts` and call methods like:

- `qrwcSvelte.useComponent('VideoRouter')`
- `component.useButton('Display 1 1')`

For tests, mock the local `qrwc` module used by the component under test. Example for files in `src/lib/pages`:

```ts
type MockButtonControl = { state: boolean }

const controlNames = ['Display 1 1', 'Display 1 4', 'Display 2 1', 'Display 2 4'] as const

let controls: Record<string, MockButtonControl>

const { useButtonMock, useComponentMock } = vi.hoisted(() => {
  const useButton = vi.fn<(controlName: string) => MockButtonControl>()
  const useComponent = vi.fn(() => ({ useButton }))
  return { useButtonMock: useButton, useComponentMock: useComponent }
})

function resetControls() {
  controls = Object.fromEntries(controlNames.map((name) => [name, { state: false }]))
  useButtonMock.mockImplementation((controlName) => {
    const control = controls[controlName]
    if (!control) throw new Error(`Unexpected control: ${controlName}`)
    return control
  })
}

vi.mock('../qrwc', () => ({
  qrwcSvelte: {
    useComponent: useComponentMock,
  },
}))

beforeEach(() => {
  useComponentMock.mockClear()
  useButtonMock.mockClear()
  resetControls()
})
```

### Why `vi.hoisted`?

`vi.mock()` factories are hoisted. If the factory references variables declared later, tests can fail with:

- `Cannot access '...' before initialization`

Use `vi.hoisted` for mock fns that are referenced in `vi.mock`.

## What to Assert

For page-level Svelte component tests, cover at least:

1. **Render sanity**: headings/labels/buttons are present.
2. **Initial state**: expected default text/state is visible.
3. **Interaction**: clicking or typing updates UI correctly.
4. **Isolation**: action in one section does not mutate another section unexpectedly.
5. **QRWC wiring**: `useComponent(...)` and control hooks are called with expected names.

## Avoid These Anti-Patterns

- Do not instantiate real `QrwcSvelte` in tests.
- Do not rely on core IPs, sockets, or actual control responses.
- Do not assert implementation details that users cannot observe unless they prove important wiring.
- Do not share mutable mock state between tests without resetting in `beforeEach`.

## Run Tests

- Run all tests in watch mode:
  - `npm test`
- Run once (CI style):
  - `npm run test:run`
- Run one file:
  - `npm run test:run -- src/lib/pages/VideoRoutingPage.svelte.test.ts`
- Run project checks after test changes:
  - `npm run check`

## Quick Template for New Component Tests

1. Create `MyComponent.svelte.test.ts` next to the component.
2. Mock `../qrwc` (or correct relative path) with `vi.mock`.
3. Build deterministic control objects (`{ state: boolean }` etc.).
4. Reset mocks/control map in `beforeEach`.
5. Write tests for render, defaults, interactions, and independent behavior.
6. Run targeted test file, then `npm run check`.
