import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { App } from '../App'

const getInput = () => screen.getByPlaceholderText('Enter new TODO item')
const getAddButton = () => screen.getByRole('button', { name: 'Add item' })
const getList = () => screen.getByRole('list')
const getListItem = (itemName: string) => screen.getByTestId(`list-item-for ${itemName}`)
const getListItems = () => within(getList()).getAllByRole('listitem')
const getCheckbox = (itemName: string) => within(getList()).getByRole('checkbox', { name: itemName })
const getDeleteButton = (itemName: string) => within(getListItem(itemName)).getByRole('button', { name: 'Delete' })
const getSegmentedControl = () => screen.getByRole('radiogroup', { name: 'segmented control' })

describe('testing "App" component', () => {
    const user = userEvent.setup()

    it('adding items should work correctly', async () => {
        render(<App />)
        const input = getInput()
        const addButton = getAddButton()

        // 1 добавление пустого
        await user.click(addButton)

        expect(screen.queryByRole('list')).not.toBeInTheDocument()

        // 2 просто добавление
        await user.type(input, 'Some item')
        await user.click(addButton)
        const items = getListItems()

        expect(items.length).toBe(1)
        expect(items[0]).toHaveTextContent('Some item')

        // 3 добавление существующего
        await user.type(input, 'Some item{Enter}')

        expect(getListItems().length).toBe(1)

        //4 добавление существующего отмеченного
        const checkboxItem = getCheckbox('Some item')
        await user.click(checkboxItem)
        await user.type(input, 'Some item{Enter}')

        expect(getListItems().length).toBe(1)
    })

    it('the filter should work correctly', async () => {
        render(<App />)
        const input = getInput()

        await user.type(input, 'Some item 1{Enter}')
        await user.type(input, 'Some item 2{Enter}')
        await user.click(getCheckbox('Some item 1'))

        // 1 проверка вкладки All
        expect(getListItems().length).toBe(2)

        // 2 переключение на вкладку TODO
        const TODOItemsFilter = within(getSegmentedControl()).getByText('TODO')
        await user.click(TODOItemsFilter)

        expect(getList()).not.toHaveTextContent('Some item 1')
        expect(getList()).toHaveTextContent('Some item 2')

        // 3 переключение на вкладку Completed
        const CompletedItemsFilter = within(getSegmentedControl()).getByText('Completed')
        await user.click(CompletedItemsFilter)

        expect(getList()).toHaveTextContent('Some item 1')
        expect(getList()).not.toHaveTextContent('Some item 2')

        // 4 отжатие чекбокса у отмеченного айтема на вкладке Complated
        await user.click(getCheckbox('Some item 1'))
        expect(screen.queryByText('Some item 1')).not.toBeInTheDocument()
    })

    it('deleting items should work correctly', async () => {
        render(<App />)
        const input = getInput()

        await user.type(input, 'Some item 1{Enter}')
        await user.type(input, 'Some item 2{Enter}')
        const checkboxItem1 = getCheckbox('Some item 1')
        await user.click(checkboxItem1)

        // 1 удаление отмеченного айтема
        const deleteButton1 = getDeleteButton('Some item 1')
        await user.click(deleteButton1)

        expect(screen.queryByText('Some item 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Some item 2')).toBeInTheDocument()

        // 2 удаление не отмеченного айтема
        const deleteButton2 = getDeleteButton('Some item 2')
        await user.click(deleteButton2)

        expect(screen.queryByText('Some item 2')).not.toBeInTheDocument()
    })
})