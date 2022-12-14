import { toDate, isToday, isThisWeek, subDays, intlFormatDistance } from "date-fns";

class Task {
    constructor(name, details = "No details", priority = "Normal", date = "No date") {
        this.name = name;
        this.details = details;
        this.priority = priority;
        this.date = date;
        this.uniqueID = Date.now(); // creating unique id with Date.now() function, it returns a unique number related to created date
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
    getTask(ID) { // finds the task which has that unique id and returns it
        return this.taskList.find(listItem => listItem.getUniqueID() == ID); 
    }
    addTask(newTask) {
        this.taskList.push(newTask);
    }
    removeTask(ID) { // same with find, but filter which hasn't got that unique id
        this.taskList = this.taskList.filter(listItem => listItem.getUniqueID() !== ID);
    }
    getHighPriority() { // high priority filter for the tab
        return this.taskList.filter(listItem => listItem.getPriority() == "High");
    }
    getDaily() { // task date filter with date-fns isToday function
        return this.taskList.filter(listItem => {
            let date = new Date(listItem.formatDate());
            return isToday(toDate(date));
        })
    }
    getWeekly() { // same as daily but isThisWeek function
        return this.taskList.filter(listItem => {
            let date = new Date(listItem.formatDate());
            return isThisWeek(subDays(toDate(date), 1));
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
    getProject(ID) { // projects also have unique id's same with tasks and can be used for removing and getting the projects
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