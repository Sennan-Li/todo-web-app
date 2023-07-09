import React from 'react'
import { Link } from "react-router-dom"
import _uniqueId from 'lodash/uniqueId';
import { FcSearch } from "react-icons/fc";
import { BsCardList } from "react-icons/bs";
import { BsCheck2All } from "react-icons/bs";
import { IoTodayOutline } from "react-icons/io5";
import {BsListTask} from 'react-icons/bs'
import {TfiSave } from 'react-icons/tfi'
import { RiDeleteBin3Line } from "react-icons/ri";
import { AiOutlineDelete } from "react-icons/ai";
export default function TaskLists({taskFootageClasses, projects, setProjects, listsClasses, onSearch, id, onProjectSelect, setCurrentProject, newListText, setTaskBodyDisabled, taskListDisabled, setTaskListDisabled, onProjectEdit, currentProject, taskListEditDisabled, setTaskListEditDisabled, tasks, setTasks, onCloseOthers}) {
  const newProject={
    name: newListText===''?'New List':newListText,
    date: '09/05/2023',
    projectId: String(_uniqueId('project-')),
  }

  function handleProjectAdd() {
    
      setProjects([...projects, newProject])
      setCurrentProject(newProject.projectId)
      setTaskListDisabled(false)
  }
  function handleListEdit() {
    setTaskListEditDisabled(false)
    setTaskListDisabled(false)
  }
  function handleListEditDisable() {
    setTaskListEditDisabled(true)
    setTaskListDisabled(true)
  }
  function handleListDelete(e) {
    setProjects(projects.filter(project=>project.projectId!==e))
    setTasks(tasks.filter(task=>task.projectId!==e))
    setTasks((tasks.map(task => {
      if (task.projectId === currentProject) {
      return {...task, deleted: true}
      } else {
      return task
      }
      })))
  }

  function handleClick(){
    setTaskBodyDisabled(true)
    onCloseOthers()
  }
  return (
    <div className='lists' onClick={handleClick}>
      
      <div className='searchBar' onClick={handleListEditDisable}>
      <FcSearch className='searchIcon'/>
      <Link to={`/tasks/search`} onClick={()=>onProjectSelect('search')}><input className='search' type="text" placeholder={'Search ...'} onChange={onSearch}/></Link>
      </div>

    <div className={listsClasses} onClick={taskListEditDisabled===true?()=>{setTaskListDisabled(true)}:null}>
      <div className="listOptions">

      <div className={(currentProject === 'all')?'taskListItem taskListItemActive':'taskListItem'} onClick={handleListEditDisable}> 
        <Link to={`/tasks/all`} onClick={()=>onProjectSelect('all')} >
        <div className='defaultList'>
          <BsCardList className='todoIcons'/>
          <h4>All</h4>
        </div>
        
        </Link>
      </div>

      <div className={(currentProject === 'completed')?'taskListItem taskListItemActive':'taskListItem'} onClick={handleListEditDisable}>
        <Link to={`/tasks/completed`} onClick={()=>onProjectSelect('completed')} >
        <div className='defaultList'>
          <BsCheck2All className='todoIcons todoIcons2'/>
          <h4>Done</h4>
        </div>
    
        </Link>
      </div>
     
      <div className={(currentProject === 'today')?'taskListItem taskListItemActive':'taskListItem'} onClick={handleListEditDisable}>
        <Link to={`/tasks/today`} onClick={()=>onProjectSelect('today')} >
        <div className='defaultList'>
          <IoTodayOutline className='todoIcons todoIcons3'/>
          <h4>Today</h4>
        </div>
        </Link>
      </div>

      <div className={(currentProject === 'deleted')?'taskListItem taskListItemActive':'taskListItem'} onClick={handleListEditDisable}>
        <Link to={`/tasks/deleted`} onClick={()=>onProjectSelect('deleted')} >
        <div className='defaultList'>
          <AiOutlineDelete className='todoIcons todoIcons4'/>
          <h4>Deleted</h4>
        </div>
        </Link>
      </div>
      </div>

      <h3>My Lists</h3>

      {projects.map(project => (
        <div key={project.projectId} className={taskListEditDisabled===true?(project.projectId===currentProject)?'taskListItem myList taskListItemActive':'taskListItem myList':(project.projectId===currentProject)?'taskListItem myList taskListItemActive listEdit':'taskListItem myList listEdit'}>
        <Link to={`/tasks/${project.projectId}`} onClick={taskListEditDisabled===true?()=>onProjectSelect(project.projectId):()=>{setCurrentProject(project.projectId)}} >
        <div className='taskList'>
          {taskListEditDisabled===true?<BsListTask className='listIcon'/>:<RiDeleteBin3Line  onClick={()=>{handleListDelete(project.projectId)}} className='listIcon' style={{background : 'red', color: '#fff'}} />}
          <input disabled={taskListDisabled} autoFocus type="text" value={project.name} onChange={onProjectEdit} />
        </div>
        </Link>
          <hr/>
       
      </div>
      ))
      }


    </div>

    <div className={taskFootageClasses}>
      <hr />
      
      <div>
        {taskListEditDisabled===true?<button onClick={handleListEdit} >Edit</button>:<button onClick={()=>{
      setTaskListEditDisabled(true)}} >Done</button>}
        <Link to={`/tasks/${newProject.projectId}`}>
          <button className='addProject' onClick={handleProjectAdd}>Add List </button>
        </Link>
    </div>

    </div>
    <hr className='taskListsDivider'/>
    </div>
  )
}
