import { addItemToState } from '../addItemToState'

const testItem = 'Test item'
const prevStateValue = new Set(['Existing item'])

it('in the updated state a new element appears', () => {
    const mockedSetState = jest.fn()

    addItemToState(testItem, mockedSetState)
    const callbackToUpdateState = mockedSetState.mock.calls[0][0] as <T extends Set<string>>(prevValue: T) => T
    const updatedState = callbackToUpdateState(prevStateValue)

    expect(updatedState).toContain(testItem)
})
