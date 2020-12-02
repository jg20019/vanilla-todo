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

    if (isSavedData()) {
        load(); 
    } else {
        addProject(); 
    } 

    el.addEventListener('AddItemToProject', e => {
        updateProjectWithKey(e.detail.projectKey, project => {
            project.items.push(e.detail.todo); 
            project.lastKey = project.lastKey + 1; 
            return project; 
        }); 
    }); 

    el.addEventListener('ChangeProjectName', e => {
        updateProjectWithKey(e.detail.projectKey, project => {
            project.name = e.detail.name; 
            return project; 
        }); 
    }); 

    el.addEventListener('DeleteTodoFromProject', e => {
        updateProjectWithKey(e.detail.projectKey, project => {
            project.items = project.items.filter(todo => {
                return todo.key !== e.detail.todoKey; 
            }); 
            return project; 
        });  
    }); 

    el.addEventListener('ToggleProjectTodo', e => {
        console.log('Toggling todo'); 
        console.log(e.detail.todoKey); 
        updateProjectWithKey(e.detail.projectKey, project => {
            project.items = project.items.map(todo => {
                if (todo.key === e.detail.todoKey) {
                    todo.done = !todo.done; 
                } 
                return todo; 
            }); 
            return project; 
        }); 
    }); 
    el.addEventListener('ToggleProjectVisibility', e => {
        updateProjectWithKey(e.detail.projectKey, project => {
            project.hidden = !project.hidden; 
            return project;  
        }); 
    }); 

    function addProject() {
        let project = {
            name: 'New', 
            items: [], 
            lastKey: 0,
            hidden: false, 
            projectKey: state.lastProjectKey, 
        }; 
        let projects = state.projects.slice();
        projects.push(project);  

        update({projects, lastProjectKey: state.lastProjectKey + 1}); 
    }

    function update(next) {
        Object.assign(state, next); 

        projectsEl.innerHTML = ''; 

        state.projects.forEach(project => {
            let todoList = TodoList(document.createElement('div')); 
            todoList.classList.add('todo-list'); 
            todoList.TodoList.update(project); 
            projectsEl.appendChild(todoList); 
        }); 

        // Everytime the app state updates it saves 
        save(); 
    } 

    function updateProjectWithKey(projectKey, fn) {
        let projects = state.projects.map(project => {
           let newProject = Object.assign({}, project);  
           if (project.projectKey === projectKey) {
               return fn(newProject); 
           } else {
               return newProject; 
           } 
        }); 

        update({projects}) 
    } 

    function load() {
        let loadedState = JSON.parse(localStorage.getItem('todo-state')); 
        update(loadedState); 
    } 

    function save() {
        localStorage.setItem('todo-state', JSON.stringify(state)); 
    } 

    function isSavedData() {
        return Boolean(localStorage.getItem('todo-state')); 
    } 

} 
