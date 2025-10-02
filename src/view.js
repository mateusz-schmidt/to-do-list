import { app, Project, Task } from "./logic.js";

const cancelButton = document.querySelector(`.cancel`);
const input = document.querySelector(`.project-input`);
const projectDialog = document.querySelector(`.project`);
const form = document.querySelector(`#project-form`);

const navBar = document.querySelector(`nav`);
const showProjectForm = document.querySelector(`.add-project`);
const projectsList = document.querySelector(`.projects`);

const main = document.querySelector(`main`);
const mainHeader = document.createElement(`h2`);
mainHeader.classList.add(`main-header`);


app.loadProjects();
showProjects();

/* //navigation bar */

function showProjects() {
  projectsList.innerHTML = ``;

  const sortedProjects = [...app.projects].sort((a, b) =>
    a.name.toLowerCase().localeCompare(b.name.toLowerCase())
  );

  sortedProjects.forEach((project) => {
    const li = document.createElement(`li`);
    li.textContent = project.name;
    li.setAttribute(`data-id`, `${project.id}`);
    li.setAttribute(`class`, `category`);
    const deleteBtn = document.createElement(`span`);
    deleteBtn.classList.add(`delete-btn`);
    deleteBtn.textContent = `-`;
    li.appendChild(deleteBtn);
    projectsList.appendChild(li);
  });
}

projectsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete-btn")) {
    const projectId = e.target.closest("li").dataset.id;
    app.removeProject(projectId);
    showProjects();
  }
});

navBar.addEventListener("click", (e) => {
  if (e.target.classList.contains("category")) {
    let label = e.target.childNodes[0].textContent.trim();
    main.innerHTML = ``;
    mainHeader.textContent = label.toUpperCase();
    const showTaskForm = document.createElement(`span`);
    showTaskForm.textContent = `+`;
    showTaskForm.classList.add(`add-task`);
    showTaskForm.addEventListener(`click`, () => {
      const taskDialog = document.querySelector(`.task`);
      taskDialog.showModal();
    })
    mainHeader.appendChild(showTaskForm);
    main.appendChild(mainHeader);
  }
});

/* //main section */



/* //project dialog */

showProjectForm.addEventListener(`click`, () => {
  projectDialog.showModal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addProject();
});

cancelButton.addEventListener(`click`, () => {
  input.value = ``;
  projectDialog.close();
});

function addProject() {
  const projectName = input.value;

  if (app.projects.some(project => project.name === projectName)) {
    alert("Project name already exists");
    return;
  }

  if (projectName.length === 0) {
    alert("Project name cannot be empty");
    return;
  }

  app.addProject(new Project(projectName));
  input.value = ``;
  showProjects();
}

/* //task dialog */