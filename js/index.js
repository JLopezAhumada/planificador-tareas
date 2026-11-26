const taskManager = new TaskManager();

taskManager.load();

if (localStorage.getItem('tasks') === null) {
  taskManager.addTask('Estudiar para el parcial', 'Repasar los temas de HTML, CSS y Bootstrap vistos en clase.', '2026-11-12');
  taskManager.addTask('Wireframe en Figma', 'Diseñar las pantallas principales del planificador.', '2026-11-08', 'ENPROGRESO');
  taskManager.addTask('Tablero de Trello', 'Organizar las tareas del Sprint 1 en columnas.', '2026-11-01', 'HECHO');
  taskManager.addTask('Informe de redes', 'Documentar la topología y la configuración de los routers.', '2026-11-20');
  taskManager.addTask('Exposición de inglés', 'Preparar las diapositivas y practicar la presentación.', '2026-11-15', 'ENPROGRESO');
  taskManager.save();
}

console.log(taskManager.tasks);

const newTaskForm = document.querySelector('#newTaskForm');
const newTaskNameInput = document.querySelector('#newTaskNameInput');
const newTaskDescriptionInput = document.querySelector('#newTaskDescriptionInput');
const newTaskDateInput = document.querySelector('#newTaskDateInput');
const newTaskStatusInput = document.querySelector('#newTaskStatusInput');
const errorAlert = document.querySelector('#errorAlert');
const taskList = document.querySelector('#taskList');

function validFormFieldInput(data) {
  const errors = [];

  if (data.name.trim() === '') errors.push('El nombre no puede estar vacío.');
  if (data.description.trim() === '') errors.push('La descripción no puede estar vacía.');
  if (data.date === '') errors.push('Debes elegir una fecha de entrega.');
  if (data.status === '') errors.push('Debes seleccionar un estado.');

  return errors;
}

function showErrors(errors) {
  errorAlert.innerHTML = '<strong>Revisa el formulario:</strong><ul class="mb-0">' +
    errors.map(error => '<li>' + error + '</li>').join('') + '</ul>';
  errorAlert.classList.remove('d-none');
}

function hideErrors() {
  errorAlert.classList.add('d-none');
}

newTaskForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const data = {
    name: newTaskNameInput.value,
    description: newTaskDescriptionInput.value,
    date: newTaskDateInput.value,
    status: newTaskStatusInput.value
  };

  console.log('name: ' + data.name);
  console.log('description: ' + data.description);
  console.log('date: ' + data.date);
  console.log('status: ' + data.status);

  const errors = validFormFieldInput(data);

  if (errors.length > 0) {
    showErrors(errors);
  } else {
    hideErrors();
    taskManager.addTask(data.name, data.description, data.date, data.status);
    taskManager.save();
    console.log(taskManager.tasks);
    taskManager.render();
    newTaskForm.reset();
  }
});

taskList.addEventListener('click', function (event) {
  if (event.target.classList.contains('done-button')) {
    const parentTask = event.target.closest('.task-card');
    const taskId = Number(parentTask.dataset.taskId);
    const task = taskManager.tasks.find(task => task.id === taskId);

    task.status = task.status === 'HECHO' ? 'PORHACER' : 'HECHO';
    taskManager.save();
    taskManager.render();
  }

  if (event.target.classList.contains('delete-button')) {
    const parentTask = event.target.closest('.task-card');
    const taskId = Number(parentTask.dataset.taskId);

    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
  }
});

taskManager.render();
