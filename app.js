const newTaskForm = document.querySelector('#newTaskForm');
const newTaskNameInput = document.querySelector('#newTaskNameInput');
const newTaskDescriptionInput = document.querySelector('#newTaskDescriptionInput');
const newTaskDateInput = document.querySelector('#newTaskDateInput');
const newTaskStatusInput = document.querySelector('#newTaskStatusInput');
const errorAlert = document.querySelector('#errorAlert');

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
    newTaskForm.reset();
  }
});
