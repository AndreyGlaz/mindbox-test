import { render } from '@testing-library/react'
import { AddingInput } from '../AddingInput'

it('component "AddingInput" should be rendered', () => {
    render(<AddingInput onAddItem={jest.fn()} />)
})
