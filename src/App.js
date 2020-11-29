import TodoList from './TodoList.js'; 

export default function App(el) {
    let state = {
        projects: [], 
        lastProjectKey: 0, 
    } 

    el.innerHTML = `
        <header class="projects-header"> 
            <h1> Todo </h1>
            <button class="add-project-button"> Add Project </button> 
        </header> 
        <div class="projects"></div> 
    `; 

    let projectsEl = el.querySelector('.projects'); 
    let addProjectButton = el.querySelector('.add-project-button'); 
    addProjectButton.addEventListener('click', addProject);  

    addProject(); 

    function addProject() {
        let todoList = TodoList(document.createElement('div')); 
        todoList.classList.add('todo-list'); 
        todoList.TodoList.update({projectKey: state.lastProjectKey}); 

        let projects = state.projects.slice();
        projects.push(todoList);  

        update({projects, lastProjectKey: state.lastProjectKey + 1}); 
    }

    function update(next) {
        Object.assign(state, next); 

        projectsEl.innerHTML = ''; 

        state.projects.forEach(el => {
            projectsEl.appendChild(el); 
        }); 
    } 
} 
