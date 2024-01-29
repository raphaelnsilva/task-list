import * as React from 'react'
import axios from 'axios'
import { IoSearch } from "react-icons/io5"
import FormCreate from './components/FormCreate'
import './App.css'
import Task from './components/Task'

export const baseUrl = 'https://api-task-list.vercel.app'

function App() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [tasks, setTasks] = React.useState([])

  const getData = async () => {
    try {
      const { data } = await axios.get(`${baseUrl}/get`)

      setTasks(data)
    } catch (err) {
      console.log(err)
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
      <h1 className='main_container-h1'>Plans</h1>
      <form className='search_form'>
        <IoSearch />
        <input
          className='search_form-input'
          type="text"
          placeholder='Pesquisar'
          onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
        />
      </form>
      <FormCreate updateTasks={updateTasks} />
      {filteredData.map((task) => (
        <Task 
          key={task._id}
          task={task.task}
          id={task._id}
          done={task.done}
          date={task.date}
          updateTasks={updateTasks}
        />
      ))}
    </main>
  )
}

export default App