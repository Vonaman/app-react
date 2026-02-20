import { useState, useEffect } from "react"

function useTodoViewModel() {
const [inputValues, setInputValues] = useState("")
    const [todos, setTodos] = useState([])

    const toggleMode = () => {
        if(inputValues === ""){
            return 
        }
        let newTodo = {
            id: Date.now(),
            text: inputValues,
            isDone: false
        }

        setTodos([...todos, newTodo])
        setInputValues("")
    }

    const handleCheck = (id) => {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return { ...todo, isDone: !todo.isDone }
            }
            return todo
        })
        setTodos(updatedTodos)
    }

    return {
        inputValues,
        setInputValues,
        todos, 
        toggleMode,
        handleCheck
    }
}

export default useTodoViewModel
