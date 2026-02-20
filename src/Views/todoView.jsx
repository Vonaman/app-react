import UseTodoViewModel from "../ViewModels/useTodoViewModel"

function Todo() {
    // const [inputValues, setInputValues] = useState("")
    // const [todos, setTodos] = useState([])

    // const toggleMode = () => {
    //     if(inputValues === ""){
    //         return 
    //     }
    //     let newTodo = {
    //         id: Date.now(),
    //         text: inputValues,
    //         isDone: false
    //     }

    //     setTodos([...todos, newTodo])
    //     setInputValues("")
    // }

    // const handleCheck = (id) => {
    //     const updatedTodos = todos.map((todo) => {
    //         if (todo.id === id) {
    //             return { ...todo, isDone: !todo.isDone }
    //         }
    //         return todo
    //     })
    //     setTodos(updatedTodos)
    // }

    const {
        inputValues,
        setInputValues,
        todos,
        toggleMode,
        handleCheck
    } = UseTodoViewModel()
    
    return (
        <div>
            <h1>Todo</h1>

            <div className="mt-2">
                <input
                id="todo"
                name="todo"
                type="text"
                required
                value={inputValues}    
                onChange={(e) => setInputValues(e.target.value)}
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                />
            </div>
            <button
                type="button"
                onClick={() => toggleMode()}
                className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
                Ajouter
            </button>

            <div className="list mt-8 w-40 h-auto border-2 border-gray-300 rounded-md p-4 mx-auto">
                {todos.length === 0 && <p className="text-gray-500">Aucune tâche à afficher</p>}
                
                {todos.length > 0 && todos.map((todo) => (
                    <div key={todo.id} className="item mt-2 first:mt-0">
                        <p className={todo.isDone ? "line-through" : ""}>{todo.text}</p>
                        <input type="checkbox" name="check" id={`check-${todo.id}`} onClick={() => handleCheck(todo.id)}/>
                    </div>
                ))}
            </div>
        </div>
        
    )
}

export default Todo ;