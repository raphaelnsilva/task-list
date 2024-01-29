import React, { useState } from 'react';
import { RiRefreshLine } from "react-icons/ri";
import axios from 'axios';
import { baseUrl } from '../App';

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
      style={{
        backgroundColor: props.done === false ? '#FF9500' : '#35C759',
        color: 'white',
        padding: '4px 6px',
        border: 'none',
        width: '84px',
        cursor: loading ? 'not-allowed' : 'pointer',
        borderRadius: '12px',
        fontWeight: '500',
        fontSize: '14px',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <RiRefreshLine className="spin" />
      ) : null}
      {loading ? '' : props.done === false ? 'Pendente' : 'Concluído'}
    </button>
  );
};

export default Status;
