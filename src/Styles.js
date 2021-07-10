import { makeStyles } from "@material-ui/core/styles";
const cyan = "#18ffff";
export const useStyles = makeStyles((theme) => ({
  header: {
    position: "fixed",
    top: -5,

    textAlign: "center",
    width: "90%",

    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "#065573",
    color: "#FFFFFF",
    fontSize: 10,
    margin: "0 auto",
    border: `1px solid ${cyan}`,
    borderRadius: 5,
  },
  footer: {
    position: "fixed",
    bottom: -5,
    right: 0,
    textAlign: "center",
    width: "100%",
    paddingRight: 2,
    paddingTop: 2,
    backgroundColor: "rgba(248, 248, 248, .9)",
    color: "#484646",
  },
  wrapper: {
    marginTop: 25,
    padding: 5,
    display: "flex",
    width: "100%",
    flexWrap: "wrap",

    justifyContent: "center",

    marginBottom: 20,
  },
  fieldRow: {
    width: "100%",
    display: "flex",
    marginBottom: 5,
    marginTop: 5
  },
  centersWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    backgroundColor: "rgba(248, 248, 248, .9)",
    marginTop: 10,
    border: `1px solid ${cyan}`,
    borderRadius: 5,
    padding: 5,
  },
  centerRow: {
    borderBottom: `1px solid #FFFFFF`,
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft:5
  },

  centerName: {
    width: "90%",
  },

  vaccineCount: {
    width: "10%",
    textAlign: "center",
  },

  muteButton: {
    position: "absolute",
    top: 50,
    right: 0
  },

  datePicker: {
    height: 50,
    fontSize: 18
  },
  inputField: {
    paddingLeft: 3,
    width: 400,
    fontSize: 18,

    boxSizing: "border-box",
    height: 50,
    marginBottom: 10
  },
  greenBG : {
    backgroundColor:"#9df44f"
  }

}));
