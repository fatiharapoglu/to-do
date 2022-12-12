import { Wrap, Project, Task } from "./classes";
import { DOM } from "./DOM";

class Storage {
    static setProjectsToStorage(projects) {
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
    static loadFromStorage() {
        let newWrapper = new Wrap();
        let retrievedProjects = this.getProjectsFromStorage();
        if (retrievedProjects === null) {
            DOM.pushDefault();
        } else {
            newWrapper.setProjectList(retrievedProjects);
            newWrapper.setProjectList(
                newWrapper.getProjectList().map(
                    project => Object.assign(new Project(), project)
                )
            );
            newWrapper.getProjectList().forEach(
                project => project.setTaskList(
                    project.getTaskList().map(
                        task => Object.assign(new Task(), task)
                    )
                )
            );
            DOM.wrapper = newWrapper;
            DOM.activeProject = newWrapper.getProjectList().find(project => project.getName() == " myTask");
        }
    }
}

export { Storage };