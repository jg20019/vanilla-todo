import ProjectHeader from './ProjectHeader'; 
import Todo from './Todo.js'; 
import TodoItem from './TodoItem.js'; 
import TodoItemInput from './TodoItemInput.js'; 
import './TodoList.css'; 


export default function TodoList(el) {
    let state = {
        name: 'New Project', 
        items: [], 
        lastKey: 0, 
        hidden: false, 
        projectKey: null, 
    }; 

    el.innerHTML = `
        <div class="header"></div> 
        <div class="todo-list-container"> 
            <div class="items"></div> 
            <div class="todo-item-input"></div> 
        </div> 
    `; 

    let projectEl = ProjectHeader(el.querySelector('.header')); 
    let itemsEl = el.querySelector('.items'); 
    TodoItemInput(el.querySelector('.todo-item-input')); 

    el.addEventListener('addItem', e => {
        let items = state.items.slice(); 
        let todo = Todo(state.lastKey, e.detail.label); 
        items.push(todo); 
        update({items, lastKey: state.lastKey + 1});
    }); 

    el.addEventListener('ChangeName', e => {
        let name = e.detail.name; 
        update({name}); 
    }); 

    el.addEventListener('ToggleListVisibility', e => {
        update({hidden: !state.hidden});  
    }); 

    el.addEventListener('DeleteTodo', e => {
        let items = state.items.filter(todo => {
            console.log(e.detail.key); 
            return (todo.key !== e.detail.key); 
        }); 

        update({items}) 
    }); 


    update(); 

    function update(next){
        Object.assign(state, next); 
      
        let visibilityButtonText = state.hidden ? 'show' : 'hide'; 
        projectEl.ProjectHeader.update({text: state.name, visibilityButtonText})

        itemsEl.innerHTML = ''; 
       
        state.items.forEach(todo => {
            let todoItem = TodoItem(document.createElement('div')); 
            todoItem.TodoItem.update({todo}); 
            itemsEl.appendChild(todoItem); 
        }); 

        if (state.hidden) {
            el.querySelector('.todo-list-container').style.display = 'none'; 
        } else {
            el.querySelector('.todo-list-container').style.display = 'block'; 
        } 
    }
    
    el.TodoList = { update }; 
    return el; 
}

