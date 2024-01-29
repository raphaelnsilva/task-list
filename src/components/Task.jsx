import React from 'react'
import { format } from 'date-fns'
import Status from './Status'
import FormEdit from "./FormEdit"
import '../App.css'

const Task = (props) => {
  const [dialog, setDialog] = React.useState(false)

  return (
    <li key={props.id} className='todo_list-li'>
      <div className='todo_list-task'>
        <p>{props.task}</p>
        <p className='task_date'>{format(new Date(props.date), 'MMM yyyy HH:mm')}</p>
      </div>
      <div className='toolbar'>
        <Status
          id={props.id}
          done={props.done}
          updateTasks={props.updateTasks}
        />
        <FormEdit
          open={dialog}
          setOpen={setDialog}
          task={props.task}
          id={props.id}
          updateTasks={props.updateTasks}
        />
      </div>
    </li>  )
}

export default Task