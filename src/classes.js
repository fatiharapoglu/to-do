class Task {
    constructor(name, details = "No details", priority = "Normal", date = "No date") {
        this.name = name;
        this.details = details;
        this.priority = priority;
        this.date = date;
        this.uniqueID = Date.now();
        this.checked = false;
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
    getUniqueID() {
        return this.uniqueID;
    }
    toggleChecked() {
        if (this.checked) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    }
    isChecked() {
        return this.checked;
    }
    getDetails() {
        return this.details;
    }
    setDetails(newDetails) {
        this.details = newDetails;
    }
    getDate() {
        return this.date;
    }
    setDate(newDate) {
        this.date = newDate;
    }
    getPriority() {
        return this.priority;
    }
    setPriority(newPriority) {
        this.priority = newPriority;
    }
}

class Project {
    constructor(name, details = "") {
        this.name = name;
        this.details = details;
        this.taskList = [];
        this.uniqueID = Date.now();
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
    }
    getUniqueID() {
        return this.uniqueID;
    }
    getDetails() {
        return this.details;
    }
    setDetails(newDetails) {
        this.details = newDetails;
    }
    getTaskList() {
        return this.taskList;
    }
    setTaskList(newTaskList) {
        this.taskList = newTaskList;
    }
    getTask(ID) {
        return this.taskList.find(listItem => listItem.getUniqueID() == ID); 
    }
    addTask(newTask) {
        this.taskList.push(newTask);
    }
    removeTask(ID) {
        this.taskList = this.taskList.filter(listItem => listItem.getUniqueID() !== ID);
    }
}

class Wrap {
    constructor() {
        this.projectList = [];
    }
    getProjectList() {
        return this.projectList;
    }
    setProjectList(newProjectList) {
        this.projectList = newProjectList;
    }
    getProject(ID) {
        return this.projectList.find(listItem => listItem.getUniqueID() == ID); 
    }
    addProject(newProject) {
        this.projectList.push(newProject);
    }
    removeProject(ID) {
        this.projectList = this.projectList.filter(listItem => listItem.getUniqueID() !== ID);
    }
}

export { Task, Project, Wrap };