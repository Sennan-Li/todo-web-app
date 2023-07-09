import React from 'react'
import { TiPlusOutline } from "react-icons/ti";
import { IoChevronBackOutline  } from "react-icons/io5";
import _uniqueId from 'lodash/uniqueId';

export default function TasksHeader({id, projects, setProjects, hamburgerClasses, dropdownClasses, currentProject, tasks, setTasks, onHamburger, onBack, onTaskSelect, setTaskBodyDisabled, onProjectEdit}) {

  function handleProjectDelete() {
    setProjects(projects.filter(project=>project.projectId!==currentProject))
    setTasks(tasks.filter(task=>task.projectId!==currentProject))
    onBack()
    setTasks((tasks.map(task => {
      if (task.projectId === currentProject) {
      return {...task, deleted: true}
      } else {
      return task
      }
      })))
  }


      function handleTaskAdd() {
        let newTask;
        currentProject === 'today'? newTask ={
            archived: false,
            task: '',
            date: '09/05/2023',
            projectId: String(currentProject),
            taskId: String(_uniqueId('task-')),
            today: true,
            deleted: false,
        }:newTask ={
              archived: false,
              task: '',
              date: '09/05/2023',
              projectId: String(currentProject),
              taskId: String(_uniqueId('task-')),
              today: false,
              deleted: false,
            }
            setTasks([...tasks, newTask])
            onTaskSelect(newTask.taskId)
        }
       
        
    
      const styleBlack = {color: '#000'}
      const styleGrey = {color: 'Grey'}
      const styleRed = {color: 'Red'}
      const styleGreen = {color: '#64b07b'}
      const styleLavender = {color: 'rgb(142, 142, 230)'}

      let addButton;
      if (currentProject!=='search' && currentProject !=='completed' && currentProject !=='deleted') { 
        addButton = (<button className='addTask' onClick={handleTaskAdd}><TiPlusOutline/></button>)}
  return (
    <div className='taskHeader'>

   {projects.find(project => project.projectId === currentProject)?.projectId===currentProject?
    <div className='listHeading'>
  
   <IoChevronBackOutline className='backIcon' onClick={onBack}/>
    
    <input className='heading' type='text' value={projects.find(project => project.projectId === currentProject)?.name} onChange={onProjectEdit} />
</div>

:<div className='listHeading'>
    <IoChevronBackOutline className='backIcon' onClick={onBack}/>
  <h2 style={currentProject==='all'?styleBlack:currentProject==='completed'?styleGrey:currentProject==='today'?styleGreen:currentProject==='search'?styleLavender:currentProject==='deleted'?styleRed:null}>{currentProject==='all'?'All':currentProject==='completed'?'Completed':currentProject==='today'?'Today':currentProject==='search'?'Search results':currentProject==='deleted'?'Deleted':null}</h2>
  </div>}
  
    {addButton}
  </div>
  )
}
