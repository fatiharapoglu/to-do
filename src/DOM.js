import { Task, Project, Wrap } from "./classes";
import { Storage } from "./localstorage";
import { format } from "date-fns";

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
        Storage.loadFromStorage();
        this.buttonHandlers();
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
        const closeEditModalBtnDOM = document.querySelector("#close-edit-modal-btn");
        const closeDetailsModalBtnDOM = document.querySelector("#close-details-modal-btn");
        const allTasksDOM = document.getElementById("all-tasks");
        const highPriorityDOM = document.getElementById("high-priority-tasks");
        const dailyDOM = document.getElementById("daily-tasks");
        const weeklyDOM = document.getElementById("weekly-tasks");
        newTaskBtnDOM.addEventListener("click", this.openNewTaskModal);
        newProjectBtnDOM.addEventListener("click", this.openNewProjectModal);
        closeNewTaskModalBtnDOM.addEventListener("click", this.closeNewTaskModal);
        closeNewProjectModalBtnDOM.addEventListener("click", this.closeNewProjectModal);
        closeEditModalBtnDOM.addEventListener("click", this.closeEditModal);        
        closeDetailsModalBtnDOM.addEventListener("click", this.closeDetailsModal);
        taskFormDOM.addEventListener("submit", event => {
            event.preventDefault();
            this.addNewTask();
        });
        projectFormDOM.addEventListener("submit", event => {
            event.preventDefault();
            this.addNewProject();
        });
        const editFormDOM = document.querySelector("#task-edit-form");
        editFormDOM.addEventListener("submit", event => {
            event.preventDefault();
            let ID = editFormDOM.dataset.id;
            let tab = editFormDOM.dataset.tab;
            let projects = this.wrapper.getProjectList();
            for (let project of projects) {
                let task = project.getTaskList().find(task => task.getUniqueID() == ID);
                if (task !== undefined) {
                    if (tab == "active-tab") {
                        this.editTaskConfirm(task);
                    } else {
                        this.editTaskConfirmForAllTasks(task, tab);
                    }
                }}
        })
        allTasksDOM.addEventListener("click", () => this.renderAllTasks("AllTab"));
        highPriorityDOM.addEventListener("click", () => this.renderAllTasks("HighPrioTab"));
        dailyDOM.addEventListener("click", () => this.renderAllTasks("DailyTab"));
        weeklyDOM.addEventListener("click", () => this.renderAllTasks("WeeklyTab"));
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
    static openEditModal() {
        const editModalDOM = document.querySelector("#edit-modal");
        editModalDOM.classList.remove("hidden");
    }
    static closeEditModal() {
        const editModalDOM = document.querySelector("#edit-modal");
        editModalDOM.classList.add("hidden");
    }
    static openDetailsModal() {
        const detailsModalDOM = document.querySelector("#details-modal");
        detailsModalDOM.classList.remove("hidden");
    }
    static closeDetailsModal() {
        const detailsModalDOM = document.querySelector("#details-modal");
        detailsModalDOM.classList.add("hidden");
    }
    static addNewTask() {
        const taskDOM = document.getElementById("task");
        const taskDetailsDOM = document.getElementById("task-details");
        const dateDOM = document.getElementById("date");
        const priorityDOM = document.getElementById("priority");
        let task = taskDOM.value;
        let date;
        if (dateDOM.value !== "") {
            date = format(new Date(dateDOM.value), 'dd/MM/yyyy');
        }
        if (dateDOM.value === "") {
            date = undefined;
        }
        let details = taskDetailsDOM.value;
        if (details === "") {
            details = undefined;
        }
        let priority = priorityDOM.value;
        let newTask = new Task(task, details, priority, date);
        this.getActiveProject().addTask(newTask);
        this.closeNewTaskModal();
        this.clearForm();
        this.renderTasks();
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
            if (this.getActiveProject().getUniqueID() == event.target.id) { 
                this.activeProject = this.wrapper.getProjectList().find(project => project.getName() == " myTask");
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
                    <label class="${task.isChecked() ? "crossed" : "uncrossed"}" for="checkbox">${task.getName()}</label>
                </div>
                <div class="flex-task-items">
                    <div>${task.getPriority()}</div>
                    <div>${task.isTaskToday() ? "today" : task.getHowDistant()}</div>
                </div>
                <div data-id="${task.getUniqueID()}" class="edit-btn-task"><i data-id="${task.getUniqueID()}" class="fa-regular fa-pen-to-square"></i></div>
                <div data-id="${task.getUniqueID()}" class="details-btn-task"><i data-id="${task.getUniqueID()}" class="fa-solid fa-circle-info"></i></div>
                <div id="${task.getUniqueID()}" class="close-btn-task"><i class="fa-solid fa-circle-xmark"></i></div>
            </div>
            `
        }
        this.initRemoveTask();
        this.highlightActive();
        this.addPriorityClasses();
        this.renderProjectHeader();
        this.checkCheckbox();
        this.initEditTask();
        this.initDetailsBtn();
        this.counter();
        this.hideHeaderProperties();
        Storage.saveToStorage();
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
                <div id="${project.getUniqueID()}" class="close-btn-project"><i class="fa-solid fa-circle-xmark"></i></div>
            </li>
            `
            if (project.getName() == " myTask") {
                let myTaskID = project.getUniqueID();
                const myTask = document.getElementById(myTaskID);
                myTask.classList.add("hidden");
            }
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
            let ID = event.target.parentNode.dataset.id;
            this.setActiveProject(ID);
            this.renderProjects();
            this.renderTasks();
        }))
    }
    static renderAllTasks(tab) {
        const contentDOM = document.querySelector("#content");
        contentDOM.innerHTML = ""
        let projects = this.wrapper.getProjectList();
        for (let project of projects) {
            let tasks;
            if (tab == "AllTab" || tab == undefined) {
                tasks = project.getTaskList();
            }
            else if (tab == "HighPrioTab") {
                tasks = project.getHighPriority();
            }
            else if (tab == "DailyTab") {
                tasks = project.getDaily();
            }
            else if (tab == "WeeklyTab") {
                tasks = project.getWeekly();
            }
            for (let i=0; i<tasks.length; i++) {
                contentDOM.innerHTML += `
                <div class="task-item flex-task">
                    <div class="checkbox">
                        <input type="checkbox" name="checkbox" data-id="${tasks[i].getUniqueID()}" ${tasks[i].isChecked() ? "checked" : "unchecked"}>
                        <label class="${tasks[i].isChecked() ? "crossed" : "uncrossed"}" for="checkbox">${tasks[i].getName()}</label>
                    </div>
                    <div class="flex-task-items">
                        <div>${tasks[i].getPriority()}</div>
                        <div>${tasks[i].isTaskToday() ? "today" : tasks[i].getHowDistant()}</div>
                    </div>
                    <div data-id="${tasks[i].getUniqueID()}" class="edit-btn-task"><i data-id="${tasks[i].getUniqueID()}" class="fa-regular fa-pen-to-square"></i></div>
                    <div data-id="${tasks[i].getUniqueID()}" class="details-btn-task"><i data-id="${tasks[i].getUniqueID()}" class="fa-solid fa-circle-info"></i></div>
                    <div id="${tasks[i].getUniqueID()}" class="close-btn-task"><i class="fa-solid fa-circle-xmark"></i></div>
                </div>
                `
            }
        }
        this.initRemoveForAllTasks(tab);
        this.removeAllHighlights();
        if (tab == "AllTab" || tab == undefined) {
            document.getElementById("all-tasks").parentNode.classList.add("active-project");
        }
        else if (tab == "HighPrioTab") {
            document.getElementById("high-priority-tasks").parentNode.classList.add("active-project");
        }
        else if (tab == "DailyTab") {
            document.getElementById("daily-tasks").parentNode.classList.add("active-project");
        }
        else if (tab == "WeeklyTab") {
            document.getElementById("weekly-tasks").parentNode.classList.add("active-project");
        }
        this.addPriorityClasses();
        this.renderProjectHeaderForAllTasks(tab);
        this.checkCheckboxForAllTasks(tab);
        this.initEditForAllTasks(tab);
        this.initDetailsBtn();
        this.counter();
        this.hideHeaderProperties();
        Storage.saveToStorage();
    }
    static initRemoveForAllTasks(tab) {
        const removeTaskButtons = document.querySelectorAll(".close-btn-task");
        removeTaskButtons.forEach(button => button.addEventListener("click", event => {
            let ID = event.target.id;
            let projects = this.wrapper.getProjectList();
            for (let project of projects) {
                let deletedTask = project.getTaskList().find(task => task.getUniqueID() == ID);
                let index = project.getTaskList().indexOf(deletedTask);
                if (deletedTask !== undefined) {
                    project.getTaskList().splice(index, 1);
                    this.renderAllTasks(tab);
                }
            }
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
    static renderProjectHeaderForAllTasks(tab) {
        const projectHeaderNameDOM = document.getElementById("project-header-name");
        const projectHeaderDetailsDOM = document.getElementById("project-header-details");
        let text;
        if (tab == "AllTab" || tab == undefined) {
            text = "All Tasks";
        }
        else if (tab == "HighPrioTab") {
            text = "High Priority Tasks";
        }
        else if (tab == "DailyTab") {
            text = "Daily Tasks";
        }
        else if (tab == "WeeklyTab") {
            text = "Weekly Tasks";
        }
        projectHeaderNameDOM.textContent = text;
        projectHeaderDetailsDOM.textContent = "";
    }
    static checkCheckbox() {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(checkbox => checkbox.addEventListener("change", event => {
            let ID = event.target.dataset.id;
            let checkedTask = this.getActiveProject().getTask(ID);
            checkedTask.toggleChecked();
            this.renderTasks();
        }))
    }
    static checkCheckboxForAllTasks(tab) {
        const checkboxes = document.querySelectorAll("input[type=checkbox]");
        checkboxes.forEach(checkbox => checkbox.addEventListener("change", event => {
            let ID = event.target.dataset.id;
            let projects = this.wrapper.getProjectList();
            for (let project of projects) {
                let checkedTask = project.getTaskList().find(task => task.getUniqueID() == ID);
                if (checkedTask !== undefined) {
                    checkedTask.toggleChecked();
                    this.renderAllTasks(tab);
                }
            }
        }))
    }
    static initEditTask() {
        const editButtons = document.querySelectorAll(".edit-btn-task");
        const editFormDOM = document.querySelector("#task-edit-form");
        editButtons.forEach(button => button.addEventListener("click", event => {
            let ID = event.target.dataset.id;
            editFormDOM.dataset.id = ID;
            editFormDOM.dataset.tab = "active-tab";
            let task = this.getActiveProject().getTask(ID);
            this.editTask(task);
        }))
    }
    static editTask(task) {
        const taskEditDOM = document.getElementById("task-edit");
        const taskEditDetailsDOM = document.getElementById("task-edit-details");
        const priorityEditDOM = document.getElementById("priority-edit");
        taskEditDOM.value = task.getName();
        taskEditDetailsDOM.value = task.getDetails();
        priorityEditDOM.value = task.getPriority();
        this.openEditModal();
    }
    static editTaskConfirm(task) {
        const taskEditDOM = document.getElementById("task-edit");
        const taskEditDetailsDOM = document.getElementById("task-edit-details");
        const priorityEditDOM = document.getElementById("priority-edit");
        task.setName(taskEditDOM.value);
        task.setDetails(taskEditDetailsDOM.value);
        task.setPriority(priorityEditDOM.value);
        this.closeEditModal();
        this.renderTasks();
    }
    static editTaskConfirmForAllTasks(task, tab) {
        const taskEditDOM = document.getElementById("task-edit");
        const taskEditDetailsDOM = document.getElementById("task-edit-details");
        const priorityEditDOM = document.getElementById("priority-edit");
        task.setName(taskEditDOM.value);
        task.setDetails(taskEditDetailsDOM.value);
        task.setPriority(priorityEditDOM.value);
        this.closeEditModal();
        this.renderAllTasks(tab);
    }
    static initEditForAllTasks(tab) {
        const editButtons = document.querySelectorAll(".edit-btn-task");
        const editFormDOM = document.querySelector("#task-edit-form");
        editButtons.forEach(button => button.addEventListener("click", event => {
            let ID = event.target.dataset.id;
            editFormDOM.dataset.id = ID;
            editFormDOM.dataset.tab = tab;
            let projects = this.wrapper.getProjectList();
            for (let project of projects) {
                let task = project.getTaskList().find(task => task.getUniqueID() == ID);
                if (task !== undefined) {
                    this.editTask(task);
                }
            }
        }))
    }
    static initDetailsBtn() {
        const detailsButtons = document.querySelectorAll(".details-btn-task");
        detailsButtons.forEach(button => button.addEventListener("click", event => {
            let ID = event.target.dataset.id;
            let projects = this.wrapper.getProjectList();
            for (let project of projects) {
                let task = project.getTaskList().find(task => task.getUniqueID() == ID);
                if (task !== undefined) {
                    this.showDetails(task);
                }
            }
        }))
    }
    static showDetails(task) {
        const detailsModalContentDOM = document.querySelector("#details-modal-content");
        detailsModalContentDOM.innerHTML = `
            <div>
                <b>Name:</b> ${task.getName()} <br>
                <b>Details:</b> ${task.getDetails()} <br>
                <b>Date:</b> ${task.getDate()} (${task.getHowDistant()}) <br>
                <b>Priority:</b> ${task.getPriority()}
            </div>
            ` 
        this.openDetailsModal();
    }
    static addPriorityClasses() {
        const tasks = document.querySelectorAll(".flex-task-items");
        tasks.forEach(task => {
            let priority = task.childNodes[1].textContent;
            if (priority == "Low") {
                task.parentNode.classList.add("border-left-low");
            }
            else if (priority == "Normal") {
                task.parentNode.classList.add("border-left-normal");
            }
            else if (priority == "High") {
                task.parentNode.classList.add("border-left-high")
            }
        })
    }
    static counter() {
        const allCounterDOM = document.getElementById("all-counter");
        const dailyCounterDOM = document.getElementById("daily-counter");
        const weeklyCounterDOM = document.getElementById("weekly-counter");
        const highPriorityCounterDOM = document.getElementById("high-priority-counter");
        let counterForAll = 0;
        let counterForDaily = 0;
        let counterForWeekly = 0;
        let counterForHighPrio = 0;
        let projects = this.wrapper.getProjectList();
        for (let project of projects) {
            counterForAll += project.getTaskList().filter(task => task.isChecked() == false).length;
            counterForDaily += project.getDaily().filter(task => task.isChecked() == false).length;
            counterForWeekly += project.getWeekly().filter(task => task.isChecked() == false).length;
            counterForHighPrio += project.getHighPriority().filter(task => task.isChecked() == false).length;
        }
        allCounterDOM.textContent = counterForAll;
        dailyCounterDOM.textContent = counterForDaily;
        weeklyCounterDOM.textContent = counterForWeekly;
        highPriorityCounterDOM.textContent = counterForHighPrio;
        allCounterDOM.classList.remove("hidden");
        dailyCounterDOM.classList.remove("hidden");
        weeklyCounterDOM.classList.remove("hidden");
        highPriorityCounterDOM.classList.remove("hidden");
        if (counterForAll == 0) {
            allCounterDOM.classList.add("hidden");
        }
        if (counterForDaily == 0) {
            dailyCounterDOM.classList.add("hidden");
        }
        if (counterForWeekly == 0) {
            weeklyCounterDOM.classList.add("hidden");
        }
        if (counterForHighPrio == 0) {
            highPriorityCounterDOM.classList.add("hidden");
        }
    }
    static hideHeaderProperties() {
        const headerPropertiesLeftDOM = document.querySelector(".project-properties-left");
        const headerPropertiesRightDOM = document.querySelector(".project-properties-right");
        const emojiDOM = document.querySelector(".emoji");
        const contentDOM = document.querySelector("#content");
        if (contentDOM.innerHTML == "") {
            headerPropertiesLeftDOM.classList.add("hidden");
            headerPropertiesRightDOM.style.display = "none";
            emojiDOM.classList.remove("hidden");
        } else {
            headerPropertiesLeftDOM.classList.remove("hidden");
            headerPropertiesRightDOM.style.display = "";
            emojiDOM.classList.add("hidden");
        }
    }
}

export { DOM };