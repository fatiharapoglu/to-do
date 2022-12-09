(()=>{"use strict";class e{constructor(e,t="No details",s="Normal",i="No date"){this.name=e,this.details=t,this.priority=s,this.date=i,this.uniqueID=Date.now(),this.checked=!1}getName(){return this.name}setName(e){this.name=e}getUniqueID(){return this.uniqueID}toggleChecked(){this.checked?this.checked=!1:this.checked=!0}isChecked(){return this.checked}getDetails(){return this.details}setDetails(e){this.details=e}getDate(){return this.date}setDate(e){this.date=e}getPriority(){return this.priority}setPriority(e){this.priority=e}}class t{constructor(e,t=""){this.name=e,this.details=t,this.taskList=[],this.uniqueID=Date.now()}getName(){return this.name}setName(e){this.name=e}getUniqueID(){return this.uniqueID}getDetails(){return this.details}setDetails(e){this.details=e}getTaskList(){return this.taskList}setTaskList(e){this.taskList=e}getTask(e){return this.taskList.find((t=>t.getUniqueID()==e))}addTask(e){this.taskList.push(e)}removeTask(e){this.taskList=this.taskList.filter((t=>t.getUniqueID()!==e))}getHighPriority(){return this.taskList.filter((e=>"High"==e.getPriority()))}}class s{constructor(){this.projectList=[]}getProjectList(){return this.projectList}setProjectList(e){this.projectList=e}getProject(e){return this.projectList.find((t=>t.getUniqueID()==e))}addProject(e){this.projectList.push(e)}removeProject(e){this.projectList=this.projectList.filter((t=>t.getUniqueID()!==e))}}class i{static wrapper=new s;static defaultProject=new t(" myTask","Stay organized, stay focused.");static activeProject=this.defaultProject;static pushDefault(){this.wrapper.projectList.push(this.defaultProject),this.activeProject=this.defaultProject,this.renderProjects()}static getDefaultHome(){this.buttonHandlers(),this.pushDefault(),this.renderProjects(),this.renderTasks(),this.selectProject()}static buttonHandlers(){const e=document.querySelector("#new-task-btn"),t=document.querySelector("#new-project-btn"),s=document.querySelector("#task-form"),i=document.querySelector("#project-form"),c=document.querySelector("#close-task-modal-btn"),r=document.querySelector("#close-project-modal-btn"),a=document.getElementById("all-tasks"),o=document.getElementById("high-priority-tasks");e.addEventListener("click",this.openNewTaskModal),t.addEventListener("click",this.openNewProjectModal),c.addEventListener("click",this.closeNewTaskModal),r.addEventListener("click",this.closeNewProjectModal),s.addEventListener("submit",(e=>{e.preventDefault(),this.addNewTask()})),i.addEventListener("submit",(e=>{e.preventDefault(),this.addNewProject()})),a.addEventListener("click",(()=>this.renderAllTasks("AllTab"))),o.addEventListener("click",(()=>this.renderAllTasks("HighPrioTab")))}static openNewTaskModal(){document.querySelector("#new-task-modal").classList.remove("hidden")}static openNewProjectModal(){document.querySelector("#new-project-modal").classList.remove("hidden")}static closeNewTaskModal(){document.querySelector("#new-task-modal").classList.add("hidden")}static closeNewProjectModal(){document.querySelector("#new-project-modal").classList.add("hidden")}static addNewTask(){const t=document.getElementById("task"),s=document.getElementById("task-details"),i=document.getElementById("date"),c=document.getElementById("priority");let r=t.value,a=s.value,o=i.value,n=c.value;""===o&&(o=void 0),""===a&&(a=void 0);let d=new e(r,a,n,o);this.getActiveProject().addTask(d),this.closeNewTaskModal(),this.clearForm(),this.renderTasks(),console.log(this.wrapper.getProjectList())}static addNewProject(){const e=document.getElementById("project"),s=document.getElementById("project-details");let i=e.value,c=s.value,r=new t(i,c),a=r.getUniqueID();this.wrapper.addProject(r),this.closeNewProjectModal(),this.clearForm(),this.setActiveProject(a),this.renderProjects(),this.renderTasks(),console.log(this.wrapper.getProjectList())}static initRemoveTask(){document.querySelectorAll(".close-btn-task").forEach((e=>e.addEventListener("click",(e=>{let t=this.getActiveProject().getTaskList().findIndex((t=>t.getUniqueID()==e.target.id));this.getActiveProject().getTaskList().splice(t,1),this.renderTasks()}))))}static initRemoveProject(){document.querySelectorAll(".close-btn-project").forEach((e=>e.addEventListener("click",(e=>{let t=this.wrapper.getProjectList().findIndex((t=>t.getUniqueID()==e.target.id));" myTask"!=e.target.parentNode.querySelector("a").textContent&&(this.getActiveProject().getUniqueID()==e.target.id&&(this.activeProject=this.defaultProject),this.wrapper.getProjectList().splice(t,1),this.renderProjects(),this.renderTasks())}))))}static setActiveProject(e){this.activeProject=this.wrapper.getProject(e)}static getActiveProject(){return this.activeProject}static renderTasks(){const e=document.querySelector("#content");e.innerHTML="";let t=this.getActiveProject().getTaskList();for(let s of t)e.innerHTML+=`\n            <div class="task-item flex-task">\n            <div class="checkbox">\n                    <input type="checkbox" name="checkbox" data-id="${s.getUniqueID()}" ${s.isChecked()?"checked":"unchecked"}>\n                    <label class="${s.isChecked()?"crossed":"uncrossed"}" for="checkbox">${s.getName()}</label>\n                </div>\n                <div class="flex-task-items">\n                    <div>${s.getPriority()}</div>\n                    <div>${s.getDate()}</div>\n                </div>\n                <div id="${s.getUniqueID()}" class="close-btn-task">x</div>\n            </div>\n            `;this.initRemoveTask(),this.highlightActive(),this.renderProjectHeader(),this.checkCheckbox()}static renderProjects(){const e=document.querySelector("#project-list");e.innerHTML="";let t=this.wrapper.getProjectList();for(let s of t)e.innerHTML+=`\n            <li>\n                <div class="project-item" data-id="${s.getUniqueID()}">\n                    <a href="#">${s.getName().charAt(0).toUpperCase()+s.getName().slice(1)}</a>\n                </div>\n                <div id="${s.getUniqueID()}" class="close-btn-project">x</div>\n            </li>\n            `;this.initRemoveProject(),this.selectProject(),this.highlightActive()}static clearForm(){const e=document.getElementById("task"),t=document.getElementById("task-details"),s=document.getElementById("project"),i=document.getElementById("project-details");e.value="",t.value="",s.value="",i.value=""}static highlightActive(){let e=this.getActiveProject().getUniqueID();this.removeAllHighlights(),document.getElementById(e).parentNode.querySelector(".project-item").classList.add("active-project")}static removeAllHighlights(){document.querySelectorAll(".active-project").forEach((e=>e.classList.remove("active-project")))}static selectProject(){document.querySelectorAll(".project-item").forEach((e=>e.addEventListener("click",(e=>{let t=e.target.parentNode.dataset.id;this.setActiveProject(t),this.renderProjects(),this.renderTasks()}))))}static renderAllTasks(e){const t=document.querySelector("#content");t.innerHTML="";let s=this.wrapper.getProjectList();for(let i of s){let s;"AllTab"==e||null==e?s=i.getTaskList():"HighPrioTab"==e&&(s=i.getHighPriority());for(let e=0;e<s.length;e++)t.innerHTML+=`\n                <div class="task-item flex-task">\n                    <div class="checkbox">\n                        <input type="checkbox" name="checkbox" data-id="${s[e].getUniqueID()}" ${s[e].isChecked()?"checked":"unchecked"}>\n                        <label class="${s[e].isChecked()?"crossed":"uncrossed"}" for="checkbox">${s[e].getName()}</label>\n                    </div>\n                    <div class="flex-task-items">\n                        <div>${s[e].getPriority()}</div>\n                        <div>${s[e].getDate()}</div>\n                    </div>\n                    <div id="${s[e].getUniqueID()}" class="close-btn-task">x</div>\n                </div>\n                `}this.initRemoveForAllTasks(e),this.removeAllHighlights(),"AllTab"==e||null==e?document.getElementById("all-tasks").parentNode.classList.add("active-project"):"HighPrioTab"==e&&document.getElementById("high-priority-tasks").parentNode.classList.add("active-project"),this.renderProjectHeaderForAllTasks(e),this.checkCheckboxForAllTasks(e)}static initRemoveForAllTasks(e){document.querySelectorAll(".close-btn-task").forEach((t=>t.addEventListener("click",(t=>{let s=t.target.id,i=this.wrapper.getProjectList();for(let e of i){let t=e.getTaskList().find((e=>e.getUniqueID()==s)),i=e.getTaskList().indexOf(t);void 0!==t&&e.getTaskList().splice(i,1)}this.renderAllTasks(e)}))))}static renderProjectHeader(){const e=document.getElementById("project-header-name"),t=document.getElementById("project-header-details");e.textContent=`\n        ${this.getActiveProject().getName()}\n        `,t.textContent=`\n        ${this.getActiveProject().getDetails().charAt(0).toUpperCase()+this.getActiveProject().getDetails().slice(1)}\n        `}static renderProjectHeaderForAllTasks(){const e=document.getElementById("project-header-name"),t=document.getElementById("project-header-details");e.textContent="All Tasks",t.textContent=`Active Project: ${this.getActiveProject().getName()}`}static checkCheckbox(){document.querySelectorAll("input[type=checkbox]").forEach((e=>e.addEventListener("change",(e=>{let t=e.target.dataset.id;this.getActiveProject().getTask(t).toggleChecked(),this.renderTasks()}))))}static checkCheckboxForAllTasks(e){document.querySelectorAll("input[type=checkbox]").forEach((t=>t.addEventListener("change",(t=>{let s=t.target.dataset.id,i=this.wrapper.getProjectList();for(let t of i){let i=t.getTaskList().find((e=>e.getUniqueID()==s));void 0!==i&&(i.toggleChecked(),this.renderAllTasks(e))}}))))}}i.getDefaultHome()})();