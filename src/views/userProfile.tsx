import React from "react";
import {
  Card,
  Typography,
  Grid,
  Button,
  WithStyles,
  Avatar,
  CardContent,
  Collapse,
  IconButton,
  CardActions,
} from "@material-ui/core";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useLocation } from "react-router-dom";

const useStyles = {
  gridContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "PowderBlue",
  },
  profileCard: {
    width: "50vw",
    padding: "10px",
  },
  avatarGrid: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    width: "60px",
    height: "60px",
    border: "1px solid red",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  cardHead: {
    marginTop: "15px",
    fontWeight: "bolder" as "bolder",
    fontSize: "30px",
  },
  action: {
    display: "flex",
    padding: "10px",
    justifyContent: "center",
    alignItems: "center",
  },
};
const UserProfile: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const [expanded, setExpanded] = React.useState(false);
  const location: any = useLocation();
  console.log("Location-->", location);
  const { user } = location.state;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Grid className={classes.gridContainer}>
        <Card className={classes.profileCard}>
          <Grid className={classes.avatarGrid}>
            <Avatar variant="circular" className={classes.avatar}></Avatar>
          </Grid>
          <Grid className={classes.avatarGrid}>
            <Typography className={classes.cardHead}>User Profile</Typography>
          </Grid>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="h6">NAME:</Typography>
              <Typography paragraph>User Name : {user.name}</Typography>
              <Typography variant="h6">EMAIL</Typography>
              <Typography paragraph>Email: {user.email}</Typography>
            </CardContent>
            <CardActions className="action">
              <Button variant="contained" color="default">
                Add Friend
              </Button>
              <Button variant="contained" color="secondary">
                Remove Friend
              </Button>
            </CardActions>
          </Collapse>
        </Card>
      </Grid>
    </>
  );
};

export default withStyles(useStyles)(UserProfile);
