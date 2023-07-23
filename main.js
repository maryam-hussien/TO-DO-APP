let input =document.querySelector('.input')
let submit=document.querySelector('.add')
let tasks=document.querySelector('.tasks')
let deleteAll=document.querySelector('.remove')
let arrayTasks=[]

if(localStorage.getItem('tasks')){
    arrayTasks=JSON.parse(localStorage.getItem('tasks'))
}
getData();

submit.onclick=function () {
    if(input.value != ''){
        addTaskToArrray(input.value)
         input.value=''
    }
}
deleteAll.onclick=function(){
tasks.innerHTML=''
localStorage.removeItem('tasks')
}
tasks.addEventListener('click',(e)=>{
    if (e.target.classList.contains('del')) {
        e.target.parentElement.remove()
        
        deleteId(e.target.parentElement.getAttribute('data-id')) 
        
    }
    if (e.target.classList.contains('task')){
        toggleStatus(e.target.getAttribute("data-id"));
        e.target.classList.toggle('done');
    }
})

function addTaskToArrray(taskText) {
    const task={
        id:Date.now(),
        title:taskText,
        completed:false,
    }
    arrayTasks.push(task)
    addElements(arrayTasks)
    addLocalStorage(arrayTasks)
}

function addElements(arrayTasks) {
    tasks.innerHTML=''
    arrayTasks.forEach(task => {
        let div=document.createElement('div')
        div.className='task';
        if(task.completed){
            div.className='task done'
        }
        div.setAttribute('data-id',task.id)
        div.appendChild(document.createTextNode(task.title))
        let span =document.createElement('span')
        span.className='del'
        span.appendChild(document.createTextNode('delete'))
        div.appendChild(span)
        tasks.appendChild(div)

    });
}
function  addLocalStorage(arrayTasks){
    window.localStorage.setItem('tasks',JSON.stringify(arrayTasks))
}

function getData() {
    let data = window.localStorage.getItem('tasks');
    if(data){
        let tasks=JSON.parse(data);
        addElements(tasks);
    }
    
}
function deleteId(id) {
    arrayTasks = arrayTasks.filter((task) => task.id != id)
    addLocalStorage(arrayTasks);
}
function toggleStatus(taskId){
    for(i = 0 ; i < arrayTasks.length ; i++){
        if(arrayTasks[i].id == taskId){
           arrayTasks[i].completed == false ? (arrayTasks[i].completed = true) : (arrayTasks[i].completed = false);
        }
    }
    addLocalStorage(arrayTasks)
}
