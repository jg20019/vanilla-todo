import TodoItemInput from './TodoItemInput.js'; 

export default function TodoList(el) {
    let state = {
        items: [], 
    }; 

    el.innerHTML = `
        <div class="items"></div> 
        <div class="todo-item-input"></div> 
    `; 

    let itemsEl = el.querySelector('.items'); 
    TodoItemInput(el.querySelector('.todo-item-input')); 

    el.addEventListener('addItem', e => {
        let items = state.items.slice(); 
        items.push(e.detail.label); 
        update({items});
    }); 

    update(); 

    function update(next){
        Object.assign(state, next); 
        
        itemsEl.innerHTML = ''; 
       
        state.items.forEach(item => {
            let todoItem = document.createElement('div'); 
            todoItem.innerText = item; 
            itemsEl.appendChild(todoItem); 
        }); 
    }
}

