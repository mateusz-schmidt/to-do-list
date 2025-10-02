const app = {
  projects: [],
  loadProjects() {
    const stored = localStorage.getItem("projects");
    if (stored) {
      this.projects = JSON.parse(stored);
    }
  },

  saveProjects() {
    localStorage.setItem("projects", JSON.stringify(this.projects));
  },

  addProject(project) {
    this.projects.push(project);
    this.saveProjects();
  },

  removeProject(projectId) {
    this.projects = this.projects.filter((p) => p.id !== projectId);
    this.saveProjects();
  },
};

class Project {
  constructor(name) {
    this.name = name;
    this.tasks = [];
    this.id = crypto.randomUUID();
  }

  addTask(task) {
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
  }
}

export default class Task {
  constructor(title, description = null, priority = null, dueDate = null) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.completed = false;
    this.dueDate = dueDate;
    this.id = crypto.randomUUID(); 
  }

  toggleCompleted() {
    this.completed = !this.completed;
  }
}

export { app, Project, Task };
