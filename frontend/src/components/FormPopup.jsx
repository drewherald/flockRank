import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Songform from './Songform';
import { Box, Button, Modal } from '@mui/material';

export default function FormPopup({flavorText}) {
    const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: '2px solid #000',
    bgcolor: 'black',
    p: 4,
  };

  const buttonStyle = {
    //font-family: '"IBM Plex Sans, sans-serif;'
    fontWeight: '600',
    fontSize: '0.875rem',
    lineHeight: 1.5,
    backgroundColor: '#007FFF',
    padding: '8px 16px',
    borderRadius: '8px',
    boxShadow: '0 2px 1px rgba(0, 0, 0, 0.5), inset 0 1.5px 1px #3399FF, inset 0 -2px 1px #0072E5',
    margin:' 20px 10px',
    cursor: 'pointer'
  }

  return (
    <div>
      <Box onClick={handleOpen} sx={buttonStyle}>{flavorText}</Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Songform></Songform>
        </Box>
      
      </Modal>
    </div>
  );
}