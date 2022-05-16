import "./App.css";
import React, { useEffect, useState } from "react";
import { Grid, Typography, withStyles, WithStyles } from "@material-ui/core";
import { Home, Settings } from "../views";
import { NavBar, Login } from "./index";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useAuth } from "../hooks";
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
  const auth = useAuth();
  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Grid className="App">
              <Home />
            </Grid>
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/settings">
            <Settings />
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
