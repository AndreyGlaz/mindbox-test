import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { AddingInput } from '../AddingInput'

describe('testing "AddingInput" component', () => {
    const user = userEvent.setup()
    const mockedAddItem = jest.fn()

    afterEach(() => {
        mockedAddItem.mockClear()
    })

    it('adding a new empty element', async () => {
        render(<AddingInput onAddItem={mockedAddItem} />)
        const button = screen.getByRole('button', { name: 'Add item' })

        await user.click(button)

        expect(mockedAddItem).toHaveBeenCalledWith('')
    })

    it('adding a new element by pressing a button', async () => {
        render(<AddingInput onAddItem={mockedAddItem} />)
        const input = screen.getByPlaceholderText('Enter new TODO item')
        const button = screen.getByRole('button', { name: 'Add item' })

        await user.type(input, 'Test item')
        await user.click(button)

        expect(mockedAddItem).toHaveBeenCalledWith('Test item')
    })

    it('adding a new element by pressing enter', async () => {
        render(<AddingInput onAddItem={mockedAddItem} />)
        const input = screen.getByPlaceholderText('Enter new TODO item')

        await user.type(input, 'Test item{Enter}')

        expect(mockedAddItem).toHaveBeenCalledWith('Test item')
    })
})
