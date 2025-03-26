import { useRef, useState } from 'react'
import { Button, Input, InputRef } from 'antd'
import styles from './addingInput.module.css'

interface AddingInputProps {
    onAddItem: (val: string) => void
}

export const AddingInput = ({ onAddItem }: AddingInputProps) => {
    const [inputValReset, setInputValReset] = useState<'' | undefined>(undefined)
    const inputRef = useRef<InputRef>(null)

    const resetInputVal = () => {
        setInputValReset('')
        window.queueMicrotask(() => setInputValReset(undefined))
    }

    const addNewItem = (value: string) => {
        onAddItem(value)
        resetInputVal()
    }

    const handleAddClick = () => {
        const currValue = inputRef.current?.input?.value || ''
        addNewItem(currValue)
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
        addNewItem(e.currentTarget.value)
    }

    return <div className={styles.addingInputRoot}>
        <Input
            allowClear
            ref={inputRef}
            itemRef=''
            placeholder='Enter new TODO item'
            value={inputValReset}
            onPressEnter={handlePressEnter}
        />
        <Button type="primary" onClick={handleAddClick}>Add item</Button>
    </div >
}