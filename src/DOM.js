import { Task, Project, Wrap } from "./classes.js"
import { wrapper, defaultProject } from "./index.js"

class DOM {
    static getDefaultHome() {
        this.buttonHandlers();
    }
    static buttonHandlers() {
        const newTaskBtnDOM = document.querySelector("#new-task-btn");
        const newProjectBtnDOM = document.querySelector("#new-project-btn");
        const taskFormDOM = document.querySelector("#task-form");
        const projectFormDOM = document.querySelector("#project-form");
        const closeNewTaskModalBtn = document.querySelector("#close-task-modal-btn");
        const closeNewProjectModalBtn = document.querySelector("#close-project-modal-btn");
        newTaskBtnDOM.addEventListener("click", this.openNewTaskModal);
        newProjectBtnDOM.addEventListener("click", this.openNewProjectModal);
        closeNewTaskModalBtn.addEventListener("click", this.closeNewTaskModal);
        closeNewProjectModalBtn.addEventListener("click", this.closeNewProjectModal);
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
        let newTask = new Task (task, details, priority, date);
        let activeProject = this.getActiveProject();
        console.log(activeProject)
        activeProject.taskList.push(newTask);
        this.closeNewTaskModal();
        console.log(activeProject.taskList);
    }
    static addNewProject() {
        const projectDOM = document.getElementById("project");
        const projectDetailsDOM = document.getElementById("project-details");
        let project = projectDOM.value;
        let details = projectDetailsDOM.value;
        let newProject = new Project (project, details);
        wrapper.projectList.push(newProject);
        this.closeNewProjectModal();
        console.log(wrapper.projectList);
    }
    static getActiveProject() {
        return defaultProject;
    }
}

export { DOM };