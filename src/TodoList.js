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
        let todo = Todo(state.lastKey, e.detail.label); 
        let projectKey = state.projectKey; 
        console.log(state); 
        let lastKey = state.lastKey; 
        el.dispatchEvent(
            new CustomEvent('AddItemToProject', {
                bubbles: true, 
                detail: {todo, lastKey, projectKey}, 
            })
        ); 
    }); 

    el.addEventListener('ChangeName', e => {
        let name = e.detail.name; 
        update({name}); 
    }); 

    el.addEventListener('ToggleListVisibility', e => {
        update({hidden: !state.hidden});  
    }); 

    el.addEventListener('DeleteTodo', e => {
        let projectKey = state.projectKey;  
        el.dispatchEvent(
            new CustomEvent('DeleteTodoFromProject', {
                bubbles: true, 
                detail: {projectKey, todoKey: e.detail.key}  
            })
        ); 
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


    el.TodoList = { update, state: () => state }; 
    return el; 
}

