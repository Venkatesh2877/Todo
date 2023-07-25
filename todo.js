var tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');
const uncompletedCounter = document.getElementById('uncompleted-tasks-counter');


//create and add a new task to DOM
function addTaskToDOM(task){
    const li= document.createElement('li');

    li.innerHTML=`
        <input type="checkbox" id="${task.id}" ${task.completed?'checked': ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <span id=${task.id}  ><i id=${task.id}  class="fa-solid fa-trash-can"></i></span>         
    `;
    tasksList.append(li);
}


//render the list by first emptying the list and later adding the list from the tasks array
function renderList () {
    tasksList.innerHTML='';
    var uncompletedCount=0;
    for(let i=0;i<tasks.length;i++){
        addTaskToDOM(tasks[i]);

        if(tasks[i].completed==false){
            uncompletedCount++;
        }
    }

    tasksCounter.innerHTML=tasks.length; //prints the total tasks in the list
    uncompletedCounter.innerHTML=uncompletedCount;
}

//render list task that are completed
function renderCompletedList(){
    tasksList.innerHTML='';
    var uncompletedCount=0;
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].completed==true){
            addTaskToDOM(tasks[i]);
        }else{
            uncompletedCount++;
        }
    }

    tasksCounter.innerHTML=tasks.length; //prints the total tasks in the list
    completedCounter.innerHTML=uncompletedCount;
}

//render list task that are not completed
function renderUnCompletedList(){
    tasksList.innerHTML='';
    var uncompletedCount=0;
    for(let i=0;i<tasks.length;i++){
        if(tasks[i].completed==false){
            uncompletedCount++;
            addTaskToDOM(tasks[i]);
        }
    }

    tasksCounter.innerHTML=tasks.length; //prints the total tasks in the list
    completedCounter.innerHTML=uncompletedCount;
}

//mark the task is completed by changing the done as true
function markTaskAsComplete (taskId) {
    if(taskId){
        const completedTask=tasks.find(function(task){
            return task.id==taskId;
         });
         completedTask.completed=true;
         renderList();
         showNotification('task completed');  
    }else{
        showNotification('task not found')
    }
}

//mark all complete
function markAllcomplete(){
    for(task of tasks){
        task.completed=true;
    }
    renderList();
    showNotification('All tasks completed')
}

//delete the task by its id
function deleteTask (taskId) {
    const newTasks= tasks.filter(function(task){
        return task.id!=taskId;
    });
    tasks=newTasks;
    renderList();
    showNotification('task deleted');
}

//clear all task
function clearAll(){
    if(tasks.length>0){
        tasks=[];
        renderList()
        showNotification('All tasks cleared');
    }else{
        showNotification('No tasks to clear');
    }
    
}

//adding the task into the tasks array
function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('task added');
        return;
    }
    showNotification('task cannot be added');
}


//show alert notification once every task has been executed
function showNotification(text) {
    alert(text);
}

//handler to collect the data that has been entered into the input textbox
function handleInputKeypress(e){
    
    if(e.key==='Enter'){
        const data=e.target.value;

        if(!data){
            showNotification('task is empty')
            return;
        }

        const task={
            title: data,
            id: Date.now().toString(),
            completed: false
        }

        e.target.value='';
        addTask(task);

    }
}

//handleclick
function handleClickListener(e){
    const tgt=e.target;
    console.log(tgt.className);
    if(tgt.tagName==='I'){
        let taskId=tgt.id;
        deleteTask(taskId);
        return;
    }else if(tgt.className==='custom-checkbox'){
       // console.log(tgt.id);
        markTaskAsComplete(tgt.id);
        return;
    }else if(tgt.className==='listCompleted'){
        renderCompletedList();
    }else if(tgt.className==='listUnCompleted'){
        renderUnCompletedList();
    }else if(tgt.className==='all'){
        renderList();
    }else if(tgt.className=='completeAll'){
        markAllcomplete();
    }else if(tgt.className=='clearAll'){
        clearAll();
    }
}


//start our app
function start(){
    addTaskInput.addEventListener('keyup', handleInputKeypress);
    document.addEventListener('click', handleClickListener);
}


start();

