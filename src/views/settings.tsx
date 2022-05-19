import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  Avatar,
  WithStyles,
  InputBase,
  Button,
} from "@material-ui/core";
import { MySnack } from "../components/snackBar";
import { withStyles } from "@material-ui/styles";
import { useAuth } from "../hooks";
const useStyles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightgrey",
  },
  setCard: {
    width: "50vw",
    minHeight: "20vh",
    padding: "10px",
  },
  formHead: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "5px",
  },
  userAvatar: {
    width: "80px",
    height: "80px",
  },
  formLabel: {
    width: "100%",
    paddng: "5px",
    marginTop: "10px",
    paddingLeft: "10px",
    paddingRight: "10px",
  },
  input: {
    border: "1px solid black",
    width: "100%",
    borderRadius: "10px",
    paddingLeft: "10px",
  },
  forBtn: {
    marginTop: "20px",
    paddingLeft: "10px",
  },
};
const Settings: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const auth: any = useAuth();
  console.log("settings", auth);
  console.log("auth:", auth);
  const [enable, setEnable] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(""); //for snackbar
  const [name, setName] = useState<string>(auth.user ? auth.user?.name : "");
  const [email, setEmail] = useState(auth.user ? auth.user?.email : "");
  const [pass, setPass] = useState(auth.user ? auth.user?.password : "");

  const editEnable = () => {
    enable ? setEnable(false) : setEnable(true);
    enable ? setMsg("Edit Disabled!") : setMsg("Edit Enabled!");

    setOpen(true);
  };
  return (
    <>
      <Grid container className={classes.container}>
        <Card className={classes.setCard}>
          <Grid item className={classes.formHead}>
            <Typography style={{ fontSize: "30px", fontWeight: "bolder" }}>
              SETTINGS
            </Typography>
          </Grid>
          <Grid item className={classes.formHead}>
            <Avatar
              className={classes.userAvatar}
              alt="IMAGE"
              src="https://imageio.forbes.com/blogs-images/moneybuilder/files/2012/12/300px-Einstein_1921_portrait21.jpg?fit=bounds&format=jpg&width=300"
            />
          </Grid>
          <Grid item className={classes.formLabel}>
            <Typography>Name:</Typography>
            <InputBase
              placeholder="Your Name"
              className={classes.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={enable ? false : true}
            ></InputBase>
          </Grid>
          <Grid item className={classes.formLabel}>
            <Typography>E-Mail:</Typography>
            <InputBase
              placeholder="Your Email"
              className={classes.input}
              value={email}
              type={"email"}
              onChange={(e) => setEmail(e.target.value)}
              disabled={enable ? false : true}
            ></InputBase>
          </Grid>
          {enable ? (
            <>
              <Grid item className={classes.formLabel}>
                <Typography>Password:</Typography>
                <InputBase
                  placeholder="Password"
                  className={classes.input}
                  type={"password"}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  disabled={enable ? false : true}
                ></InputBase>
              </Grid>
              <Grid item className={classes.formLabel}>
                <Typography>Confirm-Password:</Typography>
                <InputBase
                  placeholder="Enter New Password"
                  className={classes.input}
                ></InputBase>
              </Grid>
            </>
          ) : (
            <></>
          )}

          <Grid item className={classes.forBtn}>
            {enable ? (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => editEnable()}
                >
                  Save
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => editEnable()}
                  style={{ marginLeft: "15px" }}
                >
                  Go Back
                </Button>
              </>
            ) : (
              <>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => editEnable()}
                >
                  Edit Profile
                </Button>
              </>
            )}
          </Grid>
        </Card>
      </Grid>
      <MySnack
        open={open}
        close={() => {
          setOpen(false);
        }}
        message={msg}
        severity={"info"}
      />
    </>
  );
};
export default withStyles(useStyles)(Settings);
