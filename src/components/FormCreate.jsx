import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import axios from 'axios'
import { baseUrl } from '../App'
import { IoAdd } from "react-icons/io5"


export default function FormCreate({ updateTasks }) {
  const [open, setOpen] = React.useState(false)
  const [newTask, setNewTask] = React.useState('')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    try {
      await axios.post(`${baseUrl}/create`, { task: newTask })
      
      updateTasks()
    } catch (err) {
      console.log(err)
    }
    setOpen(false)
  }

  return (
    <React.Fragment>
      <div className='add_btn' onClick={handleClickOpen}>
        <span>Adicionar Tarefa</span>
        <IoAdd />
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Adicionar Tarefa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="normal"
            label="Digite sua tarefa aqui.."
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {setNewTask(e.target.value)}}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          {newTask ? (
            <Button onClick={handleSubmit}>Pronto</Button>
            ) : (
            <Button disabled>Pronto</Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}