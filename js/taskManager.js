const statusInfo = {
  PORHACER: { label: 'Por hacer', badge: 'text-bg-warning' },
  ENPROGRESO: { label: 'En progreso', badge: 'text-bg-info' },
  HECHO: { label: 'Hecha', badge: 'text-bg-success' }
};

function formatDate(dueDate) {
  const [year, month, day] = dueDate.split('-');
  return day + '/' + month + '/' + year;
}

function createTaskHtml(id, name, description, dueDate, status) {
  const done = status === 'HECHO';
  const info = statusInfo[status];

  return `
    <div class="col">
      <div class="card task-card h-100 shadow-sm ${done ? 'task-done' : ''}" data-task-id="${id}">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-start mb-2">
            <h3 class="h6 card-title mb-0">${name}</h3>
            <span class="badge ${info.badge}">${info.label}</span>
          </div>
          <p class="card-text text-secondary small">${description}</p>
        </div>
        <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
          <span class="small text-secondary">Entrega: ${formatDate(dueDate)}</span>
          <div class="d-flex gap-2">
            <button type="button" class="done-button btn btn-sm ${done ? 'btn-success' : 'btn-outline-success'}">${done ? 'Desmarcar' : 'Marcar como hecha'}</button>
            <button type="button" class="delete-button btn btn-sm btn-outline-danger">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  `;
}

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, dueDate, status = 'PORHACER') {
    this.currentId++;

    this.tasks.push({
      id: this.currentId,
      name: name,
      description: description,
      dueDate: dueDate,
      status: status
    });
  }

  deleteTask(taskId) {
    const newTasks = [];

    for (let task of this.tasks) {
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }

    this.tasks = newTasks;
  }

  save() {
    localStorage.setItem('tasks', JSON.stringify(this.tasks));
    localStorage.setItem('currentId', String(this.currentId));
  }

  load() {
    if (localStorage.getItem('tasks')) {
      this.tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    if (localStorage.getItem('currentId')) {
      this.currentId = Number(localStorage.getItem('currentId'));
    }
  }

  render() {
    const tasksHtml = this.tasks.map(task =>
      createTaskHtml(task.id, task.name, task.description, task.dueDate, task.status)
    );

    document.querySelector('#taskList').innerHTML = tasksHtml.join('');
  }
}
