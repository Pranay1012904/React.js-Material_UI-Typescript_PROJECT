import React, { useState } from "react";
import {
  withStyles,
  WithStyles,
  Avatar,
  Card,
  CardHeader,
  CardActionArea,
  InputBase,
  Divider,
  Button,
  Grid,
  Tooltip,
} from "@material-ui/core";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import AttachFileIcon from "@material-ui/icons/AttachFile";
const useStyles = {
  cardContainer: {
    width: "100%",
    minHeight: "50px",
    backgroundColor: "NavajoWhite",
  },
  postArea: {
    width: "100%",
    height: "60px",
    margin: "15px",
  },
  cardAction: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    padding: "10px",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  postBtn: {
    paddingRight: "35px",
  },
  btn: {
    backgroundColor: "orange",
    color: "white",
    fontWeight: "bolder" as "bolder",
  },
  iconGrid: {
    width: "30%",
    paddingLeft: "15px",
    display: "flex",
    justifyContent: "space-around",
  },
  icon: {
    color: "red",
  },
};

const CreatePost: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const [post, setPost] = useState("");
  const handlePostSubmit = () => {
    alert(post);
  };
  return (
    <>
      <Card className={classes.cardContainer}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          title="Shrimp and Chorizo Paella"
          subheader="September 14, 2016"
        />
        <Divider />
        <InputBase
          placeholder="Type Your Post..."
          className={classes.postArea}
          onChange={(e) => {
            setPost(e.target.value);
            console.log(post);
          }}
        />
        <Grid className={classes.cardAction}>
          <Grid className={classes.iconGrid}>
            <Tooltip title="Take A Pic..">
              <AddAPhotoIcon className={classes.icon} />
            </Tooltip>
            <Tooltip title="Add A picture">
              <AddPhotoAlternateIcon className={classes.icon} />
            </Tooltip>
            <Tooltip title="Attach a file">
              <AttachFileIcon className={classes.icon} />
            </Tooltip>
          </Grid>
          <Grid item className={classes.postBtn}>
            <Button
              variant="contained"
              className={classes.btn}
              onClick={handlePostSubmit}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Card>
    </>
  );
};

export default withStyles(useStyles)(CreatePost);
