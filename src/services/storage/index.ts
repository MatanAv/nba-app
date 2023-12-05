// // import { v4 as uuidv4 } from 'uuid';
// import ITodo from '@interfaces/models/todo';

// class TodoStorage {
//   static instance: TodoStorage;

//   init(todos: ITodo[]) {
//     if (!localStorage.getItem(`todos`)) {
//       localStorage.setItem(`todos`, JSON.stringify(todos));
//     }
//   }

//   getAll(): ITodo[] {
//     const todos = localStorage.getItem(`todos`);

//     if (!todos) throw new Error(`No todos found`);

//     return JSON.parse(todos);
//   }

//   getOne(id: string): ITodo {
//     const todo = this.getAll().find((todo: ITodo) => todo.id === id);

//     if (!todo) throw new Error(`No todo found with id ${id}`);

//     return todo;
//   }

//   createOne(title: string): ITodo[] {
//     const todos = this.getAll();
//     const todo: ITodo = { id: uuidv4(), title, completed: false };

//     todos.push(todo);

//     localStorage.setItem('todos', JSON.stringify(todos));

//     return todos;
//   }

//   updateOne(newTodo: ITodo): ITodo[] {
//     const todos = this.getAll();
//     const newTodos = todos.map((todo: ITodo) => (todo.id === newTodo.id ? newTodo : todo));

//     localStorage.setItem('todos', JSON.stringify(newTodos));

//     return newTodos;
//   }

//   deleteOne(id: string): ITodo[] {
//     const todos = this.getAll();
//     const newTodos = todos.filter((todo: ITodo) => todo.id !== id);

//     localStorage.setItem('todos', JSON.stringify(newTodos));

//     return newTodos;
//   }

//   public static getInstance() {
//     if (!TodoStorage.instance) {
//       TodoStorage.instance = new TodoStorage();
//     }

//     return TodoStorage.instance;
//   }
// }

// export default TodoStorage.getInstance();
