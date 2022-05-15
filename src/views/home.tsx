import React, { useEffect, useState } from "react";
import { GetPosts } from "../api";
import {
  Grid,
  Card,
  WithStyles,
  CardHeader,
  Avatar,
  IconButton,
  Divider,
  CardContent,
  Typography,
  InputBase,
} from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import MessageIcon from "@material-ui/icons/Message";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = {
  myContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    minHeight: "40vh",
    border: "1px solid black",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "70px",
  },
  myCard: {
    minHeight: "250px",
    backgroundColor: "lightgoldenrodyellow",
    marginTop: "15px",
    marginBottom: "15px",
    minWidth: "35vw",
  },
  likeDash: {
    display: "flex",
    justifyContent: "flex-start",
  },
  iconGrid: {
    display: "flex",
    paddingLeft: "10px",
  },
  comment: {
    width: "100%",
    border: "1px solid black",
    borderRadius: "10px",
    paddingLeft: "10px",
    backgroundColor: "white",
  },
  typedComment: {
    display: "flex",
    justifyContent: "flex-start",
    marginTop: "5px",
    marginBottom: "5px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(1,1,1,0.2)",
  },
};
interface propType {
  posts: objectType[];
}
interface objectType {
  comments: any[];
  content: string;
  createdAt: string;
  likes: any[];
  updatedAt: string;
  user: {
    name: string;
    email: string;
  };
  _v: number;
  _id: string;
}
const Home: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const resp = GetPosts(1, 5);
    resp
      .then((response: any) => {
        console.log("----", response);
        return response.data;
      })
      .then((data: any) => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);
  console.log("HOME___", posts);
  return (
    <>
      {loading ? (
        <Grid className={classes.loading}>
          <CircularProgress color="secondary" />
        </Grid>
      ) : (
        <Grid container className={classes.myContainer}>
          {posts.map((post: objectType) => (
            <Card className={classes.myCard} key={post._id.toString()}>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={post.user.name}
                subheader={post.user.email}
              />
              <Divider />
              <CardContent>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  component="h6"
                >
                  {post.content}
                </Typography>
              </CardContent>
              <Divider />
              <CardContent className={classes.likeDash}>
                <Grid item className={classes.iconGrid}>
                  <ThumbUpAltIcon />
                  <Typography> 34</Typography>
                </Grid>
                <Grid item className={classes.iconGrid}>
                  <MessageIcon />
                  <Typography> 14</Typography>
                </Grid>
              </CardContent>
              <Divider />
              <CardContent>
                <InputBase
                  placeholder="Enter Comment..."
                  className={classes.comment}
                />
              </CardContent>
              <Divider />
              <CardContent>
                {post.comments.map((comment) => (
                  <Grid className={classes.typedComment}>
                    <Typography>{comment?.content}</Typography>
                  </Grid>
                ))}
              </CardContent>
            </Card>
          ))}
        </Grid>
      )}{" "}
    </>
  );
};

export default withStyles(useStyles)(Home);
