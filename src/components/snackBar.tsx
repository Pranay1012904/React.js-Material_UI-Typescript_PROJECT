import React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Alert } from "@material-ui/lab";
import { Color } from "@material-ui/core";

interface snackProp {
  close: any;
  open: any;
  message: string;
  severity: any;
}

export const MySnack: React.FunctionComponent<snackProp> = (
  props: snackProp
) => {
  return (
    /* <Snackbar                        -------------One way to handle Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={props.open}
      autoHideDuration={6000}
      onClose={props.close}
      message={<Alert severity="success">{props.message}</Alert>}
      action={
        <>
          <Button color="secondary" size="small" onClick={props.close}>
            UNDO
          </Button>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={props.close}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />*/
    <Snackbar open={props.open} autoHideDuration={6000} onClose={props.close}>
      <Alert variant="filled" onClose={props.close} severity={props.severity}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};
