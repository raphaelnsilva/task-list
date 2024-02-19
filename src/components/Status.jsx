import React, { useState } from 'react';
import { RiRefreshLine } from "react-icons/ri";
import axios from 'axios';
import { baseUrl } from '../App';
import '../App.css'

const Status = (props) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      await axios.put(`${baseUrl}/done/`+props.id);

      await props.updateTasks()

      setLoading(false);
    } catch (err) {
      console.log(err);
    } 
  };

  return (
    <button
      onClick={handleClick}
      className={`button-container ${props.done ? 'done' : ''}  ${loading ? 'disabled' : ''}`}
    >
      {loading ? (
        <RiRefreshLine className="spin" />
      ) : null}
      {loading ? '' : props.done === false ? 'Pendente' : 'Concluído'}
    </button>
  );
};

export default Status;
