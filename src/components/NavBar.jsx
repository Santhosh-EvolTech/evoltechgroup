import React, { useState } from "react";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar } from "@mui/material";
import Container from "@material-ui/core/Container";
import IconButton from "@material-ui/core/IconButton";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { Box } from "@material-ui/core";
import Evoltech from "../components/assets/EvolTech.svg";

const navigationLinks = [
  { name: "About Us", href: "/" },
  { name: "Careers", href: "/careers" },
  { name: "Blogs", href: "/blogs" },
];

const useStyles = makeStyles((theme) => ({
  link: {
    fontFamily: "Jost",
    marginRight: 30,
    color: "white",
    fontWeight: 550,
  },
}));

const NavBar = () => {
  const styles = useStyles();
  const [open, setOpen] = useState(false);

  return (
    <AppBar className="navbar" color="inherit">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            mt: 3,
            justifyContent: "space-between",
            flexGrow: 1,
          }}
        >
          <Box
            // onClick={() => {
            //   setOpen(true);
            // }}
            className="Logo"
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              height: "50%",
              width: "50%",
            }}
          >
            <a href="/">
              <img src={Evoltech} alt="Logo"></img>
            </a>
          </Box>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
              color: "white",
            }}
          >
            {navigationLinks.map((item) => (
              <Link
                className={styles.link}
                color="textPrimary"
                variant="button"
                underline="none"
                href={item.href}
                key={item.name}
              >
                {item.name}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
      <SwipeableDrawer
        className="navbar"
        anchor="left"
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        <div
          className="navbar"
          onClick={() => setOpen(false)}
          onPress={() => setOpen(false)}
          role="button"
          tabIndex={0}
        >
          <IconButton></IconButton>
        </div>
        <Divider />
        <List>
          {navigationLinks.map((item) => (
            <ListItem key={item.name}>
              <Link
                className={styles.link}
                color="textPrimary"
                variant="button"
                underline="none"
                href={item.href}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
    </AppBar>
  );
};

export default NavBar;
