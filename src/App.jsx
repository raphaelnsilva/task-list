import * as React from 'react'
import axios from 'axios'
import { IoSearch } from "react-icons/io5"
import FormCreate from './components/FormCreate'
import './App.css'
import Task from './components/Task'
import { PiConfettiLight } from "react-icons/pi"
import { RiRefreshLine } from "react-icons/ri";

export const baseUrl = 'https://api-task-list.vercel.app'

function App() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [tasks, setTasks] = React.useState([])
  const [loading, setLoading] = React.useState(false);

  const getData = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get(`${baseUrl}/get`)

      setTasks(data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }
  
  React.useEffect(() => {
    getData()
  }, [])

  const filteredData = tasks.filter((el) => {
    if (el.input === '') {
      return el;
    } else {
      return el.task.toLowerCase().includes(searchQuery)
    }
  })
  
  const updateTasks = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/get`)
      setTasks(data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <main className='main_container'>
      <h1 className='main_container-h1'>Tarefas</h1>
      <form className='search_form'>
        <IoSearch className='search_form-svg'/>
        <input
          className='search_form-input'
          type="text"
          placeholder='Pesquisar'
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </form>
      <FormCreate updateTasks={updateTasks} tasks={tasks} />
      {loading ? (
        <div className='loading_home'> 
          <span>Carregando...</span>
          <RiRefreshLine className="spin" />
        </div>
      ) : (
        <>
          {filteredData.length === 0 ? (
            <div className='no_tasks'>
              <PiConfettiLight  className='no_task-icon'/>
              <span>Não há tarefas..</span>
            </div>
          ) : (
            <>
              {filteredData.reverse().map((task) => (
                <Task 
                  key={task._id}
                  task={task.task}
                  id={task._id}
                  done={task.done}
                  date={task.date}
                  updateTasks={updateTasks}
                />
              ))}
            </>
          )}
        </>
      )}
    </main>
  )
}

export default App