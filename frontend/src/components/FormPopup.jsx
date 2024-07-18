import * as React from 'react';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import Songform from './Songform';
import { Box, Modal } from '@mui/material';
import { Button } from 'react95'

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
    padding: '8px 16px'
    }

  return (
    <div>
      <Button onClick={handleOpen} style={buttonStyle}>{flavorText}</Button>
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