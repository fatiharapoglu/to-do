import { Task, Project, Wrap } from "./classes.js"

class DOM {
    static wrapper = new Wrap();
    static defaultProject = new Project(" myTask", "This is the default project");
    static pushDefault() {
        this.wrapper.projectList.push(this.defaultProject);
    }
    static getDefaultHome() {
        this.buttonHandlers();
        this.pushDefault();
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
        let activeProject = this.getActiveProject();
        activeProject.addTask(newTask);
        this.closeNewTaskModal();
        this.renderTasks();
        this.clearForm();
        console.log(activeProject.getTaskList());
    }
    static addNewProject() {
        const projectDOM = document.getElementById("project");
        const projectDetailsDOM = document.getElementById("project-details");
        let project = projectDOM.value;
        let details = projectDetailsDOM.value;
        let newProject = new Project(project, details);
        this.wrapper.addProject(newProject);
        this.closeNewProjectModal();
        this.renderProjects();
        this.clearForm();
        console.log(this.wrapper.getProjectList());
    }
    static getActiveProject() {
        return this.defaultProject;
    }
    static renderTasks() {
        const contentDOM = document.querySelector("#content");
        contentDOM.innerHTML = "";
        let activeProject = this.getActiveProject().getTaskList();
        for (let task of activeProject) {
            contentDOM.innerHTML += `
            <div class="task-item"> Name : ${task.getName()} </div>
            `
        }
    }
    static renderProjects() {
        const projectListDOM = document.querySelector("#project-list");
        projectListDOM.innerHTML = "";
        let projects = this.wrapper.getProjectList();
        for (let project of projects) {
            projectListDOM.innerHTML += `
            <li>
                <a href="#">
                    ${ project.getName().charAt(0).toUpperCase() + project.getName().slice(1) }
                </a>
            </li>
            `
        }
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
}

export { DOM };