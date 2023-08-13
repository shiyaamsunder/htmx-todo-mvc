const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const pug = require('pug')

app.set('view engine', 'pug')
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.static('static'))

const TodoController = require('./controllers/TodoController')
const Todos = new TodoController()

app.get('/', (_, res) => {
  res.render('index', { title: 'Learning htmx', message: 'Hey there!' })
})
app.get('/test', (_, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' })
  res.write('<h2> the route is working </h2>')
  res.end()
})

app.get('/todos', (_, res) => {
  const todos = Todos.todos
  const compiled = pug.compileFile('./views/items.pug')
  let html = compiled({ todos: todos })
  res.send(html)
})

app.patch('/toggle/:id', (req, res) => {
  let id = req.params.id
  Todos.toggle(Number(id))
  const todo = Todos.todos.filter((t) => t.id == id)[0]
  const compiled = pug.compileFile('./views/item.pug')
  let html = compiled({ item: { ...todo } })
  res.send(html)
})

app.delete('/delete/:id', (req, res) => {
  console.log(req.params.id)
  Todos.delete(req.params.id)
  res.send('')
})

app.post('/add', (req, res) => {
  let todo = { id: Todos.todos.length + 1, text: req.body.text, done: false }
  Todos.add(todo)
  const todos = Todos.todos
  const compiled = pug.compileFile('./views/items.pug')
  let html = compiled({ todos: todos })
  res.send(html)
})

app.get('/alltodos', (_, res) => {
  const todos = Todos.getAllTodos()
  const compiled = pug.compileFile('./views/items.pug')
  let html = compiled({ todos: todos })
  res.send(html)
})

app.get('/activetodos', (_, res) => {
  const todos = Todos.getActiveTodos()
  const compiled = pug.compileFile('./views/items.pug')
  let html = compiled({ todos: todos })
  res.send(html)
})

app.get('/completedtodos', (_, res) => {
  const todos = Todos.getCompletedTodos()
  const compiled = pug.compileFile('./views/items.pug')
  let html = compiled({ todos: todos })
  res.send(html)
})
app.listen(8080, (err) => {
  if (err) console.log(err)
  console.log('Server running at http://localhost:8080')
})
