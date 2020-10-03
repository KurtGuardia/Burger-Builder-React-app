import React from "react";
import classes from "./Ham.module.css";

const ham = (props) => {
  return <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
  </div>;
};

export default ham;
