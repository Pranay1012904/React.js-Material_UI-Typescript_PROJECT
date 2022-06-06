import React, { useEffect, useState } from "react";
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
//import {usePosts} from "../hooks/postProviderHook";
import { LOCALSTORAGE_TOKEN_KEY } from "../util";
import jwt from "jwt-decode";
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
  console.log("settings", auth.user);
  const [enable, setEnable] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(""); //for snackbar
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [cPass, setcPass] = useState("");
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    if (auth.user) {
      setName(auth.user?.name);
    } else {
      const token = LOCALSTORAGE_TOKEN_KEY;
      const userEnc = localStorage.getItem(token);
      const userDec: any = jwt(userEnc ? userEnc : "");
      setName(userDec.name);
    }
  }, [auth.user]);
  const editEnable = () => {
    enable ? setEnable(false) : setEnable(true);
    enable ? setMsg("Edit Disabled!") : setMsg("Edit Enabled!");
    setOpen(true);
  };
  const handleSave = async () => {
    console.log("save:", name, pass, cPass);
    if (!name.trim() || !pass.trim() || !cPass.trim()) {
      setOpen(true);
      setMsg("All Fields Are Necessary!");
    } else if (pass !== cPass) {
      setOpen(true);
      setMsg("Password And Confirm Password Do Not Match!");
    } else {
      const response = await auth.updateUser(auth.user._id, name, pass, cPass);
      console.log("name", name, "hookName", response);
      if (response.success) {
        console.log("Hello---Settings", auth.user);
        setOpen(true);
        setMsg("User Details Updated!");
        setName(auth.user.name);
      } else {
        setOpen(true);
        setMsg("Updation Failed!");
      }
    }
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
              value={auth.user ? auth.user.email : ""}
              type={"email"}
              disabled={true}
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
                  placeholder="Enter Confirm Password"
                  className={classes.input}
                  type={"password"}
                  value={cPass}
                  onChange={(e) => setcPass(e.target.value)}
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
                  onClick={() => handleSave()}
                  disabled={saving ? true : false}
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
