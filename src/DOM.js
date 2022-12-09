import { Task, Project, Wrap } from "./classes.js"

class DOM {
    static wrapper = new Wrap();
    static defaultProject = new Project(" myTask", "Stay organized, stay focused.");
    static activeProject = this.defaultProject;
    static pushDefault() {
        this.wrapper.projectList.push(this.defaultProject);
        this.activeProject = this.defaultProject;
        this.renderProjects();
    }
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
        const allTasksDOM = document.getElementById("all-tasks");
        newTaskBtnDOM.addEventListener("click", this.openNewTaskModal);
        newProjectBtnDOM.addEventListener("click", this.openNewProjectModal);
        closeNewTaskModalBtnDOM.addEventListener("click", this.closeNewTaskModal);
        closeNewProjectModalBtnDOM.addEventListener("click", this.closeNewProjectModal);
        taskFormDOM.addEventListener("submit", event => {
            event.preventDefault();
            this.addNewTask();
        });
        projectFormDOM.addEventListener("submit", event => {
            event.preventDefault();
            this.addNewProject();
        });
        allTasksDOM.addEventListener("click", this.renderAllTasks.bind(this));
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
        if (details === "") {
            details = undefined;
        }
        let newTask = new Task(task, details, priority, date);
        this.getActiveProject().addTask(newTask);
        this.closeNewTaskModal();
        this.clearForm();
        this.renderTasks();
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
        removeTaskButtons.forEach(button => button.addEventListener("click", event => {
            let index = this.getActiveProject().getTaskList().findIndex(task => task.getUniqueID() == event.target.id);
            this.getActiveProject().getTaskList().splice(index, 1);
            this.renderTasks();
        }))
    }
    static initRemoveProject() {
        const removeProjectButtons = document.querySelectorAll(".close-btn-project");
        removeProjectButtons.forEach(button => button.addEventListener("click", event => {
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
            <div class="task-item flex-task">
            <div class="checkbox">
                    <input type="checkbox" name="checkbox" data-id="${task.getUniqueID()}" ${task.isChecked() ? "checked" : "unchecked"}>
                    <label for="checkbox">${task.getName()}</label>
                </div>
                <div class="flex-task-items">
                    <div>${task.getPriority()}</div>
                    <div>${task.getDate()}</div>
                </div>
                <div id="${task.getUniqueID()}" class="close-btn-task">x</div>
            </div>
            `
        }
        this.initRemoveTask();
        this.highlightActive();
        this.renderProjectHeader();
        this.checkCheckbox();
    }
    static renderProjects() {
        const projectListDOM = document.querySelector("#project-list");
        projectListDOM.innerHTML = "";
        let projects = this.wrapper.getProjectList();
        for (let project of projects) {
            projectListDOM.innerHTML += `
            <li>
                <div class="project-item" data-id="${project.getUniqueID()}">
                    <a href="#">${project.getName().charAt(0).toUpperCase() + project.getName().slice(1)}</a>
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
        this.removeAllHighlights();
        document.getElementById(ID).parentNode.querySelector(".project-item").classList.add("active-project");
    }
    static removeAllHighlights() {
        document.querySelectorAll(".active-project").forEach(item => item.classList.remove("active-project"));
    }
    static selectProject() {
        const projects = document.querySelectorAll(".project-item");
        projects.forEach(project => project.addEventListener("click", event => {
            this.setActiveProject(event.target.parentNode.dataset.id);
            this.renderProjects();
            this.renderTasks();
        }))
    }
    static renderAllTasks() {
        const contentDOM = document.querySelector("#content");
        contentDOM.innerHTML = ""
        let projects = this.wrapper.getProjectList();
        for (let project of projects) {
            let tasks = project.getTaskList();
            for (let i=0; i<tasks.length; i++) {
                contentDOM.innerHTML += `
                <div class="task-item flex-task">
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox" data-id="${tasks[i].getUniqueID()}" ${tasks[i].isChecked() ? "checked" : "unchecked"}>
                        <label for="checkbox">${tasks[i].getName()}</label>
                    </div>
                    <div class="flex-task-items">
                        <div>${tasks[i].getPriority()}</div>
                        <div>${tasks[i].getDate()}</div>
                    </div>
                    <div id="${tasks[i].getUniqueID()}" class="close-btn-task">x</div>
                </div>
                `
            }
        }
        this.initRemoveForAllTasks();
        this.removeAllHighlights();
        document.getElementById("all-tasks").parentNode.classList.add("active-project");
        this.renderProjectHeaderForAllTasks();
        this.checkCheckboxForAllTasks();
    }
    static initRemoveForAllTasks() {
        const removeTaskButtons = document.querySelectorAll(".close-btn-task");
        removeTaskButtons.forEach(button => button.addEventListener("click", event => {
            let ID = event.target.id;
            let projects = this.wrapper.getProjectList();
            for (let project of projects) {
                let deletedTask = project.getTaskList().find(task => task.getUniqueID() == ID);
                let index = project.getTaskList().indexOf(deletedTask);
                if (deletedTask !== undefined) {
                    project.getTaskList().splice(index, 1);
                }
            }
            this.renderAllTasks();
        }))
    }
    static renderProjectHeader() {
        const projectHeaderNameDOM = document.getElementById("project-header-name");
        const projectHeaderDetailsDOM = document.getElementById("project-header-details");
        projectHeaderNameDOM.textContent = `
        ${this.getActiveProject().getName()}
        `
        projectHeaderDetailsDOM.textContent = `
        ${this.getActiveProject().getDetails().charAt(0).toUpperCase() + this.getActiveProject().getDetails().slice(1)}
        `
    }
    static renderProjectHeaderForAllTasks() {
        const projectHeaderNameDOM = document.getElementById("project-header-name");
        const projectHeaderDetailsDOM = document.getElementById("project-header-details");
        projectHeaderNameDOM.textContent = `All Tasks`
        projectHeaderDetailsDOM.textContent = `Active Project: ${this.getActiveProject().getName()}`
    }
    static checkCheckbox() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(checkbox => checkbox.addEventListener("change", event => {
            let ID = event.target.dataset.id;
            let checkedTask = this.getActiveProject().getTask(ID);
            checkedTask.toggleChecked();
        }))
    }
    static checkCheckboxForAllTasks() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(checkbox => checkbox.addEventListener("change", event => {
            let ID = event.target.dataset.id;
            let projects = this.wrapper.getProjectList();
            for (let project of projects) {
                let checkedTask = project.getTaskList().find(task => task.getUniqueID() == ID);
                let index = project.getTaskList().indexOf(checkedTask);
                if (checkedTask !== undefined) {
                    checkedTask.toggleChecked();
                }
            }
        }))
    }
}

export { DOM };