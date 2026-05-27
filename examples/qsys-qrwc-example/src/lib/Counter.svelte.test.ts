import { render, screen } from '@testing-library/svelte'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'
import Counter from './Counter.svelte'

test('Counter increments on click', async () => {
  const user = userEvent.setup()
  render(Counter)

  const button = screen.getByRole('button', { name: /count is 0/i })
  expect(button).toBeInTheDocument()

  await user.click(button)
  expect(screen.getByRole('button', { name: /count is 1/i })).toBeInTheDocument()
})
