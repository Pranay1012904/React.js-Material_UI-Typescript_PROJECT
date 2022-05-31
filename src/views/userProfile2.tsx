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
import { fetchUserInfo } from "../api";
import { useAuth } from "../hooks";
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
  userId: string | undefined;
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
  const [isFriend, setIsFriend] = useState(false);
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
  const user: any = useAuth();
  const userFriends = user?.user?.friendships;
  console.log("list", user);
  if (userFriends.indexOf(userId) !== -1) {
    setIsFriend(true);
  }

  return (
    <>
      {loading ? (
        <>
          <Grid className={classes.profileContainer} container>
            <CircularProgress />
          </Grid>
        </>
      ) : (
        <>
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
                  >
                    Add Friend
                  </Button>
                ) : (
                  <Button
                    className={classes.btn}
                    variant="contained"
                    color="secondary"
                  >
                    Remove Friend
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default withStyles(useStyle)(UserProfile);
