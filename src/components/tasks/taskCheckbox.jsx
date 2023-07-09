import React, {useState} from 'react'
import { ImBin } from "react-icons/im";
import { IoTodayOutline } from "react-icons/io5";
import { IoToday } from "react-icons/io5";
import { RiDeviceRecoverLine } from "react-icons/ri";
import { Link } from 'react-router-dom';



export default function TaskCheckbox({id, tasks, task, setTasks, currentTask, onTaskSelect, taskBodyDisabled, setTaskBodyDisabled, setCurrentTask, currentProject, setCurrentProject}) {

const [hamburgerClasses, setHamburgerClasses] = useState('menu hamburger')
const [taskMenuClasses, setTaskMenuClasses] = useState('taskMenu')

function handleHamburger(e) {
  setHamburgerClasses(hamburgerClasses==='menu hamburger'?'menu hamburger openHamburger menuScroll':'menu hamburger')
  setTaskMenuClasses(taskMenuClasses==='taskMenu'?'taskMenu taskMenuScroll':'taskMenu')
  setCurrentTask(e)
}
function handleCheck(currentTaskId) {
  setTasks((tasks.map(task => {
    if (task.taskId === currentTaskId) {
    return {...task, archived: task.archived===true?false:true}
    } else {
    return task
    }
    })))
} 
function handleTaskEdit(e) {
  setTasks((tasks.map(task => {
    if (task.taskId === currentTask) {
    return {...task, task: e.target.value}
    } else {
    return task
    }
    })))
}
function handleTaskDelete() {
  setTasks((tasks.map(task => {
    if (task.taskId === currentTask) {
    return {...task, deleted: true}
    } else {
    return task
    }
    })))
}
function handleTaskRecover() {
  setTasks((tasks.map(task => {
    if (task.taskId === currentTask) {
    return {...task, deleted: false}
    } else {
    return task
    }
    })))
   setCurrentProject(tasks.find(task=>task.taskId===currentTask).projectId)
}
function handleTaskToday() {
  setTasks((tasks.map(task => {
    if (task.taskId === currentTask) {
    return {...task, today: true}
    } else {
    return task
    }
    })))
    handleHamburger()
}
function handleTaskUnToday() {
  setTasks((tasks.map(task => {
    if (task.taskId === currentTask) {
    return {...task, today: false}
    } else {
    return task
    }
    })))
    handleHamburger()
}
  return (
    <div> 
        <div className={currentTask===task.taskId?'task taskActive':'task'} onClick={()=>{onTaskSelect(task.taskId)}}>

            <input className='checkbox' type='checkbox' onChange={()=>handleCheck(task.taskId)} checked={task.archived}/>

            <input disabled={taskBodyDisabled} autoFocus type='text' placeholder='New task' className='inputText' value={task.task} onChange={handleTaskEdit}/>

            {id==='deleted'?<div className={taskMenuClasses}>
            <button className={hamburgerClasses} onClick={()=>{handleHamburger(task.taskId)}}> 
              <span></span><span></span><span></span>
              </button>
              <Link to={`/tasks/${currentTask}`}><button onClick={handleTaskRecover} className='delete'><RiDeviceRecoverLine /></button></Link>
            
            </div>
            :<div className={taskMenuClasses}>
            <button className={hamburgerClasses} onClick={handleHamburger}> 
              <span></span><span></span><span></span>
              </button>
            <button onClick={handleTaskDelete} className='delete'><ImBin /></button>
            {tasks.find(todo=>todo.taskId===task.taskId)?.today===false?<button onClick={handleTaskToday} className='today'><IoTodayOutline /></button>:<button onClick={handleTaskUnToday} className='today'><IoToday /></button>}
            </div>}
            
        </div>

       
    </div>
  )
}
