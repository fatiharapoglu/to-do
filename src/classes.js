import { toDate, isToday, isThisWeek, subDays, intlFormatDistance } from "date-fns"

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
        this.checked = !(this.checked);
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
    formatDate() {
        let day = this.date.split("/")[0];
        let month = this.date.split("/")[1];
        let year = this.date.split("/")[2];
        return `${month}/${day}/${year}`
    }
    getHowDistant() {
        let date = new Date(this.formatDate());
        let now = new Date();
        if (date == "Invalid Date") {
            return "No Date";
        }
        return intlFormatDistance(date, now);
    }
    isTaskToday() {
        let date = new Date(this.formatDate());
        return isToday(date);
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
    getHighPriority() {
        return this.taskList.filter(listItem => listItem.getPriority() == "High");
    }
    getDaily() {
        return this.taskList.filter(listItem => {
            let date = new Date(listItem.formatDate());
            return isToday(toDate(date));
        })
    }
    getWeekly() {
        return this.taskList.filter(listItem => {
            let date = new Date(listItem.formatDate());
            return isThisWeek(subDays(toDate(date), 6));
        })
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