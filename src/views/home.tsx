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
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import MessageIcon from "@material-ui/icons/Message";
import CircularProgress from "@material-ui/core/CircularProgress";
import FriendList from "../components/friendList";
import { useAuth } from "../hooks";
import { CreatePost } from "../components";
const useStyles = {
  myContainer: {
    display: "flex",
    flexDirection: "column" as "column",
    minHeight: "40vh",
    border: "1px solid black",
    //justifyContent: "flex-end",
    //alignItems: "center",
    padding: "4vw",
    width: "70vw",
  },
  myCard: {
    minHeight: "250px",
    backgroundColor: "lightgoldenrodyellow",
    marginTop: "15px",
    marginBottom: "15px",
    width: "100%",
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
  masterContainer: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "70px",
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
    _id: string;
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
  const auth = useAuth();
  useEffect(() => {
    const resp = GetPosts(1, 10);
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
        <Grid className={classes.masterContainer}>
          <Grid container className={classes.myContainer}>
            <CreatePost />
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
                  title={
                    <Link
                      to={{
                        pathname: `/profile/${post.user._id}`,
                        state: {
                          user: post.user,
                        },
                      }}
                    >
                      {post.user.name}
                    </Link>
                  }
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
          {auth.user ? <FriendList /> : ""}
        </Grid>
      )}
    </>
  );
};

export default withStyles(useStyles)(Home);
