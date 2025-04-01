import { deleteItemFromState } from '../deleteItemFromState'

const testItem = 'Test item'
const prevStateValue = new Set(['Existing item', testItem])

it('in the updated state the element is deleted', () => {
    const mockedSetState = jest.fn()

    deleteItemFromState(testItem, mockedSetState)
    const callbackToUpdateState = mockedSetState.mock.calls[0][0] as <T extends Set<string>>(prevValue: T) => T
    const updatedState = callbackToUpdateState(prevStateValue)

    expect(updatedState).not.toContain(testItem)
})
