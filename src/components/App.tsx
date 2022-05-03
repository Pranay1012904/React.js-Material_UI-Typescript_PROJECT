import "./App.css";
import React, { useEffect, useState } from "react";
import { GetPosts } from "../api/index";
import { Grid, Typography, withStyles, WithStyles } from "@material-ui/core";
import { Home } from "../views";
import { NavBar, Login } from "./index";
import CircularProgress from "@material-ui/core/CircularProgress";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const useStyles = {
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(1,1,1,0.2)",
  },
};

const Page404: React.FunctionComponent = () => {
  return <Typography variant="h1">404 ERROR</Typography>;
};

const App: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const resp = GetPosts(1, 5);
    resp
      .then((response: any) => {
        return response.data;
      })
      .then((data: any) => {
        setPosts(data.posts);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            {loading ? (
              <Grid className={classes.loading}>
                <CircularProgress color="secondary" />
              </Grid>
            ) : (
              <Grid className="App">
                <Home posts={posts} />
              </Grid>
            )}
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default withStyles(useStyles)(App);
