import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { IoIosArrowForward } from 'react-icons/io';
import { baseUrl } from '../App';

export default function FormEdit(props) {
  const [editedTask, setEditedTask] = useState('');

  const handleEditedTask = (e) => {
    setEditedTask(e.target.value);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleEdit = async () => {
    try {
      await axios.put(`${baseUrl}/edit/`+props.id, { editedTask });

      await props.updateTasks()
    } catch (err) {
      console.log(err);
    }
    handleClose();
  };

  const handleDeleteTodo = async () => {
    try {
      await axios.delete(`${baseUrl}/delete/` + props.id);

      props.updateTasks();
    } catch (err) {
      console.log(err);
    } 
    handleClose()
    
  };

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  return (
    <React.Fragment>
      <button className='edit_btn' onClick={handleClickOpen}>
        <IoIosArrowForward />
      </button>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar tarefa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            defaultValue={props.task}
            onChange={handleEditedTask}
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDeleteTodo()}>Excluir</Button>
          {editedTask ? (
            <Button onClick={() => handleEdit()}>
              Aplicar
            </Button>
          ): (
            <Button disabled>
              Aplicar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
