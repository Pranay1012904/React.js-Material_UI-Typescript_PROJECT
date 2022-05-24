import "./App.css";
import React, { useEffect, useState } from "react";
import { Grid, Typography, withStyles, WithStyles } from "@material-ui/core";
import { Home, Settings, UserProfile } from "../views";
import { NavBar, Login } from "./index";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
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

function PrivateRoute({ children, ...rest }: any) {
  const auth = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        if (auth.user) {
          console.log("auth private", auth.user);
          return children;
        }
        return <Redirect to="/login" />;
      }}
    />
  );
}

const Page404: React.FunctionComponent = () => {
  return <Typography variant="h1">404 ERROR</Typography>;
};

const App: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
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
          <PrivateRoute path="/settings">
            <Settings />
          </PrivateRoute>
          <PrivateRoute exact path="/profile/:userId">
            <UserProfile />
          </PrivateRoute>
          <Route>
            <Page404 />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default withStyles(useStyles)(App);
