class Storage {
    static setProjectsToStorage(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }
    static getProjectsFromStorage() {
        let storedProjects = localStorage.getItem("projects");
        let retrievedProjects = JSON.parse(storedProjects);
        return retrievedProjects;
    }
    static setTasksToStorage(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
    static getTasksFromStorage() {
        let storedTasks = localStorage.getItem("tasks");
        let retrievedTasks = JSON.parse(storedTasks);
        return retrievedTasks;
    }

}

export { Storage };