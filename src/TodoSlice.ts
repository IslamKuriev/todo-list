import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

// Определяем интерфейс для состояния
interface State {
    todos: Todo[];
    filter: string
}


const initialState: State = {
    todos: JSON.parse(localStorage.getItem("todos") || '[]'),
    filter: "all"
}

const saveData = (data: Todo[]) => {
    localStorage.setItem("todos", JSON.stringify(data))
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        addTodo: (state, action: PayloadAction<Todo>) => {
           state.todos.push(action.payload)
           saveData(state.todos)
        },
        completedTodo: (state, action: PayloadAction<number>) => {
         state.todos = state.todos.map((item) => {
            if(item.id === action.payload) {
                return {...item, completed: !item.completed}
            }
            return item
         })
         saveData(state.todos)
        },
        removeTodo: (state, action:  PayloadAction<number>) => {
            state.todos = state.todos.filter((item) => {
                return item.id !== action.payload
            })
            saveData(state.todos)
        },
        filterTodo: (state, action: PayloadAction<string>) => {
            state.filter = action.payload
            saveData(state.todos)
        },
        editTodo: (state, action:PayloadAction<{id: number, text: string}>) => {
          const { id, text } = action.payload
          const existingTodo = state.todos.find((todo) => todo.id === id)
          if(existingTodo) {
            existingTodo.text = text
          }
          saveData(state.todos)
        }
    }
})

export const { addTodo, completedTodo, removeTodo, filterTodo, editTodo } = todoSlice.actions
export const TodoSlice = todoSlice.reducer