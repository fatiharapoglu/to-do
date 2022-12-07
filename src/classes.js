class Task {
    constructor(name, details = "No details", priority = "Normal", date = "No date") {
        this.name = name;
        this.details = details;
        this.priority = priority;
        this.date = date;
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
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
    constructor(name, details = "No details") {
        this.name = name;
        this.details = details;
        this.taskList = [];
    }
    getName() {
        return this.name;
    }
    setName(newName) {
        this.name = newName;
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
    getTask(task) {
        return this.taskList.find(listItem => listItem.getName() == task); 
    }
    addTask(newTask) {
        this.taskList.push(newTask);
    }
    removeTask(task) {
        this.taskList = this.taskList.filter(listItem => listItem.getName() !== task);
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
    getProject(project) {
        return this.projectList.find(listItem => listItem.getName() == project); 
    }
    addProject(newProject) {
        this.projectList.push(newProject);
    }
    removeProject(project) {
        this.projectList = this.projectList.filter(listItem => listItem.getName() !== project);
    }
}

export { Task, Project, Wrap };