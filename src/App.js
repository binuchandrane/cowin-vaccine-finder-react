import React from "react";
import LOGO from "./assets/logo.png";

import { Box } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import { Body } from "./body";

import { useStyles } from "./Styles";

const App = () => {
  const classes = useStyles();

  return (
    <Box className={classes.wrapper}>
      <div className={classes.header}>
        <img src={LOGO} width={"75%"} alt={"Vaccine Finder"} /> 1.0
      </div>
      <Body />
      <Typography
        variant="caption"
        display="block"
        gutterBottom
        className={classes.footer}
      >
        {" "}
        © 2021 plantabo.in All Rights Reserved.
      </Typography>
    </Box>
  );
};
export default App;
