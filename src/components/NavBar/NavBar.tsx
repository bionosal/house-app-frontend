import { AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./NavBar.scss";
export function NavBar() {
  return (
    <AppBar position="static" className="nav">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          News
        </Typography>
        <Button color="inherit">Login</Button>
      </Toolbar>
    </AppBar>
  );
}
