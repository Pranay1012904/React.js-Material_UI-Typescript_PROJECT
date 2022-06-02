import React from "react";
import {
  Grid,
  Typography,
  withStyles,
  WithStyles,
  Avatar,
  Card,
  CardHeader,
  Divider,
  ListItemAvatar,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import { useAuth } from "../hooks";
const useStyle = {
  listContainer: {
    width: "27vw",
    height: "100vh",
    marginRight: "10px",
  },
};

const FriendList: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const auth: any = useAuth();
  console.log("friend List", auth?.user.friendships.length);
  return (
    <>
      <Card className={classes.listContainer}>
        <CardHeader title={"Friend List"}></CardHeader>
        <Divider component="li" />
        <List className={classes.root}>
          {auth.user.friendships.length === 0 && (
            <ListItem>
              <ListItemText
                primary="You Have No Friends Yet"
                secondary="Try making new friends"
              />
            </ListItem>
          )}
          {auth.user.friendships.length > 0 &&
            auth.user.friendships.map((friend: any) => (
              <>
                <Link to={`/profile/${friend.to_user._id}`}>
                  {" "}
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={friend.to_user.name}
                      secondary={friend.to_user.email}
                    />
                  </ListItem>
                </Link>
                <Divider variant="inset" component="li" />
              </>
            ))}
        </List>
      </Card>
    </>
  );
};

export default withStyles(useStyle)(FriendList);
