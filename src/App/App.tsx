import { useState } from 'react'
import { Button, Checkbox, CheckboxChangeEvent, List, message, Segmented, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons';
import { AddingInput } from './components'
import { FilterValue } from './types'
import styles from './app.module.css'

const { Title } = Typography

const filterOptions: FilterValue[] = ['All', 'TODO', 'Completed']

export const App = () => {
    const [todoItems, setTodoItems] = useState<Set<string>>(new Set())
    const [completedTodoItems, setCompletedTodoItems] = useState<Set<string>>(new Set())
    const [filterValue, setFilterValue] = useState<FilterValue>('All')
    const [messageApi, contextHolder] = message.useMessage();

    const handleCheckItem = (itemText: string) => (e: CheckboxChangeEvent) => {
        if (e.target.checked) {
            setTodoItems((prevValue) => new Set([...prevValue].filter(item => item !== itemText)))
            setCompletedTodoItems((prevValue) => new Set([...prevValue, itemText]))
        } else {
            setTodoItems((prevValue) => new Set([...prevValue, itemText]))
            setCompletedTodoItems((prevValue) => new Set([...prevValue].filter(item => item !== itemText)))
        }
    }

    const handleAddItem = (itemText: string) => {
        if (todoItems.has(itemText)) {
            messageApi.warning('Such todo item already exists in the list')
            return
        }

        if (completedTodoItems.has(itemText)) {
            messageApi.warning('This todo item already exists in the completed')
            return
        }

        setTodoItems((prevValue) => new Set([...prevValue, itemText]))
    }

    const handleDeleteItem = (itemText: string) => () => {
        if (todoItems.has(itemText)) {
            setTodoItems((prevValue) => new Set([...prevValue].filter(item => item !== itemText)))
        }

        if (completedTodoItems.has(itemText)) {
            setCompletedTodoItems((prevValue) => new Set([...prevValue].filter(item => item !== itemText)))
        }
    }

    const handleChangeFilter = (value: FilterValue) => {
        setFilterValue(value)
    }

    const getListItems = () => {
        switch (filterValue) {
            case 'All':
                return [...todoItems, ...completedTodoItems]
            case 'TODO':
                return [...todoItems]
            case 'Completed':
                return [...completedTodoItems]
            default:
                return []
        }
    }

    const renderListItem = (item: string) =>
        <List.Item key={item} extra={<Button size='small' type='text' icon={<DeleteOutlined />} onClick={handleDeleteItem(item)} />}>
            <Checkbox checked={completedTodoItems.has(item)} onChange={handleCheckItem(item)}>
                {item}
            </Checkbox>
        </List.Item>

    return (
        <div className={styles.todosWrapper}>
            <Title>TODOS</Title>

            <List
                bordered
                header={<AddingInput onAddItem={handleAddItem} />}
                footer={<Segmented<FilterValue> options={filterOptions} value={filterValue} onChange={handleChangeFilter} />}
                dataSource={getListItems()}
                renderItem={renderListItem}
                locale={{ emptyText: 'No items' }}
            />

            {contextHolder}
        </div>
    )
}
