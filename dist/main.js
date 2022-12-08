(()=>{"use strict";class t{constructor(t,e="No details",s="Normal",i="No date"){this.name=t,this.details=e,this.priority=s,this.date=i,this.uniqueID=Date.now()}getName(){return this.name}setName(t){this.name=t}getUniqueID(){return this.uniqueID}getDetails(){return this.details}setDetails(t){this.details=t}getDate(){return this.date}setDate(t){this.date=t}getPriority(){return this.priority}setPriority(t){this.priority=t}}class e{constructor(t,e="No details"){this.name=t,this.details=e,this.taskList=[],this.uniqueID=Date.now()}getName(){return this.name}setName(t){this.name=t}getUniqueID(){return this.uniqueID}getDetails(){return this.details}setDetails(t){this.details=t}getTaskList(){return this.taskList}setTaskList(t){this.taskList=t}getTask(t){return this.taskList.find((e=>e.getUniqueID()==t))}addTask(t){this.taskList.push(t)}removeTask(t){this.taskList=this.taskList.filter((e=>e.getUniqueID()!==t))}}class s{constructor(){this.projectList=[]}getProjectList(){return this.projectList}setProjectList(t){this.projectList=t}getProject(t){return this.projectList.find((e=>e.getUniqueID()==t))}addProject(t){this.projectList.push(t)}removeProject(t){this.projectList=this.projectList.filter((e=>e.getUniqueID()!==t))}}class i{static wrapper=new s;static defaultProject=new e(" myTask","This is the default project");static activeProject=this.defaultProject;static pushDefault(){this.wrapper.projectList.push(this.defaultProject),this.activeProject=this.defaultProject,this.renderProjects()}static getDefaultHome(){this.buttonHandlers(),this.pushDefault(),this.renderProjects(),this.renderTasks(),this.selectProject()}static buttonHandlers(){const t=document.querySelector("#new-task-btn"),e=document.querySelector("#new-project-btn"),s=document.querySelector("#task-form"),i=document.querySelector("#project-form"),r=document.querySelector("#close-task-modal-btn"),c=document.querySelector("#close-project-modal-btn"),a=document.getElementById("all-tasks");t.addEventListener("click",this.openNewTaskModal),e.addEventListener("click",this.openNewProjectModal),r.addEventListener("click",this.closeNewTaskModal),c.addEventListener("click",this.closeNewProjectModal),s.addEventListener("submit",(t=>{t.preventDefault(),this.addNewTask()})),i.addEventListener("submit",(t=>{t.preventDefault(),this.addNewProject()})),a.addEventListener("click",this.getAllTasks.bind(this))}static openNewTaskModal(){document.querySelector("#new-task-modal").classList.remove("hidden")}static openNewProjectModal(){document.querySelector("#new-project-modal").classList.remove("hidden")}static closeNewTaskModal(){document.querySelector("#new-task-modal").classList.add("hidden")}static closeNewProjectModal(){document.querySelector("#new-project-modal").classList.add("hidden")}static addNewTask(){const e=document.getElementById("task"),s=document.getElementById("task-details"),i=document.getElementById("date"),r=document.getElementById("priority");let c=e.value,a=s.value,o=i.value,n=r.value;""===o&&(o=void 0);let l=new t(c,a,n,o);this.getActiveProject().addTask(l),this.closeNewTaskModal(),this.clearForm(),this.renderTasks(),0==this.wrapper.getProjectList().length&&this.pushDefault(),console.log(this.wrapper.getProjectList())}static addNewProject(){const t=document.getElementById("project"),s=document.getElementById("project-details");let i=t.value,r=s.value,c=new e(i,r),a=c.getUniqueID();this.wrapper.addProject(c),this.closeNewProjectModal(),this.clearForm(),this.setActiveProject(a),this.renderProjects(),this.renderTasks(),console.log(this.wrapper.getProjectList())}static initRemoveTask(){document.querySelectorAll(".close-btn-task").forEach((t=>t.addEventListener("click",(t=>{let e=this.getActiveProject().getTaskList().findIndex((e=>e.getUniqueID()==t.target.id));this.getActiveProject().getTaskList().splice(e,1),this.renderTasks()}))))}static initRemoveProject(){document.querySelectorAll(".close-btn-project").forEach((t=>t.addEventListener("click",(t=>{let e=this.wrapper.getProjectList().findIndex((e=>e.getUniqueID()==t.target.id));" myTask"!=t.target.parentNode.querySelector("a").textContent&&(this.getActiveProject().getUniqueID()==t.target.id&&(this.activeProject=this.defaultProject),this.wrapper.getProjectList().splice(e,1),this.renderProjects(),this.renderTasks())}))))}static setActiveProject(t){this.activeProject=this.wrapper.getProject(t)}static getActiveProject(){return this.activeProject}static renderTasks(){const t=document.querySelector("#content");t.innerHTML="";let e=this.getActiveProject().getTaskList();for(let s of e)t.innerHTML+=`\n            <div class="task-item">\n                <div>\n                    <input type="checkbox" name="checkbox">\n                    <label for="checkbox">${s.getName()}</label>\n                </div>\n                <div id="${s.getUniqueID()}" class="close-btn-task">x</div>\n            </div>\n            `;this.initRemoveTask()}static renderProjects(){const t=document.querySelector("#project-list");t.innerHTML="";let e=this.wrapper.getProjectList();for(let s of e)t.innerHTML+=`\n            <li>\n                <div class="project-item" id="${s.getUniqueID()}">\n                    <a href="#">${s.getName().charAt(0).toUpperCase()+s.getName().slice(1)}</a>\n                </div>\n                <div id="${s.getUniqueID()}" class="close-btn-project">x</div>\n            </li>\n            `;this.initRemoveProject(),this.selectProject(),this.highlightActive()}static clearForm(){const t=document.getElementById("task"),e=document.getElementById("task-details"),s=document.getElementById("project"),i=document.getElementById("project-details");t.value="",e.value="",s.value="",i.value=""}static highlightActive(){let t=this.getActiveProject().getUniqueID();0==this.wrapper.getProjectList().length&&this.pushDefault(),document.getElementById(t).parentNode.querySelector(".project-item").classList.add("active-project")}static selectProject(){document.querySelectorAll(".project-item").forEach((t=>t.addEventListener("click",(t=>{this.setActiveProject(t.target.parentNode.id),this.renderProjects(),this.renderTasks()}))))}static getAllTasks(){const t=document.querySelector("#content");t.innerHTML="";let e=this.wrapper.getProjectList();for(let s of e){let e=s.getTaskList();for(let s=0;s<e.length;s++)t.innerHTML+=`\n                <div class="task-item">\n                    <div>\n                        <input type="checkbox" name="checkbox">\n                        <label for="checkbox">${e[s].getName()}</label>\n                    </div>\n                    <div id="${e[s].getUniqueID()}" class="close-btn-task">x</div>\n                </div>\n                `}this.initRemoveForAllTasks()}static initRemoveForAllTasks(){document.querySelectorAll(".close-btn-task").forEach((t=>t.addEventListener("click",(t=>{let e=t.target.id,s=this.wrapper.getProjectList();for(let t of s){let s=t.getTaskList().find((t=>t.getUniqueID()==e)),i=t.getTaskList().indexOf(s);void 0!==s&&t.getTaskList().splice(i,1)}this.getAllTasks()}))))}}i.getDefaultHome()})();