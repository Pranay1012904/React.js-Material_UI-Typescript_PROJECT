//This is 2nd way of fetching user details. It makes api call and fetches user data from api.
import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  withStyles,
  WithStyles,
  Avatar,
  CircularProgress,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import { fetchUserInfo, addFriend, removeFriend } from "../api";
import { useAuth } from "../hooks";
import { MySnack } from "../components/snackBar";
const useStyle = {
  profileContainer: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  infoDisplay: {
    width: "50vw",
    minHeight: "20vh",
    padding: "15px",
  },
  infoHead: {
    display: "flex",
    justifyContent: "center",
    fontWeight: "bolder" as "bolder",
    width: "100%",
  },
  avatar: {
    width: "60px",
    height: "60px",
  },
  infoUser: {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bolder" as "bolder",
    width: "100%",
    paddingTop: "20px",
    paddingBottom: "20px",
  },
  btnDash: {
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    margin: "20px",
  },
};
interface expectedParam {
  userId: string;
}

const UserProfile: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const { userId }: expectedParam = useParams();
  const [userInfo, setUserInfo] = useState({
    _id: "",
    name: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [severity, setSeverity] = useState("success");
  const [msg, setMsg] = useState("");
  let isFriend: boolean = false;
  console.log("param--", userId);
  useEffect(() => {
    (async () => {
      if (userId) {
        const response = await fetchUserInfo(userId);
        // console.log("User Response:", response);
        if (response.success) {
          setUserInfo(response?.data?.user);
          setLoading(false);
        }
      }
    })();
  }, [userId]);
  const auth: any = useAuth();
  console.log("User Friends on p2--", auth?.user);
  const userFriends = auth?.user?.friendships;

  const MyFriends: any[] = userFriends?.map((item: any) => {
    return item.to_user._id;
  });

  if (MyFriends?.indexOf(userId) !== -1) {
    isFriend = true;
  }
  const handleAddFriend = async () => {
    console.log("add frnd Id:", userId);
    const newFriend = await addFriend(userId);
    if (newFriend.success) {
      const { friendship } = newFriend?.data;

      auth.updateUserFriends(true, friendship);
      setOpen(true);
      setMsg("Friend Added");
      setSeverity("success");
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleRemoveFriend = async () => {
    const response = await removeFriend(userId);
    console.log("remove", response);
    if (response.success) {
      auth.updateUserFriends(false, userId);
      setOpen(true);
      setMsg("Friend Removed !");
      setSeverity("info");
    }
  };

  return (
    <>
      {loading ? (
        <>
          <Grid className={classes.profileContainer} container>
            <CircularProgress />
          </Grid>
        </>
      ) : (
        <Grid className={classes.profileContainer} container>
          <Grid className={classes.infoDisplay}>
            <Typography variant="h5" className={classes.infoHead}>
              USER PROFILE
            </Typography>
            <Grid className={classes.infoHead}>
              <Avatar className={classes.avatar} />
            </Grid>
            <Grid className={classes.infoUser}>
              <Typography variant="h5">USERNAME</Typography>
              <Typography>{userInfo.name}</Typography>
              <Typography variant="h5">EMAIL</Typography>
              <Typography>{userInfo.email}</Typography>
            </Grid>
            <Grid className={classes.btnDash}>
              {!isFriend ? (
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="primary"
                  onClick={handleAddFriend}
                >
                  Add Friend
                </Button>
              ) : (
                <Button
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                  onClick={handleRemoveFriend}
                >
                  Remove Friend
                </Button>
              )}
            </Grid>
          </Grid>
        </Grid>
      )}
      <MySnack
        close={handleClose}
        open={open}
        message={msg}
        severity={severity}
      />
    </>
  );
};

export default withStyles(useStyle)(UserProfile);
