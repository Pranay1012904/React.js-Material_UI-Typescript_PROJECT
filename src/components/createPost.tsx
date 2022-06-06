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
import { useAuth } from "../hooks";
import { addNewPost } from "../api";
import { usePosts } from "../hooks/postProviderHook";
import { MySnack } from "../components/snackBar";
import { usePosts } from "../hooks/postProviderHook";
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
  const [posting, setPosting] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState("");
  const [severity, setSeverity] = useState("");
  const posts = usePosts();
  const auth: any = useAuth();
  const posts = usePosts();
  const handleClose = () => {
    setOpen(false);
  };
  const handlePostSubmit = () => {
    setPosting(true);
    if (post.trim().length > 0) {
      const createPost = async () => {
        setOpen(true);
        const response = await addNewPost(post);
        console.log(response);
        if (response.success) {
          setMsg("Post Created!");
          setSeverity("success");
          posts.addPostsToState(response.data.post);

        } else {
          console.log("Error In Creating Post");
          setMsg("Error In Creating Post");
          setSeverity("info");
        }
      };
      createPost();
      setPosting(false);
    } else {
      //show notfication that post content cant be empty
      setOpen(true);
      setMsg("Post has no content!");
      setSeverity("error");
    }
  };

  return (
    <>
      <Card className={classes.cardContainer}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {auth?.user?.name[0]}
            </Avatar>
          }
          title={auth?.user?.name}
          subheader={auth?.user?.email}
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
              disabled={posting}
            >
              {posting ? "Posting..." : "POST"}
            </Button>
          </Grid>
        </Grid>
      </Card>
      <MySnack
        close={handleClose}
        open={open}
        message={msg}
        severity={severity}
      />
    </>
  );
};
export default withStyles(useStyles)(CreatePost);
