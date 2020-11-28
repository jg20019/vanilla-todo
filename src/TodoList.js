import Todo from './Todo.js'; 
import TodoItem from './TodoItem.js'; 
import TodoItemInput from './TodoItemInput.js'; 
import './TodoList.css'; 

export default function TodoList(el) {
    let state = {
        items: [], 
        lastKey: 0, 
    }; 

    el.innerHTML = `
        <div class="items"></div> 
        <div class="todo-item-input"></div> 
    `; 

    let itemsEl = el.querySelector('.items'); 
    TodoItemInput(el.querySelector('.todo-item-input')); 

    el.addEventListener('addItem', e => {
        let items = state.items.slice(); 
        let todo = Todo(state.lastKey, e.detail.label); 
        items.push(todo); 
        console.log(items); 
        update({items, lastKey: state.lastKey + 1});
    }); 


    update(); 

    function update(next){
        Object.assign(state, next); 
        
        itemsEl.innerHTML = ''; 
       
        state.items.forEach(todo => {
            let todoItem = TodoItem(document.createElement('div')); 
            todoItem.TodoItem.update({todo}); 
            itemsEl.appendChild(todoItem); 
        }); 
    }
}

