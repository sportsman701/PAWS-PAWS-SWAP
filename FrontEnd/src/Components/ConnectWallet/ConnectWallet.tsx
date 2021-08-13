import React, { useState } from "react";
import ConnectDropDown from "./ConnectDropDown";
import "./ConnectWallet.css";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

interface IProp {
  handleOpen?: any;
  handleClose?: any;
  open?: any;
  setOpen?: any;
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  })
);

const ConnectWallet: React.FC<IProp> = ({
  handleOpen,
  open,
  setOpen,
  handleClose,
}) => {
  const classes = useStyles();
  const openDrop = () => {
    handleOpen();
  };
  const body = <ConnectDropDown handleClose={handleClose} />;
  return (
    <div className="connect-wallet">
      <button onClick={openDrop} className="connct-wallet-btn">
        Connect Wallet
      </button>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
      {/* {state && <ConnectDropDown openDropDown={openDropDown} />} */}
    </div>
  );
};

export default ConnectWallet;
