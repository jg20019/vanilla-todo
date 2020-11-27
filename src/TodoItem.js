export default function TodoItem(el) {
    let state = { todo: null }; 

    el.innerHTML = `
        <input type="checkbox"> 
        <span class="todo-item"></span> 
    `; 

    let checkboxEl = el.querySelector('input'); 
    let todoEl = el.querySelector('.todo-item'); 
  
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
