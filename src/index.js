import { Task, Project, Wrap } from "./classes.js"
import { DOM } from "./DOM.js";

DOM.getDefaultHome();

const wrapper = new Wrap ();
const defaultProject = new Project ("Default", "This is the default project");
wrapper.projectList.push(defaultProject);

export { wrapper, defaultProject }
