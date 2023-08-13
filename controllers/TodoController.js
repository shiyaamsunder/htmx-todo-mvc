module.exports = class TodoController {
  constructor() {
    this.todos = [
      { id: 1, text: 'Learn HTMX', done: false },
      { id: 2, text: 'Take out the garbage', done: true },
      { id: 3, text: 'Solve problems', done: false },
      { id: 4, text: 'Make Friends', done: false },
    ]
  }

  toggle(id) {
    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    )
  }

  delete(id) {
    this.todos = this.todos.filter((todo) => todo.id != id)
    console.log(id)
  }

  add(todo) {
    this.todos.push(todo)
  }

  getActiveTodos() {
    return this.todos.filter((todo) => todo.done === false)
  }

  getAllTodos() {
    return this.todos
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.done === true)
  }
}
