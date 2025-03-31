export function deleteItemFromState(deletedItem: string, setState: React.Dispatch<React.SetStateAction<Set<string>>>) {
    setState((prevValue) => new Set([...prevValue].filter(item => item !== deletedItem)))
}