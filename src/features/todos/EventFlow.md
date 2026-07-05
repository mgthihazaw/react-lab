** Event Flow

`TodoForm
↓
calls onAddTodo(title)
↓
App.handleAddTodo(title)
↓
setTodos(...)
↓
React re-renders
↓
TodoList receives updated todos
`
-----------
`
TodoItem
↓
calls onToggleTodo(todo.id)
↓
App.handleToggleTodo(id)
↓
setTodos(...)
↓
React re-renders
↓
TodoItem receives updated completed value
`
-------

`
FilterTabs
↓
calls onFilterChange("active")
↓
App.setFilter("active")
↓
React re-renders
↓
visibleTodos recalculates
↓
TodoList receives filtered todos
`

---------


