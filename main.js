const tasks = []; //tarea
let time = 0; //contar regresiva
let timer = null; // funcion setinterval 
let timerBreak = null; //descanso  
let current = null; //taea actual

const bAdd =   document.querySelector("#bAdd");
const itTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector('#time #taskname');
// listo
renderTime();
renderTasks();

form.addEventListener('submit', e => {
  e.preventDefault();
  if (itTask.value !== '') {
    createTask(itTask.value);
    itTask.value = '';
    renderTasks()
  }
});


function createTask(value) {
  const newTask = {
    id: (Math.random() * 100).toString(36).slice(3),
    title: value,
    completed: false,
  };

  tasks.unshift(newTask);
}  

function renderTasks() {
  const html = tasks.map((task) => {
 
    
    return`
    <div class="task">
           <div class="completed">${task.completed ? `<span class="done">Done</span>` : `<button class="start-button btn-task " data-id="${task.id}">Start</button>`}</div>

           <div class="title"> ${task.title}</div
    </div>`;
  })

  const taskContainer = document.querySelector("#tasks");
  taskContainer.innerHTML = html.join("");

  const startButtons = document.querySelectorAll('.task .start-button'); 
  startButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (!timer) {
        
        //console.log(timer)
        const id = button.getAttribute("data-id");

        startButtonHandler(id);
        button.textContent = "In progress...";
     }
    });
  });
}

function startButtonHandler(id) {
  //siempre hay que poner con minutos asi
  //here  se  cambia(tiempo de trabajo-word-jod)
  // time = 5;
  time = (25 * 60)+1;
  current = id;
  const taskIndex = tasks.findIndex((task) => task.id === id);
  const taskName = document.querySelector("#time #taskName");
  taskName.textContent = tasks[taskIndex].title;
//para cache el conteo de numero "setInterval()"
   timer = setInterval(() => {
    timerHanlder(id);
  }, 1000);
}
function timerHanlder(id) {
  time--;
  renderTime();
  
  if (time === 0) {
      //para detener el numero de conteo "learInterval()"
    clearInterval(timer);
      // current = null;
      // taskName.textContent = "";
    //probando e proyecto
    timer = null; 
    markCompleted(id);
    renderTasks();
    startBreak();
     }
} 
    
function startBreak() {
  // tiempo de reseso
  time = (5 * 60)+1;
  // time = 3;
  taskName.textContent = 'Break';
  timerBreak = setInterval(() => {
    timerBreakHanlder();
  }, 1000);
  
}
function timerBreakHanlder() {
  time--;
  renderTime();
  if (time === 0) {
    //para detener el numero de conteo "learInterval()"
    clearInterval(timerBreak);
    current = null;
    timerBreak = null;
    taskName.textContent = "";
    renderTasks();

    
  }
  
}

function renderTime() {
  const timeDiv = document.querySelector("#time #value");
  const minutos = parseInt(time / 60);
  const seconds = parseInt(time % 60);

  timeDiv.textContent = `${minutos < 10 ? "0" : ""}${minutos}:${seconds < 10 ? "0" : ""
  }${seconds}`;
 }
function markCompleted(id) {
  const taskIndex = tasks.findIndex((task) => task.id === id);
  tasks[taskIndex].completed = true;
  
}






