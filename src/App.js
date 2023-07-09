import './scss/App.scss';
import Header from './components/header';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import React, {useState}from 'react';
import Todo from './pages/todo'
import Others from './components/others';


function App() {
  const [others, setOthers] = useState(false)
  function handleOpenOthers() {
    others===false?setOthers(true):setOthers(false)
  }
  function handleCloseOthers() {
    setOthers(false)
  }
  return (
    <React.Fragment>
      <Header onOpenOthers={handleOpenOthers} onCloseOthers={handleCloseOthers}/>
      {others&&<Others/>}
      <div className="app">

        <BrowserRouter>
          <Routes>
            <Route path='/tasks/:id?' element={<Todo onCloseOthers={handleCloseOthers}/>}/>
            {/* <Route path="/tasks/" element={<Navigate replace to="/tasks/today" />} /> */}
            <Route path="/" element={<Navigate replace to="/tasks" />} />
          </Routes>
        </BrowserRouter>
      </div>
    </React.Fragment>
  );
}

export default App;
