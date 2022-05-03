import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Grid,
  Tooltip,
  withStyles,
  WithStyles,
  Typography,
  Avatar,
} from "@material-ui/core";
import AllInclusiveIcon from "@material-ui/icons/AllInclusive";
const useStyles = {
  optionPanel: {
    position: "absolute" as "absolute",
    right: "0%",
  },
  toolbar: {
    position: "relative" as "relative",
  },
  dashText: {
    color: "white" as "white",
  },
};
const NavBar: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Grid item>
            <Tooltip title="SiteIcon">
              <IconButton>
                <Link to="/">
                  <AllInclusiveIcon color="secondary" />
                </Link>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src="https://imageio.forbes.com/blogs-images/moneybuilder/files/2012/12/300px-Einstein_1921_portrait21.jpg?fit=bounds&format=jpg&width=300"
            />
          </Grid>
          <Grid className={classes.optionPanel}>
            <Tooltip title="Log-in">
              <IconButton>
                <Typography variant="button" className={classes.dashText}>
                  <Link to="/login">LOG-IN</Link>
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="SiteIcon">
              <IconButton>
                <Typography variant="button" className={classes.dashText}>
                  LOG-OUT
                </Typography>
              </IconButton>
            </Tooltip>
            <Tooltip title="SiteIcon">
              <IconButton>
                <Typography variant="button" className={classes.dashText}>
                  REGISTER
                </Typography>
              </IconButton>
            </Tooltip>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default withStyles(useStyles)(NavBar);
