import { Task, Project, Wrap } from "./classes.js"

class DOM {
    static wrapper = new Wrap();
    static defaultProject = new Project(" myTask", "This is the default project");
    static pushDefault() {
        this.wrapper.projectList.push(this.defaultProject);
        this.activeProject = this.defaultProject;
        this.renderProjects();
    }
    static activeProject = this.defaultProject;
    static getDefaultHome() {
        this.buttonHandlers();
        this.pushDefault();
        this.renderProjects();
        this.renderTasks();
        this.selectProject();
    }
    static buttonHandlers() {
        const newTaskBtnDOM = document.querySelector("#new-task-btn");
        const newProjectBtnDOM = document.querySelector("#new-project-btn");
        const taskFormDOM = document.querySelector("#task-form");
        const projectFormDOM = document.querySelector("#project-form");
        const closeNewTaskModalBtnDOM = document.querySelector("#close-task-modal-btn");
        const closeNewProjectModalBtnDOM = document.querySelector("#close-project-modal-btn");
        newTaskBtnDOM.addEventListener("click", this.openNewTaskModal);
        newProjectBtnDOM.addEventListener("click", this.openNewProjectModal);
        closeNewTaskModalBtnDOM.addEventListener("click", this.closeNewTaskModal);
        closeNewProjectModalBtnDOM.addEventListener("click", this.closeNewProjectModal);
        taskFormDOM.addEventListener('submit', (event) => {
            event.preventDefault();
            this.addNewTask();
        });
        projectFormDOM.addEventListener("submit", (event) => {
            event.preventDefault();
            this.addNewProject();
        });
    }
    static openNewTaskModal() {
        const newTaskModalDOM = document.querySelector("#new-task-modal");
        newTaskModalDOM.classList.remove("hidden");
    }
    static openNewProjectModal() {
        const newProjectModalDOM = document.querySelector("#new-project-modal");
        newProjectModalDOM.classList.remove("hidden");
    }
    static closeNewTaskModal() {
        const newTaskModalDOM = document.querySelector("#new-task-modal");
        newTaskModalDOM.classList.add("hidden");
    }
    static closeNewProjectModal() {
        const newProjectModalDOM = document.querySelector("#new-project-modal");
        newProjectModalDOM.classList.add("hidden");
    }
    static addNewTask() {
        const taskDOM = document.getElementById("task");
        const taskDetailsDOM = document.getElementById("task-details");
        const dateDOM = document.getElementById("date");
        const priorityDOM = document.getElementById("priority");
        let task = taskDOM.value;
        let details = taskDetailsDOM.value;
        let date = dateDOM.value;
        let priority = priorityDOM.value;
        if (date === "") {
            date = undefined;
        }
        let newTask = new Task(task, details, priority, date);
        this.getActiveProject().addTask(newTask);
        this.closeNewTaskModal();
        this.clearForm();
        this.renderTasks();
        if (this.wrapper.getProjectList().length == 0) {
            this.pushDefault();
        }
        console.log(this.wrapper.getProjectList());
    }
    static addNewProject() {
        const projectDOM = document.getElementById("project");
        const projectDetailsDOM = document.getElementById("project-details");
        let project = projectDOM.value;
        let details = projectDetailsDOM.value;
        let newProject = new Project(project, details);
        let ID = newProject.getUniqueID();
        this.wrapper.addProject(newProject);
        this.closeNewProjectModal();
        this.clearForm();
        this.setActiveProject(ID);
        this.renderProjects();
        this.renderTasks();
        console.log(this.wrapper.getProjectList());
    }
    static initRemoveTask() {
        const removeTaskButtons = document.querySelectorAll(".close-btn-task");
        removeTaskButtons.forEach(button => button.addEventListener('click', event => {
            let index = this.getActiveProject().getTaskList().findIndex(task => task.getUniqueID() == event.target.id);
            this.getActiveProject().getTaskList().splice(index, 1);
            this.renderTasks();
        }))
    }
    static initRemoveProject() {
        const removeProjectButtons = document.querySelectorAll(".close-btn-project");
        removeProjectButtons.forEach(button => button.addEventListener('click', event => {
            let index = this.wrapper.getProjectList().findIndex(project => project.getUniqueID() == event.target.id);
            if (event.target.parentNode.querySelector("a").textContent == " myTask") return;
            if (this.getActiveProject().getUniqueID() == event.target.id) { 
                this.activeProject = this.defaultProject;
            }
            this.wrapper.getProjectList().splice(index, 1);
            this.renderProjects();
            this.renderTasks();
        }))
    }
    static setActiveProject(ID) {
        this.activeProject = this.wrapper.getProject(ID);
    }
    static getActiveProject() {
        return this.activeProject;
    }
    static renderTasks() {
        const contentDOM = document.querySelector("#content");
        contentDOM.innerHTML = "";
        let activeProject = this.getActiveProject().getTaskList();
        for (let task of activeProject) {
            contentDOM.innerHTML += `
            <div class="task-item">
                <div>
                    <input type="checkbox" name="checkbox">
                    <label for="checkbox">${task.getName()}</label>
                </div>
                <div id="${task.getUniqueID()}" class="close-btn-task">x</div>
            </div>
            `
        }
        this.initRemoveTask();
    }
    static renderProjects() {
        const projectListDOM = document.querySelector("#project-list");
        projectListDOM.innerHTML = "";
        let projects = this.wrapper.getProjectList();
        for (let project of projects) {
            projectListDOM.innerHTML += `
            <li>
                <div class="project-item" id="${project.getUniqueID()}">
                    <a href="#">${ project.getName().charAt(0).toUpperCase() + project.getName().slice(1) }</a>
                </div>
                <div id="${project.getUniqueID()}" class="close-btn-project">x</div>
            </li>
            `
        }
        this.initRemoveProject();
        this.selectProject();
        this.highlightActive();
    }
    static clearForm() {
        const taskDOM = document.getElementById("task");
        const taskDetailsDOM = document.getElementById("task-details");
        const projectDOM = document.getElementById("project");
        const projectDetailsDOM = document.getElementById("project-details");
        taskDOM.value = "";
        taskDetailsDOM.value = "";
        projectDOM.value = "";
        projectDetailsDOM.value = "";
    }
    static highlightActive() {
        let ID = this.getActiveProject().getUniqueID();
        if (this.wrapper.getProjectList().length == 0) {
            this.pushDefault();
        }
        document.getElementById(ID).parentNode.querySelector(".project-item").classList.add("active-project");
    }
    static selectProject() {
        const projects = document.querySelectorAll(".project-item");
        projects.forEach(project => project.addEventListener('click', event => {
            this.setActiveProject(event.target.parentNode.id);
            this.renderProjects();
            this.renderTasks();
        }))
    }
}

export { DOM };