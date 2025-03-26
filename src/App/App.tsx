import { useState } from 'react'
import { Checkbox, CheckboxChangeEvent, List, message, Typography } from 'antd'
import { AddingInput } from './components'
import styles from './app.module.css'

const { Title } = Typography


export const App = () => {
    const [todoItems, setTodoItems] = useState<Set<string>>(new Set())
    const [completedTodoItems, setCompletedTodoItems] = useState<Set<string>>(new Set())
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

    const handleAddTodoItem = (value: string) => {
        if (todoItems.has(value)) {
            messageApi.warning('Such todo item already exists in the list')
            return
        }

        if (completedTodoItems.has(value)) {
            messageApi.warning('This todo item already exists in the completed')
            return
        }

        setTodoItems((prevValue) => new Set([...prevValue, value]))
    }

    return (
        <div className={styles.todosWrapper}>
            <Title>TODOS</Title>


            <List
                header={<AddingInput onAddItem={handleAddTodoItem} />}
                footer='Тут будет фильтрация'
                bordered
                dataSource={[...todoItems, ...completedTodoItems]}
                renderItem={(item) =>
                    <List.Item key={item}>
                        <Checkbox checked={completedTodoItems.has(item)} onChange={handleCheckItem(item)}>
                            {item}
                        </Checkbox>
                    </List.Item>
                }
                locale={{ emptyText: 'No todo items' }}
            />

            {contextHolder}
        </div>
    )
}
