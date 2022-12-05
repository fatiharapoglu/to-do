import { Task, Project, Wrap } from "./taskandproject.js"

let a = new Task("deneme", "details", "yuksek", "now");
let b = new Task("annen", "details", "yuksek", "now");
let c = new Task("baban", "details", "yuksek", "now");
let d = new Task("bok", "details", "yuksek", "now");
let e = new Task("pusur", "details", "yuksek", "now");
let f = new Task("cop", "details", "yuksek", "now");

let deneme = new Project("project");
console.log(deneme)

deneme.taskList.push(a, b, c, d, e, f)
console.log(deneme.taskList);

deneme.removeTask(a.getName());
console.log(deneme.taskList)

deneme.addTask(new Task("newbaba", "details", "low", "now"));
console.log(deneme.taskList)

deneme.addTask(new Task("garbage"))
console.log(deneme.taskList)

let dom = document.getElementById("content");
for (let i=0; i<deneme.taskList.length; i++) {
    dom.innerHTML += `
    Name: ${deneme.taskList[i].name} <br>
    Details: ${deneme.taskList[i].details} <br>
    Priority: ${deneme.taskList[i].priority} <br>
    Date: ${deneme.taskList[i].date} <br>
    <br>`
}

let wrap = new Wrap();
wrap.addProject(deneme);
console.log(wrap.projectList[0].taskList);

