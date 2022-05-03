import React, { useState } from "react";
import { withStyles } from "@material-ui/styles";
import {
  Grid,
  Card,
  Typography,
  WithStyles,
  CardHeader,
  Divider,
  InputBase,
  Button,
  Snackbar,
  IconButton,
} from "@material-ui/core";
import { MySnack } from "./snackBar";
import CloseIcon from "@material-ui/icons/Close";
import ExtensionIcon from "@material-ui/icons/Extension";
const useStyles = {
  parent: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
  loginCard: {
    ["@media (min-width:460px)"]: {
      width: "100vw",
    },
    ["@media (min-width:800px)"]: {
      width: "50vw",
    },
    ["@media (min-width:1100px)"]: {
      width: "40vw",
    },
    minHeight: "30vh",
    backgroundColor: "moccasin",
    padding: "10px",
  },
  cardHeader: {
    fontSize: "35px",
    color: "darkorange" as "darkorange",
    textAlign: "center" as "center",
  },
  divider: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  inputGrid: {
    marginTop: "20px",
  },
  input: {
    backgroundColor: "white",
    paddingLeft: "5px",
    width: "100%",
    border: "0.5px solid grey",
    borderRadius: "5px",
  },
  button: {
    width: "100%",
    marginTop: "35px",
    marginBottom: "35px",
  },
};
const Login: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severe, setSevere] = useState("");
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLogin(true);
    if (!email || !password) {
      setOpen(true);
      setMessage("Please Enter Valid Email/Password!");
      setLogin(false);
      setSevere("error");
    }
  };
  return (
    <>
      <Grid className={classes.parent}>
        <Card className={classes.loginCard}>
          <Grid className={classes.cardHeader}>
            <strong>Login</strong>
          </Grid>
          <Divider className={classes.divider} />
          <form onSubmit={handleSubmit}>
            <Grid className={classes.inputGrid}>
              <InputBase
                placeholder="Email..."
                className={classes.input}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid className={classes.inputGrid}>
              <InputBase
                placeholder="Password..."
                className={classes.input}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<ExtensionIcon />}
              disabled={login}
            >
              <strong>{login ? "Loging in..." : "Login"}</strong>
            </Button>
          </form>
        </Card>
      </Grid>
      <MySnack
        close={handleClose}
        open={open}
        message={message}
        severity={severe}
      />
    </>
  );
};

export default withStyles(useStyles)(Login);
