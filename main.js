const taskList = [];
const STATUS = { IN_PROGRESS: 'in progress', DONE: 'done' };
const PRIORITIES = { LOW: 'low', HIGH: 'high' };

// ===============================================
// ===============================================

const highTasksWrapper = document.querySelector('.todo__high-content');
const lowTasksWrapper = document.querySelector('.todo__low-content');

const formForHighTasks = document.querySelector('.todo__high-wrapper');
const formForLowTasks = document.querySelector('.todo__low-wrapper'); //

const highInput = document.querySelector('.todo__high-input');
const lowInput = document.querySelector('.todo__low-input');

const addTaskButton = document.querySelector('.todo__add');
const delTaskButton = document.querySelector('.todo__close');

const tasksField = document.querySelector('.todo__fields');

function addTask(name, status, priority) {
  let duplicateTask = taskList.find((el) => {
    return el.name === name;
  });

  if (name === '') {
    return name.trim();
  }

  if (duplicateTask) {
    throw new Error('Задача уже существует дон');
  }

  if (name.length <= 3) {
    throw new Error('Строка слишком короткая');
  }

  if (name.length > 40) {
    throw new Error('Строка слишком длинная');
  }

  taskList.push({ name: name, status: status, priority: priority });
}

function delTask(task) {
  let isTaskIncluded = taskList.find((el) => {
    return el.name === task;
  });

  let taskIndex = taskList.findIndex((el) => {
    return el.name === task;
  });

  if (isTaskIncluded) {
    taskList.splice(taskIndex, 1);
  }
}

function changeTask(task, status) {
  let selectedTask = taskList.find((el) => {
    return el.name === task;
  });

  selectedTask.status = status;
}

function renderTasks() {
  highTasksWrapper.innerHTML = '';
  lowTasksWrapper.innerHTML = '';

  taskList.forEach((task) => {
    if (task.priority === PRIORITIES.HIGH && task.status === STATUS.IN_PROGRESS) {
      highTasksWrapper.insertAdjacentHTML(
        'afterbegin',
        `<div class="todo__fields">
          <div class="todo__close"></div>
          <label class="radio-button-label">
            <input class="todo__input" type="radio">
            <div class="todo__radio"></div>
            <span class="todo__input-text">${task.name}</span>
          </label>
        </div>`
      );
    } else if (task.priority === PRIORITIES.HIGH && task.status === STATUS.DONE) {
      highTasksWrapper.insertAdjacentHTML(
        'afterbegin',
        `<div style="background-color: #6633993b" class="todo__fields">
          <div class="todo__close"></div>
          <label class="radio-button-label">
            <input class="todo__input" type="radio" checked>
            <div class="todo__radio"></div>
            <span style="text-decoration: line-through; text-decoration-color: purple;"
    class="todo__input-text">${task.name}</span>
          </label>
        </div>`
      );
    }

    if (task.priority === PRIORITIES.LOW && task.status === STATUS.IN_PROGRESS) {
      lowTasksWrapper.insertAdjacentHTML(
        'afterbegin',
        `<div class="todo__fields">
          <div class="todo__close"></div>
          <label class="radio-button-label">
            <input class="todo__input" type="radio">
            <div class="todo__radio"></div>
            <span class="todo__input-text">${task.name}</span>
          </label>
        </div>`
      );
    } else if (task.priority === PRIORITIES.LOW && task.status === STATUS.DONE) {
      lowTasksWrapper.insertAdjacentHTML(
        'afterbegin',
        `<div style="background-color: #6633993b" class="todo__fields">
          <div class="todo__close"></div>
          <label class="radio-button-label">
            <input class="todo__input" type="radio" checked>
            <div class="todo__radio"></div>
            <span style="text-decoration: line-through; text-decoration-color: purple;"
    class="todo__input-text">${task.name}</span>
          </label>
        </div>`
      );
    }
  });
}

formForHighTasks.addEventListener('submit', (event) => {
  event.preventDefault();

  const highInputText = highInput.value.trim();

  if (highInputText === '') {
    highInput.value = '';
    return;
  }

  try {
    addTask(highInputText, STATUS.IN_PROGRESS, PRIORITIES.HIGH);
  } catch (error) {
    alert(error.message);
  }

  highInput.value = '';

  renderTasks();
});

highTasksWrapper.addEventListener('click', (event) => {
  if (event.target.classList.contains('todo__close')) {
    const parentElement = event.target.parentElement;
    const currentTask = parentElement.querySelector('.todo__input-text');

    const currentTaskText = currentTask.textContent;

    delTask(currentTaskText);
    renderTasks();
  }
});

highTasksWrapper.addEventListener('change', (event) => {
  if (event.target.classList.contains('todo__input')) {
    const parentElement = event.target.parentElement;
    const currentTask = parentElement.parentElement;
    const currentTaskText = currentTask.querySelector('.todo__input-text').textContent;

    if (event.target.checked) {
      changeTask(currentTaskText, STATUS.DONE);
      currentTask.style.textDecoration = 'line-through';
      currentTask.style.textDecorationColor = 'purple';
      currentTask.style.backgroundColor = '#6633993b';
    }
  }
});

// ===============================================

formForLowTasks.addEventListener('submit', (event) => {
  event.preventDefault();

  const lowInputText = lowInput.value;

  addTask(lowInputText, STATUS.IN_PROGRESS, PRIORITIES.LOW);

  if (lowInputText === '') {
    return;
  }

  lowInput.value = '';

  renderTasks();
});

lowTasksWrapper.addEventListener('click', (event) => {
  if (event.target.classList.contains('todo__close')) {
    const parentElement = event.target.parentElement;
    const currentTask = parentElement.querySelector('.todo__input-text').textContent;

    delTask(currentTask);
    renderTasks();
  }
});

lowTasksWrapper.addEventListener('change', (event) => {
  if (event.target.classList.contains('todo__input')) {
    const parentElement = event.target.parentElement;
    const currentTask = parentElement.parentElement;
    const currentTaskText = currentTask.querySelector('.todo__input-text').textContent;

    if (event.target.checked) {
      changeTask(currentTaskText, STATUS.DONE);
      currentTask.style.textDecoration = 'line-through';
      currentTask.style.textDecorationColor = 'purple';
      currentTask.style.backgroundColor = '#6633993b';
    }
  }
});
