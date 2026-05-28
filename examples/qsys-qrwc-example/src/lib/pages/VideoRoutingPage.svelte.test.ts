import { render, screen, within } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import VideoRoutingPage from './VideoRoutingPage.svelte'

type MockButtonControl = { state: boolean }

const sourceInputs = [1, 4, 5, 6] as const
const controlNames = [
  ...sourceInputs.map((input) => `Display 1 ${input}`),
  ...sourceInputs.map((input) => `Display 2 ${input}`),
] as const

let controls: Record<string, MockButtonControl>
const { useButtonMock, useComponentMock } = vi.hoisted(() => {
  const useButton = vi.fn<(controlName: string) => MockButtonControl>()
  const useComponent = vi.fn(() => ({ useButton }))
  return { useButtonMock: useButton, useComponentMock: useComponent }
})

function resetControls(): void {
  controls = Object.fromEntries(controlNames.map((name) => [name, { state: false }]))
  useButtonMock.mockImplementation((controlName: string) => {
    const control = controls[controlName]
    if (!control) {
      throw new Error(`Unexpected control requested: ${controlName}`)
    }
    return control
  })
}

vi.mock('../qrwc', () => ({
  qrwcSvelte: {
    useComponent: useComponentMock,
  },
}))

describe('VideoRoutingPage', () => {
  beforeEach(() => {
    useComponentMock.mockClear()
    useButtonMock.mockClear()
    resetControls()
  })

  it('renders both routing sections and wires expected QRWC controls', () => {
    render(VideoRoutingPage)

    expect(screen.getByRole('heading', { name: 'Video Routing' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Display 1' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Display 2' })).toBeInTheDocument()

    const unknownSourceText = screen.getAllByText('Unknown / No active route')
    expect(unknownSourceText).toHaveLength(2)

    expect(useComponentMock).toHaveBeenCalledWith('VideoRouter')
    expect(useButtonMock).toHaveBeenCalledTimes(controlNames.length)
    for (const controlName of controlNames) {
      expect(useButtonMock).toHaveBeenCalledWith(controlName)
    }
  })

  it('routes Display 1 independently from Display 2', async () => {
    const user = userEvent.setup()
    render(VideoRoutingPage)

    const display1Section = screen.getByRole('heading', { name: 'Display 1' }).closest('section')
    const display2Section = screen.getByRole('heading', { name: 'Display 2' }).closest('section')

    expect(display1Section).not.toBeNull()
    expect(display2Section).not.toBeNull()

    const display1 = within(display1Section!)
    const display2 = within(display2Section!)

    await user.click(display1.getByRole('button', { name: 'Laptop' }))

    expect(display1.getByText('Laptop')).toBeInTheDocument()
    expect(display2.getByText('Unknown / No active route')).toBeInTheDocument()
    expect(controls['Display 1 5'].state).toBe(true)
    expect(controls['Display 2 5'].state).toBe(false)
  })

  it('routes Display 2 independently from Display 1', async () => {
    const user = userEvent.setup()
    render(VideoRoutingPage)

    const display1Section = screen.getByRole('heading', { name: 'Display 1' }).closest('section')
    const display2Section = screen.getByRole('heading', { name: 'Display 2' }).closest('section')

    expect(display1Section).not.toBeNull()
    expect(display2Section).not.toBeNull()

    const display1 = within(display1Section!)
    const display2 = within(display2Section!)

    await user.click(display2.getByRole('button', { name: 'Apple TV' }))

    expect(display2.getByText('Apple TV')).toBeInTheDocument()
    expect(display1.getByText('Unknown / No active route')).toBeInTheDocument()
    expect(controls['Display 2 6'].state).toBe(true)
    expect(controls['Display 1 6'].state).toBe(false)
  })
})
