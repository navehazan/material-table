import React from "react";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Icon from "@material-ui/core/Icon";
const useStyles = makeStyles({
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  icon: {
    marginRight: "10px",
    cursor: "pointer",
  },
});

export default ({ rowData, editTable }) => {
  const classes = useStyles();
  const [state, setState] = useState({
    editMode: false,
  });

  return (
    <div className={classes.iconContainer}>
      <Icon
        className={classes.icon}
        onClick={() => setState({ editMode: true })}
      >
        edit
      </Icon>
      <Icon
        className={classes.icon}
        onClick={() => setState({ editMode: false })}
      >
        check
      </Icon>
      <TextField
        value={rowData.price}
        disabled={!state.editMode}
        InputProps={{ disableUnderline: !state.editMode }}
        onChange={(e) => editTable(e.target.value, rowData.tableData.id)}
      />
    </div>
  );
};
