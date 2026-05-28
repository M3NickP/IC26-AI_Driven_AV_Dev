export type MockButtonControl = {
  state: boolean
  toggle: () => void
}

export type MockKnobControl = {
  value: number
  valueMin: number
  valueMax: number
  string: string
}

export function createMockButton(initialState = false): MockButtonControl {
  let state = $state(initialState)

  const toggle = () => {
    state = !state
  }

  return {
    get state() {
      return state
    },
    set state(value: boolean) {
      state = value
    },
    toggle,
  }
}

export function createMockKnob(string: string, value: number): MockKnobControl {
  let knobString = $state(string)
  let knobValue = $state(value)

  return {
    get value() {
      return knobValue
    },
    set value(nextValue: number) {
      knobValue = nextValue
    },
    get string() {
      return knobString
    },
    set string(nextString: string) {
      knobString = nextString
    },
    valueMin: -100,
    valueMax: 20,
  }
}
