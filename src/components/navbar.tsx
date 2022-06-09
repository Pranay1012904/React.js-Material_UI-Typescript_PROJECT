import React, { useState } from "react";
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
  InputBase,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import ImageIcon from "@material-ui/icons/Image";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { useAuth } from "../hooks";
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
  avatarUser: {
    display: "flex",
    flexDirection: "column" as "column",
    marginLeft: "1vw",
    alignItems: "center",
    justifyContent: "center",
  },
  siteIcon: {
    textDecoration: "none",
    letterSpacing: "3px",
  },
  userName: {
    fontWeight: "bold" as "bold",
    fontSize: "12px",
    //paddingLeft: "15px",
  },
  searchGrid: {
    position: "relative" as "relative",
    marginLeft: "5vw",
  },
  searchBar: {
    paddingLeft: "5px",
    backgroundColor: "white",
    width: "25vw",
    borderRadius: "10px",
  },
  searchResult: {
    position: "absolute" as "absolute",
    backgroundColor: "rgba(0,0,0,0.6)",
    height: "340px",
    overflowY: "scroll" as "scroll",
  },
};
interface myProp {
  user: any;
  login: (email: string, password: string) => void;
  logout: () => void;
  loading: boolean;
}
const NavBar: React.FunctionComponent<WithStyles> = (props) => {
  const { classes } = props;
  const [result, setResult] = useState([]);
  const [searchText, setSearchText] = useState("");
  const auth: myProp = useAuth();
  return (
    <>
      <AppBar>
        <Toolbar className={classes.toolbar}>
          <Grid item>
            <Tooltip title="Home">
              <IconButton>
                <Link to="/" className={classes.siteIcon}>
                  <span
                    style={{
                      color: "#2798e3",
                      fontWeight: "900",
                      fontFamily: "Segoe UI Emoji",
                    }}
                  >
                    FREE
                  </span>
                  <span style={{ color: "#748691" }}>BUZZ</span>
                </Link>
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item className={classes.avatarUser}>
            <Link to={auth.user ? "/settings" : "/"}>
              <Tooltip title={auth.user ? "Settings" : "Home"}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://imageio.forbes.com/blogs-images/moneybuilder/files/2012/12/300px-Einstein_1921_portrait21.jpg?fit=bounds&format=jpg&width=300"
                />
              </Tooltip>
            </Link>
            <Typography className={classes.userName}>
              {auth.user ? auth.user?.name : "WELCOME!"}
            </Typography>
          </Grid>
          <Grid className={classes.searchGrid}>
            <InputBase
              placeholder="Search..."
              className={classes.searchBar}
              startAdornment={<SearchOutlinedIcon />}
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            {result.length > 0 && (
              <Grid container className={classes.searchResult}>
                <List className={classes.root}>
                  {result.map((user: any) => (
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
          </Grid>
          <Grid className={classes.optionPanel}>
            {auth.user ? (
              <>
                {" "}
                <Tooltip title="SiteIcon">
                  <IconButton onClick={auth.logout}>
                    <Typography variant="button" className={classes.dashText}>
                      LOG-OUT
                    </Typography>
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <>
                {" "}
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
                      REGISTER
                    </Typography>
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};
export default withStyles(useStyles)(NavBar);
