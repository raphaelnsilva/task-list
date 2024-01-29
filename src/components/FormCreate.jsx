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


export default function FormCreate(props) {
  const [open, setOpen] = React.useState(false)
  const [newTask, setNewTask] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = async () => {
    try {
      setButtonDisabled(true)
    
      await axios.post(`${baseUrl}/create`, { task: newTask })
      
      props.updateTasks()
    } catch (err) {
      console.log(err)
    } finally {
      setButtonDisabled(false) 
      setOpen(false)
    }
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
            autoComplete='off'
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
          {newTask.length > 2 ? (
            <Button onClick={handleSubmit} disabled={buttonDisabled}>Pronto</Button>
            ) : (
            <Button disabled>Pronto</Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}