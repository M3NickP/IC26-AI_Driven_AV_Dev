import { render, screen, within } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  createMockButton,
  createMockKnob,
  type MockButtonControl,
  type MockKnobControl,
} from '../test/mock-qrwc-controls.svelte'
import AudioPage from './AudioPage.svelte'

const sourceInputs = [1, 2, 3, 4] as const
const pgmSourceControlNames = sourceInputs.map(
  (input) => `output.1.input.${input}.select`,
) as readonly string[]

const componentNames = ['PGMSel', 'PGMGain', 'MicGain', 'Ducker'] as const
type ComponentName = (typeof componentNames)[number]

let buttons: Record<ComponentName, Record<string, MockButtonControl>>
let knobs: Record<'PGMGain' | 'MicGain', Record<string, MockKnobControl>>

const { useButtonMock, useKnobMock, useComponentMock } = vi.hoisted(() => {
  const useButton = vi.fn<(controlName: string) => MockButtonControl>()
  const useKnob = vi.fn<(controlName: string) => MockKnobControl>()
  const useComponent = vi.fn()
  return { useButtonMock: useButton, useKnobMock: useKnob, useComponentMock: useComponent }
})

function resetMocks(): void {
  buttons = {
    PGMSel: Object.fromEntries(
      pgmSourceControlNames.map((name) => [name, createMockButton()]),
    ) as Record<string, MockButtonControl>,
    PGMGain: { mute: createMockButton() },
    MicGain: { mute: createMockButton() },
    Ducker: { active: createMockButton() },
  }
  knobs = {
    PGMGain: { gain: createMockKnob('-6.0 dB', -6) },
    MicGain: { gain: createMockKnob('-24.0 dB', -24) },
  }

  useComponentMock.mockImplementation((componentName: string) => {
    const name = componentName as ComponentName
    if (!componentNames.includes(name)) {
      throw new Error(`Unexpected component: ${componentName}`)
    }

    return {
      useButton: (controlName: string) => {
        useButtonMock(controlName)
        const control = buttons[name][controlName]
        if (!control) {
          throw new Error(`Unexpected control ${controlName} on ${componentName}`)
        }
        return control
      },
      useKnob: (controlName: string) => {
        useKnobMock(controlName)
        const gainKnobs = knobs[name as 'PGMGain' | 'MicGain']
        const control = gainKnobs?.[controlName]
        if (!control) {
          throw new Error(`Unexpected knob ${controlName} on ${componentName}`)
        }
        return control
      },
    }
  })
}

vi.mock('../qrwc', () => ({
  qrwcSvelte: {
    useComponent: useComponentMock,
  },
}))

describe('AudioPage', () => {
  beforeEach(() => {
    useComponentMock.mockClear()
    useButtonMock.mockClear()
    useKnobMock.mockClear()
    resetMocks()
  })

  it('renders audio sections and wires expected QRWC components', () => {
    render(AudioPage)

    expect(screen.getByRole('heading', { name: 'Audio' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Program Source' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'PGM' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Microphone' })).toBeInTheDocument()

    expect(screen.getByRole('button', { name: 'Left Display Audio' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Right Display Audio' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sonos' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Pink Noise' })).toBeInTheDocument()

    expect(screen.getByRole('slider', { name: 'PGM level' })).toBeInTheDocument()
    expect(screen.getByRole('slider', { name: 'Microphone level' })).toBeInTheDocument()

    for (const componentName of componentNames) {
      expect(useComponentMock).toHaveBeenCalledWith(componentName)
    }

    for (const controlName of pgmSourceControlNames) {
      expect(useButtonMock).toHaveBeenCalledWith(controlName)
    }
    expect(useButtonMock).toHaveBeenCalledWith('mute')
    expect(useButtonMock).toHaveBeenCalledWith('active')
    expect(useButtonMock.mock.calls.filter(([name]) => name === 'mute')).toHaveLength(2)
    expect(useButtonMock).toHaveBeenCalledTimes(7)
    expect(useKnobMock).toHaveBeenCalledWith('gain')
    expect(useKnobMock).toHaveBeenCalledTimes(2)
  })

  it('shows default source and level labels', () => {
    render(AudioPage)

    expect(screen.getByText('Unknown / No active source')).toBeInTheDocument()
    expect(screen.getByText('-6.0 dB')).toBeInTheDocument()
    expect(screen.getByText('-24.0 dB')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mute PGM' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Mute Mic' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).not.toBeInTheDocument()
  })

  it('selects a program source and updates the current source label', async () => {
    const user = userEvent.setup()
    render(AudioPage)

    const programSourceSection = screen
      .getByRole('heading', { name: 'Program Source' })
      .closest('section')
    expect(programSourceSection).not.toBeNull()

    const programSource = within(programSourceSection!)
    await user.click(programSource.getByRole('button', { name: 'Sonos' }))

    expect(programSource.getByText('Current source:').closest('p')).toHaveTextContent('Sonos')
    expect(screen.queryByText('Unknown / No active source')).not.toBeInTheDocument()
    expect(buttons.PGMSel['output.1.input.3.select'].state).toBe(true)
    expect(buttons.PGMSel['output.1.input.1.select'].state).toBe(false)
  })

  it('shows the ducker warning when the microphone ducking is active', () => {
    buttons.Ducker.active.state = true
    render(AudioPage)

    const alert = screen.getByRole('alert')
    expect(within(alert).getByRole('heading', { name: 'Microphone is in use' })).toBeInTheDocument()
    expect(
      within(alert).getByText('The ducker is active — program audio is being attenuated.'),
    ).toBeInTheDocument()
  })

  it('toggles PGM mute independently from microphone mute', async () => {
    const user = userEvent.setup()
    render(AudioPage)

    const pgmSection = screen.getByRole('heading', { name: 'PGM' }).closest('section')
    const micSection = screen.getByRole('heading', { name: 'Microphone' }).closest('section')
    expect(pgmSection).not.toBeNull()
    expect(micSection).not.toBeNull()

    const pgm = within(pgmSection!)
    const mic = within(micSection!)

    await user.click(pgm.getByRole('button', { name: 'Mute PGM' }))

    expect(pgm.getByRole('button', { name: 'Unmute PGM' })).toBeInTheDocument()
    expect(mic.getByRole('button', { name: 'Mute Mic' })).toBeInTheDocument()
    expect(buttons.PGMGain.mute.state).toBe(true)
    expect(buttons.MicGain.mute.state).toBe(false)
  })

  it('toggles microphone mute independently from PGM mute', async () => {
    const user = userEvent.setup()
    render(AudioPage)

    const pgmSection = screen.getByRole('heading', { name: 'PGM' }).closest('section')
    const micSection = screen.getByRole('heading', { name: 'Microphone' }).closest('section')
    expect(pgmSection).not.toBeNull()
    expect(micSection).not.toBeNull()

    const pgm = within(pgmSection!)
    const mic = within(micSection!)

    await user.click(mic.getByRole('button', { name: 'Mute Mic' }))

    expect(mic.getByRole('button', { name: 'Unmute Mic' })).toBeInTheDocument()
    expect(pgm.getByRole('button', { name: 'Mute PGM' })).toBeInTheDocument()
    expect(buttons.MicGain.mute.state).toBe(true)
    expect(buttons.PGMGain.mute.state).toBe(false)
  })
})
