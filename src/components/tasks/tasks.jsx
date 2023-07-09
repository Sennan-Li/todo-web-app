import React from 'react'
import TaskCheckbox from './taskCheckbox'
import TasksHeader from './tasksHeader';

export default function Tasks(props) {

  const filteredTasks = props.currentProject==='all'?props.tasks.filter(task=>task.archived===false):props.currentProject==='completed'?props.tasks.filter(task=>task.archived===true):props.currentProject==='today'?props.tasks.filter(task=>task.today===true):props.currentProject==='search'?props.tasks:props.currentProject==='deleted'?props.tasks.filter(task=>task.deleted===true):props.tasks.filter(task=>task.archived===false).filter(task=>task.projectId===props.currentProject)
  
  const todo = props.currentProject==='deleted'?filteredTasks:filteredTasks.filter(task=>task.deleted===false)

  function handleClick() {
    props.setTaskBodyDisabled(false)
    props.onListDisable()
    props.onCloseOthers()
  }
  return (

      <div className={props.taskContentClasses} onClick={handleClick}>
          <TasksHeader {...props} />

          <div className='taskBody'>
            {todo.map(task=>(
            <TaskCheckbox key={task.taskId} task={task} {...props}/>
            ))}
          </div>
      </div>  
  )
}