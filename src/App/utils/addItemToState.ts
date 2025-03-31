export function addItemToState(newItem: string, setState: React.Dispatch<React.SetStateAction<Set<string>>>) {
    setState((prevValue) => new Set([...prevValue, newItem]))
}
