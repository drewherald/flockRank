import * as React from "react";
import { styled } from "@mui/system";
import Signup from "./Signup";
import Login from "./Login";
import { Modal } from "@mui/material";
import { Button } from "react95";

export default function AuthPopup({ flavorText, signup }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "2px solid #000",
    p: 4,
  };

  //modal state & handler functions
  const [open, setOpen] = React.useState(false);

  const handleClick = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = open ? "simple-popper" : undefined;

  return (
    <div style={{ backgroundColor: "black", padding: "0 10px" }}>
      <Button
        className="formButton"
        onClick={handleClick}
        style={{ backgroundColor: "#c6c6c6" }}
      >
        {flavorText}
      </Button>
      <Modal id={id} open={open} onClose={handleClose} placement="bottom-end">
        <PopupBody sx={style}>{signup ? <Signup /> : <Login />}</PopupBody>
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

//modal stylings
const PopupBody = styled("div")(
  ({ theme }) => `
  width: max-content;
  padding: 12px 16px;
  margin: 8px;
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
