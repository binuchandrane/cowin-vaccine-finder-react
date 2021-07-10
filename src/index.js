import React from "react";
import ReactDOM from "react-dom";

import { MuiThemeProvider } from "@material-ui/core";
import { createTheme } from '@material-ui/core/styles'
import CssBaseline from "@material-ui/core/CssBaseline";

import App from "./App";

const theme = createTheme({
  overrides: {},
  MuiCssBaseline: {
    "@global": {
      body: {
        backgroundColor: "#4caf50",
        fontSize: 16,
      },
    },
  },
  palette: {
    primary: { 500: "#ffffff" }, // custom color in hex
  },
  multilineColor: {
    color: "red",
  },
});

function renderReactDom() {
  ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <CssBaseline>
        <App />
      </CssBaseline>
    </MuiThemeProvider>,
    document.getElementById("root")
  );
}

if (window.cordova) {
  document.addEventListener(
    "deviceready",
    () => {
      renderReactDom();
    },
    false
  );
} else {
  renderReactDom();
}
