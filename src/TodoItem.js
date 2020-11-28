import './TodoItem.css'; 

export default function TodoItem(el) {
    let state = { todo: null }; 

    el.innerHTML = `
        <input type="checkbox"> 
        <span class="todo-content"></span> 
        <button class="delete-button"> delete </button> 
    `; 

    el.classList.add('todo-item'); 

    let checkboxEl = el.querySelector('input'); 
    let todoEl = el.querySelector('.todo-content'); 
  
    checkboxEl.addEventListener('click', () => {
        if (state.todo) {
            el.dispatchEvent(
                new CustomEvent('ToggleTodo', {
                    bubbles: true, 
                    detail: state.todo.key
                })
            ); 
        }
    }); 

    function update(next) {
        Object.assign(state, next); 

        let todo = state.todo; 
        console.log(todo); 
        if (todo) {
            checkboxEl.checked = todo.done; 
            todoEl.innerText = todo.desc; 
            el.dataset.key = todo.key; 
        } 
    } 

    el.TodoItem = {update}; 
    return el; 
} 
