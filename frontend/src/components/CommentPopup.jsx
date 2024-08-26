import * as React from "react";
import { styled } from "@mui/system";
import CommentForm from "./CommentForm";
import { Modal, Typography } from "@mui/material";

export default function CommentPopup({ flavorText, songId, externalComments }) {
  const [open, setOpen] = React.useState(false);
  const id = open ? "simple-popper" : undefined;

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
    p: 4,
  };

  return (
    <div>
      <Typography
        type="button"
        onClick={handleClick}
        sx={{
          fontSize: "12px",
          padding: 0,
          border: "none",
          boxShadow: "none",
          backgroundColor: "#c6c6c6",
          ":hover": { color: "blue", cursor: "pointer" },
          fontWeight: 500,
        }}
      >
        {flavorText}
      </Typography>
      <Modal id={id} open={open} onClose={handleClose} placement="bottom-end">
        <PopupBody sx={style}>
          <CommentForm songId={songId} externalComments={externalComments} />
        </PopupBody>
      </Modal>
    </div>
  );
}

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
  background-color: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
  box-shadow: ${
    theme.palette.mode === "dark"
      ? `0px 4px 8px rgb(0 0 0 / 0.7)`
      : `0px 4px 8px rgb(0 0 0 / 0.1)`
  };
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 0.875rem;
  z-index: 1;
`
);

