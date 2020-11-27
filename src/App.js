import TodoList from './TodoList.js'; 

export default function App(el) {
    el.innerHTML = `
        <h1> Todo </h1> 
        <div class="todo-list"></div> 
    `; 

    TodoList(el.querySelector('.todo-list')); 
} 
