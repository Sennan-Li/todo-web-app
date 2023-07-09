import React, {useState} from 'react'
import TaskLists from '../components/lists/taskLists';
import Tasks from '../components/tasks/tasks';
import { useMediaQuery } from 'react-responsive'
import {useParams} from 'react-router-dom'
import {projectsData} from '../assets/data/projects'
import {tasksData} from '../assets/data/tasks'



export default function Todo(props) {

  //data
  const [projects, setProjects] = useState(projectsData)
  const [tasks, setTasks] = useState(tasksData)
  const [currentProject, setCurrentProject] = useState('all')
  const [currentTask, setCurrentTask] = useState()
  let {id} = useParams()
  
  //search
  const [searchTask, setSearchTask] = useState('')
 

  //add new 
  const [newList, setNewList] = useState(false)
  const [newListText, setNewListText] = useState('')
  const [taskBodyDisabled, setTaskBodyDisabled] = useState(true)
  const [taskListDisabled, setTaskListDisabled] = useState(true)
  const [taskListEditDisabled, setTaskListEditDisabled] = useState(true)


  //classes
  const [listsClasses, setListsClasses] = useState('taskLists')
 
  const [taskFootageClasses, setTaskFootageClasses] = useState('taskFootage')
  const [taskContentClasses, setTaskContentClasses] = useState('taskContent specailHideForTaskContent')
  const [dropdownClasses, setDropdownClasses] = useState('dropdown hide')
  const [hamburgerClasses, setHamburgerClasses] = useState('hamburger')
 
  const mobile = useMediaQuery({ query: '(max-width: 767px)' })

  function handleHamburger() {
    setDropdownClasses(dropdownClasses==='dropdown hide'?'dropdown ':'dropdown hide')
    setHamburgerClasses(hamburgerClasses==='hamburger'?'hamburger openHamburger':'hamburger')
  }

  function handleProjectSelect(e) {
    setDropdownClasses('dropdown hide')
    setHamburgerClasses('hamburger')
    setCurrentProject(e)
    
    if (mobile) {return (setTaskContentClasses('taskContent unhide'),setListsClasses('taskLists specailHideForTaskLists'), setTaskFootageClasses('taskFootage specailHideForTaskLists'))}
  }
  function handleTaskSelect(e) {
    setCurrentTask(e)
    setTaskBodyDisabled(false)
  }
  function handleBack() {
    setListsClasses('taskLists unhide')
    setTaskContentClasses('taskContent specailHideForTaskContent')
    setTaskFootageClasses('taskFootage unhide')
  }
  function handleSearch(e) {
    setSearchTask(e.target.value.toLowerCase())
  } 
  function handleNewList() {
    setNewList(true)
    setNewListText('')
  }
  function handleProjectEdit(e) {
    setProjects((projects.map(project => {
      if (project.projectId === id) {
      return {...project, name: e.target.value}
      } else {
      return project
      }
      })))
  }
  function handleListDisable() {
    setTaskListEditDisabled(true)
    setTaskListDisabled(true)
  }


  return (
    <React.Fragment >
      <TaskLists taskFootageClasses={taskFootageClasses} onProjectSelect={handleProjectSelect} onSearch={handleSearch} setProjects={setProjects} projects={projects} listsClasses={listsClasses} id={id} hamburgerClasses={hamburgerClasses} dropdownClasses={dropdownClasses} onHamburger={
        handleHamburger} currentProject={currentProject} setCurrentProject={setCurrentProject} handleNewList={handleNewList} newList={newList} setNewList={setNewList} newListText={newListText} setNewListText={setNewListText} setTaskBodyDisabled={setTaskBodyDisabled} taskListDisabled={taskListDisabled} setTaskListDisabled={setTaskListDisabled} onProjectEdit={handleProjectEdit} taskListEditDisabled={taskListEditDisabled} setTaskListEditDisabled={setTaskListEditDisabled} setTasks={setTasks} tasks={tasks.filter(task=>task.task.toLowerCase().includes(searchTask))} {...props}/>
      
      <Tasks setProjects={setProjects} onBack={handleBack} projects={projects} currentProject={currentProject} currentTask={currentTask} setCurrentProject={setCurrentProject} onTaskSelect={handleTaskSelect} setTasks={setTasks} tasks={tasks.filter(task=>task.task.toLowerCase().includes(searchTask))} id={id} taskContentClasses={taskContentClasses} hamburgerClasses={hamburgerClasses} dropdownClasses={dropdownClasses} onHamburger={
        handleHamburger} taskBodyDisabled={taskBodyDisabled} setTaskBodyDisabled={setTaskBodyDisabled} onListDisable={handleListDisable} onProjectEdit={handleProjectEdit} setCurrentTask = {setCurrentTask} {...props}/>
    </React.Fragment>


  )
}
