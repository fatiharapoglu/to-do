import { Wrap, Project, Task } from "./classes";
import { DOM } from "./DOM";

class Storage {
    static setProjectsToStorage(projects) { // basicly saves "wrapper" everytime DOM renders
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    static getProjectsFromStorage() {
        let storedProjects = localStorage.getItem("projects");
        let retrievedProjects = JSON.parse(storedProjects);
        return retrievedProjects;
    }
    static saveToStorage() {
        let projects = DOM.wrapper.getProjectList();
        this.setProjectsToStorage(projects);
    }
    static loadFromStorage() { // the saved storage is an object which is useless if it's not a class prototype of the related tasks and projects
        let newWrapper = new Wrap();
        let retrievedProjects = this.getProjectsFromStorage();
        if (retrievedProjects === null) {
            DOM.pushDefault();
        } else { // so we have to assign classes to all stored objects to use related methods
            newWrapper.setProjectList(retrievedProjects);
            newWrapper.setProjectList(newWrapper.getProjectList()
                .map(project => Object.assign(new Project(), project))
            );
            newWrapper.getProjectList()
                .forEach(project => project
                .setTaskList(project.getTaskList()
                .map(task => Object.assign(new Task(), task)))
            );
            DOM.wrapper = newWrapper;
            DOM.activeProject = newWrapper.getProjectList().find(project => project.getName() == " myTask");
        }
    }
    static clearLocalStorage() { // for clearing the local storage
        localStorage.clear();
        DOM.snackbar("Local storage cleared, refresh to see the default page.");
    }
    static setTheme(mode) { // set color theme from DOM module
        localStorage.setItem("theme", mode);
    }
    static getTheme() {
        if (localStorage.getItem("theme") === null || localStorage.getItem("theme") == "dark") {
            return; // if there is no storaged or the storaged theme is dark, nothing to do
        } else { // else change the theme from DOM module
            DOM.themeChanger();
        }
    }
}

export { Storage };