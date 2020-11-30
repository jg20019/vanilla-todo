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

    el.addEventListener('AddItemToProject', e => {
        let projects = state.projects.map(project => {
           if (project.projectKey === e.detail.projectKey) {
               let newProject = Object.assign({}, project); 
               newProject.items.push(e.detail.todo); 
               newProject.lastKey = project.lastKey + 1; 
               return newProject; 
           } else {
               return Object.create(project); 
           } 
        }); 

        update({projects}); 
    }); 

    el.addEventListener('DeleteTodoFromProject', e => {
        let projects = state.projects.map(project => {
           if (project.projectKey === e.detail.projectKey) {
               let newProject = Object.assign({}, project); 
               newProject.items = newProject.items.filter(todo => {
                    return (todo.key !== e.detail.todoKey); 
               }); 
               return newProject; 
           } else {
               return Object.assign({}, project); 
           } 
        }); 

        update({projects}) 
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

        console.log('In update'); 
        console.log(state.projects); 
        state.projects.forEach(project => {
            let todoList = TodoList(document.createElement('div')); 
            todoList.classList.add('todo-list'); 
            todoList.TodoList.update(project); 
            projectsEl.appendChild(todoList); 
        }); 
    } 

    function save() {
        console.log(state.lastProjectKey); 
        localStorage.setItem('lastProjectKey', state.lastProjectKey);  
        let projects = []; 
        state.projects.forEach(el => {
            projects.push(el.TodoList.state()); 
        }); 
        localStorage.setItem('projects', JSON.stringify(projects)); 
    } 

    function load() {
        let projectData = localStorage.getItem('projects', JSON.parse(projects)); 
        let projects = [];


        update({
            lastProjectKey: parseInt(localStorage.getItem('lastProjectKey')), 
        }); 
    } 
} 
